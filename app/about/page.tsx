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
    <main className="flex-1 pt-[var(--header-height)]">
      {/* The section itself already carries generous py-20/lg:py-28 (meant
          as breathing room between sections on the Home page) — on its own
          dedicated page that stacks on top of the fixed-header clearance
          above, so pull it up a bit here instead of touching the shared
          component's spacing. */}
      <div className="-mt-16 lg:-mt-24">
        <About variant="full" />
      </div>
    </main>
  );
}
