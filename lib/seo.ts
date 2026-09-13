import type { Metadata } from "next";
import heroData from "@/components/HeroBanner/hero.json";
import contactData from "@/components/Contact/contact.json";

/**
 * Site-wide SEO config, derived from the same JSON the page content already
 * reads (hero.json / contact.json are still the canonical "who is this site
 * about" data — see app/layout.tsx) instead of duplicating name/description
 * a third time. Every page's metadata should go through `buildMetadata()`
 * below rather than writing its own `openGraph`/`twitter` objects by hand,
 * so every route stays consistent and nothing forgets a field.
 */

interface HeroCompany {
  name: string;
  url: string;
  current?: boolean;
}

interface HeroSeoJson {
  firstName: string;
  lastName: string;
  eyebrow: string;
  description: string;
  location: string;
  roles: string[];
  companies?: HeroCompany[];
  photo: { url: string; alt: string };
}

interface ContactSeoJson {
  email: string;
  socials: { platform: string; url: string }[];
}

const hero = heroData as HeroSeoJson;
const contact = contactData as ContactSeoJson;

const name = `${hero.firstName} ${hero.lastName}`;

export const siteConfig = {
  name,
  /** Production domain — update here if it ever changes. */
  url: "https://abhishekmishra.tech",
  jobTitle: hero.eyebrow,
  description: hero.description,
  /** Shown for "/" and used as the fallback title.default. */
  defaultTitle: `${name} — ${hero.eyebrow}`,
  /** Every other page's `title` is run through this, e.g. "About | Abhishek Mishra". */
  titleTemplate: `%s | ${name}`,
  locale: "en_US",
  roles: hero.roles,
  keywords: [
    name,
    `${name} AEM Developer`,
    `${name} Portfolio`,
    hero.firstName,
    hero.lastName,
    ...hero.roles,
    "AEM Developer portfolio",
    "abhishekmishra.tech",
  ],
  location: hero.location,
  photo: hero.photo,
  email: contact.email,
  /** LinkedIn/GitHub/etc. — used for JSON-LD `sameAs` (excludes the mailto: entry). */
  socialUrls: contact.socials.filter((s) => !s.url.startsWith("mailto:")).map((s) => s.url),
  currentCompany: hero.companies?.find((c) => c.current),
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

interface BuildMetadataOptions {
  /** Omit on the Home page so it falls back to title.default (no "Home | ..." suffix). */
  title?: string;
  description: string;
  /** Route path, e.g. "/" or "/about" — becomes the canonical URL and og:url. */
  path: string;
}

/**
 * Every page.tsx's `metadata` export should be built with this instead of
 * hand-rolling `openGraph`/`twitter` — Next.js shallow-merges metadata per
 * field, so a page that sets its own (partial) `openGraph` object silently
 * *replaces* the parent layout's instead of extending it. Going through one
 * helper means every route gets a correct, fully-populated openGraph/twitter
 * object and canonical link, not just whatever fields that page remembered
 * to set.
 */
export function buildMetadata({ title, description, path }: BuildMetadataOptions): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}
