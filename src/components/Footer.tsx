"use client";

import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { getEnabledLinks } from "@/data/socialLinks";
import { scrollToSection } from "@/lib/utils";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiBehance } from "react-icons/si";

const footerLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FiGithub,
  Behance: SiBehance,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#0a0a0f] py-12 select-none">
      <div className="container-custom">
        {/* Multi-Zone Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] gap-8 pb-10 border-b border-white/[0.04]">
          
          {/* ZONE 1: Brand signature block */}
          <div className="flex flex-col items-start text-left space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-[8px] overflow-hidden shrink-0">
                <Image
                  src={logoImg}
                  alt="Kurt Yermo Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-white font-display text-sm tracking-tight">
                Kurt Yermo<span className="text-accent font-extrabold">.</span>
              </span>
            </div>
            <p className="text-muted text-[11px] font-medium tracking-wide">
              UI/UX designer & frontend developer
            </p>
          </div>

          {/* ZONE 2 & 3: Navigation and Social blocks */}
          <div className="flex flex-col items-start md:items-end justify-between gap-6">
            {/* ZONE 2: Editorial Navigation Links */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-start md:justify-end">
              {footerLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-muted hover:text-white text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer relative py-1"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ZONE 3: Mini tactile circular social ghost buttons */}
            <div className="flex items-center gap-2.5">
              {getEnabledLinks().map((link) => {
                const IconComponent = socialIcons[link.platform];
                if (!IconComponent) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/[0.06] bg-white/[0.01] text-white/50 hover:text-white hover:border-accent/35 hover:bg-accent/4 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(59,130,246,0.12)] cursor-pointer"
                    aria-label={link.platform}
                  >
                    <IconComponent size={13.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ZONE 4: Bottom Meta Grid Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-bold tracking-[0.14em] uppercase text-white/30">
          <p>© {new Date().getFullYear()} Kurt Collin G. Yermo. All rights reserved.</p>
          <p className="select-text">
            Designed & Built with <span className="text-accent-light/80 hover:text-accent transition-colors duration-200 cursor-default select-none">Next.js + Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
