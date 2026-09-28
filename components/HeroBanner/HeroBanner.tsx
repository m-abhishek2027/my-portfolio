import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import RoleTypewriter from "./RoleTypewriter";
import heroData from "./hero.json";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
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
  /** True for the role you're in right now — shown as the "Currently at" card. */
  current?: boolean;
  duration: string;
  experience?: string;
  location: string;
  url: string;
}

interface HeroSocial {
  platform: string;
  url: string;
  icon: "linkedin" | "github" | "mail";
}

interface HeroJson {
  eyebrow: string;
  firstName: string;
  lastName: string;
  location: string;
  /** Only the `current: true` entry is shown in the hero (the Experience section lists the rest). */
  companies?: HeroCompany[];
  /** Typed out one at a time under the name (RoleTypewriter). */
  roles: string[];
  description: string;
  primaryButton: HeroLink;
  secondaryButton: HeroLink;
  socials: HeroSocial[];
  stats: HeroStat[];
  photo: { url: string; alt: string };
  /** Big outlined word drawn behind the photo (e.g. "AEM"). Empty = none. */
  photoBackdropText?: string;
}

const hero: HeroJson = heroData as HeroJson;
const currentCompany = hero.companies?.find((company) => company.current);

const socialIcons = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: MailIcon,
};

/** Staggered fade-up entrance on page load — each block passes its own delay. */
const fadeUp = (delayMs: number): CSSProperties => ({ animationDelay: `${delayMs}ms` });

