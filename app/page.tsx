import HeroBanner from "@/components/HeroBanner/HeroBanner";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";

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
