"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Mail,
  Linkedin,
  Github,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  X,
  GraduationCap,
  Database,
  Zap,
  Music,
  Bot,
  Eye,
  TrendingUp,
  Mic
} from "lucide-react";

interface ActionItem {
  id: string;
  category: "Navigation" | "Actions" | "AI Diagnostics";
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  badge?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          const btn = document.getElementById("cmd-palette-toggle");
          if (btn) btn.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items: ActionItem[] = useMemo(
    () => [
      {
        id: "nav-about",
        category: "Navigation",
        title: "About & Philosophy",
        subtitle: "Jump to engineering philosophy & system steps",
        icon: Sparkles,
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-projects",
        category: "Navigation",
        title: "Featured Project & Architecture",
        subtitle: "Agentic Clinical Intelligence Platform",
        icon: Cpu,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-experience",
        category: "Navigation",
        title: "Experience (J&J & Deloitte)",
        subtitle: "Production AI systems and track record",
        icon: Activity,
        action: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-skills",
        category: "Navigation",
        title: "Skills & Tech Stack",
        subtitle: "40+ tools & methodologies across the full AI lifecycle",
        icon: Layers,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-certifications",
        category: "Navigation",
        title: "Cloud & AI Certifications",
        subtitle: "AWS ML, AWS AI Practitioner & GCP GenAI Leader",
        icon: ShieldCheck,
        action: () => {
          document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-education",
        category: "Navigation",
        title: "Education Credentials",
        subtitle: "M.S. Computer Science (Rivier) & B.Tech (KL Univ)",
        icon: GraduationCap,
        action: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "action-resume",
        category: "Actions",
        title: "View & Download Resume",
        subtitle: "Interactive verified PDF preview",
        icon: FileText,
        badge: "PDF",
        action: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: "action-email",
        category: "Actions",
        title: "Send Direct Email",
        subtitle: "saikrishnayemineni0428@gmail.com",
        icon: Mail,
        badge: "Email",
        action: () => {
          window.location.href = "mailto:saikrishnayemineni0428@gmail.com";
          onClose();
        },
      },
      {
        id: "action-linkedin",
        category: "Actions",
        title: "Open LinkedIn Profile",
        subtitle: "Connect with Sai Krishna Yemineni",
        icon: Linkedin,
        badge: "Connect",
        action: () => {
          window.open("https://www.linkedin.com/in/sai-krishna-y-b8a04a293", "_blank");
          onClose();
        },
      },
      {
        id: "nav-all-projects",
        category: "Navigation",
        title: "All 15 Production Projects",
        subtitle: "Explore complete 15-project engineering showcase",
        icon: Cpu,
        badge: "15 Projects",
        action: () => {
          document.getElementById("all-projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "proj-1",
        category: "AI Diagnostics",
        title: "01 · Agentic Clinical Intelligence",
        subtitle: "LangGraph Multi-Agent EHR Triage Graph",
        icon: Activity,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/agentic-clinical-triage", "_blank");
          onClose();
        },
      },
      {
        id: "proj-2",
        category: "AI Diagnostics",
        title: "02 · Production Hybrid RAG & Reranking",
        subtitle: "Dense + BM25 + Reciprocal Rank Fusion",
        icon: Database,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/production-hybrid-rag", "_blank");
          onClose();
        },
      },
      {
        id: "proj-3",
        category: "AI Diagnostics",
        title: "03 · LLMOps Eval & Guardrails",
        subtitle: "RAG Triad, HIPAA PHI Scrubber & Prometheus",
        icon: ShieldCheck,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/llmops-eval-guardrails", "_blank");
          onClose();
        },
      },
      {
        id: "proj-4",
        category: "AI Diagnostics",
        title: "04 · Patient Telemetry Kafka Stream",
        subtitle: "Real-Time FFT DSP & ICU Anomaly Detection",
        icon: Activity,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/patient-telemetry-kafka-stream", "_blank");
          onClose();
        },
      },
      {
        id: "proj-5",
        category: "AI Diagnostics",
        title: "05 · Clinical LLM Fine-Tuning & vLLM",
        subtitle: "4-bit QLoRA, DoRA, DPO & PagedAttention",
        icon: Cpu,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/clinical-llm-finetuning-vllm", "_blank");
          onClose();
        },
      },
      {
        id: "proj-6",
        category: "AI Diagnostics",
        title: "06 · Multimodal Medical Vision & Grad-CAM",
        subtitle: "DenseNet-121 14-Pathology Radiology AI",
        icon: Layers,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/multimodal-medical-vision", "_blank");
          onClose();
        },
      },
      {
        id: "proj-7",
        category: "AI Diagnostics",
        title: "07 · Enterprise Financial Fraud Engine",
        subtitle: "XGBoost + LightGBM + TreeSHAP (Deloitte)",
        icon: Zap,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/fraud-risk-ml-engine", "_blank");
          onClose();
        },
      },
      {
        id: "proj-8",
        category: "AI Diagnostics",
        title: "08 · Autonomous Text-to-SQL Data Agent",
        subtitle: "DuckDB OLAP + AST Security + Self-Healing",
        icon: Layers,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/autonomous-sql-data-agent", "_blank");
          onClose();
        },
      },
      {
        id: "proj-9",
        category: "AI Diagnostics",
        title: "09 · Automated MLOps Drift Pipeline",
        subtitle: "Evidently AI + PSI + MLflow Champion-Challenger",
        icon: Activity,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/automated-mlops-drift-pipeline", "_blank");
          onClose();
        },
      },
      {
        id: "proj-10",
        category: "AI Diagnostics",
        title: "10 · Ambient Clinical Voice Scribe & FHIR",
        subtitle: "Whisper-v3 + BioBERT NER + HL7 FHIR R4",
        icon: Sparkles,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/clinical-voice-scribe-soap", "_blank");
          onClose();
        },
      },
      {
        id: "proj-11",
        category: "AI Diagnostics",
        title: "11 · Neural Music & Audio Intelligence",
        subtitle: "CLAP Embeddings + Demucs Stem Separation + RecSys",
        icon: Music,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/neural-audio-stream-genai", "_blank");
          onClose();
        },
      },
      {
        id: "proj-12",
        category: "AI Diagnostics",
        title: "12 · Multi-Agent Swarm Orchestrator OS",
        subtitle: "LangGraph + AutoGen Swarms + Docker Sandbox",
        icon: Bot,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/autonomous-multiagent-swarm-os", "_blank");
          onClose();
        },
      },
      {
        id: "proj-13",
        category: "AI Diagnostics",
        title: "13 · Real-Time Spatial Video & Tracking",
        subtitle: "YOLOv10 + ByteTrack Multi-Camera + TensorRT",
        icon: Eye,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/spatial-video-multimodal-analytics", "_blank");
          onClose();
        },
      },
      {
        id: "proj-14",
        category: "AI Diagnostics",
        title: "14 · Deep Reinforcement Learning Quant ML",
        subtitle: "PPO + L3 Order Book + Real-Time VaR Monte Carlo",
        icon: TrendingUp,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/deep-quant-risk-trading-engine", "_blank");
          onClose();
        },
      },
      {
        id: "proj-15",
        category: "AI Diagnostics",
        title: "15 · Real-Time WebRTC Voice & Vision Agent",
        subtitle: "Full-Duplex Deepgram + Cartesia TTS + Vision VAD",
        icon: Mic,
        badge: "GitHub",
        action: () => {
          window.open("https://github.com/saikrishnayemineni/realtime-multimodal-voice-stream", "_blank");
          onClose();
        },
      },
      {
        id: "action-github",
        category: "Actions",
        title: "Open GitHub Repositories",
        subtitle: "View all 15 open-source repositories",
        icon: Github,
        badge: "Code",
        action: () => {
          window.open("https://github.com/saikrishnayemineni", "_blank");
          onClose();
        },
      },
    ],
    [onClose, onOpenResume]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Command Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-950/95 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-2xl"
          >
            {/* Top Search Input */}
            <div className="flex items-center gap-3 border-b border-slate-800/80 px-4 py-3.5 bg-slate-900/60">
              <Search size={18} className="text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search portfolio, actions, or jump to section... (Press Esc to close)"
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <span className="rounded-md border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-all hover:bg-cyan-500/15 hover:border hover:border-cyan-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-110 transition-transform">
                          <Icon size={15} />
                        </span>
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-white flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="rounded border border-cyan-500/40 bg-cyan-500/10 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-400 group-hover:text-slate-300">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  No matching results for &quot;{query}&quot;. Try typing &quot;resume&quot;, &quot;skills&quot;, or &quot;projects&quot;.
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="border-t border-slate-800/80 px-4 py-2.5 bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Command size={12} className="text-cyan-400" />
                <span>Command Center</span>
              </span>
              <span>Sai Krishna Portfolio v2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
