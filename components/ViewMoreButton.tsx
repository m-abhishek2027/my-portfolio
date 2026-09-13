import Link from "next/link";
import { ArrowRightIcon } from "./icons";

/**
 * Shared "View More" CTA used by every Home-page preview section to link
 * through to that section's full dedicated page (e.g. /projects).
 * Purely presentational — no data of its own — so it lives here instead of
 * inside any one section's folder.
 */
export default function ViewMoreButton({
  href,
  label = "View More",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gold hover:text-background"
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}
