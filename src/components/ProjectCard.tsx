"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index?: number;
}

export default function ProjectCard({ project, onOpenModal, index = 0 }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpenModal(project)}
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "border transition-colors duration-200",
        "flex flex-col h-full bg-[#111120]/20"
      )}
      style={{
        borderColor: hovered ? "rgba(59, 130, 246, 0.25)" : "rgba(255, 255, 255, 0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 15px 40px -15px rgba(0,0,0,0.5)"
          : "0 8px 30px -20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Project image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1]"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1.00)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Text legibility overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent",
            "transition-opacity duration-500",
            hovered ? "opacity-95" : "opacity-80"
          )}
        />

        {/* Categories over image overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 select-none">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="px-3.5 py-1.5 rounded-[8px] text-[9px] tracking-[0.22em] font-extrabold uppercase bg-background/80 text-accent-light border border-white/5 backdrop-blur-md shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative & Specifications Content */}
      <div className="p-8 flex flex-col grow">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-accent-light transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted text-xs leading-relaxed mb-6 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Technologies Tags Row */}
        <div className="flex flex-wrap gap-1.5 mb-6.5 select-none">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-[8px] text-[10px] font-medium bg-white/[0.01] border border-white/[0.06] text-white/50"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 rounded-[8px] text-[10px] font-medium bg-white/[0.01] border border-white/[0.06] text-white/35">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Closing Action Grid */}
        <div className="flex items-center justify-between mt-auto pt-5.5 border-t border-white/[0.04]">
          <div className="flex items-center gap-4">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-white/45 hover:text-white text-[11px] transition-colors duration-200"
              >
                <FiGithub size={13.5} />
                GitHub
              </a>
            ) : null}
            {project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-white/45 hover:text-accent-light text-[11px] transition-colors duration-200"
              >
                <FiExternalLink size={13.5} />
                Website
              </a>
            ) : null}
          </div>

          <button
            onClick={() => onOpenModal(project)}
            className="h-9 px-4.5 text-[10px] font-bold tracking-wider uppercase text-accent-light border border-accent/20 bg-accent/4 hover:bg-accent hover:border-accent hover:text-white rounded-[10px] transition-all duration-300 group/btn inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Learn More
            <FiArrowRight
              size={11.5}
              className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
