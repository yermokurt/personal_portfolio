"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-accent" />
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-accent" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-gradient">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-muted-light text-base md:text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
