"use client";

import { useEffect, useRef, useState } from "react";

// Module-level cache so re-mounts (theme toggle, route back) skip reprocessing
const memoryCache: Record<number, RawParticle[]> = {};

type RawParticle = { x: number; y: number; char: string; alpha: number };
type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  fontSize: number;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
  shimmer: number;
};

const calculateSize = (containerWidth: number) => {
  if (containerWidth <= 280) return Math.max(160, containerWidth);
  return Math.min(320, containerWidth);
};

const CHARS = " .:-=+*#%@".split("");

function readPortraitColor() {
  if (typeof window === "undefined") return "138,92,4";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--portrait-accent")
    .trim();
  return raw ? raw.replace(/\s+/g, ",") : "138,92,4";
}

export default function AsciiPortrait({
  src = "/avatar.jpg",
  containerSize = 300,
}: {
  src?: string;
  containerSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const mouseTargetRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const accentRef = useRef("138,92,4");
  const isDarkRef = useRef(false);
  const [size] = useState(() => calculateSize(containerSize));
  const [dataReady, setDataReady] = useState(false);

  // track theme so the ASCII colour follows light/dark without a remount
  useEffect(() => {
    const sync = () => {
      accentRef.current = readPortraitColor();
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const createParticlesFromRaw = (raw: RawParticle[], isMobileSize: boolean) => {
    const fontSize = isMobileSize ? 5 : 7;
    return raw.map((p) => ({
      x: p.x + (Math.random() - 0.5) * 400,
      y: p.y + (Math.random() - 0.5) * 400,
      targetX: p.x,
      targetY: p.y,
      vx: 0,
      vy: 0,
      char: p.char,
      fontSize,
      baseAlpha: p.alpha,
      currentAlpha: 0,
      delay: Math.random() * 0.4,
      shimmer: Math.random() * Math.PI * 2,
    }));
  };

  // Our source is an opaque JPEG (no alpha channel), so instead of using
  // transparency to isolate the subject (like a cutout PNG would), we
  // sample the corner as the background colour and skip pixels close to
  // it — same isolated-subject effect, adapted for a flat photo.
  const processImage = (img: HTMLImageElement, targetSize: number) => {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true })!;
    offscreen.width = targetSize;
    offscreen.height = targetSize;
    offCtx.drawImage(img, 0, 0, targetSize, targetSize);
    const { data: pixels } = offCtx.getImageData(0, 0, targetSize, targetSize);

    const bgIndex = 0;
    const bg = [pixels[bgIndex], pixels[bgIndex + 1], pixels[bgIndex + 2]];
    const bgThreshold = 42;

    const isMobileSize = targetSize <= 280;
    const fontSize = isMobileSize ? 5 : 7;
    const colGap = fontSize * 0.7;
    const rowGap = fontSize * 1.1;

    const raw: RawParticle[] = [];
    for (let y = 0; y < targetSize; y += rowGap) {
      for (let x = 0; x < targetSize; x += colGap) {
        const i = (Math.floor(y) * targetSize + Math.floor(x)) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const distFromBg = Math.sqrt(
          (r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2
        );
        if (distFromBg > bgThreshold) {
          const brightness = 1 - (r + g + b) / (3 * 255); // invert: dark = dense char
          const charIndex = Math.min(
            CHARS.length - 1,
            Math.floor(brightness * (CHARS.length - 1))
          );
          raw.push({
            x: Number(x.toFixed(1)),
            y: Number(y.toFixed(1)),
            char: CHARS[charIndex],
            alpha: Number((0.5 + brightness * 0.5).toFixed(2)),
          });
        }
      }
    }
    return raw;
  };

  useEffect(() => {
    const isMobileSize = size <= 280;

    if (memoryCache[size]) {
      particlesRef.current = createParticlesFromRaw(memoryCache[size], isMobileSize);
      setDataReady(true);
      startTimeRef.current = performance.now();
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const raw = processImage(img, size);
      memoryCache[size] = raw;
      particlesRef.current = createParticlesFromRaw(raw, isMobileSize);
      setDataReady(true);
      startTimeRef.current = performance.now();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let animationId: number;
    const isMobileSize = size <= 280;
    const fontSize = isMobileSize ? 5 : 7;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, size, size);
      if (!dataReady || !particlesRef.current.length || startTimeRef.current === null)
        return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseTarget = mouseTargetRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      mouse.x += (mouseTarget.x - mouse.x) * 0.15;
      mouse.y += (mouseTarget.y - mouse.y) * 0.15;

      ctx.font = `${fontSize}px var(--font-mono), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const accent = accentRef.current;

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay;
        if (particleTime < 0) return;

        const fadeProgress = Math.min(particleTime / 1.5, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);

        const isActive = mouse.active || particleTime < 3.0;
        const shimmerVal = isActive ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0;
        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

        const moveProgress = Math.min(particleTime / 2.5, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = size * 0.2;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const pullStrength = 0.01 + easedMove * 0.08;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;

        if (isActive) {
          const breathX = Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15;
          const breathY = Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15;
          p.vx += breathX;
          p.vy += breathY;
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else {
          p.vx *= 0.85;
          p.vy *= 0.85;
          if (particleTime > 4.0 && Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.vx = 0;
            p.vy = 0;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        let alpha = p.currentAlpha;
        if (isDarkRef.current) {
          // A light, saturated ink glows almost uniformly against near-black
          // at these alpha levels, so structural strokes (glasses, features)
          // stop reading as distinct from the softer background texture.
          // Raising alpha to a power >1 leaves strong strokes nearly intact
          // while pushing faint ones further down, restoring that contrast.
          alpha = Math.pow(Math.max(0, Math.min(1, alpha)), 1.6);
        }
        ctx.fillStyle = `rgba(${accent},${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseTargetRef.current.x = e.clientX - rect.left;
      mouseTargetRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseTargetRef.current.x = touch.clientX - rect.left;
      mouseTargetRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
      if (e.cancelable) e.preventDefault();
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
      mouseTargetRef.current.x = -1000;
      mouseTargetRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size, dataReady]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
        touchAction: "none",
      }}
      aria-label="Interactive ASCII-art portrait of Neha — move your mouse over it"
      role="img"
    />
  );
}