// src/hooks/useCookieBannerOffset.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a bottom offset in px so floating buttons avoid cookie UI.
 * Detects:
 *  - banner: #cookie-consent / [data-cookie-consent] / [data-cookie-banner]
 *  - manage button: [data-cookie-manage]
 * Adds `extra` as additional gap (default 16px).
 */
export default function useCookieBannerOffset(extra = 16) {
  const [offset, setOffset] = useState(extra);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const selector =
      '#cookie-consent, [data-cookie-consent], [data-cookie-banner], [data-cookie-manage]';

    const compute = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
      let maxAdd = 0;

      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const visibleAtBottom =
          rect.height > 0 && rect.bottom >= window.innerHeight - 2;
        if (visibleAtBottom) maxAdd = Math.max(maxAdd, rect.height);
      });

      setOffset(extra + maxAdd);
    };

    // Attach/refresh ResizeObserver to all candidates
    const attachResizeObserver = () => {
      resizeObsRef.current?.disconnect();
      resizeObsRef.current = new ResizeObserver(compute);
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
      els.forEach((el) => resizeObsRef.current?.observe(el));
    };

    // Watch DOM mutations to rewire observer if elements appear/disappear
    const mo = new MutationObserver(() => {
      attachResizeObserver();
      compute();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

    window.addEventListener("resize", compute);
    window.addEventListener("multai:consent-updated", compute as EventListener);

    // Initial wire-up
    attachResizeObserver();
    compute();

    return () => {
      mo.disconnect();
      resizeObsRef.current?.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("multai:consent-updated", compute as EventListener);
    };
  }, [extra]);

  return offset;
}
