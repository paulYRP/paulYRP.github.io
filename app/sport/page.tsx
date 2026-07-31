"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

type CardItem = {
  title: string;
  subtitle: string;
  src: string;
  poster?: string;
};

const highlights = [
  "Judo",
  "Wrestling",
  "Jiu-jitsu",
  "Discipline and resilience",
];

const competitionVideos: CardItem[] = [
  {
    title: "Grappling 1",
    subtitle: "Australia",
    src: "/sport/videos/grappling/video1.mp4",
    poster: "/sport/images/grappling/image1.jpg",
  },
  {
    title: "Grappling 2",
    subtitle: "Australia",
    src: "/sport/videos/grappling/video2.mp4",
    poster: "/sport/images/grappling/image2.jpg",
  },
  {
    title: "Grappling 3",
    subtitle: "Australia",
    src: "/sport/videos/grappling/video3.mp4",
    poster: "/sport/images/grappling/image3.jpg",
  },
  {
    title: "Grappling 4",
    subtitle: "Australia",
    src: "/sport/videos/grappling/video4.mp4",
    poster: "/sport/images/grappling/image4.jpg",
  },
 
  {
    title: "QBBJC 1",
    subtitle: "Australia",
    src: "/sport/videos/qbbjc/video1.mp4",
    poster: "/sport/images/qbbjc/image1.jpg",
  },
  {
    title: "QBBJC 2",
    subtitle: "Australia",
    src: "/sport/videos/qbbjc/video2.mp4",
    poster: "/sport/images/qbbjc/image2.jpg",
  },
  {
    title: "QBBJC 3",
    subtitle: "Australia",
    src: "/sport/videos/qbbjc/video3.mp4",
    poster: "/sport/images/qbbjc/image3.jpg",
  },
];

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SliderSection({
  title,
  items,
}: {
  title: string;
  items: CardItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction === "left" ? -440 : 440,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollCards("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeftIcon />
          </button>

          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollCards("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="min-w-[340px] max-w-[340px] overflow-hidden rounded-[28px] bg-zinc-100 shadow-xl md:min-w-[420px] md:max-w-[420px]"
          >
            <div className="relative h-[240px] w-full overflow-hidden bg-zinc-900 md:h-[300px]">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>

            <div className="px-8 py-8 text-black">
              <h4 className="text-3xl font-bold leading-tight">{item.title}</h4>
              <p className="mt-3 text-base text-zinc-600">{item.subtitle}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default function Sport() {
  return (
    <main className="min-h-screen bg-black px-8 pb-28 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)] md:text-6xl"
        >
          Sports
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mx-auto mt-10 max-w-7xl rounded-3xl border border-orange-500/20 bg-white/5 p-8 shadow-lg backdrop-blur-sm"
        >
          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            Combat sports have been part of my life for more than 15 years. I
            practise{" "}
            <span className="font-semibold text-orange-300">judo</span>,{" "}
            <span className="font-semibold text-orange-300">wrestling</span> and{" "}
            <span className="font-semibold text-orange-300">jiu-jitsu</span>.
            These disciplines challenge physical ability while also developing
            patience, decision-making, emotional control, and resilience.
          </p>

          <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
            I train and compete because I enjoy the process of learning, testing
            my limits, and improving over time.
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

        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-orange-300 md:text-4xl">
              Competitions
            </h2>
          </motion.div>

          <SliderSection
            title="Videos"
            items={competitionVideos}
          />
        </section>
      </div>
    </main>
  );
}
