import ViewMoreButton from "@/components/ViewMoreButton";
import experienceData from "./experience.json";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  current: boolean;
}

interface ExperienceJson {
  eyebrow: string;
  title: string;
  viewMoreHref: string;
  items: ExperienceItem[];
}

const experienceJson: ExperienceJson = experienceData;

interface ExperienceProps {
  /** "preview" (Home page) shows the most recent role(s) + a View More button.
   *  "full" (the dedicated /experience page) shows the whole timeline. */
  variant?: "preview" | "full";
}

const PREVIEW_LIMIT = 2;

export default function Experience({ variant = "full" }: ExperienceProps) {
  const isPreview = variant === "preview";
  const items = isPreview
    ? experienceJson.items.slice(0, PREVIEW_LIMIT)
    : experienceJson.items;

  return (
    <section id="experience" className="border-t border-border-subtle py-20 lg:py-28">
      {/* max-w-7xl + px-4 lg:px-10 combined on THIS div (not split with the
          <section>'s own padding) so it renders exactly as wide as the
          navbar's own wrapper (see Navbar.tsx) at every viewport width. */}
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-10">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          {experienceJson.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {experienceJson.title}
        </h2>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6 text-left">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border-subtle bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">
                  {item.role} <span className="text-gold">· {item.company}</span>
                </h3>
                <span className="text-xs uppercase tracking-wide text-muted">
                  {item.duration}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        {isPreview && (
          <ViewMoreButton href={experienceJson.viewMoreHref} label="View Full Experience" />
        )}
      </div>
    </section>
  );
}
