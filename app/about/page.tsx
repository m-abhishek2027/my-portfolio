import type { Metadata } from "next";
import About from "@/components/About/About";
import aboutData from "@/components/About/about.json";
import { buildMetadata } from "@/lib/seo";

const about: { summary: string } = aboutData;

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: about.summary,
  path: "/about",
});

export default function AboutPage() {
  return (
    // No header clearance here on purpose — same reasoning as HeroBanner:
    // the navbar defaults to a small floating icon rather than a full-width
    // bar, so every dedicated page can safely start from the very top of
    // the viewport instead of reserving space for a header that usually
    // isn't there. The section's own py-20/lg:py-28 is the only spacing.
    <main className="flex-1">
      <About variant="full" />
    </main>
  );
}
