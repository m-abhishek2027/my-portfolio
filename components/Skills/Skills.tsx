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
    <section id="skills" className="border-t border-border-subtle py-20 lg:py-28">
      {/* max-w-7xl + px-4 lg:px-10 combined on THIS div (not split with the
          <section>'s own padding) so it renders exactly as wide as the
          navbar's own wrapper (see Navbar.tsx) at every viewport width. */}
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-10">
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
                  className="skill-card group flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface/60 p-4 text-left"
                  style={{ "--tint": tint } as TintStyle}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 animate-skill-float items-center justify-center rounded-xl border motion-reduce:animate-none"
                    style={{
                      borderColor: hexToRgba(tint, 0.35),
                      background: hexToRgba(tint, 0.08),
                      animationDelay: `${idx * 350}ms`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: tint }} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.shortName}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-muted">{item.tagline}</p>
                  </div>
                </div>
              </SkillReveal>
            );
          })}
        </div>

        {isPreview && <ViewMoreButton href={skills.viewMoreHref} label="View All Skills" />}

        {/* Full category breakdown — only on the dedicated /skills page. */}
        {!isPreview && (
          <div className="mt-16 flex flex-col gap-6 text-left sm:mt-20">
            {skills.categories.map((category, catIdx) => {
              const { icon: CategoryIcon } = getSkillIcon(category.icon);
              return (
                <SkillReveal key={category.name} delayMs={Math.min(catIdx, 5) * 70}>
                  <div className="rounded-3xl border border-border-subtle bg-surface/40 p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                        {category.name}
                      </h3>
                      <span className="ml-auto shrink-0 text-xs text-muted">
                        {category.skills.length} skills
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {category.skills.map((skillItem) => {
                        const { icon: Icon, color } = getSkillIcon(skillItem.icon);
                        const tint = color ?? GOLD;
                        return (
                          <div
                            key={skillItem.name}
                            className="skill-chip flex items-center gap-2 rounded-xl border border-border-subtle bg-surface px-3.5 py-2.5"
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
