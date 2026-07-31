export type Publication = {
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

export const publications: PublicationGroup[] = [
  {
    "year": 2025,
    "publications": [
      {
        "pmid": "41133714",
        "title": "A Pilot Epigenome-Wide Study of Posttraumatic Growth: Identifying Novel Candidates for Future Research",
        "authors": [],
        "link": "https://pubmed.ncbi.nlm.nih.gov/41133714/",
        "doi": "10.3390/epigenomes9040039",
        "date": "2025",
        "year": 2025,
        "tags": [
          "DNA methylation",
          "EWAS",
          "Posttraumatic growth",
          "Posttraumatic stress disorder",
          "Stress"
        ],
        "image": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/2f94/12551033/f2dd5a7ddf15/epigenomes-09-00039-g001.jpg"
      }
    ]
  }
];

export const software: SoftwareItem[] = [
  {
    "id": "dnaEPICO",
    "name": "dnaEPICO",
    "owner": "paulYRP",
    "repo": "dnaEPICO",
    "repoUrl": "https://github.com/paulYRP/dnaEPICO",
    "displayOrder": 1,
    "summary": "A modular and reproducible pipeline for preprocessing and statistically analysing Illumina DNA methylation array data from the EPICv2, EPIC, and 450K platforms.",
    "tags": [
      "Bioconductor",
      "DNA methylation",
      "Reproducible workflows"
    ]
  },
  {
    "id": "cds-seed",
    "name": "cds-seed",
    "owner": "paulYRP",
    "repo": "cds-seed",
    "repoUrl": "https://github.com/paulYRP/cds-seed",
    "displayOrder": 2,
    "summary": "Evidence and an interactive framework for designing and evaluating synthetic data projects in sport, with attention to privacy, utility, fidelity, and deployment.",
    "tags": [
      "Synthetic data",
      "Sports analytics",
      "Privacy"
    ]
  },
  {
    "id": "GSE142512",
    "name": "GSE142512",
    "owner": "paulYRP",
    "repo": "GSE142512",
    "repoUrl": "https://github.com/paulYRP/GSE142512",
    "displayOrder": 3,
    "summary": "A Bioconductor ExperimentHub data package providing processed 450K and EPIC DNA methylation resources derived from GEO Series GSE142512.",
    "tags": [
      "ExperimentHub",
      "DNA methylation",
      "450K and EPIC"
    ]
  },
  {
    "id": "GSE280465",
    "name": "GSE280465",
    "owner": "paulYRP",
    "repo": "GSE280465",
    "repoUrl": "https://github.com/paulYRP/GSE280465",
    "displayOrder": 4,
    "summary": "A Bioconductor ExperimentHub data package providing a processed adult EPICv2 DNA methylation resource derived from GEO Series GSE280465.",
    "tags": [
      "ExperimentHub",
      "DNA methylation",
      "EPICv2"
    ]
  },
  {
    "id": "2025-cpgpneurogenomics-workshop",
    "name": "2025-cpgpneurogenomics-workshop",
    "owner": "paulYRP",
    "repo": "2025-cpgpneurogenomics-workshop",
    "repoUrl": "https://github.com/paulYRP/2025-cpgpneurogenomics-workshop",
    "displayOrder": 5,
    "summary": "Practical training materials for a statistical genomics, bioinformatics, and neurogenomics workshop, including preparation for R, RStudio, and PLINK.",
    "tags": [
      "Training",
      "Neurogenomics",
      "R and PLINK"
    ]
  }
];
