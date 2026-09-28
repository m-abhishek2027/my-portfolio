import type { Metadata } from "next";
import Projects from "@/components/Projects/Projects";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import projectsData from "@/components/Projects/projects.json";
import { buildMetadata, siteConfig } from "@/lib/seo";

// Project names come from projects.json, so the description stays in sync.
const projectTitles = (projectsData as { items: { title: string }[] }).items
  .map((item) => item.title)
  .join(", ");

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: `Project case studies by ${siteConfig.name} — ${projectTitles} — built with Adobe Experience Manager, Java, Spring Boot and React.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <BreadcrumbStructuredData title="Projects" path="/projects" />
      <Projects variant="full" />
    </main>
  );
}
