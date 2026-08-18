"use client";

import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import { scrollToSection } from "@/lib/utils";

const highlights = [
  { label: "UI/UX Design", color: "text-accent-light", bg: "bg-accent/8 border-accent/20" },
  { label: "Frontend Dev", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { label: "Branding", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
  { label: "Content Creation", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { label: "Graphic Design", color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-padding scroll-mt-20">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — Visual Anchor */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative w-full"
          >
            {/* Main card */}
            <div
              className="relative rounded-3xl p-8 glass-strong border border-white/8 overflow-hidden"
              style={{
                boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-48 h-48"
                style={{
                  background: "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 70%)",
                }}
              />

              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-[14px] flex items-center justify-center text-white font-bold text-2xl font-display relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #3b82f6)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.35)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`
                    }}
                  />
                  K
                </div>
                <div>
                  <div className="text-white font-bold text-lg tracking-tight">Kurt Yermo</div>
                  <div className="text-accent text-xs font-semibold tracking-wider mt-0.5 uppercase">Designer & developer</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative z-10">
                <div className="text-accent text-4xl font-serif font-bold leading-none mb-2 opacity-30 absolute -top-3 -left-1">&ldquo;</div>
                <p className="text-[#d1d5db] text-base leading-relaxed italic pl-5 border-l-2 border-accent/30">
                  Good interfaces make a real task easier: choosing, planning, tracking, or deciding.
                </p>
              </blockquote>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col justify-center w-full"
          >
            <SectionHeader
              eyebrow="About Me"
              title="From idea to"
              titleAccent="usable product"
            />

            <div className="mt-8 space-y-6 text-muted-light text-base md:text-lg leading-[1.8] max-w-2xl">
              <p>
                I&rsquo;m Kurt — an IT student who designs and builds web products around the people who will use them.
              </p>
              <p>
                My background spans UI/UX design, frontend engineering, brand identity, and content creation. It helps me carry a project from its visual direction through to the working interface.
              </p>
              <p>
                I enjoy translating messy requirements into focused user flows, reusable components, and visual systems that fit the job at hand.
              </p>
            </div>

            {/* Highlights */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-wrap gap-3 mt-10 mb-2"
            >
              {highlights.map(({ label, color, bg }) => (
                <motion.span
                  key={label}
                  variants={fadeUp}
                  className={`px-4 py-1.5 min-h-[32px] rounded-[10px] border text-[12px] font-medium leading-none inline-flex items-center ${color} ${bg}`}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mt-12">
              <button
                onClick={() => scrollToSection("projects")}
                className="h-12 px-8 bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white font-semibold rounded-[14px] hover:shadow-[0_4px_30px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.25)] border-none cursor-pointer"
              >
                See My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="h-12 px-8 border border-white/10 text-white font-semibold rounded-[14px] hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 hover:-translate-y-0.5 text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
