"use client";

import dynamic from "next/dynamic";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const GitHubActivity = dynamic(() => import("./GitHubActivity"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] w-full animate-pulse rounded-md bg-card-alt/60" />
  ),
});

export default function GitHubActivitySection() {
  return (
    <section className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="activity" title="What I've been up to" />
        <GitHubActivity />
      </Reveal>
    </section>
  );
}