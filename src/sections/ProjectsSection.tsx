"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, Project } from "@/data/projects";

const categories = ["All", "Frontend Only", "Full Stack", "Computer Vision"];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative section-padding scroll-mt-20">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-1/4 bottom-0 w-[500px] h-[400px] opacity-[0.05]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            eyebrow="Featured Work"
            title="Selected"
            titleAccent="Projects"
            description="Web products and systems built around real workflows, from group travel and café ordering to donation management."
            centered
          />
        </div>

        {/* Filter Trigger Controls */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap items-center justify-center gap-3 mb-12 md:mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`h-10 px-5.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white border-none shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
                  : "border border-white/8 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/2"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid Container with Layout Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onOpenModal={setSelectedProject}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted">
            No projects found in this category yet.
          </div>
        )}
      </div>

      {/* Modal Details Panel */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
