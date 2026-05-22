"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import SocialLinkComponent from "@/components/SocialLink";
import { socialLinks, contactInfo, getEnabledLinks } from "@/data/socialLinks";
import { FiSend, FiMail } from "react-icons/fi";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const fields = [
    { id: "name", label: "Your Name", type: "text", placeholder: "Kurt Yermo" },
    { id: "email", label: "Email Address", type: "email", placeholder: "kurt@email.com" },
    { id: "subject", label: "Subject", type: "text", placeholder: "Let's work together" },
  ];

  return (
    <section id="contact" className="relative section-padding scroll-mt-[140px]">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-0 h-[600px] opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(59,130,246,0.5), transparent)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Work"
            titleAccent="Together"
            description="Have a project in mind? I'd love to hear about it. Send me a message and let's make something great."
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] gap-12 items-start max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="w-full"
          >
            <div className="h-full rounded-3xl glass border border-white/6 p-6 md:p-8 flex flex-col justify-between gap-8 hover:border-white/10 transition-all duration-300 shadow-xl">
              {/* Top Section: Title & Email */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">Contact Details</span>
                  <h3 className="text-white font-display font-bold text-xl mt-1">Get in Touch</h3>
                </div>

                {contactInfo.email ? (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-accent/30 group transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                      <FiMail size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-muted-light">Email Me</span>
                      <span className="block text-white text-sm font-semibold truncate group-hover:text-accent transition-colors duration-200">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>
                ) : null}
              </div>

              {/* Middle Section: Socials Grid */}
              <div className="space-y-4">
                <h4 className="text-white/80 font-bold text-xs uppercase tracking-widest">Connect With Me</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getEnabledLinks().map((link) => (
                    <SocialLinkComponent
                      key={link.platform}
                      link={link}
                      showLabel
                      size="md"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Section: CV & Availability */}
              <div className="space-y-6">
                {contactInfo.resumeUrl ? (
                  <div>
                    <a
                      href={contactInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] border border-white/10 text-white font-bold hover:text-accent hover:border-accent/40 text-xs tracking-wider uppercase transition-all duration-300 bg-white/3 hover:bg-accent/5 hover:-translate-y-0.5"
                    >
                      Download CV
                    </a>
                  </div>
                ) : null}

                <div className="border border-emerald-500/20 bg-emerald-500/4 rounded-2xl p-4 flex items-start gap-3">
                  <div className="relative flex h-2.5 w-2.5 mt-1 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Available for Work</h4>
                    <p className="text-muted-light text-[11px] mt-0.5 leading-relaxed">
                      Open to freelance projects, internships, and full-time positions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inline fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.slice(0, 2).map(({ id, label, type, placeholder }) => (
                  <FloatingField
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    focused={focused === id}
                    onChange={(v) => setForm((f) => ({ ...f, [id]: v }))}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                  />
                ))}
              </div>

              {/* Subject */}
              <FloatingField
                id="subject"
                label="Subject"
                type="text"
                placeholder="Let's work together"
                value={form.subject}
                focused={focused === "subject"}
                onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
              />

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    focused === "message" || form.message
                      ? "top-2 text-[10px] text-accent font-semibold tracking-widest uppercase"
                      : "top-4 text-muted text-sm"
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full pt-8 pb-4 px-4 rounded-3xl text-white text-sm resize-none transition-all duration-300 outline-none leading-relaxed"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${focused === "message" ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="h-12 px-8 bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white font-semibold rounded-[14px] hover:shadow-[0_4px_30px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 text-sm inline-flex items-center justify-center gap-2 border-none w-full sm:w-auto cursor-pointer shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
              >
                {submitted ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    <FiSend size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FloatingFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  focused: boolean;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

function FloatingField({
  id,
  label,
  type,
  placeholder,
  value,
  focused,
  onChange,
  onFocus,
  onBlur,
}: FloatingFieldProps) {
  const isLifted = focused || !!value;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          isLifted
            ? "top-2 text-[10px] text-accent font-semibold tracking-widest uppercase"
            : "top-4 text-muted text-sm"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={isLifted ? placeholder : ""}
        className="w-full pt-7 pb-2 px-4 rounded-2xl text-white text-sm transition-all duration-300 outline-none h-12"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.07)"}`,
        }}
      />
    </div>
  );
}
