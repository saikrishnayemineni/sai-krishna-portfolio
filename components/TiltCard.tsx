"use client";

import { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CardSpotlight } from "./CardSpotlight";

export function TiltCard({
  children,
  className = "",
  spotlight = true,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  tilt?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [tilt ? 3 : 0, tilt ? -3 : 0]),
    { stiffness: 300, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [tilt ? -4 : 0, tilt ? 4 : 0]),
    { stiffness: 300, damping: 20 }
  );

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
    >
      <CardSpotlight enabled={spotlight}>{children}</CardSpotlight>
    </motion.div>
  );
}