// Split hero: identity, roles, current company and CTAs on the left, the
// background-removed photo (big outlined word + soft glow behind it) on the right; stats close it off. Animations:
// a staggered fade-up on load plus the roles typewriter; the rest is hover-only.
export default function HeroBanner() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Background: grid lines faded out toward the edges + two soft gold glows. */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px] lg:left-[70%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 -z-10 h-72 w-72 rounded-full bg-gold-dark/10 blur-[100px]"
      />

      {/* Same max-w-7xl + px-4 sm:px-6 wrapper as ResumeButton.tsx and the Footer. */}
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 pt-8 pb-8 sm:px-6 lg:min-h-[100svh] lg:pt-10 lg:pb-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* ---------- Left: identity ---------- */}
          <div className="order-1 text-left">
            <div style={fadeUp(0)}
              className="animate-fade-up motion-reduce:animate-none inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gold">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {hero.eyebrow}
            </div>

            <p style={fadeUp(100)}
              className="animate-fade-up motion-reduce:animate-none mt-4 text-base text-muted sm:text-lg">Hi, I&apos;m</p>
            <h1 style={fadeUp(150)}
              className="animate-fade-up motion-reduce:animate-none mt-1 font-display text-[clamp(1.75rem,10vw,3rem)] font-bold leading-[1.05] tracking-tight whitespace-nowrap sm:text-6xl lg:text-7xl">
              <span className="text-foreground">{hero.firstName}</span>{" "}
              <span className="text-gradient-gold">{hero.lastName}</span>
            </h1>

            {/* Roles typed out one by one. min-h reserves two lines on mobile
                so a long role wrapping doesn't push the content below. */}
            <p style={fadeUp(250)}
              className="animate-fade-up motion-reduce:animate-none mt-4 min-h-[3.5rem] font-mono text-lg text-foreground/90 sm:min-h-[2rem] sm:text-xl">
              <span className="text-gold/60">&gt; </span>
              <RoleTypewriter roles={hero.roles} />
            </p>

            <p style={fadeUp(350)}
              className="animate-fade-up motion-reduce:animate-none mt-4 max-w-xl text-base leading-relaxed text-muted">
              {hero.description}
            </p>

            {/* Current company — a slim card with a gold accent bar on the left. */}
            {currentCompany && (
              <a
                href={currentCompany.url || undefined}
                target={currentCompany.url ? "_blank" : undefined}
                rel={currentCompany.url ? "noopener noreferrer" : undefined}
                style={fadeUp(400)}
              className="animate-fade-up motion-reduce:animate-none group relative mt-6 flex w-full items-center gap-3 sm:inline-flex sm:w-auto overflow-hidden rounded-xl border border-border-subtle bg-surface/60 py-2.5 pr-5 pl-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/5 hover:shadow-[0_10px_25px_-15px_rgba(212,175,55,0.5)]"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-light to-gold-dark" />
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gold/30 bg-background">
                  {currentCompany.logo.url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- tiny logo inside a link; LightboxImage's popup would hijack the click
                    <img
                      src={currentCompany.logo.url}
                      alt={currentCompany.logo.alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BriefcaseIcon className="h-5 w-5 text-gold/60" />
                  )}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Currently at
                  </span>
                  <span className="block whitespace-nowrap text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
                    {currentCompany.name}
                  </span>
                  {/* Mobile: duration sits under the name to avoid wrapping */}
                  <span className="block whitespace-nowrap text-xs text-muted sm:hidden">
                    {currentCompany.duration}
                    {currentCompany.experience && (
                      <>
                        {" · "}
                        <span className="font-semibold text-gold">{currentCompany.experience}</span>
                      </>
                    )}
                  </span>
                </span>
                <span aria-hidden className="mx-1 hidden h-8 w-px bg-border-subtle sm:block" />
                <span className="hidden whitespace-nowrap text-xs leading-snug text-muted sm:block">
                  {currentCompany.duration}
                  {currentCompany.experience && (
                    <span className="block font-semibold text-gold">
                      {currentCompany.experience}
                    </span>
                  )}
                </span>
              </a>
            )}

            <div style={fadeUp(450)}
              className="animate-fade-up motion-reduce:animate-none mt-6 flex items-center gap-3 sm:gap-4">
              <Link
                href={hero.primaryButton.href}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full sm:flex-none sm:px-7 bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 py-3.5 text-sm font-semibold text-background shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
              >
                {hero.primaryButton.label}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.secondaryButton.href}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-gold/50 px-5 sm:flex-none sm:px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-gold hover:text-background"
              >
                {hero.secondaryButton.label}
              </Link>
            </div>

            <div style={fadeUp(550)}
              className="animate-fade-up motion-reduce:animate-none mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                {hero.socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
              {hero.location && (
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <LocationIcon className="h-4 w-4 text-gold" />
                  {hero.location}
                </span>
              )}
            </div>
          </div>

          {/* ---------- Right: photo ---------- */}
          <div style={fadeUp(200)}
              className="animate-fade-up motion-reduce:animate-none order-2 flex justify-center lg:justify-end lg:pr-12">
            <div className="relative aspect-[12/13] w-64 sm:w-72 lg:w-[23rem]">
              {/* Big outlined word behind the photo — editorial look; the
                  photo covers its middle so it reads as layered depth. */}
              {hero.photoBackdropText && (
                <span
                  aria-hidden
                  className="hero-outline-text pointer-events-none absolute top-[6%] left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none font-bold tracking-tight select-none sm:text-[9rem] lg:text-[11rem]"
                >
                  {hero.photoBackdropText}
                </span>
              )}

              {/* Very soft gold glow behind the head */}
              <div
                aria-hidden
                className="absolute top-[18%] left-1/2 aspect-square w-[55%] -translate-x-1/2 rounded-full bg-gold/10 blur-[60px]"
              />

              {/* Just the background-removed photo (transparent PNG), in front of the word.
                  Only the bottom fades out (hero-photo-fade in
                  globals.css), since the cutout is cropped flat there. */}
              <div className="hero-photo-fade absolute inset-0">
                {hero.photo.url ? (
                  // Plain next/image on purpose (not LightboxImage): the profile
                  // photo must not open/zoom on click, and pointer-events-none
                  // also blocks drag and right-click "Open image".
                  <Image
                    src={hero.photo.url}
                    alt={hero.photo.alt}
                    fill
                    priority
                    draggable={false}
                    sizes="(min-width: 1024px) 368px, (min-width: 640px) 288px, 256px"
                    className="pointer-events-none select-none object-contain object-bottom"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted">
                    <UserIcon className="h-16 w-16 opacity-40" />
                  </div>
                )}
              </div>

              {/* Thin gold "floor" line the photo stands on */}
              <div
                aria-hidden
                className="absolute inset-x-[-10%] bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* ---------- Stats strip ---------- */}
        {hero.stats.length > 0 && (
          <div style={fadeUp(650)}
              className="animate-fade-up motion-reduce:animate-none mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle lg:mt-12 sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background/90 px-4 py-4 text-center backdrop-blur transition-colors hover:bg-surface sm:px-6 lg:py-5"
              >
                <div className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[11px] uppercase tracking-widest text-muted sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
