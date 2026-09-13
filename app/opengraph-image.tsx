import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// Image metadata — this file is a route-level fallback, so it's the image
// every page uses unless that page has its own opengraph-image.
export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Local assets don't depend on request data, so read them once at module
// scope (see "Predictable values" in the Next.js caching docs) rather than
// on every render.
const fontData = readFile(
  join(process.cwd(), "assets/fonts/PlayfairDisplay-ExtraBold.woff")
);

const initials = siteConfig.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default async function Image() {
  const playfair = await fontData;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 50% 32%, rgba(212,175,55,0.20), rgba(8,8,10,0) 62%)",
          position: "relative",
        }}
      >
        {/* Corner brackets — a small nod to the site's own gold accent lines. */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            width: 72,
            height: 72,
            display: "flex",
            borderTop: "3px solid rgba(212,175,55,0.55)",
            borderLeft: "3px solid rgba(212,175,55,0.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 48,
            width: 72,
            height: 72,
            display: "flex",
            borderBottom: "3px solid rgba(212,175,55,0.55)",
            borderRight: "3px solid rgba(212,175,55,0.55)",
          }}
        />

        {/* "AM" monogram badge — same mark as the navbar's own fallback
            (components/Navbar/Logo.tsx), drawn rather than embedding
            public/logo.png: that file has no real alpha channel (its
            checkered look is baked-in pixels, not transparency — it only
            reads fine at the small size the navbar shows it at), so it
            would show a visible gray square at this card's larger size. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            border: "3px solid rgba(212,175,55,0.55)",
            backgroundColor: "rgba(212,175,55,0.08)",
            marginBottom: 32,
            fontFamily: "Playfair Display",
            fontWeight: 800,
            fontSize: 48,
            letterSpacing: 1,
            color: "#d4af37",
          }}
        >
          {initials}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontFamily: "Playfair Display",
            fontWeight: 800,
            color: "#f4f1ea",
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 30,
            color: "#d4af37",
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.roles.slice(0, 3).join("   •   ")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 120,
            height: 3,
            backgroundColor: "#d4af37",
            borderRadius: 2,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 26,
            color: "#a3a09a",
            letterSpacing: 1,
          }}
        >
          abhishekmishra.tech
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair Display", data: playfair, style: "normal", weight: 800 }],
    }
  );
}
