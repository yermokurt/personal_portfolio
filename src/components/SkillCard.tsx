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

const levelPercent = {
  beginner: "45%",
  intermediate: "65%",
  advanced: "85%",
  expert: "98%",
};

export default function SkillCard({ skill, index = 0, className }: SkillCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative px-6 py-5 rounded-[16px] glass border border-white/5 bg-[#111120]/30",
        "hover:border-accent/20 transition-all duration-400 cursor-default shadow-sm hover:shadow-[0_4px_20px_rgba(59,130,246,0.03)]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4.5">
        <span className="text-sm font-medium text-white/80 group-hover:text-accent-light transition-colors duration-300">
          {skill.name}
        </span>
      </div>

      {/* Elegant, thin progress bar */}
      {skill.level && (
        <div className="h-[3px] w-full bg-white/4 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: levelPercent[skill.level] }}
            viewport={viewportConfig}
            transition={{ duration: 1.2, delay: index * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #38bdf8, #3b82f6)`,
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
