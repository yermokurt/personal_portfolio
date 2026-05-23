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
    <section id="skills" className="relative section-padding scroll-mt-[60px]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/4 top-0 w-[600px] h-[300px] opacity-[0.05]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            eyebrow="What I Know"
            title="Skills &"
            titleAccent="Expertise"
            description="A blend of creative mastery and technical depth — built through real projects, continuous learning, and genuine curiosity."
            centered
          />
        </div>

        {/* Category Toggle - Centered Segmented Control */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex items-center p-1.5 rounded-full border border-white/5 bg-[#111120]/40 backdrop-blur-md relative">
            {skillCategories.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative min-w-[130px] sm:min-w-[160px] h-10 px-5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                    isCatActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {isCatActive && (
                    <motion.div
                      layoutId="categoryBg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] shadow-[0_4px_12px_rgba(59,130,246,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
          className="mt-10 text-muted text-sm text-center max-w-2xl mx-auto opacity-75"
        >
          {active.description}
        </motion.p>
      </div>
    </section>
  );
}
