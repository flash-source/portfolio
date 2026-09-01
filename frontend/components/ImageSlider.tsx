"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo, type Variants } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const variants: Variants = {
  enter: (direction: number) => ({ x: direction >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? "-100%" : "100%", opacity: 0 }),
};

/**
 * Image carousel for project/hackathon cards. Pass images in the order you
 * want them shown — e.g. [landingPage, functionalScreenshot]. Renders a
 * single static image with no controls when there's only one.
 */
export default function ImageSlider({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  if (!images || images.length === 0) return null;

  const go = (next: number) => {
    const wrapped = (next + images.length) % images.length;
    setSlide([wrapped, next > index ? 1 : -1]);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(index + 1);
    else if (info.offset.x > 60) go(index - 1);
  };

  return (
    <div
      className="group/slider relative aspect-video w-full select-none overflow-hidden bg-line/10"
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          drag={images.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${alt} — screenshot ${index + 1} of ${images.length}`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/slider:scale-105"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line/40 bg-bg/80 text-ink opacity-0 backdrop-blur transition-opacity duration-200 hover:border-accent hover:text-accent group-hover/slider:opacity-100"
          >
            <LuChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line/40 bg-bg/80 text-ink opacity-0 backdrop-blur transition-opacity duration-200 hover:border-accent hover:text-accent group-hover/slider:opacity-100"
          >
            <LuChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                onClick={(e) => {
                  e.stopPropagation();
                  go(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-bg/70 hover:bg-accent/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}