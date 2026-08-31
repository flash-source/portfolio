"use client";

import { useEffect, useState } from "react";

export default function LiveStatus({
  location,
  timeZone,
}: {
  location: string;
  timeZone: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <p className="flex items-center gap-2 font-mono text-xs text-ink-soft/60">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
      <span>
        {location}
        {time ? <> &middot; {time}</> : null}
      </span>
    </p>
  );
}