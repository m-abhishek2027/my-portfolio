import ViewMoreButton from "@/components/ViewMoreButton";
import ProjectGrid from "./ProjectGrid";
import projectsData from "./projects.json";
import type { Project } from "./ProjectCard";

interface ProjectsJson {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewMoreHref: string;
  items: Project[];
}

const projectsJson: ProjectsJson = projectsData;

interface ProjectsProps {
  /** "preview" (Home page) shows a few cards + a View More button.
   *  "full" (the dedicated /projects page) shows every project. */
  variant?: "preview" | "full";
}

const PREVIEW_LIMIT = 3;

export default function Projects({ variant = "full" }: ProjectsProps) {
  const isPreview = variant === "preview";
  const items = isPreview ? projectsJson.items.slice(0, PREVIEW_LIMIT) : projectsJson.items;

  return (
    <section
      id="projects"
      // See About.tsx for why the top border is preview-only.
      className={`py-20 lg:py-28 ${isPreview ? "border-t border-border-subtle" : ""}`}
    >
      {/* max-w-7xl + px-4 lg:px-10 combined on THIS div (not split with the
          <section>'s own padding) so it renders exactly as wide as the
          navbar's own wrapper (see Navbar.tsx) at every viewport width. */}
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-10">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          {projectsJson.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {projectsJson.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted sm:text-base">
          {projectsJson.subtitle}
        </p>

        <ProjectGrid items={items} />

        {isPreview && (
          <ViewMoreButton href={projectsJson.viewMoreHref} label="View All Projects" />
        )}
      </div>
    </section>
  );
}
