"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation"; 


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const pathname = usePathname(); 

  const showLogo = ["/dashboard", "/about", "/contact"].includes(pathname);


  return (
    <header className="fixed top-0 left-0 z-50 w-full text-orange-200 bg-transparent transition-all duration-300">
        {/* 🧭 Main Navbar Container */}
        <div
          className={`mx-auto flex w-full items-center px-8 py-6 ${
            showLogo ? "justify-between" : "justify-end"
          }`}>

          {/* 🟠 Left Side: Conditional Logo */}
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/image/image6.png"
                  alt="CHOLO Logo"
                  width={60}
                  height={10}
                  className="drop-shadow-[0_0_20px_rgba(255,140,0,0.5)] hover:opacity-90 transition-opacity"
                />
              </Link>
            </motion.div>
        )}
      
        {/* 🍔 Hamburger Icon */}
        <div
          id="hamburger"
          aria-label="Toggle menu"
          className="relative w-8 h-6 cursor-pointer flex flex-col justify-between"
          onClick={handleToggle}
        >
          <span
            className={`block h-1 bg-orange-500 rounded transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-1 bg-orange-500 rounded transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 bg-orange-500 rounded transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </div>
      </div>

      {/* 🟠 Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="menu"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-full right-0 w-56 bg-black/90 backdrop-blur-md border-l border-orange-400/30 rounded-bl-2xl overflow-hidden shadow-lg"
          >
            <ul className="flex flex-col items-center text-lg py-6 space-y-4 font-semibold">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/market"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Investment
                </Link>
              </li>
              <li>
                <Link
                  href="/sport"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
