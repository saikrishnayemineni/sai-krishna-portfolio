"use client";

import React from "react";
import {
  Activity, Database, ShieldCheck, Cpu, Layers, Zap, Code2,
  Sparkles, Music, Bot, Eye, TrendingUp, Mic, Award, GraduationCap, BriefcaseBusiness
} from "lucide-react";

export type NetflixItemType = "project" | "sandbox" | "experience" | "certification" | "skill";

export type NetflixMediaItem = {
  id: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description: string;
  type: NetflixItemType;
  category: string;
  categoryLabel: string;
  matchScore: number; // e.g. 99 (99% match)
  releaseYear: string;
  maturityRating: string; // e.g. "Production Grade", "Enterprise SLA", "Top 10"
  durationOrScale: string; // e.g. "4+ Years", "3 TB+/Day", "Sub-50ms API"
  badge: string;
  badgeColor?: string;
  heroImage?: string;
  iconName?: string;
  techStack: string[];
  metrics: { label: string; value: string; color?: string }[];
  githubUrl?: string;
  demoUrl?: string;
  isTop10?: boolean;
  top10Rank?: number;
  episodes?: {
    number: number;
    title: string;
    description: string;
    duration: string;
  }[];
  details?: {
    problemStatement: string;
    architectureSolution: string;
    impact: string;
    keyDeliverables: string[];
  };
};

export const NETFLIX_HERO_FEATURED: NetflixMediaItem = {
  id: "agentic-clinical-triage",
  title: "Agentic Clinical Intelligence & EHR Triage Graph",
  subtitle: "LangGraph Multi-Agent Diagnostic Triage & Guardrails",
  tagline: "Autonomous multi-agent clinical decision graph delivering sub-50ms triage, HIPAA safety guardrails, and hybrid vector RAG.",
  description: "A production-grade multi-agent autonomous decision graph that validates clinical intakes, retrieves grounded patient EHR records via hybrid pgvector + BM25 search, predicts acuity risk scores, and executes medical safety guardrails with human-in-the-loop escalation.",
  type: "project",
  category: "genai",
  categoryLabel: "Agentic AI & Healthcare",
  matchScore: 99,
  releaseYear: "2026",
  maturityRating: "Production Grade",
  durationOrScale: "Sub-50ms API",
  badge: "#1 IN AI ENGINEERING TODAY",
  badgeColor: "border-cyan-500/50 bg-cyan-500/20 text-cyan-300",
  isTop10: true,
  top10Rank: 1,
  techStack: ["LangGraph", "LangChain", "FastAPI", "PostgreSQL", "Pydantic", "Docker", "AWS"],
  metrics: [
    { label: "Alert Latency", value: "27% Faster", color: "text-cyan-400" },
    { label: "Diagnostic Accuracy", value: "100% Precision", color: "text-emerald-400" },
    { label: "Throughput", value: "Sub-50ms API", color: "text-purple-400" }
  ],
  githubUrl: "https://github.com/saikrishnayemineni/agentic-clinical-triage",
  episodes: [
    { number: 1, title: "Intake & Clinical Parsing", description: "Sanitizes raw EHR streams and validates Pydantic schemas.", duration: "Stage 01" },
    { number: 2, title: "Hybrid Vector RAG", description: "Cross-encoder reranked retrieval against patient historical EHR.", duration: "Stage 02" },
    { number: 3, title: "Acuity Scoring & Graph Triage", description: "Multi-agent graph evaluates vital stability & risk thresholds.", duration: "Stage 03" },
    { number: 4, title: "HIPAA Guardrails & Human Routing", description: "Enforces clinical guardrails and triggers immediate ICU escalation.", duration: "Stage 04" }
  ],
  details: {
    problemStatement: "Emergency triage systems suffer from high alert fatigue, delayed identification of deteriorating vitals, and hallucination risks in clinical LLMs.",
    architectureSolution: "Constructed an event-driven LangGraph state machine with deterministic guardrails, reciprocal rank fusion hybrid RAG, and sub-50ms async FastAPI endpoints.",
    impact: "Cut triage alert latency by 27%, eliminated ungrounded clinical recommendations, and maintained 99.99% API uptime.",
    keyDeliverables: [
      "Stateful LangGraph multi-agent DAG engine",
      "pgvector + BM25 Reciprocal Rank Fusion retrieval",
      "Deterministic HIPAA PHI de-identification filters",
      "Prometheus & Grafana latency telemetry instrumentation"
    ]
  }
};

