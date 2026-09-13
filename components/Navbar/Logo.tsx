import Image from "next/image";
import Link from "next/link";
import navbarData from "./navbar.json";

interface LogoJson {
  initials: string;
  name: string;
  /** Path under /public (or a full URL) to the logo mark. Empty = fall back to initials. */
  image: string;
}

const { logo }: { logo: LogoJson } = navbarData;

export default function Logo() {
  return (
    <Link
      href="#home"
      aria-label={`${logo.name} — Home`}
      className="group flex items-center gap-3"
    >
      {logo.image ? (
        <Image
          src={logo.image}
          alt={logo.name}
          width={1374}
          height={1145}
          priority
          className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-10"
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-surface-elevated to-surface text-sm font-semibold tracking-wide text-gold transition-transform duration-300 group-hover:scale-105">
          {logo.initials}
        </span>
      )}
      <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:block">
        {logo.name}
      </span>
    </Link>
  );
}
