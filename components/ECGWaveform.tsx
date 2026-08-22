"use client";

import { useEffect, useRef } from "react";

interface ECGWaveformProps {
  color?: string;
  height?: number;
  speed?: number;
}

export function ECGWaveform({ color = "#06b6d4", height = 60, speed = 2.5 }: ECGWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const points: number[] = [];
    const maxPoints = Math.floor(canvas.width);

    // Initialize points with baseline
    for (let i = 0; i < maxPoints; i++) {
      points[i] = height / 2;
    }

    let cycle = 0;

    const generateECGValue = (t: number): number => {
      const mid = height / 2;
      const pos = t % 120;

      // P wave
      if (pos >= 15 && pos < 25) {
        return mid - Math.sin(((pos - 15) / 10) * Math.PI) * (height * 0.15);
      }
      // Q wave
      if (pos >= 35 && pos < 38) {
        return mid + (height * 0.1);
      }
      // R peak (big spike)
      if (pos >= 38 && pos < 44) {
        return mid - Math.sin(((pos - 38) / 6) * Math.PI) * (height * 0.45);
      }
      // S wave
      if (pos >= 44 && pos < 48) {
        return mid + (height * 0.18);
      }
      // T wave
      if (pos >= 65 && pos < 85) {
        return mid - Math.sin(((pos - 65) / 20) * Math.PI) * (height * 0.22);
      }
      // Baseline with tiny realistic sensor jitter
      return mid + (Math.random() - 0.5) * 1.5;
    };

    const render = () => {
      // Advance sweep head
      for (let s = 0; s < speed; s++) {
        points[x] = generateECGValue(cycle);
        x = (x + 1) % maxPoints;
        cycle++;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 16;
      for (let gx = 0; gx < canvas.width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }
      for (let gy = 0; gy < canvas.height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }

      // Draw ECG Path
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.lineJoin = "round";

      let drawing = false;
      const sweepGap = 15;

      for (let i = 0; i < maxPoints; i++) {
        // Leave a gap behind current cursor point
        const distFromX = (x - i + maxPoints) % maxPoints;
        if (distFromX < sweepGap) {
          drawing = false;
          continue;
        }

        if (!drawing) {
          ctx.moveTo(i, points[i]);
          drawing = true;
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();

      // Draw glowing lead point
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.arc(x, points[x], 3, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, height, speed]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-slate-950/70 border border-slate-800/80">
      <canvas
        ref={canvasRef}
        width={480}
        height={height}
        className="w-full h-full block"
      />
    </div>
  );
}
