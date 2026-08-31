export const profile = {
  name: "Neha Goyal",
  role: "Full-Stack Developer",
  tagline:
    "I build and ship full-stack products end to end — pixel editors with custom colour-quantization engines, real-time systems built from scratch, and whatever a project needs next.",
  location: "Karnal, Haryana, India",
  timeZone: "IST",
  email: "nehagoyal5557@gmail.com",
  github: "https://github.com/flash-source",
  githubUsername: "flash-source",
  x: "https://x.com/Nehagoyal1407",
};

export const proofStats = [
  { value: "Top 10", detail: "of 7,000+ at a national hackathon" },
  { value: "4", detail: "full-stack products shipped solo" },
  { value: "5", detail: "hackathons entered" },
];

export const education = {
  degree: "BTech, Computer Science",
  school: "UIET, Kurukshetra University",
  period: "Expected 2028",
};

export const techStack = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "WebSocket",
  "Git",
];

export type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    org: "Fibe (formerly TalentDash)",
    role: "Software Engineering Intern",
    period: "2026",
    bullets: [
      "Restructured the Next.js routing architecture into (auth)/ and (dashboard)/ route groups for a career-intelligence platform built for Indian tech professionals",
      "Redesigned the auth page with a horizontal CSS marquee and animated salary cards, and built a two-step signup flow with password-strength validation",
      "Built a filterable jobs board feature",
    ],
    tech: ["Next.js", "TypeScript", "CSS"],
  },
];

export type HackathonItem = {
  rank: string;
  name: string;
  event: string;
  period: string;
  result?: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

export const hackathons: HackathonItem[] = [
  {
    rank: "01",
    name: "Prompt Edit",
    event: "The UI Strikes Back — WeMakeDevs × Tambo AI",
    period: "Feb 2026",
    result: "Top 10 of 7,000+",
    description:
      "AI‑assisted image editor that recommends the exact tools, values, and steps you should use — while keeping every edit fully human‑controlled. Powered by Tambo AI and Toast UI, it blends a conversational mentor with real, manual editing controls to create a smooth, guided editing workflow",
    tech: ["React", "TypeScript", "Tailwind CSS", "Generative UI", "Tambo API"],
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/prompt-edit" },
      { label: "Live", href: "https://prompt-edit-studio.vercel.app" },
    ],
  },
  {
    rank: "02",
    name: "LeakLogic AI",
    event: "AMD Developer Hackathon: ACT II — lablab.ai",
    period: "Jul 2026",
    description:
      "AI-powered analysis that identifies hidden profit leaks in your business data. Upload your sales, refunds, supplier, and inventory data to discover where revenue is slipping through the cracks.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/leaklogic-ai" },
      { label: "Live", href: "https://leaklogicai-backend.vercel.app" },
    ],
  },
    {
    rank: "03",
    name: "ScrapeForensics",
    event: " WeMakeDevs Into the Scrape-Verse", 
    period: "Aug 2026", 
    description:
      "Incident response for self-healing web scrapers — detects breakage, diagnoses it, triggers Bright Data's heal, and verifies the fix actually worked. Built for WeMakeDevs Scrape-Verse.",
    tech: ["Bright Data", "Node.js", "TypeScript", "HTML"], // add the rest of your actual stack (Node/Python/etc.)
    links: [{ label: "GitHub", href: "https://github.com/flash-source/ScrapeForensics" }],
  },
  {
    rank: "04",
    name: "Day One",
    event: "AI Factory - Native.builder Hackathon", 
    period: "Aug 2026",
    description:
      "AI-powered startup validator that simulates a C-suite boardroom debate. Six specialized agents (Research, Product, Finance, Legal, Marketing, CEO) analyze, challenge, and refine ideas through adversarial collaboration, delivering comprehensive company dossiers in minutes.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebSocket"],
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/DayOne" },
      { label: "Live", href: "https://ei61x8qbbc82gwybasmag5f1n.nativelyai.app/" },
    ],
  },
  {
    rank: "05",
    name: "AutoFix Swarm",
    event: "OpenAI Build Week",
    period: "Jul 2026",
    description:
      "An autonomous, explainable bug-detection and remediation pipeline — three specialized agents that scan a codebase, patch real issues with Codex, verify the fix against tests, and generate a plain-English explanation a human can trust and merge.",
    tech: ["FastAPI", "Next.js", "Python", "TypeScript", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/autofix-swarm" },
      { label: "Live", href: "https://autofix-awarm.netlify.app/" },
    ],
  },
];

export type ProjectItem = {
  name: string;
  period: string;
  description: string;
  tech: string[];
  category: "Fun Project" | "Game" | "Other";
  links?: { label: string; href: string }[];
};

export const projectCategories: ProjectItem["category"][] = [
  "Fun Project",
  "Game",
  "Other",
];

export const projects: ProjectItem[] = [
  {
    name: "Pixel-it",
    period: "May 2026",
    description:
      "A full-stack pixel art creation platform — draw manually on a live canvas, convert any image into true pixel art with k-means palette reduction (8–32 colours), or build a pixel avatar from 50+ layered sprite options.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "Postgres", "NextAuth"],
    category: "Fun Project",
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/pixel-it" },
      { label: "Live", href: "https://pixel-it-seven.vercel.app" },
    ],
  },
  {
    name: "Vibe Sentinel",
    period: "Apr 2026",
    description:
      "A 10-level turn-based dungeon roguelike where you fight escalating shadow beasts across 10 visually distinct biomes — with endless mode, badges, and a portal that drops you straight into the next Vibe Jam game.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "Postgres", "NextAuth"],
    category: "Game",
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/vibeSentinel" },
      { label: "Live", href: "https://flash-source.github.io/vibeSentinel/" },
    ],
  },

  {
    name: "AppForge",
    period: "May 2026",
    description:
      "a metadata-driven application runtime. The core idea is simple: you define your app as a JSON config, and AppForge generates the frontend UI, backend APIs, database structure, and workflow logic — automatically.",
    tech: ["Next.js 14", "Prisma", "NextAuth", "Gemini AI"],
    category: "Other",
    links: [
      { label: "GitHub", href: "https://github.com/flash-source/Appforge" },
      { label: "Live", href: "https://app-forge-blue.vercel.app" },
    ],
  },
  {
    name: "Brainly",
    period: "Apr 2026",
    description:
      "A second-brain knowledge management platform — store, tag, and share links, tweets, and other content with persistent history and real-time collaboration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Express", "JWT"],
    category: "Other",
    links: [{ label: "GitHub", href: "https://github.com/flash-source/brainly" }],
  },
  {
    name: "Chat Room",
    period: "Feb 2026",
    description:
      "A real-time chat room app built to learn WebSockets from scratch — multiple users across separate browser sessions join and message within the same room via a shared room ID.",
    tech: ["TypeScript", "Node.js", "WebSocket"],
    category: "Fun Project",
    links: [{ label: "GitHub", href: "https://github.com/flash-source/chat-room" }],
  },
];

export const achievements = [
  "Selected among top participants for the Solana Fellowship Program conducted by Superdev India",
];
