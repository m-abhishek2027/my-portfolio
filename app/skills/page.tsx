import type { Metadata } from "next";
import Skills from "@/components/Skills/Skills";
import skillsData from "@/components/Skills/skills.json";
import { buildMetadata } from "@/lib/seo";

const skills: { subtitle: string } = skillsData;

export const metadata: Metadata = buildMetadata({
  title: "Skills",
  description: skills.subtitle,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <Skills variant="full" />
    </main>
  );
}
