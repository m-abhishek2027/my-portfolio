import type { Metadata } from "next";
import About from "@/components/About/About";
import heroData from "@/components/HeroBanner/hero.json";

const hero: { firstName: string; lastName: string } = heroData;

export const metadata: Metadata = {
  title: `About — ${hero.firstName} ${hero.lastName}`,
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-[var(--header-height)]">
      {/* The section itself already carries generous py-20/lg:py-28 (meant
          as breathing room between sections on the Home page) — on its own
          dedicated page that stacks on top of the fixed-header clearance
          above, so pull it up a bit here instead of touching the shared
          component's spacing. */}
      <div className="-mt-10 lg:-mt-14">
        <About variant="full" />
      </div>
    </main>
  );
}
