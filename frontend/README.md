# neha.dev — portfolio v4

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Framer Motion for
animation, Lenis for smooth scroll, next-themes for light/dark, react-icons
for icons, gray-matter + remark for the blog, react-github-calendar for
GitHub activity.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. First build needs internet access (fonts from
Google Fonts, GitHub activity data fetched client-side).

## Deploy

Push to GitHub, import into Vercel — same flow as your other projects.

## Pages

- `/` — hero (ASCII portrait, drifting pixel clouds), tech stack, GitHub
  activity, featured projects, hackathons, experience
- `/projects` — every project, filterable by category (All / Fun Project /
  Game / Other)
- `/blog` — post listing
- `/blog/[slug]` — individual post, rendered from Markdown

## Editing content

- **Site copy**: `data/content.ts` — stats, experience, hackathons,
  projects (each has a `category` for the `/projects` tabs), tech stack,
  links, `githubUsername`.
- **Blog posts**: add a `.md` file to `content/blog/` with `title`, `date`,
  `excerpt` frontmatter. Delete `hello-world.md` once you have real posts.

## What's new in v4

- **Pixel clouds** (`components/PixelCloud.tsx`, `PixelClouds.tsx`) — three
  blocky 8-bit clouds drifting slowly across the hero background at
  different speeds, low-opacity so they stay atmospheric.
- **Pixel grass + cacti ground strip** (`components/PixelGrassDivider.tsx`,
  `PixelCactus.tsx`) — an infinitely-tiling SVG grass pattern with two
  cacti riding on top, sitting at the top of the Footer so it shows on
  every page, not just home. The cacti are the deliberate dino-runner
  callback.
- **GitHub contribution calendar** — real activity graph for
  flash-source, themed to your palette (empty squares use your card
  color, filled squares scale up through the accent gold), swaps with
  light/dark automatically. Shows a graceful fallback message if the
  fetch fails instead of breaking the page.

## Known gaps (still on purpose)

- No LinkedIn link — add it in `data/content.ts` once you have the URL.
- Exact dates for the Fibe internship and Chat Room project are
  approximate ("2026") — tighten in `data/content.ts` if you want
  precision.
- No project screenshots yet — cards are text-only.
- Only one blog post (the starter/example one).
- No "Game" category projects yet — tab works, just empty until you add one.

## Ideas for v5

- Project screenshots / OG images
- Tags or search on `/blog`
- RSS feed for the blog
