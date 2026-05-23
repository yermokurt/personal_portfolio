"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import { Service } from "@/data/services";
import {
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineDesktopComputer,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  HiOutlineSparkles,
  HiOutlineCode: FiCode,
  HiOutlineLightBulb,
  HiOutlineDesktopComputer,
  HiOutlinePhotograph,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon] || HiOutlineSparkles;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "group relative rounded-[16px] p-8 glass border border-white/5 bg-[#111120]/30",
        "flex flex-col h-full",
        "transition-all duration-400 cursor-default overflow-hidden",
        hovered && "border-accent/20"
      )}
      style={{
        boxShadow: hovered
          ? "0 10px 25px rgba(0,0,0,0.35), 0 0 0 1px rgba(59, 130, 246, 0.12)"
          : "0 2px 15px rgba(0,0,0,0.25), 0 0 0 1px rgba(255, 255, 255, 0.03)",
      }}
    >
      {/* Glow orb on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-11 h-11 flex items-center justify-center rounded-xl mb-6",
          "bg-accent/5 border border-accent/20",
          "group-hover:bg-accent/15 transition-colors duration-300"
        )}
      >
        <Icon
          className="text-accent-light transition-transform duration-300 group-hover:scale-105"
          size={20}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3.5 group-hover:text-accent-light transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-muted-light text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mt-auto pt-5 border-t border-white/5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-xs text-muted-light leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
