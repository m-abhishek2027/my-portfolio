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
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <Experience variant="full" />
    </main>
  );
}
