"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, User, LayoutGrid, Film, Download, Mail,
  ExternalLink, Check, Sparkles, ChevronDown, Bookmark, ArrowUpRight, Github, Linkedin, X
} from "lucide-react";
import { playNetflixTaDum } from "./audio";

export type RecruiterProfile = "recruiter" | "architect" | "manager" | "explorer";

interface NetflixNavbarProps {
  currentProfile: RecruiterProfile;
  onSelectProfile: (profile: RecruiterProfile) => void;
  onOpenProfileModal: () => void;
  onOpenResumeModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: "netflix" | "bento";
  onToggleViewMode: () => void;
  watchlistCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

const profileLabels: Record<RecruiterProfile, { title: string; badge: string; color: string; desc: string }> = {
  recruiter: { title: "Recruiter Mode", badge: "Highlights & Resume", color: "from-rose-600 to-red-600", desc: "Top skills, metrics, and resume access" },
  architect: { title: "Tech Architect Mode", badge: "Deep Dives & Code", color: "from-cyan-600 to-blue-600", desc: "Pipelines, schemas, and system design" },
  manager: { title: "Hiring Manager Mode", badge: "Business Impact & SLAs", color: "from-emerald-600 to-teal-600", desc: "ROI, latency cuts, and team leadership" },
  explorer: { title: "Visual Explorer Mode", badge: "Interactive Demos", color: "from-purple-600 to-indigo-600", desc: "Live simulators and visual playground" }
};

export function NetflixNavbar({
  currentProfile,
  onSelectProfile,
  onOpenProfileModal,
  onOpenResumeModal,
  searchQuery,
  onSearchChange,
  viewMode,
  onToggleViewMode,
  watchlistCount,
  isMuted,
  onToggleMute
}: NetflixNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "GenAI & RAG", href: "#row-trending-genai" },
    { label: "High-Throughput ML", href: "#row-production-architectures" },
    { label: "Live Sandboxes", href: "#row-interactive-sandboxes" },
    { label: "Experience", href: "#row-career-episodes" },
    { label: "Tech Stack", href: "#row-skills-originals" },
    { label: `My List (${watchlistCount})`, href: "#row-my-list" }
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4"
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Left: Netflix-Style Brand Logo & Main Nav Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          <a
            href="#top"
            onClick={() => playNetflixTaDum(isMuted)}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1"
          >
            {/* Red 'N' Series Badge */}
            <div className="relative flex items-center">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E50914] drop-shadow-[0_0_12px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform duration-300">
                SAI KRISHNA
              </span>
              <span className="ml-1.5 hidden md:inline-block text-[10px] font-extrabold uppercase tracking-widest text-zinc-300 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700">
                AI SERIES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-zinc-300 hover:text-white transition-colors duration-200 hover:font-semibold relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E50914] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Search, Notifications, View Mode Toggle & Recruiter Profile Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Animated Slide-Out Search Bar */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Titles, skills, metrics..."
                    autoFocus
                    className="w-full bg-black/80 border border-white/30 rounded-full pl-9 pr-7 py-1.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-red-500"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }}
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Search Portfolio"
            >
              <Search size={19} />
            </button>
          </div>

          {/* View Mode Toggle: Switch between Netflix Mode & Bento Grid Mode */}
          <button
            onClick={onToggleViewMode}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-zinc-200 transition-all hover:scale-105"
            title={`Switch to ${viewMode === "netflix" ? "Bento Grid" : "Netflix Streaming"} Mode`}
          >
            {viewMode === "netflix" ? (
              <>
                <LayoutGrid size={13} className="text-cyan-400" />
                <span>Bento View</span>
              </>
            ) : (
              <>
                <Film size={13} className="text-red-500" />
                <span>Netflix View</span>
              </>
            )}
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="What's New in Season 2026"
            >
              <Bell size={19} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#E50914] animate-pulse" />
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-white/15 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-2xl text-xs z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-400" /> New Releases & Updates
                    </span>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-zinc-400 hover:text-white">
                      <X size={14} />
                    </button>
                  </div>
                  <div className="divide-y divide-white/5 mt-2 max-h-72 overflow-y-auto no-scrollbar">
                    <div className="py-2.5 flex gap-3 hover:bg-white/5 rounded-lg px-2 transition-colors">
                      <span className="h-8 w-8 rounded-lg bg-red-600/20 border border-red-500/40 grid place-items-center text-red-400 shrink-0 font-bold">
                        AI
                      </span>
                      <div>
                        <div className="font-semibold text-white">Agentic Clinical Triage Graph v2.0 Released</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">Multi-agent diagnostic graph with sub-50ms latency SLAs.</div>
                      </div>
                    </div>
                    <div className="py-2.5 flex gap-3 hover:bg-white/5 rounded-lg px-2 transition-colors">
                      <span className="h-8 w-8 rounded-lg bg-amber-600/20 border border-amber-500/40 grid place-items-center text-amber-400 shrink-0 font-bold">
                        AWS
                      </span>
                      <div>
                        <div className="font-semibold text-white">AWS Machine Learning Specialty Re-Verified</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">Active credentials verified for 2026–2029.</div>
                      </div>
                    </div>
                    <div className="py-2.5 flex gap-3 hover:bg-white/5 rounded-lg px-2 transition-colors">
                      <span className="h-8 w-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 grid place-items-center text-cyan-400 shrink-0 font-bold">
                        J&J
                      </span>
                      <div>
                        <div className="font-semibold text-white">3+ TB Daily Real-Time Data Stream Milestone</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">Production telemetry streaming for clinical vital signals.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recruiter Profile Avatar Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition-colors group focus:outline-none"
            >
              <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${profileLabels[currentProfile].color} grid place-items-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform`}>
                {currentProfile[0].toUpperCase()}
              </div>
              <ChevronDown size={14} className={`text-zinc-400 group-hover:text-white transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/15 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-2xl z-50"
                >
                  <div className="px-2 py-1.5 mb-2 border-b border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Who&apos;s Watching?</div>
                    <div className="text-sm font-bold text-white mt-0.5">{profileLabels[currentProfile].title}</div>
                  </div>

                  <div className="space-y-1">
                    {(Object.keys(profileLabels) as RecruiterProfile[]).map((key) => {
                      const prof = profileLabels[key];
                      const isSelected = currentProfile === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            onSelectProfile(key);
                            setIsProfileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                            isSelected ? "bg-white/15 border border-white/20" : "hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`h-7 w-7 rounded-lg bg-gradient-to-tr ${prof.color} grid place-items-center text-white font-bold text-xs shrink-0`}>
                              {key[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{prof.title}</div>
                              <div className="text-[10px] text-zinc-400">{prof.badge}</div>
                            </div>
                          </div>
                          {isSelected && <Check size={14} className="text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onOpenResumeModal();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Download size={14} className="text-red-400" /> View & Download Resume
                    </button>
                    <a
                      href="#contact"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Mail size={14} className="text-cyan-400" /> Contact / Interview Request
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
