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
    <main className="flex-1 pt-[var(--header-height)]">
      {/* See app/about/page.tsx for why this negative margin is here. */}
      <div className="-mt-16 lg:-mt-24">
        <Projects variant="full" />
      </div>
    </main>
  );
}
