"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowRight, LuTrophy, LuGithub, LuGlobe } from "react-icons/lu";
import type { IconType } from "react-icons";
import { hackathons, achievements } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { TechBadge } from "./TechIcon";
import ImageSlider from "./ImageSlider";

const LINK_ICON: Record<string, IconType> = { GitHub: LuGithub, Live: LuGlobe };

export default function Hackathons() {
  const featured = hackathons.slice(0, 2);

  return (
    <section id="hackathons" className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="hackathons" title="Shipping under a clock" />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((h, i) => (
          <Reveal key={h.name} delay={i * 90} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-line/40 bg-card transition-[colors,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_18px_36px_-20px_rgb(var(--accent)/0.35)]"
            >
              {h.images && h.images.length > 0 && (
                <ImageSlider images={h.images} alt={h.name} />
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-4 font-mono text-xs text-line/70">{h.rank}</span>

                <div className="mb-1 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{h.name}</h3>
                    <span className="font-mono text-xs text-ink-soft">{h.period}</span>
                  </div>
                  {h.links && (
                    <div className="flex shrink-0 gap-2">
                      {h.links.map((link) => {
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

                <p className="mb-3 font-mono text-xs text-ink-soft">{h.event}</p>

                {h.result && (
                  <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft/25 px-2.5 py-1 font-mono text-xs text-accent">
                    <LuTrophy className="h-3 w-3" /> {h.result}
                  </p>
                )}

                <p className="mb-4 flex-1 line-clamp-4 text-[15px] leading-relaxed text-prose">
                  {h.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {h.tech.map((t) => (
                    <TechBadge key={t} tech={t} />
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={featured.length * 90 + 40}>
        <Link
          href="/projects?category=Hackathon"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent underline underline-offset-4"
        >
          View all hackathons <LuArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>

      <Reveal delay={featured.length * 90 + 90}>
        <div className="mt-10 max-w-content border-t border-line/30 pt-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
            Also
          </p>
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3 text-[15px] text-prose">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}