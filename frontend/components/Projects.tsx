import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { projects } from "@/data/content";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  const featured = projects.slice(0, 2);

  return (
    <section id="work" className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="work" title="Things I've shipped" />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 70} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={140}>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent underline underline-offset-4"
        >
          View all projects <LuArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </section>
  );
}
