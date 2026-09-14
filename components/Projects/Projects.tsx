import LightboxImage from "@/components/LightboxImage";
import ViewMoreButton from "@/components/ViewMoreButton";
import projectsData from "./projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** Cloudinary URL — empty shows a placeholder instead of a broken image. */
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

interface ProjectsJson {
  eyebrow: string;
  title: string;
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
    <section id="projects" className="border-t border-border-subtle py-20 lg:py-28">
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

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface"
            >
              <div className="relative aspect-video w-full bg-surface-elevated">
                {project.image ? (
                  <LightboxImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted">
                    Add a cover image in projects.json
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                <p className="flex-1 text-sm text-muted">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-subtle px-3 py-1 text-xs text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2 text-sm font-semibold">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 transition-colors hover:text-gold"
                    >
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {isPreview && (
          <ViewMoreButton href={projectsJson.viewMoreHref} label="View All Projects" />
        )}
      </div>
    </section>
  );
}
