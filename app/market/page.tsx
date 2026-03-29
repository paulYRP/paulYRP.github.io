"use client";

import { motion } from "framer-motion";
import Navbar from "../navbar";

const highlights = [
  "Business and investment learning",
  "Portfolio customisation",
  "Financial reports and analysis",
  "Risk and controlled decisions",
];

export default function Market() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <Navbar />

      <section className="px-8 pt-16 pb-28">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-5xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] md:text-6xl"
          >
            Investment
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mx-auto mt-10 max-w-7xl rounded-3xl border border-orange-500/20 bg-white/5 p-8 text-left shadow-lg backdrop-blur-sm"
          >
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              My business side began by watching my mother run her own business.
              I learnt a great deal from her in many areas, but this was one of
              the most influential. It encouraged me to keep educating myself
              about investments, risk, and how to make controlled decisions.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
              I am currently working on building a website to filter and
              customise portfolios, as I have become more involved in finance
              and accounting and have encountered more questions along the way.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
              I have read{" "}
              <span className="font-semibold text-orange-300">
                The Investment Checklist: The Art of In-Depth Research
              </span>{" "}
              by Michael Shearn, which sparked even more curiosity. I then moved
              on to{" "}
              <span className="font-semibold text-orange-300">
                How to Read a Financial Report
              </span>{" "}
              by John A. Tracy to strengthen my understanding and help me build
              a more expert and useful website.
            </p>

            <p className="mt-6 text-lg font-medium leading-relaxed text-white md:text-xl">
              If you are an accountant or finance professional, please contact
              me. I would be glad to have people test the website once it is
              ready.
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
        </div>
      </section>
    </main>
  );
}