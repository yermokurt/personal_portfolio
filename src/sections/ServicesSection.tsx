"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/utils";

export default function ServicesSection() {
  return (
    <section id="services" className="relative section-padding scroll-mt-20">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(59,130,246,0.6), transparent)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            eyebrow="What I Offer"
            title="Services"
            titleAccent="I Provide"
            description="From pixel-perfect designs to production-ready code — here&apos;s how I can help bring your vision to life."
            centered
          />
        </div>

        {/* CTA note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-muted text-sm mb-10 md:mb-14"
        >
          Interested in working together?{" "}
          <button
            onClick={() => scrollToSection("contact")}
            className="text-accent hover:underline font-semibold"
          >
            Let&apos;s talk
          </button>
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
