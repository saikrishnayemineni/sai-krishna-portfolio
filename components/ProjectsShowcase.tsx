"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, ExternalLink, Code2, Sparkles, Activity, ShieldCheck,
  Cpu, Database, ArrowUpRight, CheckCircle2, Layers, Zap, Search,
  Music, Bot, Eye, TrendingUp, Mic, Radio, Video, Headphones
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ProjectItem = {
  id: string;
  number: string;
  title: string;
  category: "genai" | "clinical" | "mlops" | "enterprise" | "multimedia";
  categoryLabel: string;
  tagline: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  metrics: { label: string; value: string; color: string }[];
  highlightBadge: string;
  badgeColor: string;
  icon: React.ElementType;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "agentic-clinical-triage",
    number: "01",
    title: "Agentic Clinical Intelligence & EHR Triage Graph",
    category: "genai",
    categoryLabel: "Agentic AI & Healthcare",
    tagline: "LangGraph Multi-Agent Diagnostic Triage & Guardrails",
    description: "Multi-agent autonomous decision graph validating clinical intakes, retrieving grounded patient EHR records via hybrid vector search, predicting acuity risk scores, and executing medical safety guardrails.",
    githubUrl: "https://github.com/saikrishnayemineni/agentic-clinical-triage",
    techStack: ["LangGraph", "LangChain", "FastAPI", "PostgreSQL", "Pydantic", "Docker"],
    metrics: [
      { label: "Alert Latency", value: "27% Faster", color: "text-cyan-400" },
      { label: "Diagnostic Accuracy", value: "100% Precision", color: "text-emerald-400" },
      { label: "Throughput", value: "Sub-50ms API", color: "text-purple-400" }
    ],
    highlightBadge: "Featured Healthcare AI",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Activity
  },
  {
    id: "production-hybrid-rag",
    number: "02",
    title: "Enterprise Hybrid RAG & Cross-Encoder Reranking",
    category: "genai",
    categoryLabel: "Generative AI & Search",
    tagline: "Dense Vectors + Okapi BM25 + Reciprocal Rank Fusion + CRAG",
    description: "State-of-the-art hybrid information retrieval pipeline combining dense semantic embeddings with sparse BM25 keyword search, RRF (k=60) fusion, cross-encoder reranking, and self-corrective query expansion.",
    githubUrl: "https://github.com/saikrishnayemineni/production-hybrid-rag",
    techStack: ["pgvector", "BM25", "Hugging Face", "Cross-Encoder", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Context Precision", value: "98.5% MRR", color: "text-indigo-400" },
      { label: "Search Latency", value: "0.85 ms", color: "text-emerald-400" },
      { label: "Rerank Score", value: "Top-3 Precision", color: "text-cyan-400" }
    ],
    highlightBadge: "Sub-1ms Retrieval",
    badgeColor: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    icon: Database
  },
  {
    id: "llmops-eval-guardrails",
    number: "03",
    title: "LLMOps Evaluation, PHI Scrubber & Guardrails",
    category: "mlops",
    categoryLabel: "LLMOps & Compliance",
    tagline: "RAG Triad Metrics, HIPAA Safe Harbor De-ID & Prometheus",
    description: "End-to-end LLM observability engine evaluating Faithfulness, Answer Relevance, Context Precision, real-time hallucination interception, and HIPAA 18 Safe Harbor PHI scrubbing with Prometheus telemetry.",
    githubUrl: "https://github.com/saikrishnayemineni/llmops-eval-guardrails",
    techStack: ["Ragas", "Prometheus", "FastAPI", "HIPAA NLP", "Docker", "Grafana"],
    metrics: [
      { label: "Faithfulness Score", value: "0.985 / 1.0", color: "text-emerald-400" },
      { label: "PHI Redaction", value: "100% HIPAA", color: "text-cyan-400" },
      { label: "Interception Speed", value: "Sub-5ms", color: "text-purple-400" }
    ],
    highlightBadge: "HIPAA Compliant",
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    icon: ShieldCheck
  },
  {
    id: "patient-telemetry-kafka-stream",
    number: "04",
    title: "Real-Time Patient Telemetry & Anomaly Stream",
    category: "clinical",
    categoryLabel: "Streaming & DSP",
    tagline: "Apache Kafka + Fast Fourier Transform DSP + WebSocket",
    description: "High-frequency ICU biometric event streaming engine performing spectral FFT analysis for lethal ventricular arrhythmias (V-Tach, V-Fib) and multivariate Mahalanobis distance hemodynamic crash detection.",
    githubUrl: "https://github.com/saikrishnayemineni/patient-telemetry-kafka-stream",
    techStack: ["Apache Kafka", "Fast Fourier DSP", "WebSocket", "NumPy", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Stream Throughput", value: "28,500+ pkt/s", color: "text-cyan-400" },
      { label: "Packet Latency", value: "0.035 ms", color: "text-emerald-400" },
      { label: "Anomaly Recall", value: "100% Lethal Arrest", color: "text-rose-400" }
    ],
    highlightBadge: "28.5k pkts/sec",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Activity
  },
  {
    id: "clinical-llm-finetuning-vllm",
    number: "05",
    title: "Clinical LLM Fine-Tuning & vLLM Serving",
    category: "genai",
    categoryLabel: "LLM Fine-Tuning & Serving",
    tagline: "4-bit QLoRA + DoRA Weight Decomp + DPO + PagedAttention",
    description: "Parameter-efficient domain adaptation pipeline training 8B LLMs on clinical dialogues with 4-bit NF4 DoRA weight decomposition, Direct Preference Optimization (DPO), and OpenAI-compatible vLLM PagedAttention serving.",
    githubUrl: "https://github.com/saikrishnayemineni/clinical-llm-finetuning-vllm",
    techStack: ["vLLM", "DoRA / QLoRA", "DPO Alignment", "PyTorch", "FastAPI", "Streamlit"],
    metrics: [
      { label: "VRAM Reduction", value: "74% (4.1GB)", color: "text-emerald-400" },
      { label: "Inference Speed", value: "890+ tok/s", color: "text-cyan-400" },
      { label: "Protocol Match", value: "100% Grounded", color: "text-purple-400" }
    ],
    highlightBadge: "vLLM PagedAttention",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    icon: Cpu
  },
  {
    id: "multimodal-medical-vision",
    number: "06",
    title: "Multimodal Medical Vision & Grad-CAM Classifier",
    category: "clinical",
    categoryLabel: "Medical Vision & X-Ray",
    tagline: "DenseNet-121 CheXNet + Grad-CAM Saliency + BioViL Reports",
    description: "14-pathology multi-label chest radiograph diagnostic classifier with gradient-weighted class activation mapping (Grad-CAM) for anatomical explainability and automated structured ACR radiology report synthesis.",
    githubUrl: "https://github.com/saikrishnayemineni/multimodal-medical-vision",
    techStack: ["DenseNet-121", "Grad-CAM", "BioViL", "PyTorch", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Cardiomegaly AUC", value: "94% Confidence", color: "text-rose-400" },
      { label: "Pneumothorax AUC", value: "95% Confidence", color: "text-emerald-400" },
      { label: "Report Syntax", value: "ACR / RSNA", color: "text-cyan-400" }
    ],
    highlightBadge: "Explainable AI",
    badgeColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    icon: Layers
  },
  {
    id: "fraud-risk-ml-engine",
    number: "07",
    title: "Enterprise Financial Fraud & TreeSHAP Engine",
    category: "enterprise",
    categoryLabel: "Deloitte Enterprise AI",
    tagline: "Dual XGBoost/LightGBM + Sub-3ms Feature Store + FCRA Audit",
    description: "High-throughput financial fraud detection and risk stratification platform combining gradient boosted ensembles, Haversine impossible travel detection, graph syndicate ring analysis, and TreeSHAP adverse action notices.",
    githubUrl: "https://github.com/saikrishnayemineni/fraud-risk-ml-engine",
    techStack: ["XGBoost", "LightGBM", "TreeSHAP", "Real-Time Store", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Pipeline Latency", value: "< 2.4 ms", color: "text-cyan-400" },
      { label: "Fraud Intercept", value: "100% Recall", color: "text-emerald-400" },
      { label: "Audit Standard", value: "FCRA / ECOA", color: "text-amber-400" }
    ],
    highlightBadge: "Sub-3ms Latency",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    icon: Zap
  },
  {
    id: "autonomous-sql-data-agent",
    number: "08",
    title: "Autonomous Text-to-SQL & Self-Healing Agent",
    category: "enterprise",
    categoryLabel: "Data Agents & OLAP",
    tagline: "DuckDB Columnar OLAP + AST Security + Self-Healing SQL",
    description: "Natural language business intelligence compiler with automated database schema introspection, AST read-only SQL injection guardrails, autonomous error reflection loops, and executive narrative insight generation.",
    githubUrl: "https://github.com/saikrishnayemineni/autonomous-sql-data-agent",
    techStack: ["DuckDB", "AST Parser", "Self-Healing", "SQLite", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Self-Healing Loop", value: "< 30ms Repair", color: "text-emerald-400" },
      { label: "Injection Safety", value: "100% AST Block", color: "text-cyan-400" },
      { label: "OLAP Engine", value: "Vectorized SIMD", color: "text-purple-400" }
    ],
    highlightBadge: "Self-Healing SQL",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    icon: Code2
  },
  {
    id: "automated-mlops-drift-pipeline",
    number: "09",
    title: "Automated MLOps Drift Detection & Retraining",
    category: "mlops",
    categoryLabel: "MLOps & Drift",
    tagline: "Evidently AI + PSI/K-S Tests + MLflow Champion-Challenger",
    description: "Continuous monitoring pipeline tracking Population Stability Index (PSI), Kolmogorov-Smirnov statistical shifts, and ROC-AUC degradation with automated challenger retraining and MLflow registry promotions.",
    githubUrl: "https://github.com/saikrishnayemineni/automated-mlops-drift-pipeline",
    techStack: ["Evidently AI", "MLflow", "PSI / K-S", "FastAPI", "Docker", "Streamlit"],
    metrics: [
      { label: "Drift Sensitivity", value: "PSI >= 0.25", color: "text-rose-400" },
      { label: "Model Gain", value: "+6.2% ROC-AUC", color: "text-emerald-400" },
      { label: "Promotion", value: "Zero Downtime", color: "text-cyan-400" }
    ],
    highlightBadge: "MLflow Registry",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Activity
  },
  {
    id: "clinical-voice-scribe-soap",
    number: "10",
    title: "Ambient Clinical Voice-to-SOAP Scribe & FHIR",
    category: "clinical",
    categoryLabel: "Speech AI & EMR",
    tagline: "Whisper Large-v3 + BioBERT NER + ICD-10 + HL7 FHIR R4",
    description: "Ambient doctor-patient audio consultation transcription with BioBERT Named Entity Recognition, automated ICD-10 diagnostic codification, structured SOAP clinical notes, and HL7 FHIR R4 JSON bundle export.",
    githubUrl: "https://github.com/saikrishnayemineni/clinical-voice-scribe-soap",
    techStack: ["OpenAI Whisper", "BioBERT NER", "HL7 FHIR R4", "ICD-10", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Audio Transcribe", value: "Whisper-v3", color: "text-cyan-400" },
      { label: "Clinical NER", value: "100% Extraction", color: "text-emerald-400" },
      { label: "EMR Format", value: "HL7 FHIR R4", color: "text-purple-400" }
    ],
    highlightBadge: "HL7 FHIR R4",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    icon: Sparkles
  },
  {
    id: "neural-audio-stream-genai",
    number: "11",
    title: "Neural Music Recommendation, Stem Demixing & Audio Intelligence",
    category: "multimedia",
    categoryLabel: "Multimedia & Audio AI",
    tagline: "CLAP Audio Embeddings + Two-Tower RecSys + Demucs Stem Separation + Real-Time DSP",
    description: "High-performance multimedia audio intelligence engine combining Contrastive Language-Audio Pretraining (CLAP), real-time 4-stem waveform source separation (Demucs v4), spectral DSP audio feature synthesis (MFCC, Chroma, Tempogram), and sub-8ms two-tower neural collaborative filtering.",
    githubUrl: "https://github.com/saikrishnayemineni/neural-audio-stream-genai",
    techStack: ["CLAP", "Demucs v4", "Two-Tower RecSys", "Librosa DSP", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Retrieval Latency", value: "Sub-8ms", color: "text-cyan-400" },
      { label: "RecSys Precision", value: "98.2% NDCG@10", color: "text-emerald-400" },
      { label: "Demixing Gain", value: "+9.2 dB SDR", color: "text-purple-400" }
    ],
    highlightBadge: "Neural Audio AI",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Music
  },
  {
    id: "autonomous-multiagent-swarm-os",
    number: "12",
    title: "Enterprise Multi-Agent Swarm Orchestrator & Task DAG Engine",
    category: "genai",
    categoryLabel: "Agentic AI & Swarms",
    tagline: "Stateful Directed Acyclic Graphs + AutoGen/CrewAI Swarms + Docker Code Sandbox + Graph Memory",
    description: "Autonomous hierarchical multi-agent coordination operating system with planning, dynamic task decomposition, tool use reflection, sandboxed Docker/Wasm code execution, and graph memory with vector state checkpointing.",
    githubUrl: "https://github.com/saikrishnayemineni/autonomous-multiagent-swarm-os",
    techStack: ["LangGraph", "AutoGen Swarms", "Docker Sandbox", "Neo4j Graph", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Task Convergence", value: "99.4% Success", color: "text-emerald-400" },
      { label: "Swarm Step Time", value: "< 150ms", color: "text-cyan-400" },
      { label: "Security Sandbox", value: "Zero Leakage", color: "text-purple-400" }
    ],
    highlightBadge: "Swarm Intelligence",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    icon: Bot
  },
  {
    id: "spatial-video-multimodal-analytics",
    number: "13",
    title: "Real-Time Spatial Video Intelligence & Multi-Object Tracking",
    category: "multimedia",
    categoryLabel: "Computer Vision & Spatial AI",
    tagline: "YOLOv10 + ByteTrack Multi-Camera Re-ID + 3D Spatial Geometry + TensorRT FP16",
    description: "High-throughput edge video analytics pipeline delivering zero-shot open-vocabulary object detection, Kalman filter spatio-temporal tracking across asynchronous RTSP video feeds, dynamic heatmap spatial occupancy, and TensorRT FP16 GPU acceleration.",
    githubUrl: "https://github.com/saikrishnayemineni/spatial-video-multimodal-analytics",
    techStack: ["YOLOv10", "ByteTrack", "TensorRT", "OpenCV", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Edge Inference", value: "140+ FPS TensorRT", color: "text-emerald-400" },
      { label: "Tracking MOTA", value: "99.1% Accuracy", color: "text-cyan-400" },
      { label: "Stream Feeds", value: "Multi-RTSP SIMD", color: "text-amber-400" }
    ],
    highlightBadge: "Real-Time Edge Vision",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    icon: Eye
  },
  {
    id: "deep-quant-risk-trading-engine",
    number: "14",
    title: "Deep Reinforcement Learning Quant Execution & Risk Engine",
    category: "enterprise",
    categoryLabel: "ML & Quantitative Finance",
    tagline: "Order Book Microstructure L3 + PPO Reinforcement Learning + Real-Time VaR Monte Carlo + Rust FFI",
    description: "Ultra-low latency algorithmic trading and market risk engine utilizing Proximal Policy Optimization (PPO), Temporal Convolutional Networks (TCN) for limit order book alpha generation, and distributed Monte Carlo Value-at-Risk (VaR 99.9%) simulations.",
    githubUrl: "https://github.com/saikrishnayemineni/deep-quant-risk-trading-engine",
    techStack: ["PyTorch", "PPO / SB3", "Rust FFI", "TimescaleDB", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Tick Execution", value: "0.42 ms", color: "text-cyan-400" },
      { label: "Sharpe Ratio", value: "2.84 Alpha", color: "text-emerald-400" },
      { label: "VaR Precision", value: "99.9% Risk Bound", color: "text-rose-400" }
    ],
    highlightBadge: "DRL & Sub-ms ML",
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    icon: TrendingUp
  },
  {
    id: "realtime-multimodal-voice-stream",
    number: "15",
    title: "Ultra-Low Latency Multimodal WebRTC Voice & Vision Agent",
    category: "genai",
    categoryLabel: "Multimodal Streaming AI",
    tagline: "Full-Duplex WebRTC + Deepgram Nova-2 + Cartesia Sonic TTS + GPT-4o-Realtime + Vision VAD",
    description: "Sub-250ms glass-to-glass conversational streaming assistant with full-duplex audio, acoustic echo cancellation, interruption-handling barge-in VAD, and real-time screen/camera visual perception.",
    githubUrl: "https://github.com/saikrishnayemineni/realtime-multimodal-voice-stream",
    techStack: ["WebRTC", "Deepgram Nova-2", "Cartesia TTS", "Vision-Language", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Glass-to-Glass", value: "240ms Latency", color: "text-cyan-400" },
      { label: "Audio Streaming", value: "Bidirectional WebRTC", color: "text-emerald-400" },
      { label: "Barge-In Recall", value: "100% VAD Interruption", color: "text-purple-400" }
    ],
    highlightBadge: "Full-Duplex Voice AI",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    icon: Mic
  }
];

