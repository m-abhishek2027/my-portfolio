"use client";

import { useState } from "react";
import SkillReveal from "@/components/Skills/SkillReveal";
import ProjectCard, { type Project } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface ProjectGridProps {
  items: Project[];
}

/**
 * Owns "which project is open" so Projects.tsx itself can stay a server
 * component (same split as Footer/BackToTopButton and Navbar/MobileMenu).
 */
export default function ProjectGrid({ items }: ProjectGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = items.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, index) => (
          <SkillReveal key={project.id} delayMs={index * 90} className="h-full">
            <ProjectCard project={project} onOpen={() => setOpenId(project.id)} />
          </SkillReveal>
        ))}
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenId(null)} />}
    </>
  );
}
