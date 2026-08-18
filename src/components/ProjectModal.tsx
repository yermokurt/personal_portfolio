"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiGithub, FiExternalLink, FiImage, FiFileText } from "react-icons/fi";
import { Project, ProjectAction } from "@/data/projects";
import { modalOverlay, modalContent } from "@/animations/variants";
import GalleryLightbox from "./GalleryLightbox";
import PdfViewerModal from "./PdfViewerModal";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Lock scroll when modal is open
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

  // Close on Escape (only if sub-modals aren't open)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !galleryOpen && !pdfOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, galleryOpen, pdfOpen]);

  const handleActionClick = (action: ProjectAction) => {
    if (action.type === "gallery" && project?.galleryImages) {
      setGalleryIndex(0);
      setGalleryOpen(true);
    } else if (action.type === "paper" && action.url && !action.url.startsWith("http")) {
      setPdfUrl(action.url);
      setPdfOpen(true);
    } else if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "github": return <FiGithub size={13.5} />;
      case "website": return <FiExternalLink size={13.5} />;
      case "gallery": return <FiImage size={13.5} />;
      case "paper": return <FiFileText size={13.5} />;
      default: return <FiExternalLink size={13.5} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && project && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 pointer-events-none select-none">
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/[0.06] select-text"
                data-lenis-prevent
                style={{
                  background: "linear-gradient(135deg, #0d0d18 0%, #0a0a0f 100%)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/80 text-white/60 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/[0.08] cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX size={18} />
                </button>

                {/* Cinematic Responsive Image Frame */}
                <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-black/40 border-b border-white/[0.04]">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover opacity-85 hover:scale-101 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 1024px) calc(100vw - 2rem), 1024px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-95" />
                </div>

                {/* Content Panel */}
                <div className="p-8 md:p-10 lg:p-12">
                  {/* Header Grid */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
                    <div className="max-w-2xl text-left">
                      <div className="flex flex-wrap gap-1.5 mb-4 select-none">
                        {project.category.map((cat) => (
                          <span
                            key={cat}
                            className="px-3.5 py-1.5 text-[9px] font-extrabold tracking-[0.22em] uppercase text-accent-light bg-accent/8 border border-accent/20 rounded-[8px]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="text-muted text-xs tracking-wider select-none">{project.completionDate}</p>
                    </div>

                    {/* Highly Intentional Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 select-none">
                      {project.actions?.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action)}
                          className={`flex items-center gap-2 px-5 h-10 rounded-[10px] text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                            action.type === 'website' || action.type === 'gallery'
                              ? 'bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white border-none shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5'
                              : 'bg-white/[0.02] border border-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5'
                          }`}
                        >
                          {renderIcon(action.type)}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="mb-10 p-6 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                    <h3 className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/40 mb-4 select-none">
                      Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap gap-2 select-none">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 text-xs text-white/70 bg-[#111120]/30 border border-white/[0.06] rounded-[8px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section Details Grid */}
                  <div className="grid gap-8 text-left">
                    <Section title="Project Overview">
                      <p className="text-muted leading-relaxed text-sm md:text-base max-w-4xl">{project.overview}</p>
                    </Section>

                    <div className="h-px bg-white/[0.04] w-full" />

                    <Section title="Development Process">
                      <p className="text-muted leading-relaxed text-sm md:text-base max-w-4xl">{project.process}</p>
                    </Section>

                    <div className="h-px bg-white/[0.04] w-full" />

                    <Section title="Challenges Solved">
                      <p className="text-muted leading-relaxed text-sm md:text-base max-w-4xl">{project.challenges}</p>
                    </Section>

                    <div className="h-px bg-white/[0.04] w-full" />

                    <Section title="UI/UX Approach">
                      <p className="text-muted leading-relaxed text-sm md:text-base max-w-4xl">{project.uiuxApproach}</p>
                    </Section>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Sub Modals */}
      {project?.galleryImages && (
        <GalleryLightbox
          images={project.galleryImages}
          currentIndex={galleryIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          onNavigate={setGalleryIndex}
        />
      )}
      
      <PdfViewerModal
        pdfUrl={pdfUrl}
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
      />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/40 mb-3.5 select-none">{title}</h3>
      {children}
    </div>
  );
}
