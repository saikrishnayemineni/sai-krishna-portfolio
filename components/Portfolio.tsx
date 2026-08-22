"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight, BriefcaseBusiness, CheckCircle2, Code2, Download,
  ExternalLink, Github, GraduationCap, Linkedin, Mail, Menu, Phone, ShieldCheck, Sparkles, X,
  Radio, Zap, Activity, Award, Search, Command, Bot
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/TiltCard";
import { CopyButton } from "@/components/CopyButton";
import { PlaygroundCard } from "@/components/PlaygroundCard";
import { LocalTimeCard } from "@/components/LocalTimeCard";
import { SocialCard } from "@/components/SocialCard";
import { ProjectArchitecture } from "@/components/ProjectArchitecture";
import { EvalMatrixCard } from "@/components/EvalMatrixCard";
import { ResumeModal } from "@/components/ResumeModal";
import { ClinicalDashboardCard } from "@/components/ClinicalDashboardCard";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NumberCounter } from "@/components/NumberCounter";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { CommandPalette } from "@/components/CommandPalette";
import { AIProfileTerminal } from "@/components/AIProfileTerminal";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

type SkillCategory = "all" | "genai" | "ml" | "mlops" | "cloud" | "data" | "languages";

type Skill = {
  category: "genai" | "ml" | "mlops" | "cloud" | "data" | "languages";
  name: string;
  icon: string;
  glow: string;
  experience: string;
  tags: string[];
};

