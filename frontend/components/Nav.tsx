"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuGithub, LuMail, LuMenu, LuX } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import AnchorLink from "./AnchorLink";
import { profile } from "@/data/content";

const links = [
  { href: "/#top", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Escape closes the menu, same as clicking a link or the toggle again.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-wide items-center justify-between px-6 py-3.5">
        <AnchorLink href="/#top" className="flex items-center gap-3">
          <Avatar size={32} />
        </AnchorLink>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <AnchorLink
                href={link.href}
                className="group relative font-mono text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
              </AnchorLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            <LuGithub className="h-4 w-4" />
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <FaXTwitter className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <LuMail className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent sm:hidden"
          >
            {open ? <LuX className="h-4 w-4" /> : <LuMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line/40 sm:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <AnchorLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-mono text-sm text-ink-soft transition-colors hover:bg-card-alt hover:text-accent"
                  >
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 border-t border-line/30 px-6 py-4">
              <a
                href={profile.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                <LuMail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}