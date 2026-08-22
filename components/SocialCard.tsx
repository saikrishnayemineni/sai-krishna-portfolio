"use client";

import { Linkedin, Github, Twitter, Mail, ArrowUpRight, Globe, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

type SocialItem = {
  name: string;
  subtitle: string;
  href: string;
  icon: typeof Linkedin;
  badge?: string;
  color: string;
  glow: string;
};

const socials: SocialItem[] = [
  {
    name: "LinkedIn",
    subtitle: "Professional Profile · 4+ Yrs AI/ML",
    href: "https://www.linkedin.com/in/sai-krishna-y-b8a04a293",
    icon: Linkedin,
    badge: "Connect",
    color: "group-hover:border-blue-500/50 group-hover:bg-blue-500/15 group-hover:text-blue-400",
    glow: "rgba(59, 130, 246, 0.25)"
  },
  {
    name: "GitHub",
    subtitle: "@saikrishnayemineni",
    href: "https://github.com/saikrishnayemineni",
    icon: Github,
    badge: "10+ Repos",
    color: "group-hover:border-zinc-500/50 group-hover:bg-zinc-800/60 group-hover:text-white",
    glow: "rgba(255, 255, 255, 0.15)"
  },
  {
    name: "X / Twitter",
    subtitle: "AI Research Insights & Updates",
    href: "https://x.com",
    icon: Twitter,
    badge: "Follow",
    color: "group-hover:border-sky-500/50 group-hover:bg-sky-500/15 group-hover:text-sky-400",
    glow: "rgba(14, 165, 233, 0.25)"
  },
  {
    name: "Direct Email",
    subtitle: "saikrishnayemineni0428@gmail.com",
    href: "mailto:saikrishnayemineni0428@gmail.com",
    icon: Mail,
    badge: "Email Me",
    color: "group-hover:border-emerald-500/50 group-hover:bg-emerald-500/15 group-hover:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.25)"
  }
];

export function SocialCard() {
  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-2">
            <Globe size={14} className="text-purple-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span>Social & Online Presence</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300 backdrop-blur-md glow-pill-cyan">
            <Sparkles size={11} className="text-purple-300" />
            Live Sync
          </span>
        </div>

        <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Find me online</h3>
        <p className="mt-1 text-xs text-zinc-400 font-normal">Reach out directly or explore code repositories.</p>
      </div>

      <div className="relative z-10 mt-5 space-y-2.5">
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.name}
              whileHover={{ x: 6, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <span className={`grid h-10 w-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 group-hover:scale-110 ${item.color}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="rounded-md border border-zinc-800 bg-zinc-900 px-1.5 py-0.2 text-[9px] font-semibold text-zinc-400 group-hover:border-zinc-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 font-normal group-hover:text-zinc-300 transition-colors">{item.subtitle}</div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
