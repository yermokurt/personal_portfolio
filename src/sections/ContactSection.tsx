"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fadeUp, slideInLeft, slideInRight } from "@/animations/variants";
import { viewportConfig } from "@/animations/transitions";
import SectionHeader from "@/components/SectionHeader";
import SocialLinkComponent from "@/components/SocialLink";
import { contactInfo, getEnabledLinks } from "@/data/socialLinks";
import { FiSend, FiMail } from "react-icons/fi";
import { cn } from "@/lib/utils";

// Frontend validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Lightweight self-contained resolver to eliminate heavy package resolvers
const customZodResolver = async (data: any) => {
  const result = contactFormSchema.safeParse(data);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const errors = result.error.issues.reduce((acc: any, current) => {
    const key = current.path[0];
    acc[key] = { message: current.message };
    return acc;
  }, {});
  return { values: {}, errors };
};

export default function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: customZodResolver,
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const formValues = watch();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Your message has been sent successfully!",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "Failed to dispatch message due to a connection error. Please try again.",
      });
    }
  };

  return (
    <section id="contact" className="relative section-padding scroll-mt-20">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-x-0 bottom-0 h-[500px] opacity-[0.04]"
          style={{
            background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(59,130,246,0.4), transparent)",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Work"
            titleAccent="Together"
            description="Have a project in mind? I'd love to hear about it. Send me a message and let's make something great."
            centered
          />
        </div>

        {/* Contact Layout Grid - cols-[320px_1fr] enforced on lg desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 md:gap-12 items-start max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="w-full"
          >
            <div className="h-full rounded-2xl glass border border-white/5 bg-[#111120]/30 p-6 md:p-8 flex flex-col justify-between gap-8 hover:border-white/10 transition-all duration-300 shadow-lg">
              {/* Top Section: Title & Email */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-light">Contact Details</span>
                  <h3 className="text-white font-display font-bold text-lg mt-1.5">Get in Touch</h3>
                </div>

                {contactInfo.email ? (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/4 hover:border-accent/30 group transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/5 border border-accent/20 flex items-center justify-center text-accent-light group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.06)]">
                      <FiMail size={16} />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <span className="block text-[9px] uppercase font-bold tracking-widest text-white/50">Email Me</span>
                      <span className="block text-white text-sm font-semibold truncate group-hover:text-accent transition-colors duration-200 mt-0.5">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>
                ) : null}
              </div>

              {/* Middle Section: Socials Grid */}
              <div className="space-y-4 text-left">
                <h4 className="text-white/50 font-bold text-[10px] uppercase tracking-widest">Connect With Me</h4>
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
              <div className="space-y-6 text-left">
                {contactInfo.resumeUrl ? (
                  <div>
                    <a
                      href={contactInfo.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/8 text-white font-bold hover:text-accent-light hover:border-accent/40 text-[10px] tracking-widest uppercase transition-all duration-300 bg-white/2 hover:bg-accent/5 hover:-translate-y-0.5"
                    >
                      Download CV
                    </a>
                  </div>
                ) : null}

                <div className="border border-emerald-500/15 bg-emerald-500/4 rounded-xl p-4 flex items-start gap-3">
                  <div className="relative flex h-2 w-2 mt-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider">Available for Work</h4>
                    <p className="text-muted-light text-[11px] mt-0.5 leading-relaxed opacity-80">
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
            {/* Elegant banner notification */}
            <AnimatePresence>
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  className={cn(
                    "p-4 rounded-xl border text-sm font-medium leading-relaxed flex items-start gap-3 shadow-lg mb-6",
                    submitStatus.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/15 text-emerald-400"
                      : "bg-red-500/10 border-red-500/15 text-red-400"
                  )}
                >
                  <span className="mt-0.5 select-none text-base">
                    {submitStatus.type === "success" ? "✓" : "⚠"}
                  </span>
                  <div className="flex-1 text-left">
                    <span className="block font-bold mb-0.5">
                      {submitStatus.type === "success" ? "Success!" : "Submission Error"}
                    </span>
                    <span className="text-xs leading-normal opacity-90">{submitStatus.message}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus({ type: null, message: "" })}
                    className="text-current hover:opacity-100 opacity-60 transition-opacity p-0.5 select-none cursor-pointer text-xs"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none z-10",
                      focused === "name" || !!formValues.name
                        ? "top-2 text-[9px] text-accent-light font-bold tracking-widest uppercase"
                        : "top-4.5 text-white/40 text-sm font-medium"
                    )}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder={focused === "name" ? "Kurt Yermo" : ""}
                    disabled={isSubmitting}
                    className="w-full pt-7.5 pb-2 px-4 rounded-xl text-white text-sm transition-all duration-300 outline-none h-13.5 bg-white/3"
                    style={{
                      border: `1px solid ${focused === "name" ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                    }}
                  />
                  {errors.name && (
                    <span className="text-red-400/90 text-[11px] font-medium tracking-wide mt-1.5 ml-4 block text-left">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none z-10",
                      focused === "email" || !!formValues.email
                        ? "top-2 text-[9px] text-accent-light font-bold tracking-widest uppercase"
                        : "top-4.5 text-white/40 text-sm font-medium"
                    )}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder={focused === "email" ? "kurt@email.com" : ""}
                    disabled={isSubmitting}
                    className="w-full pt-7.5 pb-2 px-4 rounded-xl text-white text-sm transition-all duration-300 outline-none h-13.5 bg-white/3"
                    style={{
                      border: `1px solid ${focused === "email" ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                    }}
                  />
                  {errors.email && (
                    <span className="text-red-400/90 text-[11px] font-medium tracking-wide mt-1.5 ml-4 block text-left">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject field */}
              <div className="relative">
                <label
                  htmlFor="subject"
                  className={cn(
                    "absolute left-4 transition-all duration-200 pointer-events-none z-10",
                    focused === "subject" || !!formValues.subject
                      ? "top-2 text-[9px] text-accent-light font-bold tracking-widest uppercase"
                      : "top-4.5 text-white/40 text-sm font-medium"
                  )}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject")}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder={focused === "subject" ? "Let's work together" : ""}
                  disabled={isSubmitting}
                  className="w-full pt-7.5 pb-2 px-4 rounded-xl text-white text-sm transition-all duration-300 outline-none h-13.5 bg-white/3"
                  style={{
                    border: `1px solid ${focused === "subject" ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                  }}
                />
                {errors.subject && (
                  <span className="text-red-400/90 text-[11px] font-medium tracking-wide mt-1.5 ml-4 block text-left">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={cn(
                    "absolute left-4 transition-all duration-200 pointer-events-none z-10",
                    focused === "message" || !!formValues.message
                      ? "top-2 text-[9px] text-accent-light font-bold tracking-widest uppercase"
                      : "top-4.5 text-white/40 text-sm font-medium"
                  )}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder={focused === "message" ? "Describe your project in a few details..." : ""}
                  disabled={isSubmitting}
                  className="w-full pt-8 pb-4 px-4 rounded-[18px] text-white text-sm resize-none transition-all duration-300 outline-none leading-relaxed bg-white/3"
                  style={{
                    border: `1px solid ${focused === "message" ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}`,
                  }}
                />
                {errors.message && (
                  <span className="text-red-400/90 text-[11px] font-medium tracking-wide mt-1.5 ml-4 block text-left">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit button with loader */}
              <div className="text-left">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -1 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className={cn(
                    "h-12 px-8 bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#6366f1] text-white font-semibold rounded-full hover:shadow-[0_4px_25px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 text-sm inline-flex items-center justify-center gap-2 border-none w-full sm:w-auto cursor-pointer shadow-[0_4px_15px_rgba(59,130,246,0.15)]",
                    isSubmitting && "opacity-75 cursor-not-allowed hover:shadow-none hover:translate-y-0"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
