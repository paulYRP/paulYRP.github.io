"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { publications, software } from "./generated/data";

const highlights = [
  "Computational biology",
  "Algorithms and statistical thinking",
  "Explainable AI (XAI)",
  "Clear interpretation for stakeholders",
];

export default function Research() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
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
            My science side is centred on{" "}
            <span className="font-semibold text-orange-300">
              computational biology
            </span>
            . It started with my process of understanding graphs in research
            studies. That curiosity led me to keep working through packages,
            algorithms, mathematics, and statistics, and with the advance of AI,
            into{" "}
            <span className="font-semibold text-orange-300">
              explainable AI (XAI)
            </span>
            .
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
            I truly enjoy the challenge of understanding core concepts and
            turning them into{" "}
            <span className="font-semibold text-orange-300">
              clear and digestible interpretations
            </span>{" "}
            for stakeholders and users.
          </p>

          <p className="mt-6 text-lg font-medium leading-relaxed text-white md:text-xl">
            Enough about me: Let’s look at some of my work.
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

        <div className="mt-20 grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <section>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-orange-300 md:text-4xl">
                Publications
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
                Publications parsed at build time and grouped by year.
              </p>
            </motion.div>

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
                      transition={{ delay: 0.3 + index * 0.12, duration: 0.7 }}
                      className="overflow-hidden rounded-3xl border border-orange-500/20 bg-white/5 shadow-lg backdrop-blur-sm"
                    >
                      {study.image && (
                        <img
                          src={study.image}
                          alt={study.title}
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
                          href={study.doi ? `https://doi.org/${study.doi}` : study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 font-medium text-black transition duration-300 hover:bg-orange-400"
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

          <section>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-orange-300 md:text-4xl">
                Software
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
                Software records grouped by year from local Markdown snapshots.
              </p>
            </motion.div>

            {software.map((group) => (
              <div key={group.year} className="mt-10">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  {group.year}
                </h3>

                <div className="grid gap-8">
                  {group.software.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + index * 0.12, duration: 0.7 }}
                      className="rounded-3xl border border-orange-500/20 bg-white/5 p-8 shadow-lg backdrop-blur-sm"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold text-orange-300">
                          {item.name}
                        </h3>
                        <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-sm text-orange-200">
                          {item.owner}/{item.repo}
                        </span>
                      </div>

                      {!!item.tags?.length && (
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
                      )}

                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-medium text-black transition duration-300 hover:bg-orange-400"
                      >
                        View on GitHub
                      </a>

                      <div className="mt-8 max-h-[900px] overflow-y-auto pr-2">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h4 className="mt-0 text-2xl font-semibold text-orange-300">
                                {children}
                              </h4>
                            ),
                            h2: ({ children }) => (
                              <h5 className="mt-8 text-xl font-semibold text-orange-200">
                                {children}
                              </h5>
                            ),
                            h3: ({ children }) => (
                              <h6 className="mt-6 text-lg font-semibold text-orange-200">
                                {children}
                              </h6>
                            ),
                            p: ({ children }) => (
                              <p className="mt-4 leading-relaxed text-gray-300">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-300">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => <li>{children}</li>,
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-300 underline underline-offset-4"
                              >
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="rounded bg-black/40 px-1.5 py-0.5 text-sm text-orange-200">
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/40 p-4 text-sm text-gray-200">
                                {children}
                              </pre>
                            ),
                          }}
                        >
                          {item.readme}
                        </ReactMarkdown>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}