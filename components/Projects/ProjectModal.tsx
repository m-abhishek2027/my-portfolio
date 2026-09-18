"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons";
import ImageSlider from "./ImageSlider";
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
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-border-subtle bg-gradient-to-br from-surface-elevated/95 to-background/95 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-gold"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/9] w-full shrink-0 border-b border-border-subtle">
          <ImageSlider images={project.images} resetKey={project.id} />
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{project.duration}</span>
            {project.current && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Currently working
              </span>
            )}
          </div>

          <h3 id="project-modal-title" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-gold">{project.role}</p>

          <p className="mt-5 text-sm leading-relaxed text-foreground/80">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
                {tag}
              </span>
            ))}
          </div>

          <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Key Contributions</h4>
          <ul className="mt-4 space-y-3">
            {project.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}
