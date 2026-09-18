"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import navbarData from "./navbar.json";
import { DownloadIcon, GridIcon } from "@/components/icons";

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

/** How long the expanded nav stays open before it collapses back on its own. */
const AUTO_COLLAPSE_MS = 5000;
/** How long the width-expand transition below takes — kept as one constant
 *  since two things need to agree on it (see contentInteractive below). */
const EXPAND_MS = 500;

// Collapsed by default — just a round icon button, top-right — so the page
// behind it (the Hero banner especially) can start from the very top of the
// viewport instead of losing a full header-height strip to a bar that's
// empty most of the time. Click it and it expands into the same pill nav
// this site always had; left alone, it folds itself back up after 5s.
export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  // The expanded content (links, resume button) only becomes CLICKABLE
  // once the box has actually finished widening — not the instant navOpen
  // flips. Without this, the still-narrow-but-now-pointer-events-auto
  // content sits right under the cursor at the exact spot the opening
  // click just released on, so that same click's mouseup/click can land on
  // a link instead of just the icon — e.g. immediately re-triggering that
  // link's own onClick={() => setNavOpen(false)} and closing what the
  // click had just opened. Collapsing is instant either way (no reason to
  // delay disabling it).
  const [contentInteractive, setContentInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Each nav item opens its own dedicated page (see navbar.json), so the
  // active link just follows the current route.
  const pathname = usePathname();
  const activeId = links.find((link) => link.href === pathname)?.id ?? "";

  useEffect(() => {
    if (!navOpen) return undefined;
    const timer = setTimeout(() => setContentInteractive(true), EXPAND_MS);
    // Also resets contentInteractive back to false as soon as navOpen
    // changes away from true (including on close), so the next open starts
    // the same delay again instead of being interactive immediately.
    return () => {
      clearTimeout(timer);
      setContentInteractive(false);
    };
  }, [navOpen]);

  // Auto-collapse a few seconds after opening.
  useEffect(() => {
    if (!navOpen) return undefined;
    const timer = setTimeout(() => setNavOpen(false), AUTO_COLLAPSE_MS);
    return () => clearTimeout(timer);
  }, [navOpen]);

  // Clicking anywhere outside the pill collapses it early (in addition to
  // the auto-collapse timer above) — mirrors MobileMenu's own backdrop-click
  // behavior, but this element (the desktop-expanded pill) has no backdrop
  // of its own to attach that to.
  useEffect(() => {
    if (!navOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [navOpen]);

  // Lock body scroll while open (matters on mobile, where the expanded
  // state is MobileMenu's full-screen overlay).
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!navOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* max-w-7xl + px-4 sm:px-6 matches the navbar's old wrapper (and
          HeroBanner's/Footer's) — only relevant once expanded, since the
          collapsed icon is a fixed small size regardless of this cap. */}
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <div className="flex justify-end">
          <div
            ref={containerRef}
            className={`relative h-16 w-14 origin-top-right overflow-hidden rounded-full border border-border-subtle bg-background/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-[width] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              navOpen ? "md:w-full" : ""
            }`}
            style={{ transitionDuration: `${EXPAND_MS}ms` }}
          >
            {/* Collapsed trigger — always what mobile shows; on desktop this
                fades out as the pill expands. */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={navOpen}
              aria-controls="mobile-menu"
              onClick={() => setNavOpen(true)}
              className={`absolute inset-0 flex items-center justify-center text-foreground/80 transition-opacity duration-200 hover:text-gold ${
                navOpen ? "md:pointer-events-none md:opacity-0" : "opacity-100"
              }`}
            >
              <GridIcon className="h-5 w-5" />
            </button>

            {/* Expanded pill content — desktop only (mobile's "expanded"
                state is the separate MobileMenu overlay below instead, since
                the full link list has nowhere to go at mobile widths). */}
            <div
              className={`hidden h-16 items-center gap-4 px-4 transition-opacity duration-300 sm:px-6 md:grid md:grid-cols-[auto_1fr_auto] ${
                navOpen ? "md:opacity-100 md:delay-150" : "md:opacity-0"
              } ${contentInteractive ? "md:pointer-events-auto" : "md:pointer-events-none"}`}
            >
              <Logo />

              <nav aria-label="Primary" className="flex items-center justify-center gap-8">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
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

              <div className="flex items-center justify-end">
                <Link
                  href={resumeButton.href || "#"}
                  target={resumeButton.href ? "_blank" : undefined}
                  rel={resumeButton.href ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 py-2.5 text-sm font-semibold text-background shadow-[0_10px_20px_-10px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <DownloadIcon className="h-4 w-4" />
                  {resumeButton.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        links={links}
        resumeButton={resumeButton}
        open={navOpen}
        activeId={activeId}
        onClose={() => setNavOpen(false)}
      />
    </header>
  );
}
