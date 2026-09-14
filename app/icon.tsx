import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Browser tab favicon — generated from the real "AM" logo mark (see
// public/logo.png; assets/logo-mark.png is a trimmed, downsized copy kept
// small enough for ImageResponse's bundle budget).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const logoData = readFile(join(process.cwd(), "assets/logo-mark.png")).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`
);

export default async function Icon() {
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
          borderRadius: 7,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders its own <img>, not next/image. */}
        <img src={logoSrc} width={26} height={16} alt="" />
      </div>
    ),
    { ...size }
  );
}
