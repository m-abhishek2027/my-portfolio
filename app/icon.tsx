import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// Browser tab favicon — a drawn "AM" monogram (same mark as the navbar's
// own fallback, components/Navbar/Logo.tsx) rather than embedding
// public/logo.png: that file has no real alpha channel — its checkered
// look is baked-in pixels, not transparency — so it only reads cleanly at
// the small size the navbar shows it at, not blown up into an icon.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const initials = siteConfig.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080a",
          borderRadius: 7,
          color: "#d4af37",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
