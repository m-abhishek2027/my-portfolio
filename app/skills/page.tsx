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
    <main className="flex-1 pt-[var(--header-height)]">
      {/* See app/about/page.tsx for why this negative margin is here. */}
      <div className="-mt-16 lg:-mt-24">
        <Skills variant="full" />
      </div>
    </main>
  );
}
