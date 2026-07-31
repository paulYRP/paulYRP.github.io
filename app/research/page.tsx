"use client";

import { motion } from "framer-motion";
import { publications, software } from "./generated/data";

const highlights = [
  "Computational biology",
  "Statistical modelling",
  "Reproducible research software",
  "Explainable AI (XAI)",
];

export default function Research() {
  return (
    <main className="min-h-screen bg-black px-6 pb-28 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] md:text-6xl"
        >
          Research
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mx-auto mt-10 max-w-7xl rounded-3xl border border-orange-500/20 bg-white/5 p-8 text-left shadow-lg backdrop-blur-sm"
        >
          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            My research focuses on{" "}
            <span className="font-semibold text-orange-300">
              computational biology
            </span>
            : using data, statistics, and software to study biological
            questions. I became interested in the field while learning how to
            interpret figures and results in research papers. That curiosity
            grew into work with algorithms, statistical models, and
            reproducible research software.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
            More recently, I have explored{" "}
            <span className="font-semibold text-orange-300">
              explainable artificial intelligence (XAI)
            </span>
            , which helps people understand how AI systems reach their outputs.
            I enjoy translating technical methods and results into clear
            explanations for technical and non-technical audiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-200"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 grid gap-14 xl:grid-cols-[0.95fr_1.05fr]">
          <section aria-labelledby="publications-heading">
            <motion.h2
              id="publications-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-3xl font-bold text-orange-300 md:text-4xl"
            >
              Publications
            </motion.h2>

            {publications.map((group) => (
              <div key={group.year} className="mt-10">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  {group.year}
                </h3>

                <div className="grid gap-8">
                  {group.publications.map((study, index) => (
                    <motion.article
                      key={`${group.year}-${study.pmid}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.12,
                        duration: 0.7,
                      }}
                      className="overflow-hidden rounded-3xl border border-orange-500/20 bg-white/5 shadow-lg backdrop-blur-sm"
                    >
                      {study.image && (
                        // Publication figures are served by the public archive.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={study.image}
                          alt=""
                          className="h-auto w-full object-cover"
                        />
                      )}

                      <div className="p-8">
                        <h3 className="text-2xl font-semibold leading-snug text-orange-300">
                          {study.title}
                        </h3>

                        {!!study.authors.length && (
                          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
                            {study.authors.join(", ")}
                          </p>
                        )}

                        {!!study.tags.length && (
                          <div className="mt-6 flex flex-wrap gap-3">
                            {study.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <a
                          href={
                            study.doi
                              ? `https://doi.org/${study.doi}`
                              : study.link
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 font-medium text-black transition duration-300 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                        >
                          View publication
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="software-heading">
            <motion.h2
              id="software-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-bold text-orange-300 md:text-4xl"
            >
              Software
            </motion.h2>

            <div className="mt-10 grid gap-8">
              {software.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.1, duration: 0.65 }}
                  className="rounded-3xl border border-orange-500/20 bg-white/5 p-8 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold text-orange-300">
                      {item.name}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-gray-300">
                      {item.owner}/{item.repo}
                    </span>
                  </div>

                  <p className="mt-5 leading-relaxed text-gray-300">
                    {item.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.repoUrl}
                    aria-label={`View ${item.name} on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-medium text-black transition duration-300 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                  >
                    <i aria-hidden="true" className="fab fa-github" />
                    View repository
                  </a>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
