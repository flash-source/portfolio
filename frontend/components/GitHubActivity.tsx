"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { profile } from "@/data/content";

// Two stops per scheme (empty, max) — the library interpolates the
// in-between intensity levels automatically.
const CALENDAR_THEME = {
  light: ["#F7F3EC", "#8A5C04"],
  dark: ["#221F18", "#D9A441"],
};

export default function GitHubActivity() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const colorScheme = mounted && theme === "dark" ? "dark" : "light";

  return (
    <div className="overflow-x-auto pb-1 text-ink-soft">
      <GitHubCalendar
        username={profile.githubUsername}
        colorScheme={colorScheme}
        theme={CALENDAR_THEME}
        blockSize={11}
        blockMargin={4}
        blockRadius={2}
        fontSize={12}
        showColorLegend
        showTotalCount
        errorMessage="Couldn't load GitHub activity right now."
      />
    </div>
  );
}
