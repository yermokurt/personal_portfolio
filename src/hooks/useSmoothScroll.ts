"use client";

import { useEffect, useRef } from "react";

type LenisInstance = InstanceType<typeof import("lenis").default>;

declare global {
  interface Window {
    __portfolioLenis?: LenisInstance;
  }
}

/**
 * Initializes Lenis smooth scrolling.
 * Returns the Lenis instance ref for advanced usage.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let lenis: LenisInstance | undefined;
    let rafId: number;

    const init = async () => {
      const LenisClass = (await import("lenis")).default;
      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;
      window.__portfolioLenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        delete window.__portfolioLenis;
      }
    };
  }, []);

  return lenisRef;
}
