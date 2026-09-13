import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";
import { buildMetadata, siteConfig } from "@/lib/seo";

// No `title` here on purpose — it falls back to the root layout's
// `title.default` so Home reads as "Abhishek Mishra — AEM Developer"
// instead of "Home | Abhishek Mishra".
export const metadata: Metadata = buildMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <main className="flex-1">
      <HeroBanner />
      {/* <About variant="preview" /> */}
      <Skills variant="preview" />
      <Projects variant="preview" />
      <Experience variant="preview" />
      <Contact />
    </main>
  );
}
