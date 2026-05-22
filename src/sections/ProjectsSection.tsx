"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, Project } from "@/data/projects";

const categories = ["All", "Frontend", "Full Stack", "Web App"];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="relative section-padding scroll-mt-[140px]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-1/4 bottom-0 w-[500px] h-[400px] opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            eyebrow="Featured Work"
            title="Selected"
            titleAccent="Projects"
            description="A curated collection of projects that showcase design thinking, technical execution, and problem-solving capability."
            centered
          />
        </div>

        {/* Filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`h-10 px-5 rounded-[14px] text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white border-none shadow-[0_4px_15px_rgba(59,130,246,0.25)]"
                  : "border border-white/8 text-white/50 hover:text-white hover:border-white/20 hover:bg-white/2"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} className="h-full">
              <ProjectCard
                project={project}
                onOpenModal={setSelectedProject}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted">
            No projects found in this category yet.
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
