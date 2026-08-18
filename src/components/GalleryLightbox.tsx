"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface GalleryLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({ images, currentIndex, isOpen, onClose, onNavigate }: GalleryLightboxProps) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          data-lenis-prevent
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <FiX size={24} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all border border-white/10"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            className="absolute right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-all border border-white/10"
          >
            <FiChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={images[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) calc(100vw - 2rem), 1152px"
            />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
