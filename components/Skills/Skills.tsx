import ViewMoreButton from "@/components/ViewMoreButton";
import SkillReveal from "./SkillReveal";
import { getSkillIcon } from "./skillIcons";
import skillsData from "./skills.json";

interface FeaturedSkill {
  name: string;
  /** Short label on the card itself, e.g. "AEM" instead of the full name. */
  shortName: string;
  /** Key into skillIconMap (see skillIcons.tsx). */
  icon: string;
  tagline: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SkillsJson {
  eyebrow: string;
  title: string;
  /** Only shown in the "full" variant, under the title. */
  subtitle: string;
  viewMoreHref: string;
  /** The 3 headline skills shown on the Home page (see Skills({variant})). */
  featured: FeaturedSkill[];
  categories: SkillCategory[];
}

const skills: SkillsJson = skillsData;

interface SkillsProps {
  /** "preview" (Home page) shows only the 3 featured logo cards + a View
   *  More button. "full" (the dedicated /skills page) shows every category
   *  and every skill in it. */
  variant?: "preview" | "full";
}

// Matches --gold in globals.css — used as the tint for conceptual icons
// that don't have a real brand color (see skillIcons.tsx).
const GOLD = "#d4af37";

/** CSSProperties doesn't type arbitrary custom properties — this lets
 *  `style` also carry the `--tint` variable the .skill-card/.skill-chip
 *  hover rules in globals.css read (each skill's color is only known here,
 *  at render time from skills.json, not at build time). */
type TintStyle = React.CSSProperties & { "--tint": string };

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const value = parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Skills({ variant = "full" }: SkillsProps) {
  const isPreview = variant === "preview";

  return (
    <section
      id="skills"
      // See About.tsx for why the top border is preview-only.
      className={`relative overflow-hidden py-20 lg:py-28 ${isPreview ? "border-t border-border-subtle" : ""}`}
    >
      {/* Ambient background glow — purely decorative, sits behind
          everything (the content wrapper below is `relative` so it still
          paints on top despite coming after this in DOM order). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-72 w-72 translate-y-1/3 rounded-full bg-gold-dark/10 blur-3xl" />
      </div>

      {/* max-w-7xl + px-4 lg:px-10 combined on THIS div (not split with the
          <section>'s own padding) so it renders exactly as wide as the
          navbar's own wrapper (see Navbar.tsx) at every viewport width. */}
      <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-10">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          {skills.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {skills.title}
        </h2>
        {!isPreview && (
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
            {skills.subtitle}
          </p>
        )}

        {/* Featured — the 3 headline skills, always shown. On Home this is
            the whole section; on the full page it's the opener before the
            complete category breakdown below. Compact row: icon left, name
            + tagline right, same line — not a big standalone tile. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {skills.featured.map((item, idx) => {
            const { icon: Icon, color } = getSkillIcon(item.icon);
            const tint = color ?? GOLD;
            return (
              <SkillReveal key={item.name} delayMs={idx * 100}>
                <div
                  className="skill-card group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface/60 p-5 text-left"
                  style={{ "--tint": tint } as TintStyle}
                >
                  {/* HUD corner brackets — same framing motif as the
                      Projects section's placeholder art, tinted to this
                      skill's own brand color instead of gold. */}
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2"
                    style={{ borderColor: hexToRgba(tint, 0.5) }}
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2"
                    style={{ borderColor: hexToRgba(tint, 0.5) }}
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2"
                    style={{ borderColor: hexToRgba(tint, 0.5) }}
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2"
                    style={{ borderColor: hexToRgba(tint, 0.5) }}
                  />

                  <div
                    className="relative flex h-14 w-14 shrink-0 animate-skill-float items-center justify-center rounded-xl border motion-reduce:animate-none"
                    style={{
                      borderColor: hexToRgba(tint, 0.35),
                      background: hexToRgba(tint, 0.1),
                      boxShadow: `0 0 24px -6px ${hexToRgba(tint, 0.45)}`,
                      animationDelay: `${idx * 350}ms`,
                    }}
                  >
                    <Icon className="h-7 w-7" style={{ color: tint }} />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.shortName}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {item.tagline}
                    </p>
                  </div>
                </div>
              </SkillReveal>
            );
          })}
        </div>

        {isPreview && <ViewMoreButton href={skills.viewMoreHref} label="View All Skills" />}

        {/* Full category breakdown — only on the dedicated /skills page.
            CSS columns (not grid) on purpose: categories range from 2
            skills to 11, and a strict 2-column *grid* sizes each ROW to its
            tallest item, leaving a big awkward gap under every short
            category that shares a row with a tall one. Columns instead let
            each column flow independently and self-balance, like a proper
            masonry layout — break-inside-avoid on each panel keeps a
            category from being split across the column break. */}
        {!isPreview && (
          <div className="mt-16 columns-1 gap-6 text-left sm:mt-20 lg:columns-2">
            {skills.categories.map((category, catIdx) => {
              const { icon: CategoryIcon, color: categoryColor } = getSkillIcon(category.icon);
              const categoryTint = categoryColor ?? GOLD;
              return (
                <SkillReveal
                  key={category.name}
                  delayMs={Math.min(catIdx, 5) * 70}
                  className="mb-6 break-inside-avoid"
                >
                  <div
                    className="skill-category rounded-3xl border border-border-subtle bg-surface/40 p-6 sm:p-8"
                    style={{ "--tint": categoryTint } as TintStyle}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: hexToRgba(categoryTint, 0.35),
                          background: hexToRgba(categoryTint, 0.12),
                        }}
                      >
                        <CategoryIcon className="h-5 w-5" style={{ color: categoryTint }} />
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                          Category {String(catIdx + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                          {category.name}
                        </h3>
                      </div>
                      <span className="ml-auto shrink-0 rounded-full border border-border-subtle px-2.5 py-1 font-mono text-[10px] text-muted">
                        {category.skills.length}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {category.skills.map((skillItem) => {
                        const { icon: Icon, color } = getSkillIcon(skillItem.icon);
                        const tint = color ?? GOLD;
                        return (
                          <div
                            key={skillItem.name}
                            className="skill-chip flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-2.5"
                            style={{ "--tint": tint } as TintStyle}
                          >
                            <Icon className="h-4 w-4 shrink-0" style={{ color: tint }} />
                            <span className="text-sm text-foreground/85">{skillItem.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </SkillReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
