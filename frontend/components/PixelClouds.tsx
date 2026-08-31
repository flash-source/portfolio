"use client";

import PixelCloud from "./PixelCloud";

const CLOUDS = [
  { size: 5, top: "6%", duration: 55, delay: 0, className: "text-ink-soft/45" },
  { size: 4, top: "24%", duration: 72, delay: 9, className: "text-ink-soft/30" },
  { size: 6, top: "2%", duration: 64, delay: 22, className: "text-accent/40" },
];

export default function PixelClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className={`absolute animate-drift ${c.className}`}
          style={{
            top: c.top,
            left: "-15%",
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <PixelCloud size={c.size} />
        </div>
      ))}
    </div>
  );
}
