"use client";

import { useLenis } from "./SmoothScroll";

export default function AnchorLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const lenis = useLenis();
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : null;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.();
        if (!hash) return; 
        const target = document.querySelector(hash);
        if (!target) return; 
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