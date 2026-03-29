export type Publication = {
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
        "date": "10/06/2025",
        "year": 2025,
        "tags": [
          "DNA methylation",
          "EWAS",
          "posttraumatic growth",
          "posttraumatic stress disorder",
          "stress"
        ],
        "image": "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/2f94/12551033/f2dd5a7ddf15/epigenomes-09-00039-g001.jpg"
      }
    ]
  }
];

export const software: SoftwareGroup[] = [
  {
    "year": 2026,
    "software": [
      {
        "id": "dnaEPICO",
        "name": "dnaEPICO",
        "owner": "paulYRP",
        "repo": "dnaEPICO",
        "branch": "devel",
        "repoUrl": "https://github.com/paulYRP/dnaEPICO",
        "year": 2026,
        "tags": [
          "Bioconductor",
          "DNA methylation",
          "EPICv2"
        ],
        "readmeFile": "dnaEPICO.md",
        "readme": "<!-- README.md is generated from README.Rmd. Please edit that file -->\n\n# dnaEPICO\n\n<!-- badges: start -->\n\n<!-- badges: end -->\n\nThe goal of **`dnaEPICO`** is to provide a **modular, reproducible, and\npipeline** for the preprocessing and statistical analysis of Illumina\nDNA methylation array data (EPICv2, EPIC and 450K).\n\nThe package integrates preprocessing, quality control, phenotype\nmerging, generalised linear models (GLM), linear mixed-effects models\n(LME), and automated report generation. It is designed to run seamlessly\non local machines as well as High-Performance Computing (HPC)\nenvironments via a **GNU Make–based workflow**.\n\n## Installation instructions\n\nGet the latest stable `R` release from\n[CRAN](http://cran.r-project.org/). Then install `dnaEPICO` from\n[Bioconductor](http://bioconductor.org/) using the following code:\n\n``` r\nif (!requireNamespace(\"BiocManager\", quietly = TRUE)) {\n    install.packages(\"BiocManager\")\n}\n\nBiocManager::install(\"dnaEPICO\")\n```\n\nAnd the development version from\n[GitHub](https://github.com/paulYRP/dnaEPICO) with:\n\n``` r\nBiocManager::install(\"paulYRP/dnaEPICO\")\n```\n\n## Articles:\n\n- [**A Pilot Epigenome-Wide Study of Posttraumatic Growth: Identifying\n  Novel Candidates for Future\n  Research**](https://www.mdpi.com/2075-4655/9/4/39)\n\n## Tutorials:\n\n- [**DNA Methylation\n  Tutorial**](https://paulYRP.github.io/2025-cpgpneurogenomics-workshop/tutorial.html)\n- [**Getting\n  Started**](https://github.com/paulYRP/dnaEPICO/wiki/Getting-Started)\n- [**Requirements**](https://github.com/paulYRP/dnaEPICO/wiki/Requirements)\n\n## Citation\n\nBelow is the citation output from using `citation('dnaEPICO')` in R.\nPlease run this yourself to check for any updates on how to cite\n**dnaEPICO**.\n\n``` r\nprint(citation('dnaEPICO'), bibtex = TRUE)\n#> dnaEPICO: Analysis Pipeline for Illumina DNA Methylation Array Data,\n#> generated as part of 10.3390/epigenomes9040039\n#> \n#>   Ruiz P, Mehta D (2025). \"dnaEPICO: Analysis Pipeline for Illumina DNA\n#>   Methylation Array Data.\" _Epigenomes_. doi:10.3390/epigenomes9040039\n#>   <https://doi.org/10.3390/epigenomes9040039>,\n#>   <https://bioconductor.org/packages/dnaEPICO>.\n#> \n#> A BibTeX entry for LaTeX users is\n#> \n#>   @Article{,\n#>     title = {dnaEPICO: Analysis Pipeline for Illumina DNA Methylation Array Data},\n#>     doi = {10.3390/epigenomes9040039},\n#>     journal = {Epigenomes},\n#>     author = {Paul Ruiz and Divya Mehta},\n#>     year = {2025},\n#>     url = {https://bioconductor.org/packages/dnaEPICO},\n#>   }\n```\n\nPlease note that the `dnaEPICO` was only made possible thanks to many\nother R and bioinformatics software authors, which are cited either in\nthe vignettes and/or the paper(s) describing this package.\n\n## Code of Conduct\n\nPlease note that the `dnaEPICO` project is released with a [Contributor\nCode of Conduct](http://bioconductor.org/about/code-of-conduct/). By\ncontributing to this project, you agree to abide by its terms.\n\n## Development tools\n\n- Continuous code testing is possible thanks to [GitHub\n  actions](https://www.tidyverse.org/blog/2020/04/usethis-1-6-0/)\n  through *[usethis](https://CRAN.R-project.org/package=usethis)*,\n  *[remotes](https://CRAN.R-project.org/package=remotes)*, and\n  *[rcmdcheck](https://CRAN.R-project.org/package=rcmdcheck)* customized\n  to use [Bioconductor’s docker\n  containers](https://www.bioconductor.org/help/docker/) and\n  *[BiocCheck](https://bioconductor.org/packages/3.20/BiocCheck)*.\n- Code coverage assessment is possible thanks to\n  [codecov](https://codecov.io/gh) and\n  *[covr](https://CRAN.R-project.org/package=covr)*.\n- The [documentation website](http://paulYRP.github.io/dnaEPICO) is\n  automatically updated thanks to\n  *[pkgdown](https://CRAN.R-project.org/package=pkgdown)*.\n- The code is styled automatically thanks to\n  *[styler](https://CRAN.R-project.org/package=styler)*.\n- The documentation is formatted thanks to\n  *[devtools](https://CRAN.R-project.org/package=devtools)* and\n  *[roxygen2](https://CRAN.R-project.org/package=roxygen2)*.\n\nFor more details, check the `dev` directory.\n\nThis package was developed using\n*[biocthis](https://bioconductor.org/packages/3.20/biocthis)*."
      }
    ]
  }
];
