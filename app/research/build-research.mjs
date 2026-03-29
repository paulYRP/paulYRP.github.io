import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const root = fileURLToPath(new URL(".", import.meta.url));
const pubmedUrlsFile = path.join(root, "pubmed", "urls.json");
const softwareMetaFile = path.join(root, "github", "software.json");
const githubDir = path.join(root, "github");
const outFile = path.join(root, "generated", "data.ts");

const cleanText = (x) => x.replace(/\s+/g, " ").trim();

const getPmid = (url) =>
  url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1] ?? "";

const parseAuthors = ($) =>
  [
    ...new Set(
      $('meta[name="citation_author"]')
        .map((_, el) => cleanText($(el).attr("content") ?? ""))
        .get()
        .filter(Boolean),
    ),
  ];

const parseTagsFromPaper = ($) => {
  const text = cleanText($.root().text());

  const match = text.match(
    /Keywords:\s*(.+?)(?:PubMed Disclaimer|Conflict of interest statement|Figures|References|Associated data|Supplementary information|Copyright|$)/i,
  );

  if (!match?.[1]) return [];

  return [
    ...new Set(
      match[1]
        .split(";")
        .map((x) => x.trim().replace(/\.$/, ""))
        .filter(Boolean),
    ),
  ];
};

const parseImage = ($, baseUrl) => {
  const href =
    $('a[href*="cdn.ncbi.nlm.nih.gov"]').first().attr("href") ??
    $('img[src*="cdn.ncbi.nlm.nih.gov"]').first().attr("src");

  if (!href) return null;

  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
};

const parseDoi = ($) => {
  const doiMeta =
    $('meta[name="citation_doi"]').attr("content") ??
    $('meta[name="citation_doi"]').attr("value");

  if (doiMeta) return cleanText(doiMeta);

  const text = cleanText($.root().text());
  const match = text.match(/\bdoi:\s*([0-9]+\.[^\s;]+)/i);
  return match ? match[1].replace(/\.$/, "") : null;
};

const parseDate = ($) => {
  const candidates = [
    $('meta[name="citation_publication_date"]').attr("content"),
    $('meta[name="citation_date"]').attr("content"),
    $('meta[name="dc.date"]').attr("content"),
  ]
    .filter(Boolean)
    .map(cleanText);

  if (candidates.length) return candidates[0];

  const text = cleanText($.root().text());

  const fullDate =
    text.match(/\b(19|20)\d{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\b/)?.[0] ??
    text.match(/\b(19|20)\d{2}\s+[A-Z][a-z]{2}\b/)?.[0] ??
    text.match(/\b(19|20)\d{2}\b/)?.[0];

  return fullDate ?? null;
};

const parseYear = (date) => {
  if (!date) return null;
  const match = String(date).match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
};

const getStudy = async (pubmedUrl) => {
  const pmid = getPmid(pubmedUrl);
  if (!pmid) {
    console.warn(`Skipping PubMed URL without PMID: ${pubmedUrl}`);
    return null;
  }

  try {
    const res = await fetch(pubmedUrl, {
      headers: { "User-Agent": "research-page/1.0" },
    });

    if (!res.ok) {
      console.warn(`PubMed fetch failed for ${pubmedUrl}: ${res.status}`);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const title =
      cleanText($('meta[name="citation_title"]').attr("content") ?? "") ||
      cleanText($("h1").first().text());

    if (!title) {
      console.warn(`No title found for ${pubmedUrl}`);
      return null;
    }

    const date = parseDate($);
    const year = parseYear(date);
    const tags = parseTagsFromPaper($);

    const study = {
      pmid,
      title,
      authors: parseAuthors($),
      link: pubmedUrl,
      doi: parseDoi($),
      date,
      year,
      tags,
      image: parseImage($, pubmedUrl),
    };

    console.log(`Parsed PubMed study: ${pmid} | ${title} | year=${year} | tags=${tags.length}`);
    return study;
  } catch (err) {
    console.warn(`Error fetching/parsing ${pubmedUrl}:`, err);
    return null;
  }
};

const cleanReadme = (md) =>
  md
    .replace(/\[!\[[^\]]*]\([^)]*\)\]\([^)]*\)/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/<img[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const groupByYear = (items, keyName) =>
  Object.entries(
    items.reduce((acc, item) => {
      const y = item.year ?? 0;
      if (!acc[y]) acc[y] = [];
      acc[y].push(item);
      return acc;
    }, {}),
  )
    .filter(([year]) => Number(year) > 0)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, values]) => ({
      year: Number(year),
      [keyName]: values,
    }));

const buildPublications = async () => {
  const urls = JSON.parse(await fs.readFile(pubmedUrlsFile, "utf8"));

  if (!Array.isArray(urls) || !urls.length) {
    console.warn("No PubMed URLs found in urls.json");
    return [];
  }

  const publications = (await Promise.all(urls.map(getStudy))).filter(Boolean);

  console.log(`Valid PubMed studies: ${publications.length}`);
  return groupByYear(publications, "publications");
};

const buildSoftware = async () => {
  const meta = JSON.parse(await fs.readFile(softwareMetaFile, "utf8"));

  const software = await Promise.all(
    meta.map(async (item) => {
      const readme = await fs.readFile(
        path.join(githubDir, item.readmeFile),
        "utf8",
      );

      return {
        ...item,
        readme: cleanReadme(readme),
      };
    }),
  );

  return groupByYear(software, "software");
};

const buildTsFile = (publications, software) => `export type Publication = {
  pmid: string;
  title: string;
  authors: string[];
  link: string;
  doi: string | null;
  date: string | null;
  year: number | null;
  tags: string[];
  image: string | null;
};

export type PublicationGroup = {
  year: number;
  publications: Publication[];
};

export type SoftwareItem = {
  id: string;
  name: string;
  owner: string;
  repo: string;
  branch: string;
  repoUrl: string;
  year: number;
  tags: string[];
  readmeFile: string;
  readme: string;
};

export type SoftwareGroup = {
  year: number;
  software: SoftwareItem[];
};

export const publications: PublicationGroup[] = ${JSON.stringify(publications, null, 2)};

export const software: SoftwareGroup[] = ${JSON.stringify(software, null, 2)};
`;

const main = async () => {
  const [publications, software] = await Promise.all([
    buildPublications(),
    buildSoftware(),
  ]);

  await fs.mkdir(path.join(root, "generated"), { recursive: true });
  await fs.writeFile(outFile, buildTsFile(publications, software), "utf8");

  console.log("Research data generated in app/research/generated/data.ts");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});