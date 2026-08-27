"use client";

import { motion } from "framer-motion";
import { LuGithub, LuExternalLink } from "react-icons/lu";
import type { ProjectItem } from "@/data/content";

const LINK_ICON = { GitHub: LuGithub, Live: LuExternalLink } as const;

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const p = project;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex h-full flex-col rounded-sm border border-line/40 bg-card p-6 transition-[colors,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_18px_36px_-20px_rgb(var(--accent)/0.35)]"
    >
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
        <span className="font-mono text-xs text-ink-soft">{p.period}</span>
      </div>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-prose">
        {p.description}
      </p>
      <p className="mt-4 font-mono text-xs text-ink-soft">{p.tech.join(" · ")}</p>
      {p.links && (
        <div className="mt-3 flex gap-4">
          {p.links.map((link) => {
            const Icon = LINK_ICON[link.label as keyof typeof LINK_ICON];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-accent underline underline-offset-4"
              >
                {Icon && <Icon className="h-3 w-3" />} {link.label}
              </a>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
