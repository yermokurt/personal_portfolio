import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -60 });
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
