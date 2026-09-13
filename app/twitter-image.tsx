// Twitter/X cards use the same 1200×630 card as Open Graph — re-export
// rather than duplicate the ImageResponse code. (If they ever need to
// diverge, split this back into its own generator.)
export { default, alt, size, contentType } from "./opengraph-image";
