"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuGithub, LuGlobe } from "react-icons/lu";
import type { IconType } from "react-icons";
import type { ProjectItem } from "@/data/content";
import { TechBadge } from "./TechIcon";

const LINK_ICON: Record<string, IconType> = { GitHub: LuGithub, Live: LuGlobe };

export default function ProjectCard({ project }: { project: ProjectItem }) {
  const p = project;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line/40 bg-card transition-[colors,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_18px_36px_-20px_rgb(var(--accent)/0.35)]"
    >
      {p.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-line/10">
          <Image
            src={p.image}
            alt={`${p.name} preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
            <span className="font-mono text-xs text-ink-soft">{p.period}</span>
          </div>
          {p.links && (
            <div className="flex shrink-0 gap-2">
              {p.links.map((link) => {
                const Icon = LINK_ICON[link.label] ?? LuGlobe;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <p className="mb-4 line-clamp-3 text-[15px] leading-relaxed text-prose">
          {p.description}
        </p>

        <div className="mt-auto">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-soft/70">
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}