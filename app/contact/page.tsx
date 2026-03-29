"use client";

import React from "react";
import { motion } from "framer-motion";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M4 6h16v12H4z"
        stroke="currentColor"
        strokeWidth="1.8"
        rx="2"
      />
      <path
        d="m5 7 7 6 7-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const contactDetails = [
  {
    icon: <PinIcon />,
    label: "Work",
    content: (
      <>
        <p>Q Block, IHBI</p>
        <p>60 Musk Ave</p>
        <p>Kelvin Grove QLD 4059</p>
      </>
    ),
  },
  {
    icon: <MailIcon />,
    label: "Email",
    content: (
      <a
        href="mailto:paul.ruizpinto@qut.edu.au"
        className="transition hover:text-orange-300"
      >
        paul.ruizpinto@qut.edu.au
      </a>
    ),
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <motion.section
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <h1 className="text-5xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] md:text-6xl">
            Contact
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Please feel free to get in touch regarding research, collaboration,
            investment, sport or to discuss potential opportunities.
          </p>

          <div className="mt-12 space-y-10">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex items-start gap-5">
                <div className="mt-1 text-orange-400">{item.icon}</div>

                <div className="text-lg leading-relaxed text-gray-200 md:text-xl">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                    {item.label}
                  </p>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <div className="overflow-hidden rounded-[28px] border border-orange-500/20 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
            <div className="overflow-hidden rounded-[22px]">
              <iframe
                title="QUT Kelvin Grove map"
                src="https://www.google.com/maps?q=60+Musk+Ave,+Kelvin+Grove+QLD+4059&z=16&output=embed"
                className="h-[340px] w-full md:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}