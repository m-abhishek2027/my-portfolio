"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import navbarData from "./navbar.json";
import { DownloadIcon } from "@/components/icons";

/**
 * Shapes of navbar.json — kept in this file (rather than a shared /types
 * folder) so the Navbar component + its data stay self-contained in this
 * one folder.
 */
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ResumeButton {
  label: string;
  href: string;
}

interface NavbarJson {
  logo: { initials: string; name: string };
  links: NavLink[];
  resumeButton: ResumeButton;
}

const { links, resumeButton }: NavbarJson = navbarData;

// Floating "pill" nav — style borrowed from the eduadobe-ui reference
// (glass pill, rounded-full, backdrop-blur, hover-only color shift, no
// underline) but kept to this site's own layout (logo left / links centered
// / resume right) and its metallic-black + gold theme.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Each nav item now opens its own dedicated page (see navbar.json), so
  // the active link just follows the current route — no more scroll-spy.
  const pathname = usePathname();
  const activeId = links.find((link) => link.href === pathname)?.id ?? "";

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* max-w-7xl + px-4 sm:px-6 combined on this one element (not split
          across two nested divs) — has to match HeroBanner's wrapper
          exactly, including WHERE the padding is applied relative to the
          max-width cap, or the two only line up below the ~1328px viewport
          width where the cap doesn't bind yet. */}
      <div className="mx-auto max-w-7xl px-4 pb-3 pt-3 sm:px-6">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full border border-border-subtle bg-background/70 px-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md sm:px-6">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center justify-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeId === link.id
                    ? "text-gold"
                    : "text-foreground/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link
              href={resumeButton.href || "#"}
              target={resumeButton.href ? "_blank" : undefined}
              rel={resumeButton.href ? "noopener noreferrer" : undefined}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 py-2.5 text-sm font-semibold text-background shadow-[0_10px_20px_-10px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
            >
              <DownloadIcon className="h-4 w-4" />
              {resumeButton.label}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-6 w-6 flex-col justify-center gap-1.5 border-none bg-transparent md:hidden"
            >
              <span className="h-[2px] w-6 rounded-full bg-current" />
              <span className="h-[2px] w-6 rounded-full bg-current" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        links={links}
        resumeButton={resumeButton}
        open={mobileOpen}
        activeId={activeId}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
