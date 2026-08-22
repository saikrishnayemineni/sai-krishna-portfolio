"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-hidden">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-cyan-500 via-indigo-500 via-purple-500 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8),_0_0_24px_rgba(139,92,246,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
}
