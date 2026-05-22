"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import SkillCard from "@/components/SkillCard";
import { skillCategories } from "@/data/skills";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("creative");

  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="relative section-padding scroll-mt-[140px]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/4 top-0 w-[600px] h-[300px] opacity-[0.08]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            eyebrow="What I Know"
            title="Skills &"
            titleAccent="Expertise"
            description="A blend of creative mastery and technical depth — built through real projects, continuous learning, and genuine curiosity."
            centered
          />
        </div>

        {/* Category Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative h-10 px-5 rounded-[14px] text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="categoryBg"
                  className="absolute inset-0 rounded-[14px] bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {active.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-8 text-muted text-sm text-center"
        >
          {active.description}
        </motion.p>
      </div>
    </section>
  );
}
