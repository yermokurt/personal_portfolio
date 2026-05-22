"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? currentY / totalHeight : 0;

      setScrollY(currentY);
      setScrollProgress(progress);
      setIsScrolled(currentY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollProgress, isScrolled };
}
