import type { NextConfig } from "next";

/**
 * Standard security headers for every route — the "Best Practices" set
 * Lighthouse and securityheaders.com check for. No Content-Security-Policy
 * here on purpose: Next.js inline scripts would need a nonce setup (via
 * proxy/middleware) to work with a strict CSP.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an `X-Powered-By` response header.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        // Portfolio images (project covers, profile photo, etc.) are
        // hosted on Cloudinary — see data/README.md.
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
