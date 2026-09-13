import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// iOS home-screen icon — see icon.tsx for why this is a drawn monogram
// rather than public/logo.png. Same mark, larger, no border-radius (iOS
// applies its own mask/corner rounding on top).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const initials = siteConfig.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default function AppleIcon() {
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
          color: "#d4af37",
          fontSize: 84,
          fontWeight: 700,
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
