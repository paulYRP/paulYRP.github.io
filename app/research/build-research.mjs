import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicationsMetaFile = path.join(
  root,
  "pubmed",
  "publications.json",
);
const softwareMetaFile = path.join(root, "github", "software.json");
const outFile = path.join(root, "generated", "data.ts");

const groupByYear = (items, keyName) =>
  Object.entries(
    items.reduce((groups, item) => {
      const year = item.year ?? 0;
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
      return groups;
    }, {}),
  )
    .filter(([year]) => Number(year) > 0)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, values]) => ({
      year: Number(year),
      [keyName]: values,
    }));

const buildPublications = async () => {
  const publications = JSON.parse(
    await fs.readFile(publicationsMetaFile, "utf8"),
  );

  if (!Array.isArray(publications) || !publications.length) {
    throw new Error("Publication metadata must be a non-empty array.");
  }

  const pmids = new Set();

  for (const publication of publications) {
    if (
      !publication.pmid ||
      !publication.title ||
      !publication.link ||
      !Number.isInteger(publication.year) ||
      !Array.isArray(publication.authors) ||
      !Array.isArray(publication.tags)
    ) {
      throw new Error(
        `Invalid publication metadata for ${publication.pmid ?? "unknown"}.`,
      );
    }

    if (pmids.has(publication.pmid)) {
      throw new Error(`Duplicate publication PMID: ${publication.pmid}.`);
    }

    pmids.add(publication.pmid);
  }

  return groupByYear(publications, "publications");
};

const buildSoftware = async () => {
  const software = JSON.parse(await fs.readFile(softwareMetaFile, "utf8"));

  if (!Array.isArray(software) || !software.length) {
    throw new Error("Software metadata must be a non-empty array.");
  }

  const ids = new Set();
  const orders = new Set();

  for (const item of software) {
    if (
      !item.id ||
      !item.name ||
      !item.owner ||
      !item.repo ||
      !item.repoUrl ||
      !item.summary ||
      !Array.isArray(item.tags) ||
      !Number.isInteger(item.displayOrder)
    ) {
      throw new Error(`Invalid software metadata for ${item.id ?? "unknown"}.`);
    }

    if (ids.has(item.id) || orders.has(item.displayOrder)) {
      throw new Error(`Duplicate software id or display order: ${item.id}.`);
    }

    ids.add(item.id);
    orders.add(item.displayOrder);
  }

  return [...software].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );
};

const buildTsFile = (publications, software) => `export type Publication = {
  pmid: string;
  title: string;
  authors: string[];
  link: string;
  doi: string | null;
  date: string | null;
  year: number;
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
  repoUrl: string;
  displayOrder: number;
  summary: string;
  tags: string[];
};

export const publications: PublicationGroup[] = ${JSON.stringify(publications, null, 2)};

export const software: SoftwareItem[] = ${JSON.stringify(software, null, 2)};
`;

const main = async () => {
  const [publications, software] = await Promise.all([
    buildPublications(),
    buildSoftware(),
  ]);

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, buildTsFile(publications, software), "utf8");

  console.log(
    `Research data generated: ${publications.length} publication year group(s), ${software.length} software record(s).`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
