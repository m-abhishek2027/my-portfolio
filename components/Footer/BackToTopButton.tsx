"use client";

import { ArrowRightIcon } from "@/components/icons";

/**
 * A real button + window.scrollTo — not a `<Link href="#">`. Next.js's
 * Link special-cases hash navigation (only scrolls when the hash matches
 * an element's id) and doesn't replicate the plain HTML "bare # scrolls to
 * the top of the page" behavior, so that version silently did nothing.
 * Split out as its own small client component so Footer itself can stay a
 * server component (same pattern as components/Skills/SkillReveal.tsx).
 */
export default function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-xs text-muted transition-colors hover:text-gold"
    >
      Back to top
      <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90" />
    </button>
  );
}
