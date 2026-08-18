import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type SmoothScroller = {
  scrollTo: (target: Element, options: { offset: number }) => void;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const lenis = (window as Window & { __portfolioLenis?: SmoothScroller }).__portfolioLenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -40 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

/**
 * Format a date string
 */
export function formatDate(dateStr: string): string {
  return dateStr;
}
