import type { Metadata } from "next";
import Experience from "@/components/Experience/Experience";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: `The work history and professional experience of ${siteConfig.name}, ${siteConfig.jobTitle}.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <main className="flex-1 pt-[var(--header-height)]">
      {/* See app/about/page.tsx for why this negative margin is here. */}
      <div className="-mt-16 lg:-mt-24">
        <Experience variant="full" />
      </div>
    </main>
  );
}
