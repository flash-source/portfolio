export const profile = {
  name: "Neha Goyal",
  role: "Full-Stack Developer",
  tagline:
    "I build and ship full-stack products end to end — pixel editors with custom colour-quantization engines, real-time systems built from scratch, and whatever a project needs next.",
  location: "Karnal, Haryana, India",
  email: "nehagoyal5557@gmail.com",
  github: "https://github.com/flash-source",
  githubUsername: "flash-source",
  x: "https://x.com/Nehagoyal1407",
};

export const proofStats = [
  { value: "Top 10", detail: "of 7,000+ at a national hackathon" },
  { value: "4", detail: "full-stack products shipped solo" },
  { value: "3", detail: "hackathons entered" },
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
    period: "Jan 2026",
    result: "Top 10 of 7,000+",
    description:
      "An AI-assisted image editor that recommends the exact tools, values, and steps to use next — keeping every edit fully human-controlled via Tambo AI and Toast UI.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Generative UI", "Tambo API"],
    links: [{ label: "GitHub", href: "https://github.com/flash-source" }],
  },
  {
    rank: "02",
    name: "LeakLogic AI",
    event: "AMD Developer Hackathon: ACT II — lablab.ai",
    period: "Jul 2026",
    description:
      "Joined a team mid-hackathon to build a profit-leak detection tool for small businesses; shipped Next.js/TypeScript frontend fixes across chart accuracy and layout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    rank: "03",
    name: "Smart Civica",
    event: "Smart India Hackathon 2025",
    period: "2025",
    result: "State-level qualifier",
    description:
      "An AI-powered civic issue reporting platform — citizens report issues with images and location, auto-classified across 10+ categories via CNN with spam/fraud detection.",
    tech: ["React", "Node.js", "MongoDB", "TensorFlow"],
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
    period: "Feb 2026",
    description:
      "A full-stack pixel art creation platform — draw manually on a live canvas, convert any image into true pixel art with k-means palette reduction (8–32 colours), or build a pixel avatar from 50+ layered sprite options.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "Postgres", "NextAuth"],
    category: "Fun Project",
    links: [
      { label: "GitHub", href: "https://github.com/flash-source" },
      { label: "Live", href: "https://pixel-it-seven.vercel.app" },
    ],
  },
  {
    name: "AppForge",
    period: "2026",
    description:
      "A metadata-driven app runtime — turns JSON config into a working application: generated UI, backend APIs, database schema, and workflow logic.",
    tech: ["Next.js 14", "Prisma", "NextAuth", "Gemini AI"],
    category: "Other",
    links: [
      { label: "GitHub", href: "https://github.com/flash-source" },
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
    links: [{ label: "GitHub", href: "https://github.com/flash-source" }],
  },
  {
    name: "Chat Room",
    period: "2026",
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
