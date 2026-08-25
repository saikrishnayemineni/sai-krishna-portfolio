"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Linkedin, Download, Sparkles, Film, ArrowUpRight,
  Award, ShieldCheck, Activity, BriefcaseBusiness, CheckCircle2, Bookmark, LayoutGrid
} from "lucide-react";
import {
  NETFLIX_PROJECTS,
  NETFLIX_SANDBOXES,
  NETFLIX_EXPERIENCES,
  NETFLIX_CERTIFICATIONS,
  NETFLIX_SKILL_CATEGORIES,
  NetflixMediaItem
} from "./netflixData";
import { NetflixNavbar, RecruiterProfile } from "./NetflixNavbar";
import { NetflixHero } from "./NetflixHero";
import { NetflixRow } from "./NetflixRow";
import { NetflixDetailModal } from "./NetflixDetailModal";
import { NetflixProfileModal } from "./NetflixProfileModal";
import { ResumeModal } from "@/components/ResumeModal";
import { CopyButton } from "@/components/CopyButton";

interface NetflixPortfolioProps {
  viewMode: "netflix" | "bento";
  onToggleViewMode: () => void;
}

export function NetflixPortfolio({
  viewMode,
  onToggleViewMode
}: NetflixPortfolioProps) {
  const [selectedItem, setSelectedItem] = useState<NetflixMediaItem | null>(null);
  const [currentProfile, setCurrentProfile] = useState<RecruiterProfile>("recruiter");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(["agentic-clinical-triage", "production-hybrid-rag", "exp-johnson-and-johnson"])
  );
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("genai");

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filtered catalog when search query is active
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return NETFLIX_PROJECTS;
    const q = searchQuery.toLowerCase().trim();
    return NETFLIX_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Bookmarked Items
  const bookmarkedItems = useMemo(() => {
    const all = [...NETFLIX_PROJECTS, ...NETFLIX_SANDBOXES, ...NETFLIX_EXPERIENCES, ...NETFLIX_CERTIFICATIONS];
    return all.filter((item) => bookmarkedIds.has(item.id));
  }, [bookmarkedIds]);

  // Rows configuration
  const top10Projects = useMemo(() => NETFLIX_PROJECTS.filter((p) => p.isTop10), []);
  const genaiProjects = useMemo(() => NETFLIX_PROJECTS.filter((p) => p.category === "genai"), []);
  const productionProjects = useMemo(
    () => NETFLIX_PROJECTS.filter((p) => p.category === "clinical" || p.category === "enterprise" || p.category === "multimedia"),
    []
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white relative font-sans overflow-x-hidden">
      {/* Netflix Header Navigation */}
      <NetflixNavbar
        currentProfile={currentProfile}
        onSelectProfile={setCurrentProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        watchlistCount={bookmarkedIds.size}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Main Netflix Hero Billboard */}
      {!searchQuery && (
        <NetflixHero
          onOpenDetailModal={setSelectedItem}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
        />
      )}

      {/* Main Rows & Catalog */}
      <main className={`relative z-20 ${searchQuery ? "pt-28 px-4 sm:px-8 lg:px-14" : "-mt-16 sm:-mt-20"}`}>
        {/* Search Results Display (if active) */}
        {searchQuery ? (
          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Search Results for &ldquo;<span className="text-red-400">{searchQuery}</span>&rdquo; ({filteredProjects.length})
            </h2>
            {filteredProjects.length === 0 ? (
              <div className="text-zinc-400 py-12 text-center bg-zinc-900/40 rounded-2xl border border-white/10">
                No matching systems or technologies found. Try searching &ldquo;RAG&rdquo;, &ldquo;LangGraph&rdquo;, &ldquo;Kafka&rdquo;, or &ldquo;FastAPI&rdquo;.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProjects.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-red-500/60 cursor-pointer transition-all hover:scale-102 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
                      <span className="text-emerald-400 font-bold">{item.matchScore}% Match</span>
                      <span className="font-mono">{item.durationOrScale}</span>
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {item.tagline || item.description}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ROW 1: Top 10 in AI Engineering Today (Giant Number Badges) */}
            <NetflixRow
              id="row-top-10"
              title="Top 10 in AI Engineering Today"
              subtitle="Most accessed production architectures, agentic graphs, and real-time streaming engines"
              items={top10Projects}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
              showTop10Rank={true}
            />

            {/* ROW 2: Trending Now in Generative AI & Multi-Agent Graphs */}
            <NetflixRow
              id="row-trending-genai"
              title="Trending Now: Generative AI & Multi-Agent Graphs"
              subtitle="State-of-the-art LangGraph workflows, hybrid RAG, and LLMOps evaluation"
              items={genaiProjects}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
            />

            {/* ROW 3: High-Throughput Production Architectures & Telemetry */}
            <NetflixRow
              id="row-production-architectures"
              title="High-Throughput Production Architectures & Telemetry"
              subtitle="Apache Kafka streaming, sub-3ms fraud scoring, DRL trading, and edge vision"
              items={productionProjects}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
            />

            {/* ROW 4: Interactive Production Sandboxes (Live Interactive Stations) */}
            <NetflixRow
              id="row-interactive-sandboxes"
              title="Live Interactive Stations & Sandboxes"
              subtitle="Test real-time clinical simulators, LLM triad evaluation, and the AI recruiter terminal"
              items={NETFLIX_SANDBOXES}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
            />

            {/* ROW 5: Career Seasons & Episodes (Experience) */}
            <NetflixRow
              id="row-career-episodes"
              title="Career Seasons & Production Experience"
              subtitle="Johnson & Johnson (Current Season), Deloitte, and Academic Background"
              items={NETFLIX_EXPERIENCES}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
            />

            {/* ROW 6: Award-Winning Cloud & AI Certifications */}
            <NetflixRow
              id="row-certifications"
              title="Award-Winning Credentials & Certifications"
              subtitle="AWS Certified AI Practitioner, AWS Machine Learning Specialty, and GCP GenAI Leader"
              items={NETFLIX_CERTIFICATIONS}
              onSelect={setSelectedItem}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              isMuted={isMuted}
            />

            {/* ROW 7: My List / Bookmarked Systems */}
            {bookmarkedItems.length > 0 && (
              <NetflixRow
                id="row-my-list"
                title={`My List (${bookmarkedItems.length} Bookmarked Systems)`}
                subtitle="Your personalized queue of systems to inspect and evaluate"
                items={bookmarkedItems}
                onSelect={setSelectedItem}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                isMuted={isMuted}
              />
            )}

            {/* ROW 8: Netflix Originals: Sai's Tech Stack & Tooling Directory */}
            <section id="row-skills-originals" className="px-4 sm:px-8 lg:px-14 mb-14 scroll-mt-24">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#E50914] uppercase">
                  <span className="h-4 w-4 rounded-sm bg-[#E50914] text-white text-[9px] font-black grid place-items-center">
                    N
                  </span>
                  <span>ORIGINAL TECH STACK DIRECTORY</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  Because You Watched: LangGraph, PyTorch & Apache Kafka
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Comprehensive 40+ technologies across full AI/ML lifecycle and distributed cloud infrastructure.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {NETFLIX_SKILL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSkillCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSkillCategory === cat.id
                        ? "bg-[#E50914] text-white shadow-lg shadow-red-500/20 scale-105"
                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {NETFLIX_SKILL_CATEGORIES.find((c) => c.id === selectedSkillCategory)?.skills.map((skill) => (
                  <div
                    key={skill}
                    className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-red-500/50 hover:bg-zinc-800/80 transition-all text-center flex flex-col justify-center items-center group shadow-md"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      {skill}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
                      <CheckCircle2 size={10} /> Production Verified
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Netflix Footer / Cast & Crew (Contact & Collaboration) */}
        <section id="contact" className="px-4 sm:px-8 lg:px-14 pt-10 pb-16 border-t border-white/10 bg-gradient-to-b from-transparent to-black">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Actively Interviewing for Senior AI/ML Engineering Roles
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to collaborate on <span className="text-[#E50914]">Season 2026?</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Open to conversations around AI/ML Engineering, Multi-Agent Systems, Generative AI, RAG architectures, and production Machine Learning systems.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href="mailto:saikrishnayemineni0428@gmail.com"
                className="flex items-center gap-2 bg-[#E50914] text-white hover:bg-red-700 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-lg hover:scale-105"
              >
                <Mail size={16} /> Send Email
              </a>

              <a
                href="https://www.linkedin.com/in/sai-krishna-y-b8a04a293"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-zinc-700 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border border-white/15 hover:scale-105"
              >
                <Linkedin size={16} className="text-cyan-400" /> LinkedIn Profile
              </a>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-2 bg-zinc-800 text-white hover:bg-zinc-700 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border border-white/15 hover:scale-105"
              >
                <Download size={16} className="text-amber-400" /> Preview Resume
              </button>

              <CopyButton value="saikrishnayemineni0428@gmail.com" />
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
              <div>
                © 2026 Sai Krishna Yemineni · AI/ML Systems Engineering · Massachusetts, USA
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onToggleViewMode}
                  className="hover:text-white transition-colors flex items-center gap-1 text-zinc-400"
                >
                  <LayoutGrid size={12} /> Switch to Bento Grid View
                </button>
                <span>•</span>
                <a href="#top" className="hover:text-white transition-colors">
                  Back to Top ↑
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Netflix Detail & Episode Modal */}
      <NetflixDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? bookmarkedIds.has(selectedItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectRelated={(item) => setSelectedItem(item)}
      />

      {/* Recruiter Profile Modal */}
      <NetflixProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={currentProfile}
        onSelectProfile={setCurrentProfile}
        isMuted={isMuted}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
