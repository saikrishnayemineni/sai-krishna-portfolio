import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sai-krishna-portfolio-drab.vercel.app"),
  title: "Sai Krishna Yemineni · Production AI/ML Engineer | Agentic AI, RAG & LLMOps",
  description: "AI/ML Engineer at Johnson & Johnson (Ex-Deloitte) with 4+ years of experience engineering 15+ production Agentic AI systems, Autonomous Deep Research, High-Throughput RAG, Fine-Tuned Clinical LLMs, MLOps Drift Pipelines, and Healthcare Telemetry. Actively seeking new opportunities.",
  keywords: [
    "Sai Krishna Yemineni",
    "Production AI Engineer",
    "Senior Machine Learning Engineer",
    "Autonomous Deep Research",
    "Agentic AI",
    "LangGraph Multi-Agent",
    "Hybrid RAG",
    "LLMOps",
    "Clinical LLM Fine-Tuning",
    "vLLM PagedAttention",
    "Multimodal Medical Vision",
    "Neural Audio Intelligence",
    "Multi-Agent Swarm OS",
    "Spatial Video Analytics",
    "Quant ML Trading Engine",
    "Realtime WebRTC Voice AI",
    "Fraud Risk ML Engine",
    "Autonomous SQL Agent",
    "Automated MLOps Drift",
    "Clinical Voice Scribe",
    "Johnson & Johnson",
    "Deloitte",
    "PyTorch",
    "FastAPI",
    "AWS SageMaker",
    "Healthcare AI"
  ],
  authors: [{ name: "Sai Krishna Yemineni" }],
  openGraph: {
    title: "Sai Krishna Yemineni · Production AI/ML Engineer",
    description: "AI/ML Engineer @ Johnson & Johnson (Ex-Deloitte) engineering 15+ production Agentic AI, Deep Research, RAG, and LLMOps systems. Open to new opportunities.",
    siteName: "Sai Krishna Yemineni Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Krishna Yemineni · Production AI/ML Engineer",
    description: "AI/ML Engineer @ Johnson & Johnson (Ex-Deloitte) engineering 15+ production Agentic AI, Deep Research, RAG, and LLMOps systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="theme-color" content="#09090b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
