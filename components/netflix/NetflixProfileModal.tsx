"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, Check, ArrowRight, X } from "lucide-react";
import { RecruiterProfile } from "./NetflixNavbar";
import { playNetflixTaDum } from "./audio";

interface NetflixProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: RecruiterProfile;
  onSelectProfile: (profile: RecruiterProfile) => void;
  isMuted: boolean;
}

const profiles = [
  {
    id: "recruiter" as RecruiterProfile,
    name: "Recruiter",
    role: "Talent Acquisition / HR",
    color: "from-rose-600 to-red-600",
    description: "Highlights top skills, career timeline, verified credentials, and instant resume download."
  },
  {
    id: "architect" as RecruiterProfile,
    name: "Tech Lead / Architect",
    role: "Staff / Principal Engineer",
    color: "from-cyan-600 to-blue-600",
    description: "Prioritizes multi-agent graph pipelines, RAG retrieval schemas, and GitHub repositories."
  },
  {
    id: "manager" as RecruiterProfile,
    name: "Hiring Manager",
    role: "VP / Director of AI",
    color: "from-emerald-600 to-teal-600",
    description: "Emphasizes business ROI, 27% latency reductions, 3 TB+/day scale, and 99.99% API SLAs."
  },
  {
    id: "explorer" as RecruiterProfile,
    name: "Visual Explorer",
    role: "Interactive Stations",
    color: "from-purple-600 to-indigo-600",
    description: "Focuses on live interactive sandboxes, ICU telemetry simulators, and AI Q&A terminal."
  }
];

export function NetflixProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
  isMuted
}: NetflixProfileModalProps) {
  if (!isOpen) return null;

  const handlePick = (profile: RecruiterProfile) => {
    playNetflixTaDum(isMuted);
    onSelectProfile(profile);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#141414] border border-white/15 p-6 sm:p-10 shadow-2xl text-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-8">
            <div className="text-xs font-black tracking-widest text-[#E50914] uppercase">
              SAI KRISHNA YEMINENI · STREAMING PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Who&apos;s Watching?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              Select your persona to customize highlights, technical depth, and recommended systems.
            </p>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {profiles.map((p) => {
              const isSelected = currentProfile === p.id;
              return (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handlePick(p.id)}
                  className={`group flex flex-col items-center p-4 rounded-2xl border transition-all text-center focus:outline-none ${
                    isSelected
                      ? "bg-white/10 border-red-500/80 shadow-[0_0_25px_rgba(229,9,20,0.3)]"
                      : "bg-zinc-900/60 border-white/10 hover:border-white/30 hover:bg-zinc-800/60"
                  }`}
                >
                  {/* Avatar Icon Box */}
                  <div
                    className={`h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-tr ${p.color} grid place-items-center text-white font-black text-2xl shadow-xl mb-3 group-hover:scale-105 transition-transform relative`}
                  >
                    {p.name[0]}
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-red-600 border-2 border-[#141414] text-white grid place-items-center text-xs">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{p.role}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-white/30 text-xs font-bold text-zinc-300 hover:text-white hover:border-white transition-all hover:bg-white/10"
            >
              Continue to Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
