import type { Metadata } from "next";
import Projects from "@/components/Projects/Projects";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: `A selection of projects built by ${siteConfig.name} using Adobe Experience Manager, Java, Spring Boot and React.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <Projects variant="full" />
    </main>
  );
}
