"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Play, Plus, Check, ThumbsUp, ChevronDown, ExternalLink,
  Sparkles, Activity, ShieldCheck, Database, Cpu, Layers, Zap, Code2, Music, Bot, Eye, TrendingUp, Mic, Award, GraduationCap, BriefcaseBusiness
} from "lucide-react";
import { NetflixMediaItem } from "./netflixData";
import { playCardHoverChime } from "./audio";

interface NetflixCardProps {
  item: NetflixMediaItem;
  onSelect: (item: NetflixMediaItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isMuted: boolean;
  index?: number;
  showTop10Rank?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  genai: Bot,
  clinical: Activity,
  mlops: ShieldCheck,
  enterprise: Zap,
  multimedia: Music,
  interactive: Sparkles,
  career: BriefcaseBusiness,
  education: GraduationCap,
  certification: Award
};

export function NetflixCard({
  item,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  isMuted,
  showTop10Rank = false
}: NetflixCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const IconComponent = iconMap[item.category] || Activity;

  const handleMouseEnter = () => {
    setIsHovered(true);
    playCardHoverChime(isMuted);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative flex-shrink-0 group select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top 10 Giant Netflix Number (if Top 10 Row) */}
      {showTop10Rank && item.top10Rank ? (
        <div className="flex items-center">
          <div className="netflix-top10-number text-7xl sm:text-8xl font-black select-none -mr-4 sm:-mr-6 z-0 transform translate-y-2 opacity-90">
            {item.top10Rank}
          </div>
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect(item)}
            className="w-56 sm:w-64 md:w-72 h-36 sm:h-44 rounded-xl overflow-hidden cursor-pointer relative bg-zinc-900 border border-white/10 hover:border-red-500/60 shadow-xl transition-all z-10"
          >
            {/* Inner Thumbnail Card */}
            <CardThumbnailContent item={item} IconComponent={IconComponent} />
          </motion.div>
        </div>
      ) : (
        /* Standard Netflix Card */
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ duration: 0.3 }}
          onClick={() => onSelect(item)}
          className="w-60 sm:w-72 md:w-80 h-36 sm:h-44 rounded-xl overflow-hidden cursor-pointer relative bg-zinc-900 border border-white/10 hover:border-red-500/60 shadow-xl transition-all"
        >
          <CardThumbnailContent item={item} IconComponent={IconComponent} />
        </motion.div>
      )}

      {/* Floating Hover Expansion Quick Actions Overlay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-6 left-0 right-0 z-40 p-3 rounded-2xl bg-zinc-950/95 border border-white/20 shadow-2xl backdrop-blur-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Action Buttons Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              {/* Play / Demo Trigger */}
              <button
                onClick={() => onSelect(item)}
                className="h-8 w-8 rounded-full bg-white text-black hover:bg-zinc-200 grid place-items-center transition-transform hover:scale-110 shadow-md"
                title="Play Demo"
              >
                <Play size={14} className="fill-black ml-0.5" />
              </button>

              {/* Add to Watchlist */}
              <button
                onClick={() => onToggleBookmark(item.id)}
                className={`h-8 w-8 rounded-full border border-white/30 grid place-items-center transition-all hover:scale-110 ${
                  isBookmarked ? "bg-red-600 border-red-500 text-white" : "bg-black/60 text-white hover:border-white"
                }`}
                title={isBookmarked ? "Remove from List" : "Add to My List"}
              >
                {isBookmarked ? <Check size={14} /> : <Plus size={14} />}
              </button>

              {/* Like / Endorse */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`h-8 w-8 rounded-full border border-white/30 grid place-items-center transition-all hover:scale-110 ${
                  isLiked ? "bg-emerald-600 border-emerald-500 text-white" : "bg-black/60 text-white hover:border-white"
                }`}
                title="I Like this System"
              >
                <ThumbsUp size={13} />
              </button>
            </div>

            {/* Expand Modal Chevron */}
            <button
              onClick={() => onSelect(item)}
              className="h-8 w-8 rounded-full border border-white/30 bg-black/60 text-white hover:border-white grid place-items-center transition-all hover:scale-110"
              title="Expand Details"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Title & Match Score */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-white line-clamp-1">{item.title}</div>
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="text-emerald-400 font-extrabold">{item.matchScore}% Match</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{item.maturityRating}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-cyan-400 font-mono">{item.durationOrScale}</span>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1 mt-2">
            {item.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium text-zinc-300">
                {tech}
              </span>
            ))}
            {item.techStack.length > 3 && (
              <span className="rounded bg-white/5 px-1 py-0.5 text-[9px] text-zinc-500">
                +{item.techStack.length - 3}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function CardThumbnailContent({
  item,
  IconComponent
}: {
  item: NetflixMediaItem;
  IconComponent: React.ElementType;
}) {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      {/* Ambient Glow Aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-600/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Header inside card */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-sm bg-[#E50914] text-white text-[9px] font-black grid place-items-center">
            N
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
            {item.categoryLabel}
          </span>
        </div>

        <span className="p-1.5 rounded-lg bg-white/10 text-cyan-300 border border-white/10">
          <IconComponent size={14} />
        </span>
      </div>

      {/* Center Details */}
      <div className="relative z-10 space-y-1">
        <div className="text-sm font-extrabold text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-red-400 transition-colors">
          {item.title}
        </div>
        <div className="text-[11px] text-zinc-400 line-clamp-1 font-normal">
          {item.tagline || item.subtitle || item.description}
        </div>
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-white/5 relative z-10">
        <span className="text-emerald-400 font-bold">{item.matchScore}% Match</span>
        <span className="text-zinc-300 font-mono font-medium">{item.durationOrScale}</span>
      </div>
    </div>
  );
}
