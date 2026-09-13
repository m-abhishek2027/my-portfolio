"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CloseIcon, ZoomIcon } from "./icons";

interface LightboxImageProps {
  src: string;
  alt: string;
  /** Pass through to next/image. Use "fill" mode with a sized, positioned
   *  parent (same as you would for a plain next/image fill usage). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** Classes for the inline image (aspect handling, filters, etc.). */
  className?: string;
  /** Classes for the enlarged image shown inside the popup. */
  popupClassName?: string;
}

/**
 * Drop-in replacement for next/image: renders the image exactly the same,
 * but clicking it opens a simple, rounded-corner popup with a bigger view
 * of the same image. Every image on the site should go through this
 * (instead of importing next/image directly) so "click to view larger"
 * behaves identically everywhere — see data/README.md.
 *
 * Uses a <span role="button"> (not a real <button>) as the click target so
 * this stays valid even when the image itself sits inside a link (e.g. a
 * company/education card) — nesting a <button> inside an <a> is invalid
 * HTML, a span with a button role isn't.
 */
export default function LightboxImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  popupClassName,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openLightbox = (event: { stopPropagation: () => void; preventDefault: () => void }) => {
    // Stops a click from also triggering a parent link/card (e.g. a
    // company card that links to its website) — this should only zoom.
    event.stopPropagation();
    event.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        aria-label={`View larger: ${alt}`}
        onClick={openLightbox}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") openLightbox(event);
        }}
        className={`group cursor-zoom-in ${fill ? "absolute inset-0 block" : "inline-block"}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          sizes={sizes}
          priority={priority}
          className={className}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-200 group-hover:bg-background/40 group-hover:opacity-100"
        >
          <ZoomIcon className="h-6 w-6 text-gold drop-shadow" />
        </span>
      </span>

      {open &&
        createPortal(
          // Rendered straight into <body> (not in place, next to the
          // trigger) on purpose: a hoverable ancestor card (e.g. one with
          // hover:-translate-y-0.5) applies a CSS translate/transform while
          // hovered, and any element with a transform becomes the
          // "containing block" for its position:fixed descendants instead
          // of the viewport. Left in place, this popup would open
          // positioned/sized relative to that small card instead of the
          // screen, and flicker as hovering the popup covers the card,
          // toggling its hover (and therefore its transform, and therefore
          // this popup's containing block) on and off. Portaling to <body>
          // sidesteps every ancestor's transform/overflow entirely, so this
          // always centers on the real viewport no matter where it's used.
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-background/80 text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element -- the
                enlarged view needs a plain <img> since the source may be any
                size and next/image requires known dimensions or fill. */}
            <img
              src={src}
              alt={alt}
              onClick={(event) => event.stopPropagation()}
              className={`max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ${popupClassName ?? ""}`}
            />
          </div>,
          document.body
        )}
    </>
  );
}
