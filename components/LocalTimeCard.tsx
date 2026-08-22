"use client";

import { Clock3, MapPin, Radio, Compass } from "lucide-react";
import { useLocalTime } from "./useLocalTime";

export function LocalTimeCard() {
  const time = useLocalTime("America/New_York");

  return (
    <div className="relative h-full min-h-[270px] overflow-hidden p-6 sm:p-7 flex flex-col justify-between group">
      {/* Animated Geo Map & Rotating Radar Sweep Vector */}
      <div className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-75">
        <svg viewBox="0 0 700 420" className="h-full w-full object-cover">
          <defs>
            <radialGradient id="location-glow" cx="71%" cy="39%" r="40%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="radar-sweep-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="none" />
          
          {/* Map Grid Lines */}
          <g fill="none" stroke="#52525b" strokeWidth="0.8" strokeDasharray="3 3">
            <path d="M40 70 C150 20, 260 120, 370 70 S580 40, 660 110" />
            <path d="M30 210 C120 150, 230 250, 340 190 S540 150, 670 230" />
            <path d="M70 340 C170 260, 290 350, 420 300 S570 280, 650 340" />
            <path d="M120 40 L180 380 M320 20 L350 390 M520 40 L480 380" />
          </g>

          {/* Radar Sweep Circle & Rotating Ray */}
          <g transform="translate(500, 165)">
            <circle r="120" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
            <circle r="80" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <circle r="40" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
            
            {/* Rotating Radar Sweep Line */}
            <g className="animate-radar-spin">
              <path d="M 0 0 L 120 0 A 120 120 0 0 0 85 -85 Z" fill="url(#radar-sweep-gradient)" />
              <line x1="0" y1="0" x2="120" y2="0" stroke="#22d3ee" strokeWidth="1.5" />
            </g>
          </g>

          {/* Location Beacon Pulse */}
          <circle cx="500" cy="165" r="70" fill="url(#location-glow)" />
          <circle cx="500" cy="165" r="32" fill="#06b6d4" opacity="0.2" className="animate-ping" />
          <circle cx="500" cy="165" r="14" fill="#22d3ee" opacity="0.5" />
          <circle cx="500" cy="165" r="6" fill="#ffffff" className="drop-shadow-[0_0_8px_#22d3ee]" />
        </svg>
      </div>

      {/* Top Location Info */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <MapPin size={14} className="text-cyan-400 animate-bounce" />
            Location & Geo Node
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md glow-pill-cyan">
            <Radio size={11} className="text-cyan-400 animate-pulse" />
            Live Telemetry Sync
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
          Massachusetts, USA
        </h3>
        <p className="mt-1.5 text-xs text-zinc-400 font-medium flex items-center gap-2">
          <span>Boston Metro Tech Corridor</span>
          <span className="text-zinc-600">•</span>
          <span>America/New_York</span>
        </p>
      </div>

      {/* Bottom Local Time Clock */}
      <div className="relative z-10 mt-8 pt-4 border-t border-zinc-800/80 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-1">
            <Clock3 size={13} className="text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Real-Time Local Clock</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight font-mono text-white flex items-center gap-1 drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <span>{time ? time.split(" ")[0] : "12:00:00"}</span>
            <span className="text-sm font-semibold text-cyan-400">{time ? time.split(" ")[1] : "PM"}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300 shadow-sm backdrop-blur-md flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Eastern Time (EST)
          </span>
          <span className="text-[10px] text-zinc-400 font-mono font-medium flex items-center gap-1">
            <Compass size={10} className="text-cyan-400" />
            42.3601° N, 71.0589° W
          </span>
        </div>
      </div>
    </div>
  );
}
