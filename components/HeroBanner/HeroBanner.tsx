import Link from "next/link";
import LightboxImage from "@/components/LightboxImage";
import heroData from "./hero.json";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  LocationIcon,
  UserIcon,
} from "@/components/icons";

/**
 * Shapes of hero.json — kept in this file so the component + its data stay
 * self-contained in this one folder.
 */
interface HeroLink {
  label: string;
  href: string;
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroCompany {
  logo: { url: string; alt: string };
  name: string;
  /** True for the role you're in right now — shows a small "Current" badge. */
  current?: boolean;
  duration: string;
  /** e.g. "3+ years" — shown next to duration, LinkedIn-style. */
  experience?: string;
  location: string;
  /** Company/profile URL — card links here (opens in a new tab). Empty = card just isn't a link. */
  url: string;
}

interface HeroJson {
  eyebrow: string;
  firstName: string;
  lastName: string;
  location: string;
  /** One card per company (current one first) — shown to the right of the name. */
  companies?: HeroCompany[];
  /** Shown as one plain, pipe-separated line under the name (LinkedIn-style headline) — not a badge. */
  roles: string[];
  description: string;
  primaryButton: HeroLink;
  secondaryButton: HeroLink;
  stats: HeroStat[];
  bannerImage: { url: string; alt: string };
  photo: { url: string; alt: string };
}

const hero: HeroJson = heroData as HeroJson;

// Social links already live in the Contact section, so the hero itself
// stays focused: one identity card, not a repeat of the same icons.
export default function HeroBanner() {
  return (
    <section id="home" className="pt-[var(--header-height)] pb-16 lg:pb-20">
      {/* Same max-width + horizontal padding as the navbar's own wrapper
          (see Navbar.tsx) so this card's edges line up exactly with the
          floating pill above it — max-w-7xl also matches the Footer, the
          site's other full-width container. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* One unified layout for banner, avatar, identity and stats — no
            surface/box color of its own, so it reads as part of the page
            background rather than a mismatched panel. Only the banner
            photo itself is a distinct rounded rectangle. */}
        <div>
          {/* Banner — the outer box (aspect-[4/1] + max-h-64) is fixed and
              never changes size because of the image, so the page layout
              can't jump/break. object-scale-down fits the IMAGE within
              that fixed box without ever upscaling it past its own real
              size: a smaller-than-the-box image shows at its natural size
              (doesn't get stretched to fill), a bigger one shrinks down to
              fit (never cropped). Runs on a plain bg-background fill, which
              is what shows through any transparent PNG (e.g. a background-
              removed logo/graphic) and in the unfilled space around the
              image, so it always reads as "this site's background". */}
          <div className="relative aspect-[4/1] max-h-64 w-full overflow-hidden rounded-2xl bg-background">
            {hero.bannerImage.url ? (
              <LightboxImage
                src={hero.bannerImage.url}
                alt={hero.bannerImage.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1232px, 100vw"
                className="object-scale-down contrast-[1.08] brightness-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-muted">
                Add a banner image in hero.json (1584×396 recommended)
              </div>
            )}
            {/* Short fade at the very bottom only — grounds the avatar
                seam without darkening (and potentially flattening) the
                banner photo itself. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent sm:h-12"
            />
          </div>

          {/* Identity — no extra side padding of its own on mobile; the
              outer wrapper's px-4 (shared with the banner image above and
              the navbar's own width) is enough, so this content lines up
              flush with the banner instead of stacking a second, tighter
              padding on top of it. sm:px-8 still adds breathing room once
              there's room to spare. */}
          <div className="sm:px-8">
            {/* Avatar — pulled up to overlap the banner, LinkedIn-style */}
            <div className="-mt-14 sm:-mt-16">
              {/* Same bg-background fill as the banner, for the same reason
                  (a transparent-background photo should pick up the site's
                  theme, not a mismatched color) — fit/size/position here are
                  unchanged, only the background underneath it. */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-background ring-2 ring-gold/40 sm:h-32 sm:w-32">
                {hero.photo.url ? (
                  <LightboxImage
                    src={hero.photo.url}
                    alt={hero.photo.alt}
                    fill
                    sizes="128px"
                    className="object-cover grayscale-[35%] contrast-[1.1]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted">
                    <UserIcon className="h-10 w-10 opacity-40" />
                  </div>
                )}
              </div>
            </div>

            {/* Name/roles/location/actions on the left, current-company card
                on the right — stacks below on smaller screens, sits beside
                the name from lg: up (the right side was empty space there). */}
            <div className="mt-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
              <div className="text-left">
                <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  <span className="text-foreground">{hero.firstName}</span>{" "}
                  <span className="text-gradient-gold">{hero.lastName}</span>
                </h1>

                {/* Plain multi-role headline (LinkedIn-style: "Role | Role | ...")
                    — deliberately not a badge/capsule, just text. Each role is
                    its own inline-block so normal text wrapping fits as many
                    as the line has room for, and only pushes a role to the
                    next line when it doesn't fit — never one role per line.
                    max-w keeps it wrapping into a readable column even on very
                    wide screens, instead of stretching the full card width. */}
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {hero.roles.map((role, idx) => (
                    <span key={role} className="inline-block whitespace-nowrap">
                      {role}
                      {idx < hero.roles.length - 1 && (
                        <span aria-hidden className="mx-2 text-border-subtle">
                          |
                        </span>
                      )}
                    </span>
                  ))}
                </p>

                {hero.location && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                    <LocationIcon className="h-4 w-4 shrink-0 text-gold" />
                    {hero.location}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={hero.primaryButton.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_25px_-10px_rgba(212,175,55,0.6)] transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    {hero.primaryButton.label}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href={hero.secondaryButton.href}
                    className="inline-flex items-center rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold hover:text-background"
                  >
                    {hero.secondaryButton.label}
                  </Link>
                </div>
              </div>

              {/* Company cards — was blank space to the right of the name on
                  large screens. One entry per company (add more to
                  hero.json's "companies" array for past roles, not just the
                  current one). Each card is a link when it has a url, with
                  a gold hover treatment matching the rest of the site. */}
              {hero.companies && hero.companies.length > 0 && (
                <div className="mt-6 flex flex-col gap-3 lg:mt-0">
                  {hero.companies.map((company) => (
                    <a
                      key={company.name}
                      href={company.url || "#"}
                      target={company.url ? "_blank" : undefined}
                      rel={company.url ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-3 rounded-xl border border-gold/15 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/5 hover:shadow-[0_10px_25px_-15px_rgba(212,175,55,0.5)]"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface transition-colors group-hover:border-gold/60">
                        {company.logo.url ? (
                          <LightboxImage
                            src={company.logo.url}
                            alt={company.logo.alt}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gold/50">
                            <BriefcaseIcon className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
                            {company.name}
                          </p>
                          {company.current && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              </span>
                              Currently working
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted">
                          {company.duration}
                          {company.experience && <> · {company.experience}</>}
                        </p>
                        <p className="text-xs text-muted">{company.location}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="h-8" aria-hidden />
          </div>

          {/* Stats — organized as a divided row/grid (not a filled panel),
              so it stays structured without introducing its own surface
              color against the page background. */}
          {hero.stats.length > 0 && (
            <div className="grid grid-cols-2 divide-x divide-y divide-border-subtle border-t border-border-subtle sm:grid-cols-4 sm:divide-y-0">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="px-6 py-5 sm:px-8">
                  <div className="font-display text-2xl font-semibold text-gold">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
