"use client";

import { useEffect, useState } from "react";
import LightboxImage from "@/components/LightboxImage";
import { ChevronIcon } from "@/components/icons";
import ProjectImagePlaceholder from "./ProjectImagePlaceholder";
import type { ProjectImage } from "./ProjectCard";

interface ImageSliderProps {
  images: ProjectImage[];
  /** Resets back to the first slide whenever this changes (pass the id of
   *  the project currently shown — a new id means a brand new gallery). */
  resetKey: string;
}

/** How long each slide stays up before auto-advancing. */
const AUTOPLAY_MS = 4500;

export default function ImageSlider({ images, resetKey }: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Reset in the cleanup (fires right as resetKey is about to change),
    // not the effect body itself — setState directly in an effect body
    // triggers React's cascading-render warning.
    return () => setIndex(0);
  }, [resetKey]);

  // Auto-advance — paused on hover, and restarted (not just continued) on
  // every index change so a manual click doesn't get followed by a
  // surprise auto-advance a moment later.
  useEffect(() => {
    if (paused || images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, images.length, index]);

  // Left/right arrow keys — safe to own this globally since the slider only
  // ever exists while its parent modal is open.
  useEffect(() => {
    if (images.length <= 1) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length]);

  if (images.length === 0) {
    return <ProjectImagePlaceholder label="Preview" />;
  }

  const goTo = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div
      className="group/slider relative h-full w-full overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, i) => (
        <div
          key={`${image.alt}-${i}`}
          className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {image.url ? (
            <LightboxImage
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          ) : (
            <ProjectImagePlaceholder label={image.label} />
          )}
        </div>
      ))}

      {/* HUD-style slide counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full border border-gold/30 bg-background/60 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-gold/80 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-background/60 text-foreground/80 opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-gold/50 hover:text-gold group-hover/slider:opacity-100"
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-background/60 text-foreground/80 opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-gold/50 hover:text-gold group-hover/slider:opacity-100"
          >
            <ChevronIcon className="h-4 w-4" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <button
                key={`dot-${image.alt}-${i}`}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
