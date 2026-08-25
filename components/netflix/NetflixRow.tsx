"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NetflixMediaItem } from "./netflixData";
import { NetflixCard } from "./NetflixCard";

interface NetflixRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  items: NetflixMediaItem[];
  onSelect: (item: NetflixMediaItem) => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  isMuted: boolean;
  showTop10Rank?: boolean;
}

export function NetflixRow({
  id,
  title,
  subtitle,
  items,
  onSelect,
  bookmarkedIds,
  onToggleBookmark,
  isMuted,
  showTop10Rank = false
}: NetflixRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftChevron(scrollLeft > 20);
    setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <div id={id} className="relative mb-8 sm:mb-12 group/row scroll-mt-24">
      {/* Row Header */}
      <div className="px-4 sm:px-8 lg:px-14 mb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2 group-hover/row:text-red-400 transition-colors">
            <span>{title}</span>
            <span className="text-xs text-red-500 font-semibold opacity-0 group-hover/row:opacity-100 transition-opacity">
              Explore All ›
            </span>
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Carousel Track Container */}
      <div className="relative">
        {/* Left Scroll Chevron */}
        {showLeftChevron && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={36} className="drop-shadow-lg" />
          </button>
        )}

        {/* Scrollable Items Track */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-14 py-4 scroll-smooth"
        >
          {items.map((item, index) => (
            <NetflixCard
              key={item.id}
              item={item}
              index={index}
              onSelect={onSelect}
              isBookmarked={bookmarkedIds.has(item.id)}
              onToggleBookmark={onToggleBookmark}
              isMuted={isMuted}
              showTop10Rank={showTop10Rank}
            />
          ))}
        </div>

        {/* Right Scroll Chevron */}
        {showRightChevron && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-16 bg-gradient-to-l from-black/90 via-black/50 to-transparent flex items-center justify-center text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Scroll Right"
          >
            <ChevronRight size={36} className="drop-shadow-lg" />
          </button>
        )}
      </div>
    </div>
  );
}
