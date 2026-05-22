"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
