"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";

const profiles = [
  {
    href: "https://www.linkedin.com/in/pyrp",
    label: "LinkedIn profile",
    icon: "fab fa-linkedin",
  },
  {
    href: "https://github.com/paulYRP",
    label: "GitHub profile",
    icon: "fab fa-github",
  },
  {
    href: "https://orcid.org/0009-0007-6714-3566",
    label: "ORCID profile",
    icon: "fab fa-orcid",
  },
  {
    href: "https://research.qut.edu.au/qutcds/staff/paul-ruiz-pinto/",
    label: "QUT research profile",
    icon: "fas fa-building",
  },
];

const researchAssistantResponsibilities = [
  "Contributing to projects in bioinformatics, machine learning, and synthetic data generation.",
  "Developing Bioconductor packages for reproducible and scalable biomedical data analysis.",
  "Conducting data preparation, quality control, statistical analysis, and computational workflow development.",
  "Participating in interdisciplinary discussions that support project design, planning, and knowledge exchange.",
  "Organising workshops and providing practical guidance to students and researchers.",
  "Preparing technical reports, presentations, websites, and research summaries for academic, professional, technical, and non-technical audiences.",
];

const internshipResponsibilities = [
  "Preparing and analysing salivary microRNA datasets.",
  "Using R and Bioconductor packages, including DESeq2, miRBase, clusterProfiler, miRNAtap, and multiMiR.",
  "Developing R scripts to identify differentially expressed microRNAs and perform downstream analyses.",
  "Creating quantitative visualisations to support interpretation and decision-making.",
  "Presenting findings to senior researchers.",
];

const skillGroups = [
  {
    title: "Languages",
    items: [
      "Spanish: native",
      "English: advanced",
      "Portuguese: intermediate",
      "Italian: elementary",
    ],
  },
  {
    title: "Communication and collaboration",
    description:
      "I work with people from different academic, professional, cultural, technical, and non-technical backgrounds across research, sport, and community settings.",
    items: [
      "Communicating technical concepts through peer-reviewed writing, technical reports, presentations, workshops, and research support.",
      "Working collaboratively across postgraduate research, interdisciplinary projects, teaching support, and sporting environments.",
    ],
  },
  {
    title: "Research organisation",
    description:
      "I coordinate research tasks, manage analytical workflows, and support reproducible research practices.",
    items: [
      "Planning computational analyses across data preparation, quality control, statistical modelling, biological interpretation, and reporting.",
      "Supporting data analysis and reproducible R workflows for Honours students.",
      "Documenting methods, organising project files, and maintaining reproducible analytical workflows.",
    ],
  },
  {
    title: "Biomedical and genomic data analysis",
    items: [
      "Data preparation, quality control, differential analysis, statistical modelling, and biological interpretation.",
      "DNA methylation, RNA sequencing, microRNA, and multi-omics analysis.",
      "R and Bioconductor packages including minfi, ENmix, wateRmelon, limma, edgeR, DESeq2, clusterProfiler, BiocParallel, SummarizedExperiment, and GenomicRanges.",
      "Python libraries including pandas, NumPy, scikit-learn, pysam, Biopython, and Matplotlib.",
    ],
  },
  {
    title: "Machine learning and synthetic data",
    items: [
      "Predictive modelling and synthetic-data generation using scikit-learn, PyTorch, TensorFlow, imbalanced-learn, SDV, CTGAN, TVAE, and synthpop.",
      "Explainable artificial intelligence methods and tools, including SHAP and LIME.",
      "Familiarity with AI-agent and language-model frameworks, including LangChain, AutoGen, the OpenAI API, and Hugging Face Transformers.",
    ],
  },
  {
    title: "Research computing",
    items: [
      "High-performance computing for large biomedical and genomic analyses, including job submission, resource management, parallel processing, and reproducible pipeline execution.",
      "Cloud and reproducible-computing tools including Microsoft Azure, Google Colab, Kaggle, GitHub Actions, Docker, Conda, Git, and GitHub.",
      "Developing knowledge of digital twins, multimodal data integration, simulation-based biomedical workflows, Azure Digital Twins, Jupyter Notebook, and web-based analytical tools.",
    ],
  },
  {
    title: "Sport and human performance",
    description:
      "I have more than 15 years of experience in combat sports, including Enshin Karate, Judo, Jiu-Jitsu, and Wrestling.",
    items: [
      "Participation in national and international competitions.",
      "Experience with athlete development, performance analysis, coaching environments, and sport-related data science.",
      "Discipline, resilience, leadership, strategic thinking, teamwork, and the ability to work effectively under pressure.",
    ],
  },
];

