"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/market", label: "Investment" },
  { href: "/sport", label: "Sports" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const showLogo = pathname !== "/";

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-transparent text-orange-200">
      <div
        className={`mx-auto flex w-full items-center px-6 py-5 sm:px-8 ${
          showLogo ? "justify-between" : "justify-end"
        }`}
      >
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/"
              aria-label="Go to the CHOLO home page"
              className="flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            >
              <Image
                src="/home/images/image6.png"
                alt=""
                width={72}
                height={24}
                className="site-logo-glow h-auto w-[72px] transition-opacity hover:opacity-90"
                priority
              />
            </Link>
          </motion.div>
        )}

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-black/45 backdrop-blur-sm transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
        >
          <span
            aria-hidden="true"
            className={`block h-0.5 w-7 rounded bg-orange-500 transition duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`block h-0.5 w-7 rounded bg-orange-500 transition duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`block h-0.5 w-7 rounded bg-orange-500 transition duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="site-navigation"
            aria-label="Primary navigation"
            key="menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-full w-60 overflow-hidden rounded-bl-2xl border-b border-l border-orange-400/30 bg-black/95 shadow-2xl backdrop-blur-md"
          >
            <ul className="flex flex-col py-4 text-lg font-semibold">
              {navigation.map((item) => {
                const isCurrent =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`block px-8 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-orange-400 ${
                        isCurrent
                          ? "bg-orange-400/10 text-orange-300"
                          : "hover:bg-white/5 hover:text-orange-400"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
