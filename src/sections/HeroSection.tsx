"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroTitle, heroSubtitle, heroButtons, staggerContainer, scaleIn } from "@/animations/variants";
import ScrollIndicator from "@/components/ScrollIndicator";
import { scrollToSection } from "@/lib/utils";
import { FiArrowRight, FiMail } from "react-icons/fi";
import profileImg from "@/assets/profile.jpeg";
import logoImg from "@/assets/logo.png";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-center overflow-hidden scroll-mt-20 pt-20 pb-12 lg:pt-24 lg:pb-16 z-10"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Primary glow orb */}
        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Secondary accent orb */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center text-left"
        >
          {/* Left Column - Content */}
          <div className="flex flex-col items-start justify-center">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 min-h-[30px] rounded-[10px] border border-accent/25 bg-accent/8 backdrop-blur-sm mb-6"
              style={{ background: "rgba(59,130,246,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent-light text-[10px] font-bold tracking-[0.2em] uppercase leading-none">
                Available for Work
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={heroTitle} className="mb-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] uppercase">
                Creative <br />
                <span className="text-gradient">Developer</span>
              </h1>
            </motion.div>

            {/* Description / Subtitle */}
            <motion.div variants={heroSubtitle} className="mb-8">
              <p className="text-muted-light text-left max-w-xl text-sm md:text-base leading-[1.8] opacity-80">
                Crafting digital experiences that blend aesthetic precision with clean, performant frontend engineering.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={heroButtons}
              className="flex flex-row flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="group h-11 px-7 bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white font-semibold rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(59,130,246,0.15)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 border-none cursor-pointer"
              >
                View Projects
                <FiArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group h-11 px-7 border border-white/10 text-white font-semibold rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 hover:-translate-y-0.5 text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 cursor-pointer bg-white/2"
              >
                <FiMail size={14} className="text-white/60 group-hover:text-accent transition-colors" />
                Contact Me
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={heroSubtitle}
              className="flex flex-wrap items-center justify-between sm:justify-start gap-4 sm:gap-10 md:gap-12 w-full pt-8 border-t border-white/5"
            >
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-baseline">
                  3<span className="text-accent-light text-lg sm:text-xl ml-0.5">+</span>
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] uppercase text-muted-light mt-1 text-left">
                  Years Exp
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/5" />
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-baseline">
                  20<span className="text-accent-light text-lg sm:text-xl ml-0.5">+</span>
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] uppercase text-muted-light mt-1 text-left">
                  Projects Done
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/5" />
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-baseline">
                  15<span className="text-accent-light text-lg sm:text-xl ml-0.5">+</span>
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] uppercase text-muted-light mt-1 text-left">
                  Happy Clients
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Profile Card Composition */}
          <motion.div
            variants={scaleIn}
            className="relative flex items-center justify-center lg:justify-end w-full"
          >
            {/* Ambient Background Glow behind Card (Stunning original 2nd screenshot glow) */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#38bdf8] via-[#3b82f6] to-[#6366f1] rounded-[30px] opacity-15 blur-2xl z-0 pointer-events-none" />

            {/* Sizing Anchor Wrapper Frame */}
            <div className="relative w-full max-w-[270px] sm:max-w-[350px] flex flex-col items-center lg:block z-10">
              
              {/* Main Portrait Frame with original backing gradient glowing border */}
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-surface-card/40 backdrop-blur-md border border-white/10 p-3 z-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] select-none">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-gradient-to-tr from-[#38bdf8] via-[#3b82f6] to-[#6366f1] p-[2px]">
                  <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-background">
                    <Image
                      src={profileImg}
                      alt="Kurt Yermo"
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-[0.22,1,0.36,1] scale-101 hover:scale-103"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Floating Identity Badge (Desktop: Bottom-Left offset / Mobile: Stacked center below) */}
              <div className="
                z-20 flex items-center gap-3.5 p-3.5 rounded-[16px] border border-white/10 shadow-2xl backdrop-blur-md text-left select-none
                bg-white/[0.01] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.02)]
                w-full max-w-[240px] mt-6 lg:mt-0 lg:absolute lg:bottom-[-20px] lg:left-[-32px] lg:w-[230px]
                hover:border-accent/20 transition-colors duration-300
              ">
                {/* Mini Logo Emblem */}
                <div className="relative w-7 h-7 rounded-[8px] bg-accent/10 border border-accent/20 flex items-center justify-center overflow-hidden shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <Image
                    src={logoImg}
                    alt="Kurt Yermo"
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                </div>
                {/* Signature info */}
                <div className="flex flex-col text-left">
                  <span className="font-bold text-white text-[11.5px] tracking-tight leading-none">
                    Kurt Yermo
                  </span>
                  <span className="text-[7.5px] text-accent-light font-extrabold tracking-[0.12em] uppercase mt-1">
                    Creative Technologist
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
