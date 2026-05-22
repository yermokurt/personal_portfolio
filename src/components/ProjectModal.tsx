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
    } else if (action.type === "paper" && action.url) {
      setPdfUrl(action.url);
      setPdfOpen(true);
    } else if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "github": return <FiGithub size={15} />;
      case "demo": return <FiExternalLink size={15} />;
      case "gallery": return <FiImage size={15} />;
      case "paper": return <FiFileText size={15} />;
      default: return <FiExternalLink size={15} />;
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
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-white/10"
                style={{
                  background: "linear-gradient(135deg, #111120 0%, #0d0d18 100%)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
                  aria-label="Close modal"
                >
                  <FiX size={20} />
                </button>

                {/* Hero Image */}
                <div className="relative aspect-video w-full rounded-t-2xl overflow-hidden bg-black">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background-secondary via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.category.map((cat) => (
                          <span
                            key={cat}
                            className="px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-[10px]"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="text-muted text-sm tracking-wide">{project.completionDate}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.actions?.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-300 cursor-pointer ${
                            action.type === 'demo' || action.type === 'gallery'
                              ? 'bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white border-none shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.45)]'
                              : 'bg-white/4 border border-white/8 text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {renderIcon(action.type)}
                          {action.label}
                        </button>
                      ))}
                      
                      {/* Fallback old buttons if actions array not present */}
                      {!project.actions && project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-white/4 border border-white/8 text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium transition-all duration-300"
                        >
                          <FiGithub size={15} />
                          GitHub
                        </a>
                      )}
                      {!project.actions && project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white text-sm font-medium border-none shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.45)] transition-all duration-300"
                        >
                          <FiExternalLink size={15} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-10 p-6 rounded-xl bg-white/2 border border-white/5">
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-4">
                      Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 text-sm text-white/80 bg-surface border border-white/[0.07] rounded-[10px] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="grid gap-10">
                    <Section title="Project Overview">
                      <p className="text-muted-light leading-relaxed text-lg max-w-4xl">{project.overview}</p>
                    </Section>

                    <div className="h-px bg-white/5 w-full" />

                    <Section title="Development Process">
                      <p className="text-muted-light leading-relaxed text-lg max-w-4xl">{project.process}</p>
                    </Section>

                    <div className="h-px bg-white/5 w-full" />

                    <Section title="Challenges Solved">
                      <p className="text-muted-light leading-relaxed text-lg max-w-4xl">{project.challenges}</p>
                    </Section>

                    <div className="h-px bg-white/5 w-full" />

                    <Section title="UI/UX Approach">
                      <p className="text-muted-light leading-relaxed text-lg max-w-4xl">{project.uiuxApproach}</p>
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
      <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}
