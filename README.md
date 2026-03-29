# Paul Ruiz | Website

Welcome to my personal website repository.

## About this project

This website is a personal portfolio and research-focused site. It includes:

- a home page with a short personal introduction
- project and topic pages
- a research section that aggregates selected publications and software
- static assets such as images and videos used across the site

This project uses:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [Cheerio](https://cheerio.js.org/)
- [yahoo-finance2](https://github.com/gadicc/node-yahoo-finance2)

## Content

Part of the website content is generated automatically before development and production builds.

The script below is run before `npm run dev` and `npm run build`:

```bash
node app/research/build-research.mjs
````

This script reads and combines information from:

* `app/research/pubmed/urls.json`
* `app/research/github/software.json`
* markdown files stored in `app/research/github/`

It then generates:

* `app/research/generated/data.ts`

## How to run this project locally

Clone the repository:

```bash
git clone https://github.com/paulYRP/paulYRP.github.io.git
cd paulYRP.github.io
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## How to reproduce the research section

To reproduce the generated research content:

1. install the project dependencies
2. make sure the source files under `app/research/` are present
3. run:

```bash
node app/research/build-research.mjs
```

This will rebuild the generated research data file used by the website.

If you would like to add more publications or software entries, update:

* `app/research/pubmed/urls.json`
* `app/research/github/software.json`

and add any matching markdown source files.

## Acknowledgement

Please acknowledge the open-source tools that made this project possible, especially Next.js, React, Tailwind CSS, Framer Motion.

## Contact

You are welcome to get in touch if you would like to collaborate, ask a question, or discuss related work.



