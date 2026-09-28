import type { Metadata } from "next";
import heroData from "@/components/HeroBanner/hero.json";
import contactData from "@/components/Contact/contact.json";
import skillsData from "@/components/Skills/skills.json";

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

interface SkillsSeoJson {
  featured: { name: string }[];
  categories: { name: string; skills: { name: string }[] }[];
}

const hero = heroData as HeroSeoJson;
const contact = contactData as ContactSeoJson;
const skills = skillsData as SkillsSeoJson;

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
  /** Topics for JSON-LD `knowsAbout`: the featured skills + every individual skill. */
  knowsAbout: [
    ...new Set([
      ...skills.featured.map((s) => s.name),
      ...skills.categories.flatMap((c) => c.skills.map((s) => s.name)),
    ]),
  ],
  /** Size/alt shared by app/opengraph-image.tsx and app/twitter-image.tsx. */
  shareImage: {
    width: 1200,
    height: 630,
    alt: `${name} — ${hero.eyebrow}`,
  },
  /**
   * Google Search Console "HTML tag" verification code (only the content
   * value). Set GOOGLE_SITE_VERIFICATION in the hosting env / .env.local —
   * nothing is emitted while it's unset.
   */
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION,
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
      // Must be listed explicitly: this page-level `openGraph` object
      // *replaces* the root one, which drops the file-based
      // app/opengraph-image.tsx for every route except "/" itself (that
      // left /about, /projects, ... with no share image at all).
      images: [{ ...siteConfig.shareImage, url: "/opengraph-image" }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [{ ...siteConfig.shareImage, url: "/twitter-image" }],
    },
  };
}

/**
 * schema.org BreadcrumbList for a sub page (Home › About). Rendered by each
 * page.tsx through <BreadcrumbStructuredData>, so Google can show the
 * breadcrumb trail instead of a bare URL in search results.
 */
export function breadcrumbJsonLd(title: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${path}#breadcrumb`),
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(path) },
    ],
  };
}
