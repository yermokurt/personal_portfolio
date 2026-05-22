"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Project } from "@/data/projects";
import { cardHover } from "@/animations/variants";
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
      initial="rest"
      animate={hovered ? "hover" : "rest"}
      variants={cardHover}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpenModal(project)}
      className={cn(
        "group relative rounded-2xl overflow-hidden cursor-pointer",
        "border border-white/6 glass",
        "flex flex-col h-full",
        "transition-all duration-500"
      )}
      style={{
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(59, 130, 246, 0.08)"
          : "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent",
            "transition-opacity duration-500",
            hovered ? "opacity-90" : "opacity-60"
          )}
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 min-h-[32px] text-[12px] font-medium leading-none inline-flex items-center tracking-widest uppercase bg-accent/20 text-accent border border-accent/20 rounded-[10px] backdrop-blur-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col grow">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-accent-light transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-light text-sm leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 min-h-[32px] text-[12px] font-medium leading-none inline-flex items-center text-white/50 bg-white/4 border border-white/6 rounded-[10px]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-4 py-1.5 min-h-[32px] text-[12px] font-medium leading-none inline-flex items-center text-white/40 bg-white/4 border border-white/6 rounded-[10px]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/4">
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors duration-200"
              >
                <FiGithub size={14} />
                GitHub
              </a>
            ) : null}
            {project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-white/50 hover:text-accent text-xs transition-colors duration-200"
              >
                <FiExternalLink size={14} />
                Demo
              </a>
            ) : null}
          </div>

          <button
            onClick={() => onOpenModal(project)}
            className="h-10 px-5 text-xs font-semibold text-accent border border-accent/25 bg-accent/5 hover:bg-accent hover:text-white rounded-[14px] transition-all duration-300 group/btn inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Case Study
            <FiArrowRight
              size={12}
              className="group-hover/btn:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
