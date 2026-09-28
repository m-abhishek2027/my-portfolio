"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Makes every page open from its very top after a route change.
 *
 * Next.js 16's <Link> keeps the current scroll position whenever the new
 * page is already visible in the viewport (see node_modules/next/dist/docs
 * .../components/link.md, `scroll`). With a shared Footer, clicking a footer
 * link from the bottom of one page therefore opened the next page halfway
 * down. This resets to the top instead — except when:
 *  - the URL has a #hash (the browser/Next scrolls to that element), or
 *  - the change came from the Back/Forward buttons (the browser restores
 *    the previous scroll position, which is what people expect there).
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isHistoryNav = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNav.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // Initial load: leave it to the browser (hash links, reload position).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
