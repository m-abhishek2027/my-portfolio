"use client";

import { ArrowRightIcon, GridIcon } from "@/components/icons";
import LightboxImage from "@/components/LightboxImage";
import ProjectImagePlaceholder from "./ProjectImagePlaceholder";

export interface ProjectImage {
  url: string;
  alt: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  current: boolean;
  summary: string;
  description: string;
  tags: string[];
  responsibilities: string[];
  images: ProjectImage[];
}

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

/** Tags shown on the card itself before folding the rest into a "+N" chip —
 *  the full list always still shows in the details modal (see ProjectDetails). */
const CARD_TAG_LIMIT = 3;

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cover = project.images[0];
  const visibleTags = project.tags.slice(0, CARD_TAG_LIMIT);
  const hiddenTagCount = project.tags.length - visibleTags.length;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_45px_-20px_rgba(212,175,55,0.35)]"
    >
      {/* Layered "photo stack" preview — two plain offset/rotated cards
          behind the real cover image hint that a full gallery lives behind
          it, without needing slider controls of their own (the interactive
          slider only lives in the details modal). Fans out a bit further
          on hover for a little extra depth/life. */}
      <div className="relative aspect-[4/3] w-full p-5">
        <div
          aria-hidden
          className="absolute inset-5 rotate-6 rounded-xl border border-gold/20 bg-gradient-to-br from-surface-elevated to-surface transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[13deg]"
        />
        <div
          aria-hidden
          className="absolute inset-5 -rotate-3 rounded-xl border border-gold/15 bg-gradient-to-br from-surface to-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[9deg]"
        />

        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gold/30 shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
          {cover?.url ? (
            <LightboxImage
              src={cover.url}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProjectImagePlaceholder label={cover?.label ?? project.title} />
          )}

          {project.images.length > 1 && (
            <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-background/70 px-2.5 py-1 font-mono text-[10px] text-gold/80 backdrop-blur-sm">
              <GridIcon className="h-3 w-3" />
              {project.images.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{project.duration}</span>
          {project.current && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Current
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-gold">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-gold/80">{project.role}</p>
        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {visibleTags.map((tag) => (
            <span key={tag} className="rounded-full border border-border-subtle px-3 py-1 text-xs text-foreground/80">
              {tag}
            </span>
          ))}
          {hiddenTagCount > 0 && (
            <span className="rounded-full border border-border-subtle px-3 py-1 text-xs text-muted">
              +{hiddenTagCount}
            </span>
          )}
        </div>

        {/* mt-auto pins this to the card's bottom edge regardless of how
            much summary/tag content precedes it, so the CTA lines up across
            a row even though summaries and tag counts vary in length — the
            card itself is already forced to equal height via h-full above
            (grid rows stretch every card to the tallest one in the row). */}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-gold">
          View Case Study
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
