"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Quote } from "@/data/quotes";

export default function QuoteRotator({
  quotes,
  intervalMs = 3800,
}: {
  quotes: Quote[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const count = quotes.length;

  useEffect(() => {
    if (prefersReducedMotion || paused || count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, count, intervalMs]);

  const current = quotes[index];
  if (!current) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden rounded-md border border-line/40 bg-card px-8 py-14 text-center sm:px-16 sm:py-16"
    >
      <span className="pointer-events-none absolute left-6 top-2 select-none font-display text-6xl text-accent/15 sm:text-7xl">
        &ldquo;
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, y: 10 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mx-auto max-w-2xl font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            {current.line}
          </p>
          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-accent">
            — {current.character}, {current.movie}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}