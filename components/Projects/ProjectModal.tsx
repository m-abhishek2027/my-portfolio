"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import ImageSlider from "./ImageSlider";
import ProjectDetails from "./ProjectDetails";
import type { Project } from "./ProjectCard";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Portaled to <body> — same reasoning as LightboxImage: this always
  // centers on the real viewport regardless of any hover-transformed
  // ancestor. z-[90] (not [100]) so a LightboxImage popup opened from a
  // slide inside this modal still layers correctly above it.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
    >
      {/* max-w-7xl matches every other section's content width (Navbar's
          expanded pill, HeroBanner, Footer) instead of a small narrow
          dialog. Gallery and details are two distinct panels side by side
          from lg: up (only the details half scrolls — the gallery stays
          put) instead of one long column where the text runs straight into
          the slider; below lg there's no room for two columns, so they
          stack, gallery on top. */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-gradient-to-br from-surface-elevated/95 to-background/95 shadow-2xl lg:h-[85vh] lg:max-h-[85vh] lg:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-gold"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/9] w-full shrink-0 border-b border-border-subtle lg:aspect-auto lg:h-full lg:w-1/2 lg:border-b-0 lg:border-r">
          <ImageSlider images={project.images} resetKey={project.id} />
        </div>

        {/* min-h-0 is load-bearing: without it a flex item's implicit
            min-height defaults to its content size, which would ignore the
            parent's height cap and grow instead of scrolling. */}
        <div className="min-h-0 flex-1 overflow-y-auto lg:h-full">
          <ProjectDetails project={project} />
        </div>
      </div>
    </div>,
    document.body
  );
}
