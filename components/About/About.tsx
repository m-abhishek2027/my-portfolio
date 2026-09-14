import LightboxImage from "@/components/LightboxImage";
import ViewMoreButton from "@/components/ViewMoreButton";
import { GraduationCapIcon } from "@/components/icons";
import aboutData from "./about.json";

interface Highlight {
  label: string;
  value: string;
}

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  /** e.g. "8.4 CGPA" or "92%" — optional. */
  grade: string;
  logo: { url: string; alt: string };
  /** Institution site/profile — card links here when set. */
  url: string;
}

interface AboutJson {
  eyebrow: string;
  title: string;
  summary: string;
  /** One paragraph per entry — only shown in "full" variant. */
  fullBio: string[];
  highlights: Highlight[];
  /** Chronological (oldest first: school → college) — only shown in "full" variant. */
  education: EducationEntry[];
  viewMoreHref: string;
}

const about: AboutJson = aboutData;

interface AboutProps {
  /** "preview" (Home page) shows the short summary + highlights + a View
   *  More button. "full" (the dedicated /about page) also shows the full
   *  bio and the education timeline. */
  variant?: "preview" | "full";
}

export default function About({ variant = "full" }: AboutProps) {
  const isPreview = variant === "preview";

  return (
    <section id="about" className="border-t border-border-subtle py-20 lg:py-28">
      {/* max-w-7xl + px-4 lg:px-10 combined on THIS div (not split with the
          <section>'s own padding) so it renders exactly as wide as the
          navbar's own wrapper (see Navbar.tsx) at every viewport width. */}
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-10">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          {about.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {about.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted">{about.summary}</p>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 lg:px-10">
        {!isPreview && (
          <div className="mx-auto max-w-3xl text-left">
            {about.fullBio.map((paragraph, idx) => (
              <p key={idx} className="mt-4 text-muted first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {about.highlights.length > 0 && (
          <div
            className={`mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 ${
              isPreview ? "" : "mt-12"
            }`}
          >
            {about.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-gold/15 px-4 py-5 text-center"
              >
                <div className="font-display text-2xl font-semibold text-gold">
                  {highlight.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {highlight.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {isPreview && (
          <div className="text-center">
            <ViewMoreButton href={about.viewMoreHref} label="More About Me" />
          </div>
        )}

        {/* Education — a vertical timeline, oldest first (school → college). */}
        {!isPreview && about.education.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h3 className="flex items-center justify-center gap-2 text-center font-display text-2xl font-semibold sm:justify-start sm:text-left">
              <GraduationCapIcon className="h-6 w-6 text-gold" />
              Education
            </h3>

            <div className="relative mt-10">
              <div
                aria-hidden
                className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-border-subtle to-transparent sm:left-[27px]"
              />

              <div className="flex flex-col gap-8">
                {about.education.map((edu) => {
                  const CardTag = edu.url ? "a" : "div";
                  return (
                    <div key={edu.id} className="relative pl-14 sm:pl-16">
                      <span
                        aria-hidden
                        className="absolute left-[15px] top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold bg-background sm:left-[19px]"
                      />

                      <CardTag
                        {...(edu.url
                          ? {
                              href: edu.url,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                        className={`group flex items-start gap-4 rounded-2xl border border-gold/15 p-5 text-left transition-all duration-200 ${
                          edu.url
                            ? "hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/5 hover:shadow-[0_10px_25px_-15px_rgba(212,175,55,0.5)]"
                            : ""
                        }`}
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gold/30 bg-background">
                          {edu.logo.url ? (
                            <LightboxImage
                              src={edu.logo.url}
                              alt={edu.logo.alt}
                              fill
                              sizes="48px"
                              className="object-scale-down"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gold/50">
                              <GraduationCapIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h4 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
                              {edu.institution}
                            </h4>
                            <span className="text-xs uppercase tracking-wide text-muted">
                              {edu.duration}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gold">{edu.degree}</p>
                          <p className="mt-1 text-xs text-muted">
                            {edu.location}
                            {edu.grade && <> · {edu.grade}</>}
                          </p>
                        </div>
                      </CardTag>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
