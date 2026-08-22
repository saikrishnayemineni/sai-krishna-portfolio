"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Search, Cpu, CheckCircle2, Play, RefreshCw, Zap, Activity,
  Server, Layers, Database, Radio, Code2, Sparkles, Terminal
} from "lucide-react";

const queries = [
  {
    id: "sepsis",
    title: "Sepsis Early Indicator Pattern",
    payload: { patient_id: "PAT-9124", vitals: { hr: 114, temp: "38.9C", spo2: "94%" }, biomarker_lac: "3.2 mmol/L" },
    retrievalScore: "0.942 Dense Cosine",
    bm25: "18.6 BM25 Sparse",
    triageDecision: "Moderate/High Escalation · Nurse Alert Paged",
    latency: "28ms"
  },
  {
    id: "cardiac",
    title: "Cardiac Anomaly & Arrhythmia Spike",
    payload: { patient_id: "PAT-8492", vitals: { hr: 142, ecg: "ST-Elevation Lead V5" }, troponin: "0.85 ng/mL" },
    retrievalScore: "0.984 Dense Cosine",
    bm25: "22.1 BM25 Sparse",
    triageDecision: "Critical Priority · On-Call Physician Dispatched",
    latency: "18ms"
  },
  {
    id: "postop",
    title: "Post-Surgical Vital Drift Analysis",
    payload: { patient_id: "PAT-7301", vitals: { bp: "88/56", hr: 98, map: 66 }, post_op_hr: "14h" },
    retrievalScore: "0.912 Dense Cosine",
    bm25: "16.4 BM25 Sparse",
    triageDecision: "ICU Specialist Summary Prepared",
    latency: "32ms"
  }
];

const steps = [
  {
    id: "validate",
    step: "01",
    name: "Input Validation & Schema Guard",
    tech: "FastAPI · Pydantic · JSON Schema",
    icon: ShieldCheck,
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    textColor: "text-cyan-300",
    glowColor: "rgba(6, 182, 212, 0.4)",
    baseLatency: 4,
    status: "Passed (100% Schema Compliant)",
    details: "Validates incoming EHR patient payloads, sanitizes clinical fields, strips PII, and verifies strict API schema constraints before queueing."
  },
  {
    id: "retrieve",
    step: "02",
    name: "Semantic Context Retrieval",
    tech: "pgvector · Hybrid Dense/Sparse Search",
    icon: Search,
    border: "border-indigo-500/40",
    bg: "bg-indigo-500/10",
    textColor: "text-indigo-300",
    glowColor: "rgba(99, 102, 241, 0.4)",
    baseLatency: 14,
    status: "Retrieved (5 Clinical Excerpts)",
    details: "Executes hybrid vector similarity search across 80M patient clinical records to ground the language model with exact medical history."
  },
  {
    id: "triage",
    step: "03",
    name: "LangGraph Agent Risk Scoring",
    tech: "LangGraph · Multi-Agent Triage",
    icon: Cpu,
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    textColor: "text-purple-300",
    glowColor: "rgba(168, 85, 247, 0.4)",
    baseLatency: 28,
    status: "Scored (Risk Index: 0.94)",
    details: "Orchestrates multi-agent decision nodes to analyze clinical context, compute risk stratification, and assign urgency ratings."
  },
  {
    id: "verify",
    step: "04",
    name: "Guardrails & Human Checkpoint",
    tech: "Guardrails AI · Human-in-the-Loop",
    icon: CheckCircle2,
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    textColor: "text-emerald-300",
    glowColor: "rgba(16, 185, 129, 0.4)",
    baseLatency: 5,
    status: "Verified (Hallucination Score < 0.01)",
    details: "Verifies response faithfulness, enforces medical safety guardrails, and automatically routes low-confidence edge cases to clinical review."
  }
];