const conferences = [
  {
    title: "CGPH Neurogenomics Workshop",
    meta: "Collaborator | Brisbane, Australia | July 2025",
    description:
      "I helped deliver training covering participant recruitment, microarray processing, DNA methylation quality control, filtering, and association testing.",
  },
  {
    title: "Genetics and Genomics School",
    meta: "Participant | Brisbane, Australia | June 2025",
    description:
      "I completed training at the University of Queensland's Institute for Molecular Bioscience in genetic mapping, heritability estimation, and polygenic prediction.",
  },
  {
    title: "EU Neuropsychopharmacology Workshop",
    meta: "Online collaborator | Brescia, Italy | March 2025",
    description:
      "I contributed to an educational session involving the University of Brescia, Queensland University of Technology, and the University of Cambridge. The session addressed statistical methods in psychiatry and foundation and large language models for medicine.",
  },
  {
    title: "Critical Care Datathon",
    meta: "Participant | Brisbane, Australia | April 2024",
    description:
      "I participated in a clinical data science workshop delivered by the Australian and New Zealand Intensive Care Society and Queensland University of Technology. The workshop focused on critical care analytics and applied health data analysis.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={reduceMotion || isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-32">
      <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <h2 id={id} className="text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h2>
        </Reveal>
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3 text-gray-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-300 underline decoration-orange-400/40 underline-offset-4 transition hover:text-orange-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
    >
      {children}
      <i aria-hidden="true" className="fas fa-arrow-up-right-from-square text-xs" />
    </a>
  );
}

const primaryCard =
  "rounded-3xl border border-orange-400/20 bg-white/5 p-7 shadow-2xl backdrop-blur-sm sm:p-9";
