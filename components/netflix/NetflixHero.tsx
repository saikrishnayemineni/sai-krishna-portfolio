"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Info, Volume2, VolumeX, Sparkles, Activity, ShieldCheck,
  Zap, ArrowUpRight, Download, Award, Bot, CheckCircle2, ChevronRight
} from "lucide-react";
import { NETFLIX_HERO_FEATURED, NetflixMediaItem } from "./netflixData";
import { playNetflixTaDum } from "./audio";
import { NumberCounter } from "@/components/NumberCounter";

interface NetflixHeroProps {
  onOpenDetailModal: (item: NetflixMediaItem) => void;
  onOpenResumeModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const heroRoles = [
  "Multi-Agent Graph Architectures",
  "Real-Time 3 TB+ EHR Streams",
  "High-Throughput Hybrid RAG",
  "Enterprise MLOps & Guardrails"
];

export function NetflixHero({
  onOpenDetailModal,
  onOpenResumeModal,
  isMuted,
  onToggleMute
}: NetflixHeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handlePlayClick = () => {
    playNetflixTaDum(isMuted);
    onOpenDetailModal(NETFLIX_HERO_FEATURED);
  };

  return (
    <section id="top" className="relative min-h-[90vh] sm:min-h-[85vh] w-full flex items-center justify-start overflow-hidden pt-24 pb-16 px-4 sm:px-8 lg:px-14">
      {/* Background Cinematic Gradient & Ambient Lighting */}
      <div className="absolute inset-0 z-0 bg-[#141414]">
        {/* Radial Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] rounded-full bg-red-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[450px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
        
        {/* Cinematic Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:36px_36px] opacity-60" />

        {/* Netflix Vignette Shadows & Bottom Fade */}
        <div className="absolute inset-0 netflix-vignette pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl space-y-5">
        {/* Top Badges: Series Pill & Top 10 Today */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Netflix N Original Badge */}
          <div className="flex items-center gap-1.5 text-xs font-black tracking-widest text-[#E50914] uppercase">
            <span className="h-5 w-5 rounded bg-[#E50914] text-white grid place-items-center text-xs font-extrabold shadow-md">
              N
            </span>
            <span className="tracking-[0.25em]">ORIGINAL AI SERIES</span>
          </div>

          <span className="text-zinc-600">•</span>

          {/* Top 10 in AI Badge */}
          <div className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/15">
            <span className="h-4 w-4 rounded-sm bg-[#E50914] text-white text-[10px] font-black grid place-items-center">
              #1
            </span>
            <span>in Production AI Today</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Actively Interviewing · Senior Roles
          </div>
        </motion.div>

        {/* Massive Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-1"
        >
          <div className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-zinc-400">
            Sai Krishna Yemineni Presents
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
            AGENTIC CLINICAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              INTELLIGENCE & RAG
            </span>
          </h1>
        </motion.div>

        {/* Netflix Meta Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-300"
        >
          <span className="font-extrabold text-emerald-400">99% Match</span>
          <span className="text-zinc-500">•</span>
          <span>2026</span>
          <span className="rounded border border-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-bold text-zinc-200">
            18+ PRODUCTION GRADE
          </span>
          <span className="rounded border border-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-bold text-zinc-200">
            4K ULTRA ML
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">4+ Seasons (Years Exp)</span>
        </motion.div>

        {/* Logline / Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-2xl font-normal drop-shadow-md"
        >
          A production-grade multi-agent autonomous decision graph that validates clinical intakes,
          retrieves grounded patient EHR records via hybrid pgvector + BM25 search, predicts acuity risk scores,
          and enforces deterministic HIPAA guardrails with sub-50ms inference SLAs.
        </motion.p>

        {/* Dynamic Focus Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 text-xs font-medium text-zinc-400"
        >
          <span className="text-red-500 font-bold">FEATURING:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={heroRoles[roleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-cyan-300 font-semibold font-mono"
            >
              {heroRoles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons: Play, More Info, Resume, Audio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3.5 pt-2"
        >
          {/* Primary Play Button (White with Black Text like Netflix) */}
          <button
            onClick={handlePlayClick}
            className="flex items-center gap-2.5 bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-lg text-sm sm:text-base font-extrabold transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group"
          >
            <Play size={18} className="fill-black group-hover:scale-110 transition-transform" />
            <span>Play Demo</span>
          </button>

          {/* More Info Button (Translucent Grey like Netflix) */}
          <button
            onClick={() => onOpenDetailModal(NETFLIX_HERO_FEATURED)}
            className="flex items-center gap-2 bg-zinc-600/70 hover:bg-zinc-600 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-200 backdrop-blur-md hover:scale-105 active:scale-95 border border-white/10"
          >
            <Info size={18} />
            <span>More Info</span>
          </button>

          {/* Quick Resume Access */}
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all border border-zinc-700 hover:border-zinc-500"
          >
            <Download size={15} className="text-red-400" />
            <span>Resume</span>
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-full border border-white/20 bg-black/60 text-zinc-300 hover:text-white hover:border-white transition-colors"
            title={isMuted ? "Unmute Audio SFX" : "Mute Audio SFX"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-red-400" />}
          </button>
        </motion.div>

        {/* Telemetry Highlights Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 max-w-3xl"
        >
          {[
            { label: "Alert Latency Reduction", val: "27%", color: "text-cyan-400" },
            { label: "Daily Data Ingested", val: "3 TB+", color: "text-emerald-400" },
            { label: "Production API SLA", val: "99.99%", color: "text-amber-400" },
            { label: "Triage Diagnostic Precision", val: "100%", color: "text-rose-400" }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-2.5 border border-white/5">
              <div className={`text-xl sm:text-2xl font-black font-mono ${stat.color}`}>
                <NumberCounter value={stat.val} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
