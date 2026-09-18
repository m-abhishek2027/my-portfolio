import { GridIcon } from "@/components/icons";

interface ProjectImagePlaceholderProps {
  label?: string;
  className?: string;
}

/**
 * Stand-in artwork for a project image slot that doesn't have a real
 * screenshot yet — swap in a real url on the matching entry in projects.json
 * (see data/README.md) and this disappears automatically. Styled as its own
 * "futuristic" visual (HUD corner brackets, gold glow, grid texture) rather
 * than a plain gray box, since the image slider is this section's focal
 * point even before real screenshots are added.
 */
export default function ProjectImagePlaceholder({ label, className = "" }: ProjectImagePlaceholderProps) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface-elevated via-surface to-background ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(212,175,55,0.12)_0px,rgba(212,175,55,0.12)_1px,transparent_1px,transparent_24px)]" />
      <div aria-hidden className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gold/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-gold-dark/20 blur-3xl" />

      {/* HUD-style corner brackets */}
      <div aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-gold/40" />
      <div aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-gold/40" />
      <div aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-gold/40" />
      <div aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-gold/40" />

      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <GridIcon className="h-7 w-7 text-gold/50" />
        {label && (
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/60">{label}</span>
        )}
      </div>
    </div>
  );
}
