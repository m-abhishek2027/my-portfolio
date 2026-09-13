import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import footerData from "./footer.json";

type FooterIconKey = "linkedin" | "github" | "mail";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSocial {
  platform: string;
  url: string;
  icon: FooterIconKey;
}

interface FooterJson {
  logoImage: string;
  copyrightName: string;
  tagline: string;
  quickLinks: FooterLink[];
  contact: { email: string; phone: string; location: string };
  socials: FooterSocial[];
}

const footer = footerData as FooterJson;

const socialIcons: Record<FooterIconKey, typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: MailIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface px-4 pb-8 pt-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="#home" className="inline-flex items-center gap-3">
            {footer.logoImage && (
              <Image
                src={footer.logoImage}
                alt={footer.copyrightName}
                width={1374}
                height={1145}
                className="h-9 w-auto"
              />
            )}
            <span className="text-sm font-semibold tracking-wide text-foreground">
              {footer.copyrightName}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted">{footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {footer.quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Get In Touch
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-foreground/80">
            <li>{footer.contact.email}</li>
            <li>{footer.contact.phone}</li>
            <li>{footer.contact.location}</li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            {footer.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 text-xs text-muted sm:flex-row">
        <p>
          © {year} {footer.copyrightName}. All rights reserved.
        </p>
        <Link href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
          Back to top
          <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90" />
        </Link>
      </div>
    </footer>
  );
}
