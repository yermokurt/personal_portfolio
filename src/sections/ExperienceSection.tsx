"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, timelineLine, timelineDot } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";
import { FiBriefcase, FiStar, FiZap } from "react-icons/fi";

const typeIcon = {
  freelance: FiZap,
  work: FiBriefcase,
  internship: FiStar,
  education: FiStar,
};

const typeColor = {
  freelance: "text-accent-light bg-accent/8 border-accent/20",
  work: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  internship: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  education: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

const typeLabel = {
  freelance: "Freelance",
  work: "Contract",
  internship: "Internship",
  education: "Education",
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative section-padding scroll-mt-[140px]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            eyebrow="My Journey"
            title="Experience &"
            titleAccent="Timeline"
            description="A chronicle of professional growth, creative exploration, and real-world impact."
            centered
          />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line - Centered on desktop, left on mobile */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
            <motion.div
              variants={timelineLine}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)",
              }}
            />
          </div>

          {/* Entries */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-12 md:space-y-16 relative"
          >
            {experiences.map((exp, i) => {
              const Icon = typeIcon[exp.type];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className={cn(
                    "relative flex flex-col md:flex-row w-full items-start pl-12 md:pl-0",
                    isEven ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* Dot - Centered on desktop, left on mobile */}
                  <motion.div
                    variants={timelineDot}
                    className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full border-2 border-accent bg-background z-10"
                    style={{ boxShadow: "0 0 10px rgba(59,130,246,0.5)" }}
                  />

                  {/* Card Container */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div
                      className={cn(
                        "relative rounded-[20px] p-5 md:p-6 glass border border-white/6",
                        "hover:border-accent/25 transition-all duration-300 shadow-md hover:shadow-lg"
                      )}
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 px-4 py-1.5 min-h-[32px] rounded-[10px] text-[12px] font-medium leading-none border",
                                typeColor[exp.type]
                              )}
                            >
                              <Icon size={11} />
                              {typeLabel[exp.type]}
                            </span>
                            <span className="text-muted text-xs font-medium sm:hidden">
                              · {exp.period}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-muted-light text-sm mt-0.5">{exp.company}</p>
                          </div>
                        </div>
                        <span className="hidden sm:inline-block text-muted-light text-xs font-medium whitespace-nowrap mt-1">
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-light text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-xs text-muted-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