export function ProjectArchitecture() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewMode, setViewMode] = useState<"flow" | "vector" | "specs">("flow");
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [liveLatency, setLiveLatency] = useState(steps[0].baseLatency);

  useEffect(() => {
    const base = steps[activeStep].baseLatency;
    setLiveLatency(base + Math.floor((Math.random() - 0.5) * 2));
    const jitterInterval = setInterval(() => {
      setLiveLatency(base + Math.floor((Math.random() - 0.5) * 2));
    }, 2500);
    return () => clearInterval(jitterInterval);
  }, [activeStep]);

  const handleSimulate = () => {
    setViewMode("flow");
    setIsSimulating(true);
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < steps.length) {
        setActiveStep(currentIdx);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1000);
  };

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background Laser Aura */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-colors duration-700"
        style={{ background: current.glowColor }}
      />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <Activity size={18} className="animate-pulse" />
          </span>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Interactive Architecture & Vector Studio</span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Telemetry: 99.99%
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Real-time vector embeddings, agent graph, and schema validation.</div>
          </div>
        </div>

        {/* View Mode Toggle & Simulation Button */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900/60 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setViewMode("flow")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                viewMode === "flow" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              Pipeline Flow
            </button>
            <button
              onClick={() => setViewMode("vector")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                viewMode === "vector" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              Vector Studio
            </button>
            <button
              onClick={() => setViewMode("specs")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                viewMode === "specs" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              System Specs
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {isSimulating ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                <span>Run Simulation</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {viewMode === "flow" ? (
        <div className="space-y-4 relative z-10">
          {/* 4 Step Selector Buttons with Laser Flow */}
          <div className="relative">
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 hidden sm:block pointer-events-none h-1 z-0">
              <svg className="w-full h-4 overflow-visible">
                <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(51, 65, 85, 0.6)" strokeWidth="2" />
                <line
                  x1="0"
                  y1="2"
                  x2="100%"
                  y2="2"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  className="animate-dash-flow opacity-80"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 relative z-10">
              {steps.map((item, idx) => {
                const StepIcon = item.icon;
                const isActive = activeStep === idx;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveStep(idx)}
                    className={`relative flex flex-col rounded-xl border p-3 text-left transition-all backdrop-blur-md ${
                      isActive
                        ? `${item.border} ${item.bg} shadow-lg shadow-cyan-500/10`
                        : "border-slate-800/80 bg-slate-950/70 hover:border-slate-700"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-step-glow"
                        className="absolute inset-0 rounded-xl border border-cyan-400/50 -z-10 shadow-[0_0_16px_rgba(6,182,212,0.25)]"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold ${isActive ? item.textColor : "text-slate-500"}`}>
                        STEP {item.step}
                      </span>
                      <StepIcon size={14} className={isActive ? item.textColor : "text-slate-500"} />
                    </div>
                    <div className={`mt-2 text-xs font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                      {item.name.split(" ")[0]} {item.name.split(" ")[1]}
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-400 truncate">{item.tech.split("·")[0]}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active Step Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`rounded-xl border ${current.border} ${current.bg} p-4 sm:p-5 backdrop-blur-md relative overflow-hidden`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${current.bg} ${current.textColor} border ${current.border}`}>
                    <Icon size={16} />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{current.name}</h4>
                    <div className="text-[11px] font-mono text-slate-300">{current.tech}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-900/90 border border-slate-700 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1">
                    <Zap size={10} className="text-cyan-400 animate-pulse" />
                    {liveLatency}ms latency
                  </span>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    {current.status}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {current.details}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : viewMode === "vector" ? (
        /* Vector Studio View */
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Sample Clinical Query:</span>
            <div className="flex flex-wrap gap-1.5">
              {queries.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuery(q)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                    selectedQuery.id === q.id
                      ? "bg-indigo-500/20 border-indigo-400/50 text-indigo-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            {/* Input Payload */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 font-mono">
              <div className="flex items-center justify-between text-cyan-400 mb-2 font-bold">
                <span className="flex items-center gap-1.5">
                  <Code2 size={13} />
                  <span>Sanitized JSON Payload</span>
                </span>
                <span className="text-[10px] text-slate-500">Pydantic Validated</span>
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                {JSON.stringify(selectedQuery.payload, null, 2)}
              </pre>
            </div>

            {/* Vector & Triage Telemetry */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2.5">
              <div className="text-indigo-400 font-bold flex items-center gap-1.5">
                <Database size={13} />
                <span>Hybrid pgvector Similarity & Routing</span>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Cosine Similarity:</span>
                  <strong className="text-emerald-400">{selectedQuery.retrievalScore}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Sparse Ranking:</span>
                  <strong className="text-cyan-400">{selectedQuery.bm25}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Inference Latency:</span>
                  <strong className="text-purple-400">{selectedQuery.latency}</strong>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} className="shrink-0" />
                <span>{selectedQuery.triageDecision}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Specs View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 sm:grid-cols-2 text-xs relative z-10"
        >
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Server size={13} className="text-cyan-400" />
              <span>Throughput & Ingestion</span>
            </div>
            <p className="text-slate-300 leading-normal">
              Handles <span className="text-cyan-300 font-semibold">3 TB+ daily EHR</span> records across hospital network endpoints with sub-50ms p95 latency.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Database size={13} className="text-indigo-400" />
              <span>Vector Database & Grounding</span>
            </div>
            <p className="text-slate-300 leading-normal">
              Hierarchical indexing with pgvector + BM25 hybrid ranking over <span className="text-indigo-300 font-semibold">80M structured patient records</span>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <Layers size={13} className="text-purple-400" />
              <span>Multi-Agent Triage</span>
            </div>
            <p className="text-slate-300 leading-normal">
              Stateful LangGraph agent graph routes low-confidence patient edge cases directly to physician checkpoint.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Guardrails & Safety</span>
            </div>
            <p className="text-slate-300 leading-normal">
              Deterministic validation verifies clinical dosage constraints, medical guideline compliance, and zero PII leakage.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
