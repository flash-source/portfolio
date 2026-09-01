import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiGooglegemini,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
  SiDocker,
  SiPython,
  SiGit,
  SiCss,
} from "react-icons/si";
import { LuKeyRound, LuZap } from "react-icons/lu";
import type { IconType } from "react-icons";

// Shared by ProjectCard and Experience so the tech → logo mapping only
// lives in one place. Matched by exact string, so keep this in sync with
// however tech names are spelled in data/content.ts. Anything not listed
// here still renders fine — TechBadge falls back to a small text pill —
// so a missing mapping never silently drops a technology from the list.
export const TECH_ICON: Record<string, IconType> = {
  "Next.js 14": SiNextdotjs,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  CSS: SiCss,
  Prisma: SiPrisma,
  Postgres: SiPostgresql,
  PostgreSQL: SiPostgresql,
  NextAuth: LuKeyRound,
  "Gemini AI": SiGooglegemini,
  React: SiReact,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  JWT: SiJsonwebtokens,
  WebSocket: LuZap,
  Docker: SiDocker,
  Python: SiPython,
  Git: SiGit,
};

export function TechBadge({
  tech,
  size = "md",
  tone = "muted",
}: {
  tech: string;
  size?: "sm" | "md";
  tone?: "muted" | "accent";
}) {
  const Icon = TECH_ICON[tech];
  const box = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  if (!Icon) {
    return (
      <span className="flex items-center rounded-lg border border-line/30 bg-bg/40 px-2 py-1 font-mono text-[11px] text-ink-soft">
        {tech}
      </span>
    );
  }

  const iconColor =
    tone === "accent" ? "text-accent" : "text-ink-soft transition-colors group-hover:text-accent";

  return (
    <span className="group/tech relative inline-flex">
      <span
        aria-label={tech}
        className={`flex ${box} items-center justify-center rounded-lg border border-line/30 bg-bg/40 ${iconColor}`}
      >
        <Icon aria-hidden="true" className={iconSize} />
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-line/40 bg-card px-2 py-1 font-mono text-[11px] text-ink opacity-0 shadow-[0_8px_20px_-8px_rgb(var(--ink)/0.3)] transition-all duration-150 ease-out group-hover/tech:translate-y-0 group-hover/tech:opacity-100"
      >
        {tech}
      </span>
    </span>
  );
}