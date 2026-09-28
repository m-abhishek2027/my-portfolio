import type { Metadata } from "next";
import NotFound from "@/components/NotFound/NotFound";

// Next.js already adds <meta name="robots" content="noindex"> to 404
// responses; `robots` here also overrides the root layout's
// "index, follow" so the page doesn't send two conflicting robots tags.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col">
      <NotFound />
    </main>
  );
}
