"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import AchievementCard from "@/components/AchievementCard";
import { achievements } from "@/data/achievements";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative section-padding scroll-mt-20">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            eyebrow="By the Numbers"
            title="Achievements &"
            titleAccent="Milestones"
            description="Numbers that reflect real work, real clients, and a genuine commitment to growth and craft."
            centered
          />
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
