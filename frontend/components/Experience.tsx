import { LuBriefcase } from "react-icons/lu";
import { experience } from "@/data/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { TechBadge } from "./TechIcon";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-wide px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="experience" title="Where I've worked" />
      </Reveal>
      <div className="max-w-content space-y-12">
        {experience.map((item, i) => (
          <Reveal key={item.org} delay={i * 80}>
            <div className="relative border-l-2 border-line/40 pl-6">
              <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bg">
                <LuBriefcase className="h-3.5 w-3.5 text-accent" />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.org}
                </h3>
                <span className="font-mono text-xs text-ink-soft">{item.period}</span>
              </div>
              <p className="mb-4 font-mono text-sm text-accent">{item.role}</p>
              <ul className="space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-[15px] leading-relaxed text-prose"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <TechBadge key={t} tech={t} size="sm" tone="accent" />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}