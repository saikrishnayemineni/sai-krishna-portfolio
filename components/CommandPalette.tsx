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
  GraduationCap
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
        id: "action-github",
        category: "Actions",
        title: "Open GitHub Repositories",
        subtitle: "View agentic AI systems and open-source code",
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
