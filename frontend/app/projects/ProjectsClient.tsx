"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projects, hackathons, projectCategories, type ProjectItem } from "@/data/content";
import ProjectCard from "@/components/ProjectCard";

type Filter = "All" | ProjectItem["category"];

const hackathonsAsProjects: ProjectItem[] = hackathons.map((h) => ({
  name: h.name,
  period: h.period,
  description: h.description,
  tech: h.tech,
  category: "Hackathon",
  links: h.links,
  images: h.images,
}));

const allItems: ProjectItem[] = [...projects, ...hackathonsAsProjects];

function isFilter(value: string | null): value is Filter {
  return value === "All" || (projectCategories as string[]).includes(value ?? "");
}

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const [filter, setFilter] = useState<Filter>(isFilter(requested) ? requested : "All");
  const tabs: Filter[] = ["All", ...projectCategories];
  const visible = allItems.filter((p) => filter === "All" || p.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab === filter;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
                active
                  ? "border-accent bg-accent text-bg"
                  : "border-line/50 text-ink-soft hover:border-accent hover:text-accent"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {visible.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {visible.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center font-mono text-sm text-ink-soft">
              Nothing filed under &ldquo;{filter}&rdquo; yet &mdash; check back soon.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}