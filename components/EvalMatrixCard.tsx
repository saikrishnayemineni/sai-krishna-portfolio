"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ShieldAlert, CheckCircle2, GitBranch, Sparkles, Radar, Activity, Zap, TrendingUp } from "lucide-react";
import { RadarChart } from "./RadarChart";

interface BenchmarkProfile {
  name: string;
  relevance: number;
  faithfulness: number;
  latencyReduction: number;
  driftDefense: number;
  badge: string;
  badgeColor: string;
}

const profiles: Record<"sai" | "baseline" | "industry", BenchmarkProfile> = {
  sai: {
    name: "Sai's Production Pipeline",
    relevance: 99.2,
    faithfulness: 99.9,
    latencyReduction: 88,
    driftDefense: 95,
    badge: "Optimized (J&J Pattern)",
    badgeColor: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10"
  },
  baseline: {
    name: "Naive Raw LLM Baseline",
    relevance: 64.5,
    faithfulness: 72.0,
    latencyReduction: 20,
    driftDefense: 35,
    badge: "Unoptimized Prototype",
    badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10"
  },
  industry: {
    name: "Enterprise Industry SLA",
    relevance: 85.0,
    faithfulness: 90.0,
    latencyReduction: 60,
    driftDefense: 70,
    badge: "Standard SLA",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10"
  }
};

export function EvalMatrixCard() {
  const [activeTab, setActiveTab] = useState<"metrics" | "radar" | "comparison">("metrics");
  const [benchmarkMode, setBenchmarkMode] = useState<"sai" | "baseline" | "industry">("sai");

  const currentProfile = profiles[benchmarkMode];

  return (
    <div className="flex flex-col justify-between h-full p-6 sm:p-7 relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      
      {/* Cyber Scanline Laser */}
      <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-cyber-scan z-0" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <BarChart3 size={14} className="text-cyan-400" />
              Production LLM Eval & MLOps Matrix
            </div>
            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">Evaluation Guardrails</h3>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Sparkles size={18} className="animate-spin" style={{ animationDuration: "10s" }} />
          </span>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "metrics"
                ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            Eval Metrics
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "comparison"
                ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp size={12} />
            Benchmark Delta
          </button>
          <button
            onClick={() => setActiveTab("radar")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "radar"
                ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Radar size={12} />
            Radar Profile
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "metrics" ? (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-3.5"
            >
              {[
                {
                  name: "Retrieval Relevance (NDCG@10)",
                  score: "99.2%",
                  change: "+14%",
                  desc: "Evaluated against 500+ curated clinical gold-standard test cases",
                  color: "text-cyan-400",
                  barPercent: 99.2,
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  name: "Faithfulness & Hallucination Defense",
                  score: "99.9%",
                  change: "Zero Leakage",
                  desc: "Strict Guardrails AI verification stripping hallucinated entities",
                  color: "text-emerald-400",
                  barPercent: 99.9,
                  gradient: "from-emerald-500 to-teal-400",
                },
                {
                  name: "Alert Triage Latency Reduction",
                  score: "27%",
                  change: "Speedup",
                  desc: "Reduced EHR incoming alert processing time from 10 hrs to 40 mins",
                  color: "text-purple-400",
                  barPercent: 88,
                  gradient: "from-purple-500 to-indigo-500",
                },
                {
                  name: "Model Drift Defense & CI/CD",
                  score: "25 Incidents",
                  change: "Mitigated",
                  desc: "Automated MLflow tracking & retraining across 6 environments",
                  color: "text-amber-400",
                  barPercent: 95,
                  gradient: "from-amber-500 to-orange-500",
                }
              ].map((item, idx) => (
                <div key={item.name} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
                    <span>{item.name}</span>
                    <span className={`font-mono ${item.color}`}>
                      {item.score} <span className="text-[10px] text-slate-400 font-normal">({item.change})</span>
                    </span>
                  </div>
                  
                  <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.barPercent}%` }}
                      transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_8px_rgba(6,182,212,0.5)]`}
                    />
                  </div>
                  
                  <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          ) : activeTab === "comparison" ? (
            /* Benchmark Comparison Mode */
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-4"
            >
              {/* Profile Selector */}
              <div className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                {(["sai", "industry", "baseline"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setBenchmarkMode(key)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                      benchmarkMode === key
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {key === "sai" ? "⚡ Sai's Pipeline" : key === "industry" ? "🏢 Industry SLA" : "⚠️ Raw LLM"}
                  </button>
                ))}
              </div>

              {/* Benchmark Stat Bars */}
              <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{currentProfile.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentProfile.badgeColor}`}>
                    {currentProfile.badge}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Context Retrieval Accuracy:</span>
                    <strong className="text-cyan-400">{currentProfile.relevance}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      animate={{ width: `${currentProfile.relevance}%` }}
                      className="h-full rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Faithfulness (Zero Hallucination):</span>
                    <strong className="text-emerald-400">{currentProfile.faithfulness}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      animate={{ width: `${currentProfile.faithfulness}%` }}
                      className="h-full rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                    <span>Drift & Edge-Case Defense:</span>
                    <strong className="text-purple-400">{currentProfile.driftDefense}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                    <motion.div
                      animate={{ width: `${currentProfile.driftDefense}%` }}
                      className="h-full rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-2"
            >
              <RadarChart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>Continuous Evaluation Active</span>
        </span>
        <span className="font-mono text-[11px] text-cyan-300">Target SLA: 99.99%</span>
      </div>
    </div>
  );
}
