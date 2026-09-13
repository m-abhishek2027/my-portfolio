import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";
import heroData from "@/components/HeroBanner/hero.json";

const hero: { firstName: string; lastName: string } = heroData;

export const metadata: Metadata = {
  title: `Contact — ${hero.firstName} ${hero.lastName}`,
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-[var(--header-height)]">
      {/* See app/about/page.tsx for why this negative margin is here. */}
      <div className="-mt-10 lg:-mt-14">
        <Contact />
      </div>
    </main>
  );
}