const skills: Skill[] = [
  // Generative AI & LLMs
  { category: "genai", name: "LangChain & LangGraph", icon: "/icons/langchain.svg", glow: "rgba(16, 185, 129, 0.35)", experience: "Multi-Agent Graphs", tags: ["AI Agents", "Prompt Engineering", "Triage"] },
  { category: "genai", name: "Hugging Face", icon: "/icons/huggingface.svg", glow: "rgba(245, 158, 11, 0.35)", experience: "Fine-Tuning & Quant", tags: ["Transformers", "LLM Eval", "Embeddings"] },
  { category: "genai", name: "Vector DBs & pgvector", icon: "/icons/postgres.svg", glow: "rgba(59, 130, 246, 0.35)", experience: "Dense / Hybrid RAG", tags: ["Embeddings", "RAG Pipelines", "Chroma"] },
  
  // Core ML & Frameworks
  { category: "ml", name: "PyTorch", icon: "/icons/pytorch.svg", glow: "rgba(249, 115, 22, 0.35)", experience: "Deep Learning & NLP", tags: ["CNNs", "RNNs", "Transformers", "GANs"] },
  { category: "ml", name: "TensorFlow & Keras", icon: "/icons/tensorflow.svg", glow: "rgba(234, 88, 12, 0.35)", experience: "Production Models", tags: ["Neural Nets", "TF Serving"] },
  { category: "ml", name: "XGBoost & Scikit-learn", icon: "/icons/xgboost.svg", glow: "rgba(59, 130, 246, 0.35)", experience: "Risk Stratification", tags: ["Anomaly Detection", "Time Series", "Bayesian Opt"] },
  { category: "ml", name: "NumPy, Pandas & SciPy", icon: "/icons/python.svg", glow: "rgba(6, 182, 212, 0.35)", experience: "Data Science & Stats", tags: ["Statistical Modeling", "Matplotlib", "Seaborn"] },

  // MLOps & Deployment
  { category: "mlops", name: "Docker", icon: "/icons/docker.svg", glow: "rgba(14, 165, 233, 0.35)", experience: "Containerization", tags: ["Microservices", "CI/CD", "Linux"] },
  { category: "mlops", name: "Kubernetes", icon: "/icons/kubernetes.svg", glow: "rgba(59, 130, 246, 0.35)", experience: "Cluster Orchestration", tags: ["Autoscaling", "Production SLAs"] },
  { category: "mlops", name: "MLflow", icon: "/icons/mlflow.svg", glow: "rgba(6, 182, 212, 0.35)", experience: "Model Drift CI/CD", tags: ["Model Registry", "A/B Testing", "Monitoring"] },
  { category: "mlops", name: "FastAPI & Flask", icon: "/icons/fastapi.svg", glow: "rgba(16, 185, 129, 0.35)", experience: "Sub-50ms Inference", tags: ["REST APIs", "Model Serving", "Django"] },

  // Cloud Platforms
  { category: "cloud", name: "AWS (SageMaker, Lambda)", icon: "/icons/aws.svg", glow: "rgba(245, 158, 11, 0.35)", experience: "Certified Specialty", tags: ["EC2", "S3", "Model Pipelines"] },
  { category: "cloud", name: "Google Cloud (GCP)", icon: "/icons/gcp.svg", glow: "rgba(6, 182, 212, 0.35)", experience: "Certified GenAI", tags: ["Vertex AI", "Cloud Functions"] },
  { category: "cloud", name: "Microsoft Azure", icon: "/icons/azure.svg", glow: "rgba(14, 165, 233, 0.35)", experience: "ML Studio & Azure", tags: ["Azure Databricks", "Workspaces"] },
  { category: "cloud", name: "Databricks", icon: "/icons/databricks.svg", glow: "rgba(239, 68, 68, 0.35)", experience: "Lakehouse ML", tags: ["Delta Lake", "PySpark ML"] },

  // Big Data, Streaming & Databases
  { category: "data", name: "Apache Spark & PySpark", icon: "/icons/spark.svg", glow: "rgba(249, 115, 22, 0.35)", experience: "Large Scale Distributed ETL", tags: ["Hadoop", "Hive", "Dask"] },
  { category: "data", name: "Apache Kafka", icon: "/icons/kafka.svg", glow: "rgba(255, 255, 255, 0.25)", experience: "3 TB/Day Streaming", tags: ["Real-time Ingestion", "Event Streams"] },
  { category: "data", name: "PostgreSQL & SQL Server", icon: "/icons/postgres.svg", glow: "rgba(59, 130, 246, 0.35)", experience: "pgvector & Indexing", tags: ["MySQL", "Relational Architecture"] },
  { category: "data", name: "MongoDB & NoSQL", icon: "/icons/mongodb.svg", glow: "rgba(16, 185, 129, 0.35)", experience: "NoSQL EHR Records", tags: ["Document Stores", "JSON Streams"] },
  { category: "data", name: "Tableau & Power BI", icon: "/icons/spark.svg", glow: "rgba(245, 158, 11, 0.35)", experience: "Executive Analytics", tags: ["Advanced Excel", "Seaborn", "ggplot2"] },

  // Languages
  { category: "languages", name: "Python", icon: "/icons/python.svg", glow: "rgba(56, 189, 248, 0.35)", experience: "Primary AI/ML Language", tags: ["AsyncIO", "OOP", "Data Structures"] },
  { category: "languages", name: "SQL", icon: "/icons/postgres.svg", glow: "rgba(59, 130, 246, 0.35)", experience: "Complex Queries & Analytics", tags: ["CTEs", "Window Functions", "Optimization"] },
  { category: "languages", name: "C++", icon: "/icons/python.svg", glow: "rgba(139, 92, 246, 0.35)", experience: "High-Performance Systems", tags: ["Algorithms", "Low-Latency"] },
  { category: "languages", name: "R & Bash Scripting", icon: "/icons/python.svg", glow: "rgba(16, 185, 129, 0.35)", experience: "Stats & Automation", tags: ["Biostatistics", "Linux CI/CD"] },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "genai", label: "GenAI & LLMs" },
  { id: "ml", label: "Core ML & Deep Learning" },
  { id: "mlops", label: "MLOps & Deploy" },
  { id: "cloud", label: "Cloud & Lakehouse" },
  { id: "data", label: "Big Data & DBs" },
  { id: "languages", label: "Languages" },
] as const;
type Category = (typeof categories)[number]["id"];

const heroRoles = [
  "Agentic AI & RAG systems",
  "Clinical AI & EHR Pipelines",
  "High-Throughput ML Architectures",
  "Enterprise MLOps & Guardrails"
];

