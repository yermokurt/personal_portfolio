"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/skills";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("creative");

  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="relative section-padding scroll-mt-20">
      {/* BG ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/4 top-0 w-[600px] h-[300px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <SectionHeader
            eyebrow="Capability Architecture"
            title="Expertise &"
            titleAccent="Capabilities"
            description="A highly curated architecture of visual design disciplines and engineering standards refined through real shipping cycles."
            centered
          />
        </div>

        {/* Slim Segmented Control Switcher */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="inline-flex p-1 rounded-full border border-white/[0.05] bg-[#111120]/30 backdrop-blur-md relative select-none">
            {skillCategories.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 cursor-pointer ${
                    isCatActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {isCatActive && (
                    <motion.div
                      layoutId="categoryBg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] shadow-[0_4px_15px_rgba(59,130,246,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Capability Cards Grid */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {active.capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              className="group relative p-6.5 rounded-2xl border border-white/[0.04] bg-gradient-to-br from-white/[0.03] to-transparent hover:-translate-y-1 hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
              style={{
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
              }}
            >
              {/* Card Header */}
              <div>
                <h4 className="text-white font-display font-semibold text-base md:text-lg mb-2 group-hover:text-accent-light transition-colors duration-300">
                  {cap.title}
                </h4>
                <p className="text-muted text-xs leading-relaxed mb-6.5">
                  {cap.description}
                </p>
              </div>

              {/* Skill Pills Group */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cap.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-medium bg-white/[0.01] border border-white/[0.06] hover:border-accent/30 hover:bg-accent/5 hover:text-white transition-all duration-300 text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.01)] cursor-default select-none hover:shadow-[0_0_12px_rgba(59,130,246,0.12)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
