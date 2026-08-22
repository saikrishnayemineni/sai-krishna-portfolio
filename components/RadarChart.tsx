"use client";

import { motion } from "framer-motion";

interface RadarMetric {
  axis: string;
  value: number; // 0 to 1
  label: string;
}

const defaultMetrics: RadarMetric[] = [
  { axis: "Relevance", value: 0.99, label: "99.2%" },
  { axis: "Faithfulness", value: 0.999, label: "99.9%" },
  { axis: "Latency", value: 0.88, label: "27% Speedup" },
  { axis: "Drift Defense", value: 0.95, label: "95%" },
  { axis: "Guardrails", value: 1.0, label: "100%" },
];

export function RadarChart() {
  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = defaultMetrics.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Compute vertex coordinates
  const getCoordinates = (index: number, val: number) => {
    const angle = angleSlice * index - Math.PI / 2;
    const r = radius * val;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build grid concentric rings
  const levels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = levels.map((lvl) => {
    const points = defaultMetrics.map((_, i) => {
      const { x, y } = getCoordinates(i, lvl);
      return `${x},${y}`;
    });
    return points.join(" ");
  });

  // Build data polygon points
  const dataPolygonPoints = defaultMetrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.value);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative flex flex-col items-center justify-center p-3">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Concentric Grid Polygons */}
        {gridPolygons.map((poly, idx) => (
          <polygon
            key={idx}
            points={poly}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axes lines from center */}
        {defaultMetrics.map((_, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Animated Data Area */}
        <motion.polygon
          points={dataPolygonPoints}
          fill="url(#radar-glow)"
          stroke="#06b6d4"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data Vertices */}
        {defaultMetrics.map((m, i) => {
          const { x, y } = getCoordinates(i, m.value);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                stroke="#06b6d4"
                strokeWidth="2"
                className="drop-shadow-[0_0_6px_#06b6d4]"
              />
            </g>
          );
        })}

        {/* Axis Labels */}
        {defaultMetrics.map((m, i) => {
          const { x, y } = getCoordinates(i, 1.22);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-300 font-mono text-[10px] font-semibold tracking-wider uppercase"
            >
              {m.axis}
            </text>
          );
        })}
      </svg>

      <div className="mt-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          Multi-Axis Production Benchmark Profile
        </span>
      </div>
    </div>
  );
}