function AnchorButton({
  href,
  children,
  primary = false,
  target,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  target?: "_blank";
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={`focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-md ${
        primary
          ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 hover:brightness-110 shadow-cyan-500/20"
          : "border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800/80 hover:text-white"
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function Portfolio() {
  const [category, setCategory] = useState<Category>("all");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const [profileView, setProfileView] = useState<"portrait" | "ai">("portrait");

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setHeroRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3200);
    return () => clearInterval(roleInterval);
  }, []);

  const visibleSkills = useMemo(
    () =>
      skills.filter((item) => {
        const matchesCategory = category === "all" || item.category === category;
        const query = skillSearch.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.experience.toLowerCase().includes(query) ||
          item.tags.some((t) => t.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      }),
    [category, skillSearch]
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-6 pt-4 sm:px-6 lg:px-8 relative">
      {/* Background Neural Synaptic Canvas */}
      <NeuralCanvas />

      {/* Top Glowing Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={spring}
        className="sticky top-3 z-50 mb-10 w-full rounded-2xl border border-white/10 bg-zinc-950/85 p-2 sm:p-2.5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8),_0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden"
        aria-label="Primary navigation"
      >
        {/* Top Ambient Highlight Line */}
        <div className="pointer-events-none absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        <div className="flex items-center justify-between gap-3">
          {/* Left Brand Identifier */}
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-xl group px-1">
            <div className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-xs font-black text-white shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
                SK
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm" />
            </div>

            <div className="hidden sm:block">
              <div className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors flex items-center gap-1.5">
                Sai Krishna Yemineni
              </div>
              <div className="text-[10px] uppercase tracking-[.18em] text-zinc-400 font-medium flex items-center gap-1.5">
                <span>AI / ML Engineer</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Actively Seeking Roles
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800/80 shadow-inner relative">
            {["About", "Projects", "Experience", "Skills", "Certifications", "Education", "Contact"].map((item) => {
              const isHovered = hoveredNav === item;
              return (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onMouseEnter={() => setHoveredNav(item)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="focus-ring relative rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-200"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-800/80 border border-cyan-500/30 shadow-sm -z-0"
                    />
                  )}
                  <span className={`relative z-10 ${isHovered ? "text-cyan-300 font-bold" : "text-zinc-400"}`}>
                    {item}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Actions (Command Center, CTA & Mobile Toggle) */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger Button */}
            <button
              id="cmd-palette-toggle"
              onClick={() => setCommandPaletteOpen(true)}
              className="focus-ring hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all shadow-sm group"
            >
              <Command size={13} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Search</span>
              <kbd className="rounded border border-slate-700 bg-slate-800 px-1 text-[10px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>

            <a
              href="#contact"
              className="focus-ring flex items-center gap-2 rounded-xl bg-gradient-to-r from-white to-zinc-200 px-4 py-2 text-xs font-bold text-zinc-950 hover:brightness-105 transition-all shadow-md hover:shadow-lg hover:shadow-cyan-500/20 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Get in touch</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden focus-ring rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 hover:text-zinc-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden border-t border-zinc-800/80 mt-3 pt-3"
            >
              <div className="flex flex-col gap-1.5 px-1 pb-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCommandPaletteOpen(true);
                  }}
                  className="rounded-xl px-3.5 py-2 text-xs font-medium text-cyan-300 hover:bg-zinc-900 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Command size={14} /> Quick Search & Actions (⌘K)
                  </span>
                  <ArrowUpRight size={13} />
                </button>
                {["About", "Projects", "Experience", "Skills", "Certifications", "Education", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <ArrowUpRight size={13} className="text-zinc-600" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Intro Header */}
      <section id="top" className="relative mb-10 px-1 pb-2 pt-4">
        {/* Ambient Radial Glow Backdrop */}
        <div className="pointer-events-none absolute -top-12 left-1/4 -z-10 h-72 w-96 rounded-full bg-cyan-600/15 blur-[110px]" />
        <div className="pointer-events-none absolute -top-8 right-1/4 -z-10 h-72 w-96 rounded-full bg-purple-600/15 blur-[110px]" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className="mb-5 flex flex-wrap items-center gap-3"
        >
          {/* Laser Border Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-cyan-300 backdrop-blur-md glow-pill-cyan">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            Massachusetts, USA · Production AI Engineering
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-3.5 py-1.5 text-[11px] font-medium text-slate-300 backdrop-blur-md">
            <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
            Actively Seeking Senior AI/ML Roles
          </div>
        </motion.div>

        {/* Dynamic Heading with Animated Role Switcher */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.11 }}
          className="max-w-[1180px] text-[clamp(40px,6.5vw,88px)] font-extrabold leading-[.98] tracking-[-.05em] text-white"
        >
          Engineering{" "}
          <span className="inline-block relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={heroRoles[heroRoleIndex]}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
                className="text-gradient inline-block"
              >
                {heroRoles[heroRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          that move from <span className="text-gradient-cyan">prototype to production.</span>
        </motion.h1>

        {/* Quick Tech Focus Chips with Levitating Sine-Wave Floating Animations */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.16 }}
          className="mt-6 flex flex-wrap gap-2.5 text-xs font-medium"
        >
          {[
            { text: "🤖 Agentic AI Frameworks", border: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300", anim: "animate-float-1" },
            { text: "⚡ High-Throughput RAG", border: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300", anim: "animate-float-2" },
            { text: "🏥 Healthcare AI & EHR Pipelines", border: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", anim: "animate-float-3" },
            { text: "☁️ Enterprise MLOps & APIs", border: "border-purple-500/30 bg-purple-500/10 text-purple-300", anim: "animate-float-1" }
          ].map((spec) => (
            <span
              key={spec.text}
              className={`rounded-xl border px-3.5 py-1.5 font-semibold backdrop-blur-sm ${spec.border} ${spec.anim}`}
            >
              {spec.text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Bento Grid Top Section */}
      <section className="bento-grid">
        {/* Profile Card with Toggleable AI Recruiter Console */}
        <TiltCard className="card-surface col-span-12 p-6 sm:col-span-5 lg:col-span-4 lg:row-span-2 group relative overflow-hidden flex flex-col justify-between">
          {/* Ambient Glow Aura */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Top Status & View Switcher */}
            <div className="w-full flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Open for Senior AI/ML Roles
              </div>

              {/* View Toggle */}
              <div className="flex rounded-lg border border-slate-800 bg-slate-900/80 p-0.5 text-[10px] font-bold">
                <button
                  onClick={() => setProfileView("portrait")}
                  className={`px-2 py-0.5 rounded transition-all ${
                    profileView === "portrait" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-slate-400"
                  }`}
                >
                  Bio
                </button>
                <button
                  onClick={() => setProfileView("ai")}
                  className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                    profileView === "ai" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "text-slate-400"
                  }`}
                >
                  <Bot size={10} /> AI Q&A
                </button>
              </div>
            </div>

            {profileView === "portrait" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                {/* Framed Portrait Photo with Glowing Rotating Ring */}
                <div className="relative mb-5 group/photo">
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 opacity-75 blur-md group-hover/photo:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <div className="relative h-44 w-44 sm:h-48 sm:w-48 overflow-hidden rounded-3xl border-2 border-slate-700 bg-slate-900 shadow-2xl">
                    <Image
                      src="/sai-krishna-portrait.jpg"
                      alt="Professional portrait of Sai Krishna Yemineni"
                      fill
                      priority
                      sizes="(max-width: 640px) 176px, 192px"
                      className="object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                    />
                  </div>
                </div>

                {/* Details */}
                <h2 className="text-2xl font-bold tracking-tight text-white">Sai Krishna Yemineni</h2>
                <p className="mt-1 text-xs font-medium text-cyan-300 font-mono">
                  AI/ML Engineer @ Johnson & Johnson · Ex-Deloitte
                </p>

                {/* Skill Tags */}
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {["Agentic AI", "RAG", "MLOps", "Healthcare"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                <AIProfileTerminal />
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 justify-center">
            <AnchorButton href="#contact" primary>
              Get in touch <ArrowUpRight size={15} />
            </AnchorButton>
            <AnchorButton
              href="https://www.linkedin.com/in/sai-krishna-y-b8a04a293"
              target="_blank"
            >
              <Linkedin size={15} /> LinkedIn
            </AnchorButton>
          </div>
        </TiltCard>

        {/* Portfolio Overview Card */}
        <TiltCard className="card-surface col-span-12 p-8 sm:col-span-7 lg:col-span-8 lg:row-span-2 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative z-20">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              Portfolio Overview
            </div>

            <h2 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-[-.04em] sm:text-5xl text-slate-100">
              Production AI engineering with product discipline.
            </h2>

            <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-slate-300 font-normal">
              4+ years building production-grade AI across healthcare and consulting:
              Agentic AI, Generative AI, RAG, NLP, predictive modeling, MLOps,
              cloud deployment, evaluation, monitoring, and large-scale data pipelines.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "Agentic AI Architectures", color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" },
                { label: "3 TB+/day Healthcare Ingestion", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
                { label: "99.99% Real-Time API SLA", color: "border-purple-500/30 bg-purple-500/10 text-purple-300" }
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <AnchorButton href="#projects" primary>
                View selected work <ArrowUpRight size={15} />
              </AnchorButton>
              <button
                onClick={() => setResumeModalOpen(true)}
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm hover:border-slate-600"
              >
                <Download size={15} /> Resume
              </button>
              <CopyButton value="saikrishnayemineni0428@gmail.com" />
            </div>
          </div>
        </TiltCard>

        {/* Metrics Grid with Smooth Ease-Out Number Counting Animation */}
        {[
          {
            number: "4+",
            label: "Years in AI/ML Engineering",
            sub: "Healthcare & Consulting",
            badge: "Experience",
            glow: "border-t-2 border-t-cyan-400/90",
            sparkline: "M0 15 Q20 5, 40 12 T80 4 T120 10",
            stroke: "#06b6d4"
          },
          {
            number: "3 TB+",
            label: "Healthcare Data Daily",
            sub: "Real-time EHR Ingestion",
            badge: "Data Scale",
            glow: "border-t-2 border-t-emerald-400/90",
            sparkline: "M0 16 Q30 18, 60 8 T120 2",
            stroke: "#10b981"
          },
          {
            number: "27%",
            label: "Alert Latency Reduction",
            sub: "Clinical Agent Pipelines",
            badge: "Optimization",
            glow: "border-t-2 border-t-purple-400/90",
            sparkline: "M0 4 Q40 6, 80 14 T120 18",
            stroke: "#a855f7"
          },
          {
            number: "99.99%",
            label: "Inference API Uptime",
            sub: "Production Enterprise SLAs",
            badge: "Reliability",
            glow: "border-t-2 border-t-amber-400/90",
            sparkline: "M0 10 Q30 4, 60 6 T120 3",
            stroke: "#f59e0b"
          },
        ].map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{ y: -5, scale: 1.025 }}
            transition={spring}
            className={`metric-card col-span-6 rounded-2xl p-5 sm:col-span-3 lg:col-span-3 ${metric.glow} flex flex-col justify-between group overflow-hidden`}
          >
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                <span>{metric.badge}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 group-hover:bg-cyan-400 transition-colors" />
              </div>
              
              {/* Smooth ease-out number counter */}
              <div className="text-3xl font-extrabold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all font-mono">
                <NumberCounter value={metric.number} />
              </div>
            </div>

            {/* Sparkline Graphic */}
            <div className="my-2 h-5 w-full opacity-40 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 120 20" className="w-full h-full">
                <path d={metric.sparkline} fill="none" stroke={metric.stroke} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="mt-1">
              <div className="text-xs font-semibold leading-snug text-zinc-200">{metric.label}</div>
              <div className="mt-1 text-[11px] text-zinc-400 font-normal">{metric.sub}</div>
            </div>
          </motion.div>
        ))}

        {/* About & Philosophy */}
        <TiltCard spotlight={true} className="card-surface col-span-12 p-8 lg:col-span-7 relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div id="about" className="relative z-10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              01 · About & Engineering Philosophy
            </div>
            <h3 className="mt-3 text-3xl sm:text-4xl font-bold tracking-[-.04em] text-white">
              From technical idea to <span className="text-gradient">measurable AI product.</span>
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-300 font-normal">
              I translate complex clinical and business requirements into reliable AI systems.
              The model is only one part of the work — the surrounding system needs clean data,
              retrieval, orchestration, guardrails, evaluation, APIs, monitoring, and a usable workflow.
            </p>

            {/* Animated Flowing Pipeline Nodes */}
            <div className="mt-6 relative">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 relative z-10">
                {[
                  { step: "01", name: "Data & Ingestion", desc: "Structured EHR & Streams" },
                  { step: "02", name: "RAG & Retrieval", desc: "Vector DB & Hybrid Search" },
                  { step: "03", name: "Agent Graph", desc: "LangGraph Multi-Agent Triage" },
                  { step: "04", name: "MLOps & Eval", desc: "APIs, Guardrails & SLAs" }
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-3 shadow-inner hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">{item.step}</div>
                    <div className="mt-1 text-xs font-bold text-white">{item.name}</div>
                    <div className="mt-0.5 text-[10px] text-zinc-400">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Agentic AI", "RAG & LLMs", "Production ML", "MLOps", "Healthcare AI", "Cloud Architecture"].map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={spring}
                  className="rounded-full border border-zinc-800/80 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-md hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Location/local time */}
        <TiltCard className="card-surface col-span-12 lg:col-span-5">
          <LocalTimeCard />
        </TiltCard>

        {/* Featured project */}
        <TiltCard className="card-surface col-span-12 p-8 lg:col-span-8 lg:row-span-2 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div id="projects" className="relative z-10 scroll-mt-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  02 · Featured Project & Architecture
                </div>
                <h3 className="mt-2 text-3xl font-bold tracking-[-.04em] text-white">
                  Agentic Clinical Intelligence Platform
                </h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                <BriefcaseBusiness size={20} />
              </span>
            </div>

            {/* Interactive Architecture Simulator */}
            <div className="mt-6">
              <ProjectArchitecture />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["Python", "LangGraph", "RAG", "FastAPI", "AWS"].map((item) => (
                <Badge key={item} className="border border-zinc-700 bg-zinc-900 text-zinc-200 px-3 py-1 font-semibold text-xs">{item}</Badge>
              ))}
              <span className="ml-auto rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                27% Lower Alert Latency Pattern
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-300 font-normal">
              A production AI system architecture: validates clinical input streams,
              extracts structured medical information, retrieves grounded EHR context via hybrid vector search,
              scores patient risk, verifies outputs against clinical guardrails, and routes low-confidence cases for human review.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all shadow-sm"
              >
                <ExternalLink size={15} /> Request Demo Walkthrough
              </a>
              <a
                href="https://github.com/saikrishnayemineni/agentic-clinical-triage"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all"
              >
                <Github size={15} /> View System Repositories
              </a>
            </div>
          </div>
        </TiltCard>

        {/* Playground */}
        <TiltCard className="card-surface col-span-12 sm:col-span-6 lg:col-span-4">
          <PlaygroundCard />
        </TiltCard>

        {/* Experience J&J */}
        <TiltCard className="card-surface col-span-12 p-7 lg:col-span-6 relative overflow-hidden border-t-2 border-t-red-500/80 border-beam-box border-beam-red">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
          <div id="experience" className="relative z-10 scroll-mt-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                  <span>03 · Experience</span>
                  <span className="rounded-full border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[9px] font-bold text-red-300 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
                    Active Role
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Johnson & Johnson</h3>
                <p className="mt-1 text-xs font-medium text-zinc-400">
                  AI/ML Engineer · May 2024 — Present
                </p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-rose-700 text-xs font-black text-white shadow-lg shadow-red-500/25 shrink-0">
                J&J
              </span>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                { title: "27% Lower Alert Latency", desc: "Optimized clinical agent triage pipeline", icon: "⚡" },
                { title: "19% Higher Accuracy", desc: "Enhanced medical risk prediction models", icon: "🎯" },
                { title: "10 hrs → 40 mins Review", desc: "93% document processing speedup", icon: "⏱️" },
                { title: "3+ TB Daily Healthcare Data", desc: "Real-time EHR data ingestion", icon: "🔥" }
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition-all duration-300 hover:border-red-500/40 hover:bg-zinc-900/80"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <div className="mt-1.5 text-[11px] text-zinc-400 font-normal leading-normal">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Experience Deloitte */}
        <TiltCard className="card-surface col-span-12 p-7 lg:col-span-6 relative overflow-hidden border-t-2 border-t-emerald-500/80 border-beam-box border-beam-emerald">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Previous Role
                </div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Deloitte</h3>
                <p className="mt-1 text-xs font-medium text-zinc-400">
                  AI/ML Engineer · Dec 2020 — Jul 2023
                </p>
              </div>
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-zinc-700 bg-zinc-900 text-sm font-black text-white shadow-lg shrink-0">
                D
                <span className="absolute bottom-2.5 right-2.5 h-2 w-2 rounded-full bg-[#86BC25]" />
              </span>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                { title: "80M Records Daily", desc: "Large-scale patient record pipelines", icon: "📈" },
                { title: "10 Real-Time APIs", desc: "Production ML model inference serving", icon: "🚀" },
                { title: "99.99% Production Uptime", desc: "Enterprise SLA & MLOps standard", icon: "🛡️" },
                { title: "BERT EHR NLP Pipelines", desc: "Clinical unstructured text extraction", icon: "🧠" }
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/80"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <div className="mt-1.5 text-[11px] text-zinc-400 font-normal leading-normal">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* LLM Evaluation & MLOps Matrix Bento Card */}
        <TiltCard className="card-surface col-span-12 sm:col-span-6 lg:col-span-6 border-t-2 border-t-cyan-500/80">
          <EvalMatrixCard />
        </TiltCard>

        {/* Real-Time Clinical EHR & Risk Stratification Dashboard */}
        <TiltCard className="card-surface col-span-12 border-t-2 border-t-rose-500/80">
          <ClinicalDashboardCard />
        </TiltCard>

        {/* Complete 10-Project Engineering Portfolio Grid */}
        <TiltCard tilt={false} className="card-surface col-span-12 p-7">
          <ProjectsShowcase />
        </TiltCard>

        {/* Skills & Tech Stack with Live Search & Experience Telemetry */}
        <TiltCard tilt={false} className="card-surface col-span-12 p-7">
          <div id="skills" className="scroll-mt-28">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-medium text-cyan-400 font-semibold uppercase tracking-wider">04 · Tech stack & Skills</div>
                <h3 className="mt-2 text-3xl font-bold tracking-[-.04em] text-white">
                  Tools & Methodologies across the full AI lifecycle.
                </h3>
              </div>

              {/* Live Search Input & Filter Chips */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    placeholder="Search 40+ technologies..."
                    className="w-full sm:w-52 rounded-xl border border-zinc-800 bg-zinc-950/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      layout
                      whileTap={{ scale: 0.94 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setCategory(cat.id)}
                      className={`focus-ring rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                        category === cat.id
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20"
                          : "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-950/60"
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div layout className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visibleSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 hover:border-cyan-500/40 hover:bg-zinc-900/80 transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 group-hover:scale-110 transition-transform"
                      style={{ boxShadow: `0 0 20px ${skill.glow}` }}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={30}
                        height={30}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">{skill.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400 font-medium">{skill.experience}</div>
                    </div>
                  </div>

                  {skill.tags && skill.tags.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex flex-wrap gap-1">
                      {skill.tags.map((t) => (
                        <span key={t} className="rounded bg-zinc-900 px-1.5 py-0.5 text-[9px] font-medium text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Functional & Statistical Techniques Directory */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-cyan-400" />
                <span>Specialized Domain Competencies & Methodologies:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Convolutional Neural Networks (CNN)",
                  "Recurrent Neural Networks (RNN)",
                  "Transformers & Attention Mechanisms",
                  "Generative Adversarial Networks (GANs)",
                  "Time Series Forecasting",
                  "Anomaly Detection",
                  "Reinforcement Learning",
                  "Bayesian Optimization",
                  "Hyperparameter Tuning (Grid/Random)",
                  "Prompt Engineering & Few-Shot",
                  "LLM Evaluation & Guardrails",
                  "A/B Testing & Drift Monitoring",
                  "Tableau & Power BI",
                  "Advanced Statistical Modeling",
                  "Hadoop & Dask",
                  "MySQL & SQL Server",
                  "Linux / Bash Automation"
                ].map((technique) => (
                  <span
                    key={technique}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Social */}
        <TiltCard className="card-surface col-span-12 lg:col-span-5">
          <SocialCard />
        </TiltCard>

        {/* Certifications with Holographic Foil Shimmer */}
        <TiltCard className="card-surface col-span-12 p-7 lg:col-span-7 holo-shimmer-card">
          <div id="certifications" className="scroll-mt-28">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">05 · Certifications</div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Cloud + AI Credentials</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <ShieldCheck size={20} className="animate-pulse" />
              </span>
            </div>

            <div className="mt-6 grid gap-3.5 md:grid-cols-3">
              {[
                {
                  brand: "AWS",
                  icon: "/icons/aws.svg",
                  title: "AWS Certified AI Practitioner",
                  badge: "AI Specialty",
                  border: "hover:border-amber-500/50 border-t-2 border-t-amber-500/80"
                },
                {
                  brand: "AWS",
                  icon: "/icons/aws.svg",
                  title: "AWS Certified Machine Learning",
                  badge: "Specialty",
                  border: "hover:border-amber-500/50 border-t-2 border-t-amber-500/80"
                },
                {
                  brand: "Google Cloud",
                  icon: "/icons/gcp.svg",
                  title: "Generative AI Leader",
                  badge: "GenAI Leader",
                  border: "hover:border-cyan-500/50 border-t-2 border-t-cyan-500/80"
                },
              ].map((cert) => (
                <motion.div
                  key={cert.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={spring}
                  className={`group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4.5 flex flex-col justify-between transition-all duration-300 ${cert.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Image src={cert.icon} alt={cert.brand} width={28} height={28} className="rounded-md object-contain" />
                      <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[9px] font-semibold text-zinc-400">
                        {cert.badge}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{cert.brand}</div>
                    <div className="mt-2 text-sm font-bold leading-snug text-white group-hover:text-cyan-100 transition-colors">
                      {cert.title}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                    <span className="text-zinc-500 font-mono">2026–2029</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Education Bento Card with Glowing Connection Pathway */}
        <TiltCard className="card-surface col-span-12 p-7 lg:col-span-12 relative overflow-hidden border-t-2 border-t-purple-500/80 border-beam-box border-beam-purple">
          <div id="education" className="relative z-10 scroll-mt-28">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">Education & Academic Background</div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Degree Credentials</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <GraduationCap size={20} />
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 transition-all duration-300 hover:border-purple-500/40">
                <div className="flex items-center justify-between text-xs text-purple-300 font-semibold mb-1">
                  <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5">Master of Science (M.S.)</span>
                  <span className="text-xs text-zinc-400 font-medium">Sept 2023 – May 2025</span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-white group-hover:text-purple-200 transition-colors">Computer Science</h4>
                <div className="mt-1 text-sm font-semibold text-zinc-300">Rivier University</div>
                <div className="mt-0.5 text-xs text-zinc-400 font-medium">Nashua, NH, USA</div>
              </div>

              <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 transition-all duration-300 hover:border-indigo-500/40">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-1">
                  <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5">Bachelor of Technology (B.Tech)</span>
                  <span className="text-xs text-zinc-400 font-medium">Jun 2016 – Sept 2020</span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">Computer Science & Engineering</h4>
                <div className="mt-1 text-sm font-semibold text-zinc-300">KL University</div>
                <div className="mt-0.5 text-xs text-zinc-400 font-medium">Andhra Pradesh, India</div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Contact with Cosmic Aurora Mesh Backdrop */}
        <TiltCard tilt={false} className="card-surface col-span-12 p-8 sm:p-10 relative overflow-hidden border-t-2 border-t-cyan-500/80 aurora-bg">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div id="contact" className="grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-center relative z-10 scroll-mt-28">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                06 · Get in Touch & Collaborate
              </div>
              <h3 className="mt-3 max-w-3xl text-3xl sm:text-4xl font-extrabold leading-tight tracking-[-.04em] text-white">
                Let&apos;s build <span className="text-gradient">intelligent AI systems</span> that actually ship.
              </h3>
              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-7 text-zinc-300 font-normal">
                Open to conversations around AI/ML Engineering, Agentic Architectures,
                Generative AI, RAG, and production Machine Learning opportunities.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-bold text-emerald-300 glow-pill-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Typically responds within 24 hours · Actively Interviewing
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <AnchorButton href="mailto:saikrishnayemineni0428@gmail.com" primary>
                <Mail size={15} /> Send Email
              </AnchorButton>
              <AnchorButton
                href="https://www.linkedin.com/in/sai-krishna-y-b8a04a293"
                target="_blank"
              >
                <Linkedin size={15} /> LinkedIn
              </AnchorButton>
              <AnchorButton href="/Sai_Krishna_Yemineni_Resume.pdf" target="_blank">
                <Download size={15} /> Download Resume
              </AnchorButton>
            </div>
          </div>
        </TiltCard>
      </section>

      <footer className="mt-8 pt-6 pb-2 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          © 2026 Sai Krishna Yemineni · AI/ML Systems
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Actively Interviewing · Open to Roles
          </span>
          <a
            href="#top"
            className="focus-ring rounded-lg border border-zinc-800/90 bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/90 transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUpRight size={13} className="-rotate-45 text-cyan-400" />
          </a>
        </div>
      </footer>

      {/* Resume Quick Preview Modal */}
      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />

      {/* Universal Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
    </main>
  );
}