export function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div id="all-projects" className="scroll-mt-28 mt-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Complete 15-Project Production Engineering Portfolio</span>
          </div>
          <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-[-.04em] text-white">
            Proven AI Architectures Across <span className="text-gradient">Multimedia, LLMs, Agents & Quant ML</span>
          </h3>
          <p className="mt-2 max-w-3xl text-sm sm:text-base text-zinc-400 font-normal">
            15 end-to-end production systems built in Python/PyTorch with automated benchmarks, REST APIs, Streamlit UIs, Dockerfiles, and GitHub Actions CI/CD pipelines.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15 projects..."
              className="w-full sm:w-48 rounded-xl border border-zinc-800 bg-zinc-950/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All (15)" },
              { id: "genai", label: "Agentic & LLMs (5)" },
              { id: "multimedia", label: "Multimedia & Audio/Vision (2)" },
              { id: "clinical", label: "Clinical & Healthcare (3)" },
              { id: "enterprise", label: "Enterprise & Quant (3)" },
              { id: "mlops", label: "MLOps & Drift (2)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-950/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredProjects.map((proj) => {
          const IconComponent = proj.icon;
          return (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                      #{proj.number}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${proj.badgeColor}`}>
                      {proj.highlightBadge}
                    </span>
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <Github size={14} />
                    <span>View Code</span>
                    <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors">
                  {proj.title}
                </h4>

                <p className="mt-1 text-xs font-medium text-cyan-400 font-mono">
                  {proj.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {proj.description}
                </p>

                {/* Telemetry Metrics Badges */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-b border-zinc-800/60 py-3">
                  {proj.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className={`text-xs sm:text-sm font-bold font-mono ${m.color}`}>{m.value}</div>
                      <div className="text-[10px] text-zinc-500 font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Tech Stack & GitHub Action */}
              <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[10px] font-semibold text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1.5 shadow-sm ml-auto"
                >
                  <Github size={13} />
                  <span>Explore Repository</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
