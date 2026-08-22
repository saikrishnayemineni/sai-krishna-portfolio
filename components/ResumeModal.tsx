"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

export function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <FileText size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Sai Krishna Yemineni — Resume Preview
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
                      Verified 2026
                    </span>
                  </h3>
                  <div className="text-[11px] text-slate-400">AI/ML Engineer @ Johnson & Johnson · Ex-Deloitte</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/Sai_Krishna_Yemineni_Resume.pdf"
                  target="_blank"
                  download
                  className="focus-ring flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  <Download size={13} /> Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="focus-ring grid h-8 w-8 place-items-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Embedded Resume Viewer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/90">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 text-slate-200">
                {/* Header Info */}
                <div className="border-b border-slate-800 pb-5">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">SAI KRISHNA YEMINENI</h2>
                  <div className="text-sm font-bold text-cyan-400 mt-0.5">AI/ML ENGINEER</div>
                  <div className="mt-2 text-xs text-slate-400 flex flex-wrap gap-4 font-mono">
                    <span>📍 Massachusetts, USA</span>
                    <span>✉️ saikrishnayemineni0428@gmail.com</span>
                    <span>🔗 linkedin.com/in/sai-krishna-y-b8a04a293</span>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">SUMMARY</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    AI/ML Engineer with 4+ years of experience developing production-grade AI solutions across healthcare and consulting environments. Experienced in Agentic AI, Generative AI, LLM applications, RAG pipelines, NLP, predictive modeling, and scalable machine learning systems. Skilled in building AI products using Python, PyTorch, TensorFlow, LangChain, Hugging Face Transformers, AWS (SageMaker, Lambda), Docker, Kubernetes, and Apache Spark.
                  </p>
                </div>

                {/* Technical Skills Categorized */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5">TECHNICAL SKILLS</div>
                  <div className="grid gap-2 sm:grid-cols-2 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="font-bold text-white">Languages: </span>
                      <span className="text-slate-300">Python, R, C++, SQL, Bash scripting</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Generative AI & LLMs: </span>
                      <span className="text-slate-300">Agentic AI, Large Language Models, RAG, Prompt Engineering, LangChain, Hugging Face, Vector DBs, Embeddings, LLM Evaluation</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">ML & Deep Learning: </span>
                      <span className="text-slate-300">TensorFlow, Keras, PyTorch, Scikit-learn, XGBoost, NumPy, Pandas, SciPy, CNNs, RNNs, Transformers, GANs, Time Series, Anomaly Detection</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Cloud & Platforms: </span>
                      <span className="text-slate-300">AWS (SageMaker, Lambda, EC2), GCP, Microsoft Azure (ML Studio, Azure Databricks)</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Deployment & MLOps: </span>
                      <span className="text-slate-300">Docker, Kubernetes, MLflow, FastAPI, Flask, TensorFlow Serving, Hyperparameter Tuning (Bayesian/Grid)</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">Big Data & Databases: </span>
                      <span className="text-slate-300">Apache Spark, Kafka, Hadoop, Dask, Hive, PostgreSQL, MongoDB, MySQL, SQL Server, Tableau, Power BI</span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">PROFESSIONAL EXPERIENCE</div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>Johnson & Johnson, MD, USA — AI/ML Engineer</span>
                        <span className="text-slate-400 font-normal">May 2024 – Present</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                        <li>Designed & deployed Agentic AI clinical risk workflow on SageMaker (27% alert latency reduction).</li>
                        <li>Built TensorFlow & XGBoost risk stratification models (19% accuracy improvement).</li>
                        <li>Developed RAG clinical document assistant (reduced review time from 10 hrs to 40 mins).</li>
                        <li>Engineered LLM evaluation framework for retrieval relevance, completeness, & hallucination risk.</li>
                        <li>Processed 3+ TB healthcare data daily using Spark, Hadoop, and Hive.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>Deloitte, India — AI/ML Engineer</span>
                        <span className="text-slate-400 font-normal">Dec 2020 – July 2023</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                        <li>Built PyTorch clinical anomaly detection engine reducing false positives by 31 units across 22 ecosystems.</li>
                        <li>Automated daily ingestion of 80M patient records via Spark, Kafka, & Airflow for 20+ models.</li>
                        <li>Containerized 10 real-time inference APIs (Docker, SageMaker, 99.99% uptime).</li>
                        <li>Implemented MLflow CI/CD pipelines mitigating 25 model drift incidents across 6 environments.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education & Certs */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">EDUCATION</div>
                    <div className="text-xs text-white font-bold">M.S. in Computer Science</div>
                    <div className="text-[11px] text-slate-400">Rivier University, NH (2023–2025)</div>
                    <div className="text-xs text-white font-bold mt-2">B.Tech in CS & Engineering</div>
                    <div className="text-[11px] text-slate-400">KL University, India (2016–2020)</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">CERTIFICATIONS</div>
                    <div className="text-xs text-slate-300 font-medium">• AWS Certified AI Practitioner</div>
                    <div className="text-xs text-slate-300 font-medium">• AWS Certified Machine Learning - Specialty</div>
                    <div className="text-xs text-slate-300 font-medium">• Google Cloud Certified GenAI Leader</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
