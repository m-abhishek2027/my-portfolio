import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// iOS home-screen icon — see icon.tsx for where this mark comes from.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const logoData = readFile(join(process.cwd(), "assets/logo-mark.png")).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`
);

export default async function AppleIcon() {
  const logoSrc = await logoData;

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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders its own <img>, not next/image. */}
        <img src={logoSrc} width={130} height={77} alt="" />
      </div>
    ),
    { ...size }
  );
}
