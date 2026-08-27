"use client";

import { useLenis } from "./SmoothScroll";

export default function AnchorLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const lenis = useLenis();
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : null;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!hash) return; // plain page link, let Next.js/browser handle it
        const target = document.querySelector(hash);
        if (!target) return; // not on this page — let the browser navigate there
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </a>
  );
}
