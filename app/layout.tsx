import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sai Krishna Yemineni · Production AI/ML Engineer | Agentic AI & RAG",
  description: "AI/ML Engineer at Johnson & Johnson (Ex-Deloitte) with 4+ years of experience building production Agentic AI systems, High-Throughput RAG, Generative AI, MLOps, and Healthcare Data Pipelines. Actively seeking new opportunities.",
  keywords: [
    "Sai Krishna Yemineni",
    "AI Engineer",
    "ML Engineer",
    "Senior AI Engineer",
    "Agentic AI",
    "RAG",
    "Generative AI",
    "MLOps",
    "LangChain",
    "LangGraph",
    "PyTorch",
    "FastAPI",
    "AWS SageMaker",
    "Healthcare AI"
  ],
  authors: [{ name: "Sai Krishna Yemineni" }],
  openGraph: {
    title: "Sai Krishna Yemineni · Production AI/ML Engineer",
    description: "AI/ML Engineer @ Johnson & Johnson (Ex-Deloitte) engineering Agentic AI & RAG systems from prototype to production. Open to new opportunities.",
    siteName: "Sai Krishna Yemineni Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Krishna Yemineni · Production AI/ML Engineer",
    description: "AI/ML Engineer @ Johnson & Johnson (Ex-Deloitte) engineering Agentic AI & RAG systems from prototype to production.",
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
