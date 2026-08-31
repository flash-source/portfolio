import { LuGithub, LuMail } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { profile, education } from "@/data/content";
import DinoGame from "./DinoGame";
import LiveStatus from "./LiveStatus";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/30">
      <DinoGame />
      <div className="mx-auto max-w-wide px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <p className="font-mono text-sm text-ink-soft">
              Designed &amp; Developed by{" "}
              <span className="font-semibold text-ink">{profile.name}</span>
            </p>
            <p className="font-mono text-xs text-ink-soft/60">&copy; {year} All rights reserved.</p>
            <LiveStatus location={profile.location} timeZone={profile.timeZone} />
          </div>
          <div className="flex gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <LuGithub className="h-4 w-4" />
            </a>
            <a
              href={profile.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <FaXTwitter className="h-3.5 w-3.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <LuMail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}