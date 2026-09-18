import type { Project } from "./ProjectCard";

interface ProjectDetailsProps {
  project: Project;
}

/**
 * The text half of the details modal (see ProjectModal.tsx) — split out on
 * its own so that file only has to worry about the dialog shell/layout,
 * not the content. Always shows the FULL description, every tag and every
 * responsibility (the card in the grid is what truncates — see
 * ProjectCard.tsx's CARD_TAG_LIMIT/line-clamp).
 */
export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
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

      <p className="mt-6 text-sm leading-relaxed text-foreground/80">{project.description}</p>

      <div className="mt-8 border-t border-border-subtle pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Tech Stack</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-border-subtle pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Key Contributions</h4>
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
  );
}
