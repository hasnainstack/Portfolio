"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Renders a live site as if it were a bounding-box detection: a browser-chrome
 * mockup framed with corner brackets, a category label, and a confidence
 * score. Links out to the real, live URL.
 */
export default function DetectionSiteCard({
  name,
  url,
  category,
  note,
  confidence = 100,
}: {
  name: string;
  url: string;
  category: string;
  note: string;
  confidence?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [showDetection, setShowDetection] = useState(true);
  const inset = 8; // px inset for bracket placement (fixed)
  const [direction, setDirection] = useState<"vertical" | "horizontal">("vertical");
  const [scanDuration, setScanDuration] = useState(1.1);
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // run a single detection sweep then hide the transient label after a short gap
    const total = 1600; // animation length
    const gap = 500; // extra gap after sentence ends
    const t = setTimeout(() => setShowDetection(false), total + gap);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function measure() {
      const el = previewRef.current;
      if (!el) return;
      setSize({ w: el.clientWidth, h: el.clientHeight });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block rounded-sm border border-line hover:border-signal transition-colors overflow-hidden flex flex-col h-full"
    >
      {/* (Brackets and detection visuals moved to wrap the sentence paragraph below.) */}

      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-line/40 border-b border-line">
        <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F56' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#FFBD2E' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: '#27C93F' }} />
        <span className="ml-2 font-mono text-[10px] text-ink-soft truncate">
          {displayUrl}
        </span>
      </div>

      {/* "preview" surface — abstract pattern standing in for the live screenshot */}
      <div ref={previewRef} className="relative h-36 bg-gradient-to-br from-line/50 to-ink flex items-center justify-center overflow-hidden">
        {/* subtle grid / dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(transparent 23px, rgba(255,255,255,0.02) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,0.02) 24px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* faux UI silhouette (nav + content blocks) */}
        <div className="absolute top-4 left-4 right-4 h-3 bg-ink/15 rounded-sm pointer-events-none" />
        <div className="absolute top-10 left-6 w-20 h-3 bg-ink/12 rounded-sm pointer-events-none" />
        <div className="absolute top-14 left-6 right-6 h-14 bg-ink/08 rounded-sm pointer-events-none" />

        <span className="font-display text-lg text-paper/70 text-center px-4 z-10">
          {name}
        </span>

        {/* detection frame that wraps the entire preview */}
        {(() => {
          const arm = 12; // px arm length for brackets
          const s = Math.max(6, inset); // px inset from edges
          const stroke = hovered ? "rgba(255,122,77,0.95)" : "rgba(255,106,61,0.9)";
          const strokeWidth = 1.2;
          const w = Math.max(0, size.w || 200);
          const h = Math.max(0, size.h || 120);
          return (
            <>
              <svg className="absolute inset-0 pointer-events-none z-20" aria-hidden="true" viewBox={`0 0 ${w} ${h}`} width="100%" height="100%">
                {/* top-left */}
                <path d={`M ${s},${s + arm} V ${s} H ${s + arm}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="square" />
                {/* top-right */}
                <path d={`M ${w - s - arm},${s} H ${w - s} V ${s + arm}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="square" />
                {/* bottom-left */}
                <path d={`M ${s},${h - s - arm} V ${h - s} H ${s + arm}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="square" />
                {/* bottom-right */}
                <path d={`M ${w - s - arm},${h - s} H ${w - s} V ${h - s - arm}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="square" />
              </svg>

              {showDetection && (
                <motion.div
                  className="absolute bg-signal/70 z-30"
                  initial={direction === "vertical" ? { top: "0%", left: 0, right: 0, height: "1px" } : { left: "0%", top: 0, bottom: 0, width: "1px" }}
                  animate={direction === "vertical" ? { top: "100%", opacity: 0 } : { left: "100%", opacity: 0 }}
                  transition={{ duration: scanDuration, ease: "easeInOut" }}
                  style={direction === "vertical" ? { left: 0, right: 0, height: 1 } : { top: 0, bottom: 0, width: 1 }}
                />
              )}

              <div className={`absolute z-30`} style={{ left: `${s}px`, top: 8 }}>
                <span className={`${hovered ? "bg-signal text-ink px-2 py-0.5 rounded-sm" : "text-signal bg-ink/80 px-2 py-0.5 rounded-sm"} ${showDetection ? "opacity-100" : "opacity-0"} transition-opacity`}>
                  Detected · {category}
                </span>
              </div>
              <div className={`absolute z-30`} style={{ right: `${s}px`, top: 8 }}>
                <span className={`${hovered ? "text-signal" : "text-confidence bg-ink/80 px-2 py-0.5 rounded-sm"} ${showDetection ? "opacity-100" : "opacity-0"} transition-opacity`}>
                  100%
                </span>
              </div>
            </>
          );
        })()}
      </div>

      <div className="p-6">
        <div className="relative p-4 bg-transparent">
          <p className="text-ink-soft text-sm leading-relaxed relative z-10">{note}</p>
        </div>

        {/* controls removed (debug UI) */}
      </div>
    </a>
  );
}
