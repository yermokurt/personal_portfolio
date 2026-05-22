"use client";

import { socialLinks, contactInfo, getEnabledLinks } from "@/data/socialLinks";
import SocialLinkComponent from "@/components/SocialLink";
import { scrollToSection } from "@/lib/utils";

const footerLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/6"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #060610 100%)",
      }}
    >
      <div className="container-custom py-16 flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              K
            </div>
            <span className="font-bold text-white font-display text-base tracking-tight">
              Kurt<span className="text-accent font-extrabold">.</span>
            </span>
          </div>
          <p className="text-muted-light text-sm leading-relaxed max-w-md">
            IT Student · UI/UX Designer · Frontend Developer · Graphic Designer
          </p>
        </div>

        {/* Centered Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8 max-w-2xl">
          {footerLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-muted-light text-sm font-semibold hover:text-accent transition-colors duration-200 uppercase tracking-widest text-[11px]"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Social & Contact info */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex items-center justify-center flex-wrap gap-4">
            {getEnabledLinks().map((link) => (
              <SocialLinkComponent key={link.platform} link={link} size="md" />
            ))}
          </div>
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-muted-light hover:text-accent transition-colors duration-200 font-medium tracking-wide"
            >
              {contactInfo.email}
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-px bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-muted-light text-xs">
            © {new Date().getFullYear()} Kurt Collin G. Yermo. All rights reserved.
          </p>
          <p className="text-muted-light text-xs md:text-right">
            Designed & Built with <span className="text-accent">♥</span> using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
