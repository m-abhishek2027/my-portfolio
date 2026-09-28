import type { Metadata } from "next";
import Experience from "@/components/Experience/Experience";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: `Work experience of ${siteConfig.name}, ${siteConfig.jobTitle}${siteConfig.currentCompany ? ` at ${siteConfig.currentCompany.name}` : ""} — building enterprise AEM Sites and Assets solutions on AEM 6.5 and AEM as a Cloud Service.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <BreadcrumbStructuredData title="Experience" path="/experience" />
      <Experience variant="full" />
    </main>
  );
}
