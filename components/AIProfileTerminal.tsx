"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Terminal, CheckCircle2, Zap, ArrowRight, RefreshCw, MessageSquare } from "lucide-react";

interface QuestionAnswer {
  id: string;
  question: string;
  badge: string;
  response: string;
  metrics: { latency: string; confidence: string; tokens: number };
}

const qaData: QuestionAnswer[] = [
  {
    id: "why-hire",
    question: "Why hire Sai Krishna?",
    badge: "Executive Summary",
    response:
      "4+ years of proven production AI/ML engineering experience at Johnson & Johnson and Deloitte. Specializes in building end-to-end Agentic AI systems, enterprise RAG architectures, high-throughput streaming EHR data pipelines (3+ TB/day), and MLOps workflows with 99.99% uptime SLAs.",
    metrics: { latency: "18ms", confidence: "99.9%", tokens: 58 }
  },
  {
    id: "rag-arch",
    question: "Explain RAG & Agentic Architecture",
    badge: "Architecture",
    response:
      "Engineers hybrid dense/sparse vector search (pgvector + BM25) across 80M+ patient clinical records, integrated with stateful LangGraph multi-agent triage graphs and Guardrails AI to achieve sub-40ms latency with zero medical hallucination leakage.",
    metrics: { latency: "24ms", confidence: "99.8%", tokens: 64 }
  },
  {
    id: "impact",
    question: "Impact at J&J and Deloitte",
    badge: "Proven Impact",
    response:
      "At J&J: Reduced clinical alert latency by 27% and sped up medical document triage by 93% (10 hrs down to 40 mins). At Deloitte: Engineered 10 real-time ML inference APIs handling 80M records daily with 99.99% enterprise uptime.",
    metrics: { latency: "14ms", confidence: "100%", tokens: 62 }
  },
  {
    id: "stack-avail",
    question: "Tech Stack & Availability",
    badge: "Availability",
    response:
      "Expert in Python, LangGraph, PyTorch, FastAPI, Docker, Kubernetes, MLflow, AWS, GCP, and Vector DBs. AWS AI & ML Certified, GCP GenAI Leader. Actively seeking Senior AI/ML Engineer, Staff AI, or Applied GenAI roles (Remote / Hybrid / On-site).",
    metrics: { latency: "12ms", confidence: "100%", tokens: 54 }
  }
];

export function AIProfileTerminal() {
  const [selectedQA, setSelectedQA] = useState<QuestionAnswer>(qaData[0]);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");
    const fullText = selectedQA.response;
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIdx + 3));
        currentIdx += 3;
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [selectedQA]);

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/90 p-4 shadow-xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Bot size={16} className="text-cyan-400 animate-pulse" />
          <span>AI Recruiter Diagnostic Assistant</span>
        </div>
        <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[9px] font-bold text-cyan-300 flex items-center gap-1 font-mono">
          <Zap size={9} className="text-cyan-400" />
          {selectedQA.metrics.latency}
        </span>
      </div>

      {/* Quick Question Chips */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {qaData.map((item) => {
          const isSelected = selectedQA.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedQA(item)}
              className={`text-left p-2 rounded-xl text-[11px] font-semibold transition-all border ${
                isSelected
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-200 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
              }`}
            >
              <div className="truncate">{item.question}</div>
            </button>
          );
        })}
      </div>

      {/* AI Streaming Response Terminal */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 min-h-[95px] text-xs leading-relaxed text-slate-200 font-mono relative">
        <span>{displayedText}</span>
        {isTyping && <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse align-middle ml-1" />}
      </div>

      {/* Telemetry Footer */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>Confidence: <strong className="text-emerald-400">{selectedQA.metrics.confidence}</strong></span>
        <span>Tokens: <strong className="text-cyan-400">{selectedQA.metrics.tokens}</strong></span>
      </div>
    </div>
  );
}
