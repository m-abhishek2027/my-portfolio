import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import notFoundData from "./not-found.json";

interface NotFoundLink {
  label: string;
  href: string;
}

interface NotFoundJson {
  code: string;
  title: string;
  message: string;
  primaryButton: NotFoundLink;
  secondaryButton: NotFoundLink;
}

const content: NotFoundJson = notFoundData;

/** Themed 404 page body — rendered by app/not-found.tsx. */
export default function NotFound() {
  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="hero-outline-text font-display text-[7rem] leading-none font-bold sm:text-[10rem]">
          {content.code}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{content.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          {content.message}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={content.primaryButton.href}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-7 py-3.5 text-sm font-semibold text-background shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            {content.primaryButton.label}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={content.secondaryButton.href}
            className="inline-flex items-center rounded-full border border-gold/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-gold hover:text-background"
          >
            {content.secondaryButton.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
