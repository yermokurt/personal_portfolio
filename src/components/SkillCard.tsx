"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import { Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  index?: number;
  className?: string;
}

const levelColor = {
  beginner: "bg-white/20",
  intermediate: "bg-blue-400/60",
  advanced: "bg-accent/70",
  expert: "bg-accent",
};

const levelPercent = {
  beginner: "25%",
  intermediate: "50%",
  advanced: "75%",
  expert: "100%",
};

export default function SkillCard({ skill, index = 0, className }: SkillCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -3 }}
      className={cn(
        "group relative px-5 py-4 rounded-2xl glass border border-white/6",
        "hover:border-accent/25 transition-all duration-300 cursor-default shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        {skill.level && (
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{skill.level}</span>
        )}
      </div>

      {/* Progress bar */}
      {skill.level && (
        <div className="h-1 bg-white/6 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: levelPercent[skill.level] }}
            viewport={viewportConfig}
            transition={{ duration: 1.2, delay: index * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, var(--color-accent), var(--color-accent-light))`,
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
