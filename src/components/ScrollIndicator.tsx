"use client";

import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-muted text-xs tracking-[0.2em] uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-accent"
      >
        <FiArrowDown size={18} />
      </motion.div>
    </motion.div>
  );
}
