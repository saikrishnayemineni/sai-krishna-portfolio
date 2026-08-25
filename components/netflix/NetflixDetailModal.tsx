"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Play, Plus, Check, ExternalLink, Github, Sparkles,
  Activity, ShieldCheck, Database, Layers, ArrowUpRight, Copy, CheckCircle2
} from "lucide-react";
import { NetflixMediaItem, NETFLIX_PROJECTS } from "./netflixData";
import { ProjectArchitecture } from "@/components/ProjectArchitecture";
import { ClinicalDashboardCard } from "@/components/ClinicalDashboardCard";
import { EvalMatrixCard } from "@/components/EvalMatrixCard";
import { AIProfileTerminal } from "@/components/AIProfileTerminal";
import { CopyButton } from "@/components/CopyButton";

interface NetflixDetailModalProps {
  item: NetflixMediaItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectRelated: (item: NetflixMediaItem) => void;
}

export function NetflixDetailModal({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated
}: NetflixDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "interactive" | "episodes" | "specs">("overview");

  if (!item) return null;

  // Find related items
  const relatedItems = NETFLIX_PROJECTS.filter(
    (p) => p.id !== item.id && (p.category === item.category || p.techStack.some((t) => item.techStack.includes(t)))
  ).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl">
        {/* Backdrop Click Dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#181818] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Header Banner */}
          <div className="relative min-h-[260px] sm:min-h-[320px] p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-[#181818] via-[#181818]/60 to-black/80 overflow-hidden border-b border-white/10">
            {/* Ambient Background Aura */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Circular Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-zinc-900/90 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 grid place-items-center transition-colors shadow-lg z-20"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>

            {/* Top Series Pill */}
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <span className="h-5 w-5 rounded bg-[#E50914] text-white text-xs font-black grid place-items-center">
                N
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-300">
                {item.badge || item.categoryLabel}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight drop-shadow-lg relative z-10">
              {item.title}
            </h2>

            {item.subtitle && (
              <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-1 relative z-10">
                {item.subtitle}
              </p>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 mt-5 relative z-10">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all hover:scale-105 shadow-md"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}

              <button
                onClick={() => onToggleBookmark(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                  isBookmarked
                    ? "bg-red-600 border-red-500 text-white"
                    : "bg-zinc-900/80 border-white/20 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {isBookmarked ? (
                  <>
                    <Check size={16} />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add to My List</span>
                  </>
                )}
              </button>

              <CopyButton value={item.title + " - " + (item.githubUrl || item.description)} />
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Meta Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-300 pb-4 border-b border-white/10">
              <span className="text-emerald-400 font-extrabold text-sm">{item.matchScore}% Match</span>
              <span className="text-zinc-600">•</span>
              <span>{item.releaseYear}</span>
              <span className="rounded border border-zinc-600 bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-200">
                {item.maturityRating}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-cyan-300 font-mono">{item.durationOrScale}</span>
            </div>

            {/* Navigation Tabs inside Modal */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              {[
                { id: "overview", label: "Overview & Impact" },
                { id: "interactive", label: "Interactive Architecture Sandbox" },
                { id: "episodes", label: `Pipeline Stages (${item.episodes?.length || 4})` },
                { id: "specs", label: "Tech Specs & Metrics" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-md"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Synopsis</h3>
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.details && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div>
                          <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Problem Statement</div>
                          <div className="text-sm text-zinc-300 mt-1">{item.details.problemStatement}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Architecture Solution</div>
                          <div className="text-sm text-zinc-300 mt-1">{item.details.architectureSolution}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Quantified Impact</div>
                          <div className="text-sm text-zinc-300 mt-1">{item.details.impact}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Metadata */}
                  <div className="space-y-4 bg-zinc-900/60 p-4 rounded-2xl border border-white/10">
                    <div>
                      <div className="text-[11px] text-zinc-400 font-semibold uppercase">Category</div>
                      <div className="text-xs font-bold text-white mt-0.5">{item.categoryLabel}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-semibold uppercase">Tech Stack</div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.techStack.map((tech) => (
                          <span key={tech} className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-semibold uppercase">Performance Metrics</div>
                      <div className="space-y-1.5 mt-1.5">
                        {item.metrics.map((m) => (
                          <div key={m.label} className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400">{m.label}</span>
                            <span className={`font-bold font-mono ${m.color || "text-emerald-400"}`}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Sandbox & Architecture */}
            {activeTab === "interactive" && (
              <div className="space-y-4">
                <div className="text-xs text-zinc-400 flex items-center gap-2">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>Live Interactive Station & Production Simulation:</span>
                </div>

                {item.id === "agentic-clinical-triage" || item.id === "sandbox-clinical-dashboard" ? (
                  <div className="rounded-2xl border border-white/10 p-4 bg-zinc-950/80">
                    <ProjectArchitecture />
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <ClinicalDashboardCard />
                    </div>
                  </div>
                ) : item.id === "llmops-eval-guardrails" || item.id === "sandbox-eval-matrix" ? (
                  <div className="rounded-2xl border border-white/10 p-4 bg-zinc-950/80">
                    <EvalMatrixCard />
                  </div>
                ) : item.id === "sandbox-ai-profile-terminal" ? (
                  <div className="rounded-2xl border border-white/10 p-4 bg-zinc-950/80">
                    <AIProfileTerminal />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 p-6 bg-zinc-950/80 space-y-4">
                    <ProjectArchitecture />
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Episodes / Pipeline Stages */}
            {activeTab === "episodes" && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Architectural Pipeline Stages & Dataflow
                </div>

                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden">
                  {(item.episodes || [
                    { number: 1, title: "Data Ingestion & Stream Ingestion", description: "Real-time schema validation and sanitization.", duration: "Stage 01" },
                    { number: 2, title: "Embedding & Vector Search", description: "Hybrid semantic search with Reciprocal Rank Fusion.", duration: "Stage 02" },
                    { number: 3, title: "Multi-Agent Graph Reasoning", description: "Autonomous state machine routing and triage scoring.", duration: "Stage 03" },
                    { number: 4, title: "Guardrails & API Serving", description: "Sub-50ms inference SLA and HIPAA compliant export.", duration: "Stage 04" }
                  ]).map((ep) => (
                    <div key={ep.number} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-white/5 transition-colors">
                      <span className="text-2xl font-black text-zinc-500 font-mono shrink-0">
                        {ep.number}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{ep.title}</h4>
                          <span className="text-xs font-mono text-cyan-400">{ep.duration}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{ep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Tech Specs & Metrics */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10">
                      <div className="text-xs text-zinc-400 font-medium">{m.label}</div>
                      <div className={`text-2xl font-black font-mono mt-1 ${m.color || "text-emerald-400"}`}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Key Deliverables & Specifications
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {(item.details?.keyDeliverables || [
                      "Production FastAPI endpoints with async concurrency",
                      "Docker containerization & CI/CD deployment",
                      "Automated unit & integration regression tests",
                      "Continuous telemetry & Prometheus scraping"
                    ]).map((del, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* More Like This (Related Production Systems) */}
            {relatedItems.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                  More Like This
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedItems.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-red-500/50 cursor-pointer transition-all hover:scale-102 group"
                    >
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="text-emerald-400 font-bold">{rel.matchScore}% Match</span>
                        <span className="font-mono">{rel.durationOrScale}</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {rel.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                        {rel.tagline || rel.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
