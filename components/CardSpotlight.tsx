"use client";

import { MouseEvent, ReactNode, useState } from "react";

export function CardSpotlight({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [point, setPoint] = useState({ x: "50%", y: "50%" });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoint({ x: `${x}px`, y: `${y}px` });
  }

  return (
    <div onMouseMove={handleMove} className="group relative h-full">
      {enabled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at ${point.x} ${point.y}, rgba(96,165,250,.11), transparent 52%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
