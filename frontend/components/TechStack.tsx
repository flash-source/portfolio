import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { LuZap } from "react-icons/lu";
import type { IconType } from "react-icons";
import { techStack } from "@/data/content";
import Reveal from "./Reveal";

const ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Prisma: SiPrisma,
  Docker: SiDocker,
  WebSocket: LuZap,
  Git: SiGit,
};

function Track() {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {techStack.map((tech) => {
        const Icon = ICONS[tech];
        return (
          <li
            key={tech}
            className="flex items-center gap-2.5 font-mono text-sm text-ink-soft"
          >
            {Icon && <Icon className="h-4 w-4 text-accent" />}
            {tech}
          </li>
        );
      })}
    </ul>
  );
}

export default function TechStack() {
  return (
    <Reveal>
      <section className="border-y border-line/30 bg-card/50 py-7">
        <p className="mx-auto mb-4 max-w-wide px-6 font-mono text-xs uppercase tracking-wider text-ink-soft">
          Tools I reach for
        </p>
        <div
          className="marquee-track overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee">
            <Track />
            <Track />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