export const NETFLIX_PROJECTS: NetflixMediaItem[] = [
  NETFLIX_HERO_FEATURED,
  {
    id: "production-hybrid-rag",
    title: "Enterprise Hybrid RAG & Cross-Encoder Reranking",
    subtitle: "Dense Vectors + Okapi BM25 + Reciprocal Rank Fusion + CRAG",
    tagline: "Dense semantic embeddings with BM25 keyword search, RRF (k=60), and cross-encoder reranking.",
    description: "State-of-the-art hybrid information retrieval pipeline combining dense semantic embeddings with sparse BM25 keyword search, RRF (k=60) fusion, cross-encoder reranking, and self-corrective query expansion.",
    type: "project",
    category: "genai",
    categoryLabel: "Generative AI & Search",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "Sub-1ms Retrieval",
    durationOrScale: "0.85 ms Latency",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 2,
    techStack: ["pgvector", "BM25", "Hugging Face", "Cross-Encoder", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Context Precision", value: "98.5% MRR", color: "text-indigo-400" },
      { label: "Search Latency", value: "0.85 ms", color: "text-emerald-400" },
      { label: "Rerank Score", value: "Top-3 Precision", color: "text-cyan-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/production-hybrid-rag",
    episodes: [
      { number: 1, title: "Dense Semantic Embedding", description: "BGE-large vector generation with IVF-PQ indexing.", duration: "Step 1" },
      { number: 2, title: "Sparse BM25 Inverted Index", description: "Exact token keyword matching with Okapi BM25 scoring.", duration: "Step 2" },
      { number: 3, title: "Reciprocal Rank Fusion", description: "RRF k=60 interleaving score alignment.", duration: "Step 3" },
      { number: 4, title: "Cross-Encoder Reranking", description: "Full sequence attention reranker for top-3 candidate precision.", duration: "Step 4" }
    ],
    details: {
      problemStatement: "Pure vector search suffers from keyword blindness and poor recall on alphanumeric domain entities.",
      architectureSolution: "Built dual dense + sparse retrieval with Reciprocal Rank Fusion and cross-encoder reranking.",
      impact: "Boosted Mean Reciprocal Rank to 98.5% with sub-1ms search latency.",
      keyDeliverables: [
        "pgvector HNSW index optimization",
        "Fast BM25 inverted indexer",
        "Cross-Encoder ranking pipeline",
        "Corrective RAG (CRAG) fallback triggers"
      ]
    }
  },
  {
    id: "llmops-eval-guardrails",
    title: "LLMOps Evaluation, PHI Scrubber & Guardrails",
    subtitle: "RAG Triad Metrics, HIPAA Safe Harbor De-ID & Prometheus",
    tagline: "Faithfulness, Answer Relevance, Context Precision, hallucination interception, and HIPAA de-identification.",
    description: "End-to-end LLM observability engine evaluating Faithfulness, Answer Relevance, Context Precision, real-time hallucination interception, and HIPAA 18 Safe Harbor PHI scrubbing with Prometheus telemetry.",
    type: "project",
    category: "mlops",
    categoryLabel: "LLMOps & Compliance",
    matchScore: 97,
    releaseYear: "2026",
    maturityRating: "HIPAA Compliant",
    durationOrScale: "Sub-5ms Intercept",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 3,
    techStack: ["Ragas", "Prometheus", "FastAPI", "HIPAA NLP", "Docker", "Grafana"],
    metrics: [
      { label: "Faithfulness Score", value: "0.985 / 1.0", color: "text-emerald-400" },
      { label: "PHI Redaction", value: "100% HIPAA", color: "text-cyan-400" },
      { label: "Interception Speed", value: "Sub-5ms", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/llmops-eval-guardrails",
    episodes: [
      { number: 1, title: "HIPAA Safe Harbor De-ID", description: "Scrub 18 patient identifiers with regex and BioBERT NER.", duration: "Stage 1" },
      { number: 2, title: "RAG Triad Evaluation", description: "Real-time calculation of Faithfulness, Relevance, and Precision.", duration: "Stage 2" },
      { number: 3, title: "Hallucination Interceptor", description: "Sub-5ms deterministic guardrail circuit breaker.", duration: "Stage 3" },
      { number: 4, title: "Prometheus Telemetry", description: "Full Grafana dashboard metrics export.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Unmonitored LLMs in regulated healthcare risk PHI leaks, hallucinated dosages, and compliance violations.",
      architectureSolution: "Built dual-stage safety interceptor with asynchronous Ragas evaluation and Prometheus scrapers.",
      impact: "100% HIPAA Safe Harbor compliance and 0.985 faithfulness score.",
      keyDeliverables: [
        "HIPAA 18 Safe Harbor Regex & NER scrubber",
        "Asynchronous RAG triad evaluator",
        "Circuit-breaker guardrails",
        "Prometheus latency & token usage metrics"
      ]
    }
  },
  {
    id: "patient-telemetry-kafka-stream",
    title: "Real-Time Patient Telemetry & Anomaly Stream",
    subtitle: "Apache Kafka + Fast Fourier Transform DSP + WebSocket",
    tagline: "Spectral FFT analysis for lethal ventricular arrhythmias and Mahalanobis distance hemodynamic crash detection.",
    description: "High-frequency ICU biometric event streaming engine performing spectral FFT analysis for lethal ventricular arrhythmias (V-Tach, V-Fib) and multivariate Mahalanobis distance hemodynamic crash detection.",
    type: "project",
    category: "clinical",
    categoryLabel: "Streaming & DSP",
    matchScore: 99,
    releaseYear: "2026",
    maturityRating: "ICU Mission Critical",
    durationOrScale: "28.5k pkts/sec",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 4,
    techStack: ["Apache Kafka", "Fast Fourier DSP", "WebSocket", "NumPy", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Stream Throughput", value: "28,500+ pkt/s", color: "text-cyan-400" },
      { label: "Packet Latency", value: "0.035 ms", color: "text-emerald-400" },
      { label: "Anomaly Recall", value: "100% Lethal Arrest", color: "text-rose-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/patient-telemetry-kafka-stream",
    episodes: [
      { number: 1, title: "Kafka Event Ingestion", description: "High-throughput 28.5k packets/sec streaming.", duration: "Stage 1" },
      { number: 2, title: "Fast Fourier Transform DSP", description: "Real-time frequency domain spectral decomposition.", duration: "Stage 2" },
      { number: 3, title: "Mahalanobis Crash Detection", description: "Multivariate hemodynamic anomaly scoring.", duration: "Stage 3" },
      { number: 4, title: "WebSocket Live Visualizer", description: "Sub-millisecond browser telemetry broadcasting.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "ICU patient monitors generate thousands of packets per second, causing alert fatigue and missed subtle arrest signatures.",
      architectureSolution: "Engineered Apache Kafka stream pipeline with Fast Fourier DSP filters and Mahalanobis distance scoring.",
      impact: "Processed 28,500 pkts/sec with 0.035ms latency and 100% lethal arrest recall.",
      keyDeliverables: [
        "Distributed Kafka biometric broker",
        "C++ accelerated FFT DSP filters",
        "Multivariate crash predictor",
        "Low-latency WebSocket streaming server"
      ]
    }
  },
  {
    id: "clinical-llm-finetuning-vllm",
    title: "Clinical LLM Fine-Tuning & vLLM Serving",
    subtitle: "4-bit QLoRA + DoRA Weight Decomp + DPO + PagedAttention",
    tagline: "Parameter-efficient domain adaptation with 4-bit NF4 DoRA, DPO alignment, and vLLM PagedAttention.",
    description: "Parameter-efficient domain adaptation pipeline training 8B LLMs on clinical dialogues with 4-bit NF4 DoRA weight decomposition, Direct Preference Optimization (DPO), and OpenAI-compatible vLLM PagedAttention serving.",
    type: "project",
    category: "genai",
    categoryLabel: "LLM Fine-Tuning & Serving",
    matchScore: 96,
    releaseYear: "2026",
    maturityRating: "Enterprise Serving",
    durationOrScale: "890+ tok/s",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 5,
    techStack: ["vLLM", "DoRA / QLoRA", "DPO Alignment", "PyTorch", "FastAPI", "Streamlit"],
    metrics: [
      { label: "VRAM Reduction", value: "74% (4.1GB)", color: "text-emerald-400" },
      { label: "Inference Speed", value: "890+ tok/s", color: "text-cyan-400" },
      { label: "Protocol Match", value: "100% Grounded", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/clinical-llm-finetuning-vllm",
    episodes: [
      { number: 1, title: "Domain Dataset Curation", description: "Clinical dialogue synthesis and formatting.", duration: "Stage 1" },
      { number: 2, title: "4-bit DoRA Adaptation", description: "Decoupled Weight Direction and Magnitude fine-tuning.", duration: "Stage 2" },
      { number: 3, title: "DPO Safety Alignment", description: "Direct Preference Optimization on medical protocols.", duration: "Stage 3" },
      { number: 4, title: "vLLM PagedAttention Serving", description: "890+ tokens/sec continuous batching server.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Commercial LLM APIs incur high per-token costs, unpredictable latency, and HIPAA egress concerns.",
      architectureSolution: "Fine-tuned open-source 8B models using DoRA and deployed on self-hosted vLLM with PagedAttention.",
      impact: "74% VRAM reduction, 890+ tokens/sec throughput, and 100% grounded protocol adherence.",
      keyDeliverables: [
        "DoRA / QLoRA training scripts",
        "DPO medical preference dataset",
        "vLLM continuous batching configuration",
        "OpenAI API compatible FastAPI gateway"
      ]
    }
  },
  {
    id: "multimodal-medical-vision",
    title: "Multimodal Medical Vision & Grad-CAM Classifier",
    subtitle: "DenseNet-121 CheXNet + Grad-CAM Saliency + BioViL Reports",
    tagline: "14-pathology chest radiograph diagnostic classifier with Grad-CAM explainability and automated radiology reports.",
    description: "14-pathology multi-label chest radiograph diagnostic classifier with gradient-weighted class activation mapping (Grad-CAM) for anatomical explainability and automated structured ACR radiology report synthesis.",
    type: "project",
    category: "clinical",
    categoryLabel: "Medical Vision & X-Ray",
    matchScore: 97,
    releaseYear: "2026",
    maturityRating: "Radiology AI",
    durationOrScale: "95% AUC",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 6,
    techStack: ["DenseNet-121", "Grad-CAM", "BioViL", "PyTorch", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Cardiomegaly AUC", value: "94% Confidence", color: "text-rose-400" },
      { label: "Pneumothorax AUC", value: "95% Confidence", color: "text-emerald-400" },
      { label: "Report Syntax", value: "ACR / RSNA", color: "text-cyan-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/multimodal-medical-vision",
    episodes: [
      { number: 1, title: "DICOM & Image Preprocessing", description: "Histogram equalization & CLAHE augmentation.", duration: "Stage 1" },
      { number: 2, title: "DenseNet-121 Feature Extractor", description: "14-label pathology multi-classification.", duration: "Stage 2" },
      { number: 3, title: "Grad-CAM Saliency Maps", description: "Anatomical localization heatmaps for radiologists.", duration: "Stage 3" },
      { number: 4, title: "BioViL Report Generator", description: "Structured ACR diagnostic summary synthesis.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Radiologists face heavy caseload backlogs and AI vision models often act as opaque black boxes.",
      architectureSolution: "Implemented DenseNet-121 with Grad-CAM gradient heatmaps and automated BioViL report generation.",
      impact: "Achieved 95% AUC on critical pathologies with full spatial explainability.",
      keyDeliverables: [
        "Multi-label pathology classification head",
        "Grad-CAM visual attribution module",
        "Structured ACR radiology report generator",
        "Interactive radiologist review console"
      ]
    }
  },
  {
    id: "fraud-risk-ml-engine",
    title: "Enterprise Financial Fraud & TreeSHAP Engine",
    subtitle: "Dual XGBoost/LightGBM + Sub-3ms Feature Store + FCRA Audit",
    tagline: "High-throughput fraud detection with gradient boosted ensembles, Haversine travel checks, and TreeSHAP.",
    description: "High-throughput financial fraud detection and risk stratification platform combining gradient boosted ensembles, Haversine impossible travel detection, graph syndicate ring analysis, and TreeSHAP adverse action notices.",
    type: "project",
    category: "enterprise",
    categoryLabel: "Deloitte Enterprise AI",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "Sub-3ms Latency",
    durationOrScale: "< 2.4 ms Latency",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 7,
    techStack: ["XGBoost", "LightGBM", "TreeSHAP", "Real-Time Store", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Pipeline Latency", value: "< 2.4 ms", color: "text-cyan-400" },
      { label: "Fraud Intercept", value: "100% Recall", color: "text-emerald-400" },
      { label: "Audit Standard", value: "FCRA / ECOA", color: "text-amber-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/fraud-risk-ml-engine",
    episodes: [
      { number: 1, title: "Real-Time Feature Store", description: "Sub-millisecond sliding window aggregation.", duration: "Stage 1" },
      { number: 2, title: "Ensemble Classifier", description: "Dual XGBoost + LightGBM fraud risk score.", duration: "Stage 2" },
      { number: 3, title: "Graph Ring Analysis", description: "Synthetic ID syndicate relationship tracing.", duration: "Stage 3" },
      { number: 4, title: "TreeSHAP Audit Notice", description: "FCRA-compliant automated adverse action explanation.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Transaction fraud systems must operate in under 10ms while providing legally required adverse action reasons.",
      architectureSolution: "Engineered ultra-fast XGBoost ensemble with in-memory feature store and vectorized TreeSHAP.",
      impact: "Achieved 2.4ms total pipeline latency with 100% FCRA/ECOA audit compliance.",
      keyDeliverables: [
        "In-memory Redis feature store",
        "Calibrated XGBoost/LightGBM model",
        "Vectorized TreeSHAP explainer",
        "Automated compliance report generator"
      ]
    }
  },
  {
    id: "autonomous-sql-data-agent",
    title: "Autonomous Text-to-SQL & Self-Healing Agent",
    subtitle: "DuckDB Columnar OLAP + AST Security + Self-Healing SQL",
    tagline: "Natural language business intelligence compiler with AST SQL security, error reflection, and insights.",
    description: "Natural language business intelligence compiler with automated database schema introspection, AST read-only SQL injection guardrails, autonomous error reflection loops, and executive narrative insight generation.",
    type: "project",
    category: "enterprise",
    categoryLabel: "Data Agents & OLAP",
    matchScore: 96,
    releaseYear: "2026",
    maturityRating: "Self-Healing SQL",
    durationOrScale: "SIMD Vectorized",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 8,
    techStack: ["DuckDB", "AST Parser", "Self-Healing", "SQLite", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Self-Healing Loop", value: "< 30ms Repair", color: "text-emerald-400" },
      { label: "Injection Safety", value: "100% AST Block", color: "text-cyan-400" },
      { label: "OLAP Engine", value: "Vectorized SIMD", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/autonomous-sql-data-agent",
    episodes: [
      { number: 1, title: "Schema Introspection", description: "Dynamic foreign key graph & column profiling.", duration: "Stage 1" },
      { number: 2, title: "AST Injection Guardrail", description: "Abstract syntax tree validation blocking mutations.", duration: "Stage 2" },
      { number: 3, title: "Self-Healing Execution", description: "Autonomous reflection loop fixing SQL errors.", duration: "Stage 3" },
      { number: 4, title: "Executive Narrative", description: "Automated business insight generation.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Text-to-SQL tools frequently hallucinate non-existent columns and pose severe SQL injection risks.",
      architectureSolution: "Implemented AST query tree parser with schema constraints and self-healing LLM reflection.",
      impact: "100% injection blocking with sub-30ms automated self-repair.",
      keyDeliverables: [
        "DuckDB OLAP query executor",
        "AST security policy validator",
        "Recursive error correction loop",
        "Interactive BI data visualization dashboard"
      ]
    }
  },
  {
    id: "automated-mlops-drift-pipeline",
    title: "Automated MLOps Drift Detection & Retraining",
    subtitle: "Evidently AI + PSI/K-S Tests + MLflow Champion-Challenger",
    tagline: "Continuous monitoring tracking Population Stability Index and statistical shifts with challenger retraining.",
    description: "Continuous monitoring pipeline tracking Population Stability Index (PSI), Kolmogorov-Smirnov statistical shifts, and ROC-AUC degradation with automated challenger retraining and MLflow registry promotions.",
    type: "project",
    category: "mlops",
    categoryLabel: "MLOps & Drift",
    matchScore: 97,
    releaseYear: "2026",
    maturityRating: "MLflow Registry",
    durationOrScale: "Zero Downtime",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 9,
    techStack: ["Evidently AI", "MLflow", "PSI / K-S", "FastAPI", "Docker", "Streamlit"],
    metrics: [
      { label: "Drift Sensitivity", value: "PSI >= 0.25", color: "text-rose-400" },
      { label: "Model Gain", value: "+6.2% ROC-AUC", color: "text-emerald-400" },
      { label: "Promotion", value: "Zero Downtime", color: "text-cyan-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/automated-mlops-drift-pipeline",
    episodes: [
      { number: 1, title: "Data Stream Drift Profiler", description: "Continuous PSI and K-S statistical monitoring.", duration: "Stage 1" },
      { number: 2, title: "Automated Retraining Trigger", description: "Triggered upon statistical significance shift.", duration: "Stage 2" },
      { number: 3, title: "Champion-Challenger Battle", description: "Shadow traffic evaluation against production.", duration: "Stage 3" },
      { number: 4, title: "MLflow Model Registry", description: "Zero-downtime blue/green deployment promotion.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Production machine learning models silently decay over time due to covariate shift and concept drift.",
      architectureSolution: "Built continuous monitoring pipeline with automated challenger training and zero-downtime MLflow registry promotion.",
      impact: "+6.2% ROC-AUC recovery with zero production downtime.",
      keyDeliverables: [
        "PSI and Kolmogorov-Smirnov drift detectors",
        "Automated retraining DAG",
        "MLflow model registry versioning",
        "Grafana real-time drift telemetry dashboard"
      ]
    }
  },
  {
    id: "clinical-voice-scribe-soap",
    title: "Ambient Clinical Voice-to-SOAP Scribe & FHIR",
    subtitle: "Whisper Large-v3 + BioBERT NER + ICD-10 + HL7 FHIR R4",
    tagline: "Ambient doctor-patient audio consultation transcription with BioBERT NER, ICD-10, and FHIR export.",
    description: "Ambient doctor-patient audio consultation transcription with BioBERT Named Entity Recognition, automated ICD-10 diagnostic codification, structured SOAP clinical notes, and HL7 FHIR R4 JSON bundle export.",
    type: "project",
    category: "clinical",
    categoryLabel: "Speech AI & EMR",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "HL7 FHIR R4",
    durationOrScale: "Whisper-v3",
    badge: "TOP 10",
    isTop10: true,
    top10Rank: 10,
    techStack: ["OpenAI Whisper", "BioBERT NER", "HL7 FHIR R4", "ICD-10", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Audio Transcribe", value: "Whisper-v3", color: "text-cyan-400" },
      { label: "Clinical NER", value: "100% Extraction", color: "text-emerald-400" },
      { label: "EMR Format", value: "HL7 FHIR R4", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/clinical-voice-scribe-soap",
    episodes: [
      { number: 1, title: "Ambient Audio Ingestion", description: "Noise suppression and Whisper Large-v3 transcription.", duration: "Stage 1" },
      { number: 2, title: "BioBERT Medical NER", description: "Extracts symptoms, anatomy, and medications.", duration: "Stage 2" },
      { number: 3, title: "ICD-10 & SOAP Synthesizer", description: "Generates structured clinical SOAP note.", duration: "Stage 3" },
      { number: 4, title: "HL7 FHIR R4 Bundle", description: "Standardized JSON bundle export for EMR integration.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Physicians spend over 2 hours daily typing EHR notes, creating burnout and clinical documentation delays.",
      architectureSolution: "Developed ambient microphone listener with BioBERT clinical NER, ICD-10 codification, and FHIR export.",
      impact: "Reduced clinical documentation time from 2 hours to under 2 minutes per patient encounter.",
      keyDeliverables: [
        "Whisper audio transcription pipeline",
        "BioBERT medical entity extraction",
        "SOAP clinical note formatter",
        "HL7 FHIR R4 standardized JSON generator"
      ]
    }
  },
  {
    id: "neural-audio-stream-genai",
    title: "Neural Music Recommendation, Stem Demixing & Audio Intelligence",
    subtitle: "CLAP Audio Embeddings + Two-Tower RecSys + Demucs Stem Separation + Real-Time DSP",
    tagline: "CLAP embeddings, real-time 4-stem Demucs separation, spectral DSP, and two-tower collaborative filtering.",
    description: "High-performance multimedia audio intelligence engine combining Contrastive Language-Audio Pretraining (CLAP), real-time 4-stem waveform source separation (Demucs v4), spectral DSP audio feature synthesis (MFCC, Chroma, Tempogram), and sub-8ms two-tower neural collaborative filtering.",
    type: "project",
    category: "multimedia",
    categoryLabel: "Multimedia & Audio AI",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "Neural Audio AI",
    durationOrScale: "Sub-8ms RecSys",
    badge: "ORIGINAL",
    techStack: ["CLAP", "Demucs v4", "Two-Tower RecSys", "Librosa DSP", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Retrieval Latency", value: "Sub-8ms", color: "text-cyan-400" },
      { label: "RecSys Precision", value: "98.2% NDCG@10", color: "text-emerald-400" },
      { label: "Demixing Gain", value: "+9.2 dB SDR", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/neural-audio-stream-genai",
    episodes: [
      { number: 1, title: "CLAP Audio Embedding", description: "Cross-modal text-to-audio vector representation.", duration: "Stage 1" },
      { number: 2, title: "Demucs v4 Stem Demixing", description: "4-stem separation (vocals, drums, bass, other).", duration: "Stage 2" },
      { number: 3, title: "Spectral DSP Extraction", description: "MFCC, Chroma, and Tempogram calculation.", duration: "Stage 3" },
      { number: 4, title: "Two-Tower Neural RecSys", description: "Sub-8ms personalized vector recommendations.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Streaming audio platforms require instant multi-modal search and high-fidelity stem isolation for remixing and recommendation.",
      architectureSolution: "Constructed CLAP embedding retrieval with Demucs neural demixing and two-tower ranking.",
      impact: "98.2% NDCG@10 precision with +9.2 dB signal-to-distortion ratio.",
      keyDeliverables: [
        "CLAP cross-modal audio search",
        "Demucs v4 stem separation engine",
        "Real-time spectral feature extractor",
        "Two-tower candidate generation API"
      ]
    }
  },
  {
    id: "autonomous-multiagent-swarm-os",
    title: "Enterprise Multi-Agent Swarm Orchestrator & Task DAG Engine",
    subtitle: "Stateful Directed Acyclic Graphs + AutoGen/CrewAI Swarms + Docker Code Sandbox + Graph Memory",
    tagline: "Hierarchical multi-agent coordination operating system with planning, dynamic decomposition, and Docker sandbox.",
    description: "Autonomous hierarchical multi-agent coordination operating system with planning, dynamic task decomposition, tool use reflection, sandboxed Docker/Wasm code execution, and graph memory with vector state checkpointing.",
    type: "project",
    category: "genai",
    categoryLabel: "Agentic AI & Swarms",
    matchScore: 99,
    releaseYear: "2026",
    maturityRating: "Swarm Intelligence",
    durationOrScale: "< 150ms Step",
    badge: "ORIGINAL",
    techStack: ["LangGraph", "AutoGen Swarms", "Docker Sandbox", "Neo4j Graph", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Task Convergence", value: "99.4% Success", color: "text-emerald-400" },
      { label: "Swarm Step Time", value: "< 150ms", color: "text-cyan-400" },
      { label: "Security Sandbox", value: "Zero Leakage", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/autonomous-multiagent-swarm-os",
    episodes: [
      { number: 1, title: "Hierarchical Task Decomposition", description: "Splits complex objectives into executable DAGs.", duration: "Stage 1" },
      { number: 2, title: "Multi-Agent Consensus Swarm", description: "Planner, Coder, Critic, and Tester coordination.", duration: "Stage 2" },
      { number: 3, title: "Isolated Docker Sandbox", description: "Zero-leakage Wasm/Docker code execution.", duration: "Stage 3" },
      { number: 4, title: "Graph Memory Checkpoint", description: "Neo4j episodic memory retention across sessions.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Single LLM agents struggle with long-horizon reasoning and unconstrained tool execution security.",
      architectureSolution: "Built hierarchical multi-agent swarm architecture with isolated execution sandboxes and graph memory.",
      impact: "99.4% task convergence success with zero security breaches.",
      keyDeliverables: [
        "Hierarchical DAG planner",
        "AutoGen / CrewAI consensus protocol",
        "Ephemeral container sandbox",
        "Neo4j graph memory checkpointing"
      ]
    }
  },
  {
    id: "spatial-video-multimodal-analytics",
    title: "Real-Time Spatial Video Intelligence & Multi-Object Tracking",
    subtitle: "YOLOv10 + ByteTrack Multi-Camera Re-ID + 3D Spatial Geometry + TensorRT FP16",
    tagline: "Edge video analytics delivering open-vocabulary detection, ByteTrack tracking, and TensorRT FP16.",
    description: "High-throughput edge video analytics pipeline delivering zero-shot open-vocabulary object detection, Kalman filter spatio-temporal tracking across asynchronous RTSP video feeds, dynamic heatmap spatial occupancy, and TensorRT FP16 GPU acceleration.",
    type: "project",
    category: "multimedia",
    categoryLabel: "Computer Vision & Spatial AI",
    matchScore: 97,
    releaseYear: "2026",
    maturityRating: "Real-Time Edge Vision",
    durationOrScale: "140+ FPS TensorRT",
    badge: "ORIGINAL",
    techStack: ["YOLOv10", "ByteTrack", "TensorRT", "OpenCV", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Edge Inference", value: "140+ FPS TensorRT", color: "text-emerald-400" },
      { label: "Tracking MOTA", value: "99.1% Accuracy", color: "text-cyan-400" },
      { label: "Stream Feeds", value: "Multi-RTSP SIMD", color: "text-amber-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/spatial-video-multimodal-analytics",
    episodes: [
      { number: 1, title: "Multi-RTSP Stream Demux", description: "Hardware-accelerated video decoding.", duration: "Stage 1" },
      { number: 2, title: "TensorRT YOLOv10 Inference", description: "140+ FPS FP16 quantized object detection.", duration: "Stage 2" },
      { number: 3, title: "ByteTrack Spatio-Temporal Re-ID", description: "Continuous multi-camera object tracking.", duration: "Stage 3" },
      { number: 4, title: "3D Spatial Heatmap", description: "Real-time occupancy and flow analytics.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Industrial security and hospital surveillance systems require multi-camera tracking without frame drops.",
      architectureSolution: "Combined YOLOv10 with TensorRT FP16 optimization and ByteTrack Kalman tracking.",
      impact: "Maintained 140+ FPS throughput across 8 simultaneous camera feeds with 99.1% MOTA.",
      keyDeliverables: [
        "TensorRT FP16 inference engine",
        "ByteTrack association pipeline",
        "3D spatial occupancy heatmap generator",
        "RTSP stream ingestion server"
      ]
    }
  },
  {
    id: "deep-quant-risk-trading-engine",
    title: "Deep Reinforcement Learning Quant Execution & Risk Engine",
    subtitle: "Order Book Microstructure L3 + PPO Reinforcement Learning + Real-Time VaR Monte Carlo + Rust FFI",
    tagline: "Algorithmic trading and market risk engine utilizing PPO, TCN for limit order books, and Monte Carlo VaR.",
    description: "Ultra-low latency algorithmic trading and market risk engine utilizing Proximal Policy Optimization (PPO), Temporal Convolutional Networks (TCN) for limit order book alpha generation, and distributed Monte Carlo Value-at-Risk (VaR 99.9%) simulations.",
    type: "project",
    category: "enterprise",
    categoryLabel: "ML & Quantitative Finance",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "DRL & Sub-ms ML",
    durationOrScale: "0.42 ms Tick",
    badge: "ORIGINAL",
    techStack: ["PyTorch", "PPO / SB3", "Rust FFI", "TimescaleDB", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Tick Execution", value: "0.42 ms", color: "text-cyan-400" },
      { label: "Sharpe Ratio", value: "2.84 Alpha", color: "text-emerald-400" },
      { label: "VaR Precision", value: "99.9% Risk Bound", color: "text-rose-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/deep-quant-risk-trading-engine",
    episodes: [
      { number: 1, title: "L3 Order Book Replay", description: "Microstructure tick reconstruction via Rust FFI.", duration: "Stage 1" },
      { number: 2, title: "TCN Alpha Feature Engine", description: "Temporal convolution limit order book feature synthesis.", duration: "Stage 2" },
      { number: 3, title: "PPO Policy Optimization", description: "Reinforcement learning optimal order routing.", duration: "Stage 3" },
      { number: 4, title: "Monte Carlo VaR Sim", description: "99.9% Value-at-Risk stress testing simulation.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "High-frequency quantitative trading demands sub-millisecond execution while strictly enforcing extreme tail-risk bounds.",
      architectureSolution: "Built hybrid Python-Rust engine with PPO reinforcement learning and vectorized Monte Carlo risk simulations.",
      impact: "Achieved 0.42ms tick execution latency with a 2.84 Sharpe ratio.",
      keyDeliverables: [
        "Rust FFI order book parser",
        "PPO reinforcement learning execution agent",
        "Distributed Monte Carlo risk simulator",
        "Live quantitative analytics dashboard"
      ]
    }
  },
  {
    id: "realtime-multimodal-voice-stream",
    title: "Ultra-Low Latency Multimodal WebRTC Voice & Vision Agent",
    subtitle: "Full-Duplex WebRTC + Deepgram Nova-2 + Cartesia Sonic TTS + GPT-4o-Realtime + Vision VAD",
    tagline: "Sub-250ms glass-to-glass conversational assistant with full-duplex audio, echo cancellation, and vision perception.",
    description: "Sub-250ms glass-to-glass conversational streaming assistant with full-duplex audio, acoustic echo cancellation, interruption-handling barge-in VAD, and real-time screen/camera visual perception.",
    type: "project",
    category: "genai",
    categoryLabel: "Multimodal Streaming AI",
    matchScore: 99,
    releaseYear: "2026",
    maturityRating: "Full-Duplex Voice AI",
    durationOrScale: "240ms Latency",
    badge: "ORIGINAL",
    techStack: ["WebRTC", "Deepgram Nova-2", "Cartesia TTS", "Vision-Language", "FastAPI", "Streamlit"],
    metrics: [
      { label: "Glass-to-Glass", value: "240ms Latency", color: "text-cyan-400" },
      { label: "Audio Streaming", value: "Bidirectional WebRTC", color: "text-emerald-400" },
      { label: "Barge-In Recall", value: "100% VAD Interruption", color: "text-purple-400" }
    ],
    githubUrl: "https://github.com/saikrishnayemineni/realtime-multimodal-voice-stream",
    episodes: [
      { number: 1, title: "WebRTC Audio Pipeline", description: "Zero-latency bi-directional voice streaming.", duration: "Stage 1" },
      { number: 2, title: "Deepgram Nova-2 STT", description: "Sub-100ms real-time audio transcription.", duration: "Stage 2" },
      { number: 3, title: "Barge-In VAD Interruption", description: "Instant playback cutoff when user speaks.", duration: "Stage 3" },
      { number: 4, title: "Cartesia Sonic TTS", description: "Ultra-natural 80ms voice synthesis stream.", duration: "Stage 4" }
    ],
    details: {
      problemStatement: "Traditional voice AI agents experience awkward 2-3 second latency pauses and cannot handle natural user interruptions.",
      architectureSolution: "Implemented full-duplex WebRTC streaming with Deepgram Nova-2, Cartesia Sonic, and server-side VAD barge-in.",
      impact: "Achieved 240ms glass-to-glass conversational latency with natural human-like interruption handling.",
      keyDeliverables: [
        "WebRTC media server gateway",
        "Sub-100ms speech-to-text integration",
        "Barge-in voice activity detector",
        "Streaming TTS audio synthesizer"
      ]
    }
  }
];

export const NETFLIX_SANDBOXES: NetflixMediaItem[] = [
  {
    id: "sandbox-clinical-dashboard",
    title: "Clinical Risk Stratification & ICU Telemetry Simulator",
    subtitle: "Real-Time Patient Vitals, Sepsis Prediction & ECG Waveform",
    tagline: "Live interactive clinical simulator streaming dynamic patient heart rates, oxygen saturation, and sepsis risk.",
    description: "Experience the real-time AI triage engine with synthetic physiological telemetry, live SVG ECG cardiac rhythms, emergency acuity scoring, and instant clinician alert notifications.",
    type: "sandbox",
    category: "interactive",
    categoryLabel: "Interactive Station",
    matchScore: 99,
    releaseYear: "2026",
    maturityRating: "Interactive Station",
    durationOrScale: "Live Simulator",
    badge: "LIVE DEMO",
    techStack: ["Live Telemetry", "ECG Waveform", "Sepsis ML", "FastAPI", "React"],
    metrics: [
      { label: "Live Telemetry", value: "Real-Time", color: "text-emerald-400" },
      { label: "ECG Frequency", value: "72 BPM Wave", color: "text-cyan-400" },
      { label: "Risk Triage", value: "Dynamic Score", color: "text-rose-400" }
    ],
    episodes: [
      { number: 1, title: "Normal Sinus Rhythm", description: "Healthy physiological baseline monitoring.", duration: "Demo 1" },
      { number: 2, title: "Ventricular Tachycardia", description: "High-frequency lethal arrhythmia detection.", duration: "Demo 2" },
      { number: 3, title: "Sepsis Septic Shock", description: "Lactate and hemodynamic collapse warning.", duration: "Demo 3" },
      { number: 4, title: "Emergency Triage Routing", description: "Automated ICU team paging and alert dispatch.", duration: "Demo 4" }
    ]
  },
  {
    id: "sandbox-eval-matrix",
    title: "LLMOps RAG Triad Evaluator & Hallucination Sandbox",
    subtitle: "Interactive Faithfulness, Relevance & PHI Redaction Inspector",
    tagline: "Test live RAG queries, inspect faithfulness scores, and see HIPAA PHI scrubber redacting clinical identifiers.",
    description: "Interactive evaluation studio allowing you to input sample prompts, inspect Faithfulness / Answer Relevance / Context Precision metrics, and observe real-time HIPAA 18 Safe Harbor redaction in action.",
    type: "sandbox",
    category: "interactive",
    categoryLabel: "Interactive Station",
    matchScore: 98,
    releaseYear: "2026",
    maturityRating: "Interactive Station",
    durationOrScale: "Live Simulator",
    badge: "LIVE DEMO",
    techStack: ["Ragas Triad", "HIPAA NLP", "Hallucination Intercept", "Prometheus"],
    metrics: [
      { label: "Faithfulness", value: "0.985 Score", color: "text-emerald-400" },
      { label: "PHI Redaction", value: "100% Safe Harbor", color: "text-cyan-400" },
      { label: "Eval Latency", value: "< 4ms Intercept", color: "text-purple-400" }
    ]
  },
  {
    id: "sandbox-ai-profile-terminal",
    title: "AI Recruiter Terminal & Candidate Q&A Bot",
    subtitle: "Interactive LLM Agent Answering Recruiter & Technical Inquiries",
    tagline: "Ask questions directly about Sai Krishna's production AI experience, architecture decisions, and tech stack.",
    description: "An interactive command-line AI assistant powered by grounded context on Sai Krishna's 4+ years of production AI/ML engineering, career achievements at Johnson & Johnson and Deloitte, and technical credentials.",
    type: "sandbox",
    category: "interactive",
    categoryLabel: "Interactive Station",
    matchScore: 99,
    releaseYear: "2026",
    maturityRating: "Interactive Terminal",
    durationOrScale: "Interactive Bot",
    badge: "LIVE Q&A",
    techStack: ["AI Terminal", "Candidate Grounding", "Interactive Shell", "CLI UI"],
    metrics: [
      { label: "Knowledge Grounding", value: "100% Verified", color: "text-emerald-400" },
      { label: "Response Speed", value: "Instant Typewriter", color: "text-cyan-400" },
      { label: "Coverage", value: "Projects & Career", color: "text-purple-400" }
    ]
  }
];

export const NETFLIX_EXPERIENCES: NetflixMediaItem[] = [
  {
    id: "exp-johnson-and-johnson",
    title: "Johnson & Johnson · Season 2024–Present",
    subtitle: "AI/ML Engineer · Production Healthcare Systems",
    tagline: "Building clinical AI agents, real-time EHR data ingestion pipelines, and predictive risk models.",
    description: "Spearheaded production AI engineering across healthcare applications: engineered multi-agent clinical triage systems with LangGraph, reduced alert latency by 27%, processed 3+ TB daily healthcare streams, and boosted diagnostic model precision by 19%.",
    type: "experience",
    category: "career",
    categoryLabel: "Active Season",
    matchScore: 99,
    releaseYear: "2024–Present",
    maturityRating: "Enterprise Healthcare",
    durationOrScale: "Current Season",
    badge: "ACTIVE ROLE",
    badgeColor: "border-red-500/50 bg-red-500/20 text-red-300",
    techStack: ["LangGraph", "Python", "FastAPI", "Apache Kafka", "Docker", "PyTorch", "AWS SageMaker"],
    metrics: [
      { label: "Alert Latency", value: "27% Faster", color: "text-cyan-400" },
      { label: "Diagnostic Accuracy", value: "+19% Boost", color: "text-emerald-400" },
      { label: "Daily Data Ingestion", value: "3+ TB / Day", color: "text-purple-400" }
    ],
    episodes: [
      { number: 1, title: "Clinical Multi-Agent Triage", description: "Engineered LangGraph agent state machines cutting triage latency by 27%.", duration: "Episode 1" },
      { number: 2, title: "Real-Time 3 TB+ EHR Streaming", description: "Built resilient Kafka ingestion pipelines for intensive care telemetry.", duration: "Episode 2" },
      { number: 3, title: "Predictive Risk Modeling", description: "Enhanced sepsis and deterioration prediction models with 19% precision gains.", duration: "Episode 3" },
      { number: 4, title: "Automated Document Review", description: "Reduced medical document review time from 10 hours to 40 minutes (93% speedup).", duration: "Episode 4" }
    ]
  },
  {
    id: "exp-deloitte",
    title: "Deloitte · Season 2020–2023",
    subtitle: "AI/ML Engineer · Enterprise AI & Cloud Platforms",
    tagline: "Scaled enterprise NLP pipelines, 10 production real-time ML APIs, and financial fraud risk engines.",
    description: "Designed and deployed enterprise-grade AI systems: architected clinical NLP text extraction with BERT, processed 80M+ daily records, maintained 99.99% production API SLA across 10 real-time endpoints, and developed financial fraud risk engines with TreeSHAP explainability.",
    type: "experience",
    category: "career",
    categoryLabel: "Past Season",
    matchScore: 98,
    releaseYear: "2020–2023",
    maturityRating: "Enterprise Consulting",
    durationOrScale: "3 Seasons (Years)",
    badge: "DELOITTE",
    badgeColor: "border-emerald-500/50 bg-emerald-500/20 text-emerald-300",
    techStack: ["BERT", "PyTorch", "XGBoost", "FastAPI", "Kubernetes", "AWS", "Spark", "SQL"],
    metrics: [
      { label: "Daily Records", value: "80M+ / Day", color: "text-emerald-400" },
      { label: "Production APIs", value: "10 Real-Time", color: "text-cyan-400" },
      { label: "API SLA Uptime", value: "99.99% Uptime", color: "text-purple-400" }
    ],
    episodes: [
      { number: 1, title: "Large-Scale Data Pipelines", description: "Processed 80M+ daily patient records with distributed Spark and SQL.", duration: "Episode 1" },
      { number: 2, title: "10 Production ML Inference APIs", description: "Sub-50ms REST API deployment with 99.99% enterprise uptime.", duration: "Episode 2" },
      { number: 3, title: "Clinical BERT NLP Extraction", description: "Extracted medical entities and diagnoses from unstructured physician notes.", duration: "Episode 3" },
      { number: 4, title: "Financial Risk & Fraud Modeling", description: "Gradient boosted fraud detection with FCRA-compliant TreeSHAP explainability.", duration: "Episode 4" }
    ]
  },
  {
    id: "edu-rivier-university",
    title: "Rivier University · Master of Science (M.S.)",
    subtitle: "Computer Science · Nashua, NH, USA",
    tagline: "Advanced algorithms, machine learning architectures, and distributed systems.",
    description: "Completed Master of Science in Computer Science focusing on Advanced Machine Learning, Neural Networks, Cloud Infrastructure, and Distributed Computing.",
    type: "experience",
    category: "education",
    categoryLabel: "Academic Foundation",
    matchScore: 97,
    releaseYear: "2023–2025",
    maturityRating: "Master's Degree",
    durationOrScale: "M.S. Degree",
    badge: "M.S. CS",
    badgeColor: "border-purple-500/50 bg-purple-500/20 text-purple-300",
    techStack: ["Machine Learning", "Distributed Systems", "Cloud Computing", "Algorithms"],
    metrics: [
      { label: "Degree", value: "Master of Science", color: "text-purple-400" },
      { label: "Major", value: "Computer Science", color: "text-cyan-400" },
      { label: "Location", value: "Nashua, NH, USA", color: "text-emerald-400" }
    ]
  },
  {
    id: "edu-kl-university",
    title: "KL University · Bachelor of Technology (B.Tech)",
    subtitle: "Computer Science & Engineering · India",
    tagline: "Core computer science fundamentals, data structures, algorithms, and software engineering.",
    description: "Graduated with Bachelor of Technology in Computer Science & Engineering with strong foundation in object-oriented programming, database management, mathematics, and statistical modeling.",
    type: "experience",
    category: "education",
    categoryLabel: "Academic Foundation",
    matchScore: 95,
    releaseYear: "2016–2020",
    maturityRating: "Bachelor's Degree",
    durationOrScale: "B.Tech Degree",
    badge: "B.Tech",
    badgeColor: "border-indigo-500/50 bg-indigo-500/20 text-indigo-300",
    techStack: ["Data Structures", "Algorithms", "Databases", "Software Engineering"],
    metrics: [
      { label: "Degree", value: "Bachelor of Tech", color: "text-indigo-400" },
      { label: "Major", value: "Computer Science", color: "text-cyan-400" },
      { label: "Location", value: "India", color: "text-emerald-400" }
    ]
  }
];

export const NETFLIX_CERTIFICATIONS: NetflixMediaItem[] = [
  {
    id: "cert-aws-ai",
    title: "AWS Certified AI Practitioner",
    subtitle: "Amazon Web Services · AI Specialty",
    tagline: "Certified competency in foundational AI/ML models, Amazon Bedrock, SageMaker, and responsible AI.",
    description: "Official Amazon Web Services certification validating expertise in Generative AI architectures, foundation models, SageMaker pipelines, Amazon Bedrock orchestration, and responsible AI safety.",
    type: "certification",
    category: "certification",
    categoryLabel: "AWS Cloud & AI",
    matchScore: 99,
    releaseYear: "2026–2029",
    maturityRating: "AWS Certified",
    durationOrScale: "Verified Credential",
    badge: "AI SPECIALTY",
    badgeColor: "border-amber-500/50 bg-amber-500/20 text-amber-300",
    techStack: ["AWS SageMaker", "Amazon Bedrock", "Generative AI", "Responsible AI"],
    metrics: [
      { label: "Issuer", value: "Amazon Web Services", color: "text-amber-400" },
      { label: "Status", value: "Verified Active", color: "text-emerald-400" },
      { label: "Validity", value: "2026–2029", color: "text-cyan-400" }
    ]
  },
  {
    id: "cert-aws-ml",
    title: "AWS Certified Machine Learning – Specialty",
    subtitle: "Amazon Web Services · ML Specialty",
    tagline: "Rigorous certification validating deep learning, data engineering, model deployment, and MLOps.",
    description: "Comprehensive AWS specialty certification evaluating data engineering for ML, exploratory data analysis, deep neural network modeling, hyperparameter optimization, and scalable production deployment on AWS.",
    type: "certification",
    category: "certification",
    categoryLabel: "AWS Cloud & AI",
    matchScore: 99,
    releaseYear: "2026–2029",
    maturityRating: "Specialty Certified",
    durationOrScale: "Verified Credential",
    badge: "ML SPECIALTY",
    badgeColor: "border-amber-500/50 bg-amber-500/20 text-amber-300",
    techStack: ["AWS SageMaker", "Distributed Training", "MLOps", "Model Optimization"],
    metrics: [
      { label: "Issuer", value: "Amazon Web Services", color: "text-amber-400" },
      { label: "Level", value: "Specialty", color: "text-emerald-400" },
      { label: "Validity", value: "2026–2029", color: "text-cyan-400" }
    ]
  },
  {
    id: "cert-gcp-genai",
    title: "Google Cloud: Generative AI Leader",
    subtitle: "Google Cloud Platform · GenAI",
    tagline: "Certified mastery of Vertex AI, Gemini models, prompt design, and enterprise GenAI solutions.",
    description: "Google Cloud certification demonstrating leadership in enterprise Generative AI strategy, Vertex AI Model Garden, Gemini multimodal models, and secure enterprise AI integration.",
    type: "certification",
    category: "certification",
    categoryLabel: "Google Cloud AI",
    matchScore: 98,
    releaseYear: "2026–2029",
    maturityRating: "Google Certified",
    durationOrScale: "Verified Credential",
    badge: "GENAI LEADER",
    badgeColor: "border-cyan-500/50 bg-cyan-500/20 text-cyan-300",
    techStack: ["Google Vertex AI", "Gemini Models", "Model Garden", "Enterprise GenAI"],
    metrics: [
      { label: "Issuer", value: "Google Cloud", color: "text-cyan-400" },
      { label: "Specialty", value: "GenAI Leader", color: "text-emerald-400" },
      { label: "Validity", value: "2026–2029", color: "text-purple-400" }
    ]
  }
];

export const NETFLIX_SKILL_CATEGORIES = [
  {
    id: "genai",
    title: "Generative AI & LLM Systems",
    skills: ["LangChain & LangGraph", "Hugging Face Transformers", "pgvector & Chroma", "OpenAI & Anthropic APIs", "RAG Triad & Ragas", "vLLM Serving", "DoRA & QLoRA"]
  },
  {
    id: "ml",
    title: "Core Machine Learning & Deep Learning",
    skills: ["PyTorch", "TensorFlow & Keras", "XGBoost & LightGBM", "Scikit-Learn", "DenseNet-121", "YOLOv10", "TreeSHAP"]
  },
  {
    id: "mlops",
    title: "MLOps, Serving & Architecture",
    skills: ["Docker & Containers", "Kubernetes", "MLflow Registry", "FastAPI & AsyncIO", "Prometheus & Grafana", "CI/CD Workflows", "Evidently AI"]
  },
  {
    id: "cloud",
    title: "Cloud & Distributed Lakehouse",
    skills: ["AWS (SageMaker, S3, Lambda)", "Google Cloud (Vertex AI)", "Microsoft Azure ML", "Databricks & Delta Lake", "Apache Kafka", "Apache Spark & PySpark"]
  }
];
