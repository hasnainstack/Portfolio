"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Wraps children in an animated detection frame: corner brackets draw in,
 * a scanline sweeps once, and a label tag counts up to a confidence score.
 * This is the site's signature element — a nod to the bounding-box output
 * of the CV models the projects are built on.
 */
export default function Scanner({
  label,
  confidence = 98.7,
  children,
}: {
  label: string;
  confidence?: number;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Number((progress * confidence).toFixed(1)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 900);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [confidence]);

  const corner = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2, ease: "easeInOut" as const },
    },
  };

  return (
    <div className="relative inline-block scanlines">
      {/* scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-signal/70 z-10"
        initial={{ top: "0%", opacity: 1 }}
        animate={{ top: "100%", opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
      />

      {/* corner brackets */}
      <svg
        className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] pointer-events-none"
        aria-hidden="true"
      >
        {[
          "M0,16 L0,0 L16,0",
          "M calc(100% - 16px),0 L 100%,0 L 100%,16",
          "M0,calc(100% - 16px) L0,100% L16,100%",
          "M calc(100% - 16px),100% L100%,100% L100%,calc(100% - 16px)",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#FF6A3D"
            strokeWidth={2}
            variants={corner}
            initial="hidden"
            animate="show"
          />
        ))}
      </svg>

      {children}

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="absolute -top-7 left-0 font-mono text-[11px] tracking-widest uppercase text-signal whitespace-nowrap"
      >
        {label} · <span className="text-confidence">{count.toFixed(1)}%</span>
      </motion.div>
    </div>
  );
}
