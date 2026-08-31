"use client";

import { motion } from "framer-motion";
import { LuTrophy, LuGithub } from "react-icons/lu";
import { hackathons, achievements } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Hackathons() {
  return (
    <section id="hackathons" className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="hackathons" title="Shipping under a clock" />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-3">
        {hackathons.map((h, i) => (
          <Reveal key={h.name} delay={i * 90}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-full flex-col rounded-xl border border-line/40 bg-card p-6 transition-[colors,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_18px_36px_-20px_rgb(var(--accent)/0.35)]"
            >
              <span className="mb-4 font-mono text-xs text-line/70">
                {h.rank}
              </span>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {h.name}
                </h3>
                <span className="font-mono text-xs text-ink-soft">{h.period}</span>
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
              <p className="mt-4 font-mono text-xs text-ink-soft">
                {h.tech.join(" · ")}
              </p>
              {h.links && (
                <div className="mt-3 flex gap-4">
                  {h.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-accent underline underline-offset-4"
                    >
                      <LuGithub className="h-3 w-3" /> {link.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={hackathons.length * 90}>
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