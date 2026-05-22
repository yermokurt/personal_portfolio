"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDownload } from "react-icons/fi";

interface PdfViewerModalProps {
  pdfUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewerModal({ pdfUrl, isOpen, onClose }: PdfViewerModalProps) {
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <div className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-surface rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-background">
              <h3 className="text-white font-medium">Research Paper</h3>
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-sm border border-white/10"
                >
                  <FiDownload size={16} />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="flex-1 w-full bg-black/50">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Viewer"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
