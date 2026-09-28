import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // No `host:` line — it's a non-standard (Yandex-only) directive that
    // Google ignores, and it expects a bare domain, not a full URL.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
