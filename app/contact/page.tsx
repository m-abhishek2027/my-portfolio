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
    // See app/about/page.tsx for why there's no header clearance here.
    <main className="flex-1">
      <Contact standalone />
    </main>
  );
}
