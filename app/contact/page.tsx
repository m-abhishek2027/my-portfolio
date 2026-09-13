import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";
import contactData from "@/components/Contact/contact.json";
import { buildMetadata } from "@/lib/seo";

const contact: { description: string } = contactData;

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: contact.description,
  path: "/contact",
});

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
