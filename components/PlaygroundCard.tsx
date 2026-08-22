"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Palette, Play, Square, Terminal, Cpu, CheckCircle, Zap, Sparkles, Activity } from "lucide-react";

const accents = [
  { name: "Cyan", value: "#06b6d4", bg: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300", glow: "rgba(6, 182, 212, 0.3)" },
  { name: "Violet", value: "#a855f7", bg: "bg-purple-500/15 border-purple-500/40 text-purple-300", glow: "rgba(168, 85, 247, 0.3)" },
  { name: "Emerald", value: "#10b981", bg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300", glow: "rgba(16, 185, 129, 0.3)" },
];

const simulatedTokens = [
  "[0ms] Ingesting clinical payload...",
  "[14ms] Vector Context Retreived (5 docs)",
  "[32ms] LangGraph Agent Triage Score: 0.98",
  "→ Status: Verified Clean | Latency: 46ms | Guardrails: 100%"
];

export function PlaygroundCard() {
  const [running, setRunning] = useState(false);
  const [accent, setAccent] = useState(accents[0]);
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      setStreamIndex(1);
      interval = setInterval(() => {
        setStreamIndex((prev) => (prev < simulatedTokens.length ? prev + 1 : prev));
      }, 550);
    } else {
      setStreamIndex(0);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="flex h-full min-h-[340px] flex-col justify-between p-6 sm:p-7 relative overflow-hidden">
      {/* Background Accent Glow Aura */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-colors duration-700"
        style={{ background: accent.glow }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Cpu size={14} className="text-cyan-400" />
              Interactive Playground
            </div>
            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">Agent Pipeline Simulation</h3>
          </div>
          
          {/* Animated Frequency Equalizer */}
          <div className="flex items-end gap-1 h-6 w-8 bg-zinc-900/60 p-1 rounded-lg border border-zinc-800">
            <div className={`w-1 rounded-full bg-cyan-400 ${running ? "animate-bar-1" : "h-2"}`} />
            <div className={`w-1 rounded-full bg-indigo-400 ${running ? "animate-bar-2" : "h-3"}`} />
            <div className={`w-1 rounded-full bg-purple-400 ${running ? "animate-bar-3" : "h-1"}`} />
            <div className={`w-1 rounded-full bg-emerald-400 ${running ? "animate-bar-4" : "h-2"}`} />
          </div>
        </div>

        {/* Accent Color Pickers */}
        <div className="mt-4 flex flex-wrap gap-2">
          {accents.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setAccent(item)}
              className={`focus-ring rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                accent.name === item.name
                  ? item.bg
                  : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ background: item.value }}
              />
              {item.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Terminal Display */}
      <div
        className="relative z-10 mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl transition-all duration-500"
        style={{ boxShadow: `0 0 35px ${accent.glow}` }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5 bg-zinc-900/70">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Terminal size={14} className="text-cyan-400" />
            <span>agent-orchestrator.ts</span>
            {running && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setRunning((v) => !v)}
            className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all shadow-sm"
            style={{ background: `${accent.value}26`, color: accent.value, border: `1px solid ${accent.value}40` }}
          >
            {running ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
            {running ? "Stop Agent" : "Run Agent"}
          </motion.button>
        </div>

        <div className="p-4 text-[11px] font-mono leading-6 text-zinc-300 min-h-[110px]">
          {running ? (
            <div className="space-y-1">
              {streamIndex >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle size={12} /> {simulatedTokens[0]}
                </motion.div>
              )}
              {streamIndex >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-cyan-400 font-semibold flex items-center gap-1.5"
                >
                  <Zap size={12} /> {simulatedTokens[1]}
                </motion.div>
              )}
              {streamIndex >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-purple-400 font-semibold flex items-center gap-1.5"
                >
                  <Cpu size={12} /> {simulatedTokens[2]}
                </motion.div>
              )}
              {streamIndex >= 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-zinc-300 pl-4 border-l-2 border-cyan-500 mt-1 font-semibold"
                >
                  {simulatedTokens[3]}
                </motion.div>
              )}
              {streamIndex < 4 && (
                <div className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse align-middle ml-1" />
              )}
            </div>
          ) : (
            <div className="text-zinc-500 italic flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-700 animate-pulse" />
              <span>Pipeline ready. Click &quot;Run Agent&quot; to execute real-time simulation.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