const secondaryCard =
  "rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-9";

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section
        aria-labelledby="about-title"
        className="relative flex min-h-screen items-center px-6 pb-24 pt-32 sm:px-10 lg:px-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.10),transparent_35%)]" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-6xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
            About
          </p>
          <h1
            id="about-title"
            className="mt-5 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hello, I&apos;m{" "}
            <span className="text-orange-400">Paul Ruiz Pinto.</span>
          </h1>
          <div className="mt-8 max-w-4xl space-y-5 text-xl leading-relaxed text-gray-300 sm:text-2xl">
            <p>
              I work at the intersection of computer science, statistics,
              mathematics, biology, and biomedical sciences. I use data and
              reproducible computing to investigate health-related questions,
              develop practical analytical tools, and communicate evidence
              clearly to technical and non-technical audiences.
            </p>
            <p>
              My work spans multi-omics, digital twins, synthetic data,
              explainable artificial intelligence, and human performance.
              Across these areas, I focus on transparent methods, responsible
              data use, and results that others can understand and reuse.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {profiles.map((profile) => (
              <motion.a
                key={profile.href}
                href={profile.href}
                aria-label={profile.label}
                title={profile.label}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-300 transition hover:border-orange-300 hover:bg-orange-400/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
              >
                <i aria-hidden="true" className={`${profile.icon} text-2xl`} />
                <span className="sr-only">{profile.label}</span>
              </motion.a>
            ))}
          </div>

          <a
            href="#education"
            className="mt-16 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-orange-300/60 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
          >
            Explore my background
            <i aria-hidden="true" className="fas fa-arrow-down text-xs" />
          </a>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl space-y-28 px-6 pb-36 sm:px-10 lg:space-y-36 lg:px-16">
        <Section
          id="education"
          title="Education"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                Queensland University of Technology, Australia | 2023-2024
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Master of Biomedical Data Science
              </h3>
              <h4 className="mt-7 text-lg font-semibold text-orange-300">
                Research project
              </h4>
              <p className="mt-3 text-lg font-medium italic leading-relaxed text-gray-100">
                Evaluating the Role of Multimodal Clinical Data in Breast
                Cancer Diagnostic Classification
              </p>
              <div className="mt-5 space-y-4 leading-relaxed text-gray-300">
                <p>
                  I investigated how multimodal clinical information and
                  medical images could support breast cancer diagnostic
                  classification. The project used the CBIS-DDSM dataset, which
                  contains 6,671 breast images from 1,566 participants.
                </p>
                <p>
                  The work was completed as an 8,050-word research project and
                  was supported by a reproducible experimental code repository.
                </p>
                <p>
                  <span className="font-semibold text-gray-100">
                    Supervisors:
                  </span>{" "}
                  Associate Professor Dimitri Perrin and Dr Jake Bradford
                </p>
              </div>
              <ExternalLink href="https://github.com/paulYRP/bis-endtoend-approach">
                View the project code
              </ExternalLink>
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                Scientific University of the South, Peru | 2012-2017
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Bachelor of Health Science
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                This degree provided a foundation in health science that
                continues to inform my approach to biomedical research and the
                interpretation of health data.
              </p>
            </article>
          </Reveal>
        </Section>

        <Section
          id="research-experience"
          title="Research Experience"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                Queensland University of Technology | March 2025-present
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Research Assistant
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                I contribute to interdisciplinary biomedical research across
                the Centre for Data Science, School of Biomedical Sciences, and
                Centre for Genomics and Personalised Health. My work focuses on
                bioinformatics, biostatistics, machine learning, and
                reproducible computational research.
              </p>
              <h4 className="mt-7 font-semibold text-gray-100">
                Responsibilities
              </h4>
              <BulletList items={researchAssistantResponsibilities} />
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                Queensland University of Technology | July-November 2024
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Biomedical Data Science Intern
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                I supported a biomarker research project involving salivary
                microRNA data collected from healthy adults.
              </p>
              <h4 className="mt-7 font-semibold text-gray-100">
                Responsibilities
              </h4>
              <BulletList items={internshipResponsibilities} />
            </article>
          </Reveal>
        </Section>

        <Section
          id="skills"
          title="Skills and Competencies"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.title}
                delay={index % 2 === 0 ? 0 : 0.08}
                className={
                  group.title === "Sport and human performance"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                <article
                  className={`${secondaryCard} h-full transition hover:-translate-y-1 hover:border-orange-400/30 hover:bg-orange-400/[0.06]`}
                >
                  <h3 className="text-2xl font-semibold text-orange-300">
                    {group.title}
                  </h3>
                  {group.description && (
                    <p className="mt-5 leading-relaxed text-gray-300">
                      {group.description}
                    </p>
                  )}
                  <BulletList items={group.items} />
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="research-publications"
          title="Research Publications"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Peer-reviewed journal article
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">
                A Pilot Epigenome-Wide Study of Posttraumatic Growth:
                Identifying Novel Candidates for Future Research
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                Rubens, M., Pinto, P. R., Sathyanarayanan, A., Miller, O.,
                Mullens, A. B., Bruenig, D., Obst, P., Shakespeare-Finch, J.,
                and Mehta, D. (2025). <em>Epigenomes, 9</em>(4).
              </p>
              <p className="mt-5 leading-relaxed text-gray-300">
                Mackenzie Rubens and I contributed equally to this work. My
                contributions included software development, validation,
                formal analysis, investigation, preparation of the original
                draft, and review and editing of the manuscript.
              </p>
              <ExternalLink href="https://doi.org/10.3390/epigenomes9040039">
                View the publication
              </ExternalLink>
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Manuscript under revision following peer review
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">
                Synthetic Data Generation in Sport: A Framework for Design,
                Utility, and Deployment
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                Ruiz Pinto, P. Y., Warmenhoven, J., Hahn, A., Shephard, M., Wu,
                P. P.-Y., Mengersen, K., and Mehta, D.
              </p>
              <p className="mt-5 leading-relaxed text-gray-300">
                I contributed to the study&apos;s conceptualisation and design,
                data processing and analysis, and the writing and editing of
                the manuscript.
              </p>
            </article>
          </Reveal>
        </Section>

        <Section
          id="other-publications"
          title="Other Publications"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Peer-reviewed research software and Bioconductor package
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug text-white">
                dnaEPICO: Analysis Pipeline for Illumina DNA Methylation Array
                Data
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                Ruiz, P., and Mehta, D. (2026). Bioconductor.
              </p>
              <div className="mt-5 space-y-4 leading-relaxed text-gray-300">
                <p>
                  I developed dnaEPICO as a modular and reproducible pipeline
                  for preprocessing and statistically analysing Illumina DNA
                  methylation array data, including EPICv2, EPIC, and 450K
                  platforms.
                </p>
                <p>
                  My work included package design, preprocessing and
                  quality-control workflows, phenotype integration,
                  statistical-modelling functions, documentation, testing, and
                  preparation for Bioconductor review.
                </p>
              </div>
              <ExternalLink href="https://paulyrp.github.io/dnaEPICO/">
                View dnaEPICO
              </ExternalLink>
            </article>
          </Reveal>
        </Section>

        <Section
          id="conferences"
          title="Conferences and Workshops"
        >
          {conferences.map((conference) => (
            <Reveal key={conference.title}>
              <article className={secondaryCard}>
                <p className="text-sm font-semibold text-orange-200">
                  {conference.meta}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  {conference.title}
                </h3>
                <p className="mt-5 leading-relaxed text-gray-300">
                  {conference.description}
                </p>
              </article>
            </Reveal>
          ))}
        </Section>

        <Section
          id="grants-awards"
          title="Grants and Awards"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Strategic grant pipeline funding | 2025
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                SeedDS: Sports Analytics and AI Roadmap
              </h3>
              <p className="mt-3 text-lg font-medium italic leading-relaxed text-gray-200">
                Privacy-Preserving AI for Athlete Performance
              </p>
              <dl className="mt-6 grid gap-3 text-gray-300 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold text-gray-100">Funding body</dt>
                <dd>QUT Centre for Data Science</dd>
                <dt className="font-semibold text-gray-100">Project funding</dt>
                <dd>AUD $20,000</dd>
                <dt className="font-semibold text-gray-100">Role</dt>
                <dd>Research Assistant</dd>
              </dl>
              <p className="mt-6 leading-relaxed text-gray-300">
                This funding supported a pilot project on privacy-preserving
                artificial intelligence and synthetic data for
                athlete-performance analytics. I contributed to data
                processing, model development, synthetic-data validation, and
                research reporting.
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Innovation grant | 2025
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Centre for Genomics and Personalised Health
              </h3>
              <p className="mt-3 text-lg font-medium italic leading-relaxed text-gray-200">
                Genomics in Action: Predicting Health Outcomes for Elite
                Athletes
              </p>
              <dl className="mt-6 grid gap-3 text-gray-300 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold text-gray-100">Funding body</dt>
                <dd>QUT Centre for Genomics and Personalised Health</dd>
                <dt className="font-semibold text-gray-100">Project funding</dt>
                <dd>AUD $11,632</dd>
                <dt className="font-semibold text-gray-100">Role</dt>
                <dd>Research Assistant</dd>
              </dl>
              <div className="mt-6 space-y-4 leading-relaxed text-gray-300">
                <p>
                  This funding supported a pilot sports-genomics project
                  investigating genetic and epigenetic indicators associated
                  with mental health, injury, and well-being in elite athletes.
                </p>
                <p>
                  I contributed to genetic and DNA methylation analyses using R
                  and PLINK and helped interpret multi-omics and health data.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
                Academic award
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                QUT Executive Dean&apos;s Commendation for Academic Excellence
              </h3>
              <p className="mt-3 text-sm font-semibold text-orange-200">
                Queensland University of Technology, Faculty of Science |
                Semesters 1 and 2, 2023
              </p>
              <p className="mt-5 leading-relaxed text-gray-300">
                I received the commendation in two consecutive semesters in
                recognition of academic excellence during my postgraduate
                studies.
              </p>
            </article>
          </Reveal>
        </Section>

        <Section
          id="service"
          title="Service"
        >
          <Reveal>
            <article className={primaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                Queensland University of Technology | March 2025-present
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Honours student support
              </h3>
              <p className="mt-5 leading-relaxed text-gray-300">
                I support Honours students with data analysis, R workflows,
                statistical interpretation, and reproducible research
                practices.
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className={secondaryCard}>
              <p className="text-sm font-semibold text-orange-200">
                MacGregor State School, Brisbane | May 2025
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                QUT-STEAM community activity
              </h3>
              <div className="mt-5 space-y-4 leading-relaxed text-gray-300">
                <p>
                  I helped deliver a QUT-STEAM activity for approximately 500
                  early-primary students, parents, and school staff.
                </p>
                <p>
                  The activity used interactive demonstrations of artificial
                  intelligence, object detection, sport science, sprint-time
                  data collection, and data visualisation to show how
                  mathematics, statistics, and science can be applied to
                  artificial intelligence and sport performance.
                </p>
              </div>
            </article>
          </Reveal>
        </Section>

        <section aria-label="Explore related work">
          <Reveal>
            <nav
              aria-label="Explore related work"
              className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap"
            >
              <Link
                href="/research"
                className="min-h-12 rounded-full bg-orange-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
              >
                View research
              </Link>
              <Link
                href="/market"
                className="min-h-12 rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-orange-300 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
              >
                View investment
              </Link>
              <Link
                href="/sport"
                className="min-h-12 rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:border-orange-300 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
              >
                View sport
              </Link>
            </nav>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
