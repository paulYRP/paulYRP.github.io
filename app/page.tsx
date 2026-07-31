"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const profileLinks = [
  {
    href: "https://github.com/paulYRP",
    label: "GitHub profile",
    icon: "fab fa-github",
  },
  {
    href: "https://www.linkedin.com/in/pyrp/",
    label: "LinkedIn profile",
    icon: "fab fa-linkedin",
  },
  {
    href: "https://research.qut.edu.au/qutcds/staff/paul-ruiz-pinto/",
    label: "QUT research profile",
    icon: "fas fa-building",
  },
];

export default function Home() {
  const introductionRef = useRef<HTMLElement | null>(null);

  return (
    <main className="flex flex-col">
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/home/videos/video7.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <button
            type="button"
            onClick={() =>
              introductionRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Continue to the introduction"
            className="rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-orange-300"
          >
            <Image
              src="/home/images/image6.png"
              alt="CHOLO"
              width={300}
              height={100}
              className="site-logo-glow"
              priority
            />
          </button>
        </motion.div>
      </section>

      <section
        ref={introductionRef}
        className="relative flex min-h-screen items-center overflow-hidden bg-black text-white"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/home/videos/video5.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full px-6 py-24 sm:px-12 lg:pl-24"
        >
          <div className="max-w-2xl space-y-5 rounded-3xl border border-white/10 bg-black/45 p-7 shadow-2xl backdrop-blur-sm sm:p-9">
            <p className="text-xl font-semibold leading-relaxed text-orange-200 sm:text-2xl">
              Welcome. This website brings together the interests that have
              shaped my personal and professional life.
            </p>

            <p className="text-base leading-relaxed text-gray-100 sm:text-lg">
              The first video shows the main square of{" "}
              <span className="font-semibold text-white">Cusco</span> in
              southern Peru. I spent half of my life in Cusco and the other
              half in <span className="font-semibold text-white">Tumbes</span>{" "}
              in northern Peru. Their distinct cultures and perspectives
              continue to influence how I see the world.
            </p>

            <p className="text-base leading-relaxed text-gray-100 sm:text-lg">
              The second video reflects another interest: financial markets.
              Across the site, I share work and experiences in{" "}
              <span className="font-semibold text-white">
                computational biology, investment research, and combat sports
              </span>
              .
            </p>

            <p className="text-base leading-relaxed text-gray-100 sm:text-lg">
              Thank you for visiting. If our interests overlap, you are welcome
              to connect through my professional profiles.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-black px-6 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-black opacity-90" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center space-y-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8">
            {profileLinks.map((profile) => (
              <motion.a
                key={profile.href}
                href={profile.href}
                aria-label={profile.label}
                title={profile.label}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -3 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-500 transition-colors hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
              >
                <i aria-hidden="true" className={`${profile.icon} text-4xl`} />
                <span className="sr-only">{profile.label}</span>
              </motion.a>
            ))}
          </div>

          <p className="pt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} CHOLO
          </p>
        </motion.div>
      </section>
    </main>
  );
}
