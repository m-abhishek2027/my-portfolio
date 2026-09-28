import resumeData from "./resume.json";
import { DownloadIcon } from "@/components/icons";

interface ResumeJson {
  label: string;
  /** Path under /public (or a full URL) to the resume file. */
  href: string;
  /** Suggested file name for the download. */
  fileName: string;
}

const resume: ResumeJson = resumeData;

// Replaces the old navbar entirely — just one static round icon, fixed
// top-right, that downloads the resume. Page navigation lives in the
// Footer's quick links.
export default function ResumeButton() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      {/* Same max-w-7xl + px-4 sm:px-6 wrapper as HeroBanner/Footer so the
          icon lines up with the page content's right edge. */}
      <div className="mx-auto flex max-w-7xl justify-end px-4 pt-3 sm:px-6">
        <a
          href={resume.href}
          download={resume.fileName}
          aria-label={resume.label}
          title={resume.label}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-background/70 text-foreground/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-[color,border-color,transform] duration-200 hover:scale-105 hover:border-gold/50 hover:text-gold active:scale-95"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
