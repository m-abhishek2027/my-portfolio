"use client";

import Link from "next/link";
import Logo from "./Logo";
import { CloseIcon, DownloadIcon } from "@/components/icons";
import type { NavLink, ResumeButton } from "./Navbar";

interface MobileMenuProps {
  links: NavLink[];
  resumeButton: ResumeButton;
  open: boolean;
  activeId: string;
  onClose: () => void;
}

// Floating rounded card (not a full-width dropdown) with a dimmed backdrop
// and staggered link entrance — same treatment as the eduadobe-ui reference,
// recolored to this site's dark + gold theme.
export default function MobileMenu({
  links,
  resumeButton,
  open,
  activeId,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 cursor-default border-none bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-menu"
        aria-hidden={!open}
        // --header-height (5.5rem) is the whole fixed <header>'s box, which
        // is taller than the pill actually looks: the header adds its own
        // pt-3 above the pill AND pb-3 below it (see Navbar.tsx's wrapper)
        // so the total adds up to --nav-height. Starting this exactly at
        // --header-height left a visible ~12px gap below the pill's own
        // bottom edge; subtracting that trailing pb-3 lines this up flush
        // with the pill itself instead of the invisible box around it.
        className={`fixed inset-x-4 top-[calc(var(--header-height)_-_0.75rem)] z-40 origin-top transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[28px] border border-border-subtle bg-gradient-to-br from-surface-elevated/95 to-background/95 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-transparent text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-col gap-6">
            {links.map((link, idx) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={onClose}
                className={`text-2xl font-semibold ${open ? "animate-menu-item-in" : ""} ${
                  activeId === link.id ? "text-gold" : "text-foreground"
                }`}
                style={open ? { animationDelay: `${60 + idx * 50}ms` } : undefined}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={resumeButton.href || "#"}
              target={resumeButton.href ? "_blank" : undefined}
              rel={resumeButton.href ? "noopener noreferrer" : undefined}
              onClick={onClose}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-3 text-sm font-semibold text-background shadow-[0_10px_25px_-10px_rgba(212,175,55,0.6)] ${
                open ? "animate-menu-item-in" : ""
              }`}
              style={open ? { animationDelay: `${60 + links.length * 50}ms` } : undefined}
            >
              <DownloadIcon className="h-4 w-4" />
              {resumeButton.label}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
