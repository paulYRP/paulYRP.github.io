"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const videoRef = useRef<HTMLElement | null>(null);
  const handleScroll = () => videoRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="flex flex-col">
      {/* Section 1 */}
      <section className="relative flex flex-col justify-center items-center h-screen overflow-hidden text-white text-center"> {/* <---- CHANGE */}

        {/* 🎬 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home/videos/video7.mp4" type="video/mp4" />
        </video>

        {/* 🖤 Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* 🖼 Centered Logo + Text */}
        <div className="relative z-10 flex flex-col items-center space-y-0"> {/* <---- CHANGE */}

          {/* 🖼 Clickable Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <button
              onClick={handleScroll}
              aria-label="Scroll to next section"
              className="hover:opacity-90 transition-opacity"
            >
              <Image
                src="/home/images/image6.png"
                alt="CHOLO Logo"
                width={300}
                height={100}
                className="drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" // <---- CHANGE
              />
            </button>
          </motion.div>

         
        </div>
      </section>

      {/* 🎥 Section 2 */}
      <section
        ref={videoRef}
        className="relative flex min-h-screen items-center justify-start overflow-hidden bg-black text-white font-sans"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home/videos/video5.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 text-left pl-30 space-y-4">
          <p className="max-w-xl text-lg font-extrabold text-orange-200 tracking-wide drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] mt-0 leading-relaxed">
            <span className="block">
              Hi, welcome to my website. If you are here, it may be because<span className="text-white font-high bg-white/10 px-2 py-0.5 rounded">we share a common interest or because you are also from Peru.</span>
            </span>{" "}
            <span className="block">
              The video above shows the main square of<span className="text-white font-high bg-white/10 px-2 py-0.5 rounded"> Cusco</span>, in the south of Peru. I spent half of my life there and the other half in <span className="text-white font-high bg-white/10 px-2 py-0.5 rounded">Tumbes</span>, in the north of Peru. Both places have distinct cultures and ways of thinking, and both have shaped who I am.
            </span>{" "}
            <span className="block">
              The second video shows another of my interests, <span className="text-white font-high bg-white/10 px-2 py-0.5 rounded">the stock market.</span>
              On this website, you will find a little of everything:<span className="text-white font-high bg-white/10 px-2 py-0.5 rounded">computational biology, combat sports, and the stock market. </span>
            </span>{" "}
            <span className="block">
              Nice to meet you. Please feel free to contact me if you would like to collaborate or simply have a chat.
            </span>
          </p>
        </div>
      </section>
    
      {/* 🌐 Section 3: Connect with Me */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-black text-white overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-black opacity-90" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center space-y-6"
        >
          {/* 🔗 Social Links */}
          <div className="flex space-x-10 mt-6">
            {/* GitHub */}
            <motion.a
              href="https://github.com/paulYRP"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
            >
              <i className="fab fa-github text-5xl animate-pulseGlow"></i>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/pyrp/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-5xl drop-shadow-[0_0_15px_rgba(255,165,0,0.4)]"></i>
            </motion.a>

            {/* Workplace */}
            <motion.a
              href="https://research.qut.edu.au/qutcds/staff/paul-ruiz-pinto/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
            >
              <i className="fas fa-building text-5xl drop-shadow-[0_0_15px_rgba(255,165,0,0.4)]"></i>
            </motion.a>
          </div>

          {/* Subtle footer text */}
          <p className="mt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} CHOLO
          </p>
        </motion.div>
      </section>

    </main>
  );
}
