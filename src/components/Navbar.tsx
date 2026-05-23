"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { scrollToSection } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const activeSection = useActiveSection();
  const { isScrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[999] w-full flex justify-center pointer-events-none transition-all duration-500"
        style={{
          paddingTop: isScrolled ? "16px" : "24px",
        }}
      >
        <div className="w-full max-w-7xl px-6 md:px-8 lg:px-12 pointer-events-auto">
          <div
            className="w-full rounded-full border transition-all duration-500 px-6 md:px-8 lg:px-10 overflow-hidden isolate backdrop-blur-xl bg-black/70 supports-[backdrop-filter]:bg-black/55 pointer-events-auto"
            style={{
              borderColor: isScrolled
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.03)",
              boxShadow: isScrolled
                ? "0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.02)"
                : "0 4px 20px -10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="flex items-center justify-between h-[76px]">
              {/* Logo / Name */}
              <button
                onClick={() => handleNavClick("hero")}
                className="group flex items-center gap-3.5 text-left cursor-pointer"
              >
                <div className="relative w-9 h-9 transition-all duration-500 group-hover:scale-105">
                  <Image
                    src={logoImg}
                    alt="Kurt Yermo Logo"
                    fill
                    sizes="36px"
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-bold text-white font-display text-base tracking-tight group-hover:text-accent transition-colors duration-300">
                  Kurt<span className="text-accent-light">Yermo</span>
                  <span className="text-accent font-extrabold">.</span>
                </span>
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                {navLinks.map(({ id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavClick(id)}
                      className={`
                        relative h-10 px-4.5 inline-flex items-center justify-center text-[12px] font-medium tracking-[0.16em] uppercase rounded-full transition-all duration-300 cursor-pointer
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/60 hover:text-white hover:bg-white/4"
                        }
                      `}
                    >
                      <span className="relative z-10">{label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 bg-accent/8 border border-accent/20 rounded-full pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          transition={{ type: "spring", stiffness: 350, damping: 26 }}
                        />
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={() => handleNavClick("contact")}
                  className="ml-4 lg:ml-6 min-w-[110px] h-10 px-5 text-[12px] font-medium tracking-[0.16em] uppercase rounded-full border border-accent/30 bg-accent/5 text-white hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(59,130,246,0.15)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.3)] whitespace-nowrap cursor-pointer flex items-center justify-center"
                >
                  Hire Me
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white/70 hover:text-white hover:bg-white/5 transition-all p-2.5 rounded-full border border-transparent hover:border-white/10"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed right-4 top-4 bottom-4 z-40 w-[calc(100vw-32px)] max-w-[340px] rounded-2xl flex flex-col pt-24 px-8 pb-8 glass-strong shadow-2xl"
              style={{
                background: "rgba(17, 17, 32, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Drawer header close button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>

              <div className="flex flex-col gap-3 mt-4">
                {navLinks.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(id)}
                    className={`
                      text-left px-5 py-3.5 rounded-[14px] text-xs font-bold tracking-wider uppercase transition-all duration-300 border border-transparent
                      ${
                        activeSection === id
                          ? "bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(59,130,246,0.06)]"
                          : "text-white/70 hover:text-white hover:bg-white/4"
                      }
                    `}
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => handleNavClick("contact")}
                  className="mt-6 px-5 py-4 bg-accent text-white font-bold tracking-[0.12em] uppercase rounded-[14px] hover:bg-accent-dark transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
