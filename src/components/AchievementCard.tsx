"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import { Achievement } from "@/data/achievements";
import {
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineLightningBolt,
};

interface AchievementCardProps {
  achievement: Achievement;
  index?: number;
}

export default function AchievementCard({ achievement, index = 0 }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon] || HiOutlineCollection;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.04, y: -5 }}
      className={cn(
        "group relative rounded-2xl p-4 md:p-6 lg:p-7 text-center glass border border-white/6",
        "flex flex-col h-full justify-center items-center",
        "hover:border-accent/25 transition-all duration-400 cursor-default overflow-hidden"
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col h-full justify-center items-center">
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
          <Icon className="text-accent" size={22} />
        </div>

        {/* Value */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportConfig}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-4xl font-bold text-gradient mb-1"
        >
          {achievement.value}
        </motion.div>

        {/* Label */}
        <h3 className="text-white font-semibold mb-2">{achievement.label}</h3>

        {/* Description */}
        <p className="text-muted-light text-xs leading-relaxed">{achievement.description}</p>
      </div>
    </motion.div>
  );
}
