"use client";

import { motion } from "framer-motion";
import { LuGithub, LuMail } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import AsciiPortrait from "./AsciiPortrait";
import AnchorLink from "./AnchorLink";
import PixelClouds from "./PixelClouds";
import { profile, proofStats } from "@/data/content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-wide overflow-hidden px-6 pb-16 pt-16 md:pt-20"
    >
      <PixelClouds />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-16"
      >
        <div className="w-full">
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.role}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl md:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-content text-lg leading-relaxed text-prose"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line/50 px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <LuGithub className="h-4 w-4" /> GitHub
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line/50 px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FaXTwitter className="h-3.5 w-3.5" /> Twitter
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-full border border-line/50 px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <LuMail className="h-4 w-4" /> Email
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line/40 bg-line/20 sm:grid-cols-3"
          >
            {proofStats.map((stat) => (
              <div key={stat.value} className="bg-card px-6 py-5">
                <p className="font-display text-2xl font-semibold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{stat.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 shrink-0"
        >
          <AsciiPortrait containerSize={280} />
        </motion.div>
      </motion.div>
    </section>
  );
}
