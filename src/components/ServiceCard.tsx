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
        "group relative rounded-2xl p-7 glass border border-white/6",
        "flex flex-col h-full",
        "transition-all duration-500 cursor-default overflow-hidden",
        hovered && "border-accent/25"
      )}
      style={{
        boxShadow: hovered
          ? "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(59,130,246,0.06)"
          : "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Glow orb on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-xl mb-5",
          "bg-accent/10 border border-accent/20",
          "group-hover:bg-accent/20 transition-colors duration-300"
        )}
      >
        <Icon
          className="text-accent transition-transform duration-300 group-hover:scale-110"
          size={22}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent-light transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-muted-light text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mt-auto pt-4 border-t border-white/4">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-muted-light">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
