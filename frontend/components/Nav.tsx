"use client";

import { LuGithub, LuMail } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import AnchorLink from "./AnchorLink";
import { profile } from "@/data/content";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/#hackathons", label: "Hackathons" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-wide items-center justify-between px-6 py-3.5">
        <AnchorLink href="/#top" className="flex items-center gap-3">
          <Avatar size={32} />
          <span className="font-mono text-sm text-ink-soft">neha.dev</span>
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
        </div>
      </nav>
    </header>
  );
}
