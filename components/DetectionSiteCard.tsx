"use client";

import { useState } from "react";

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
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block rounded-sm border border-line hover:border-signal transition-colors overflow-hidden"
    >
      {/* corner brackets */}
      <svg className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] pointer-events-none z-10" aria-hidden="true">
        <path d="M0,14 L0,0 L14,0" fill="none" stroke="#FF6A3D" strokeWidth={2} opacity={hovered ? 1 : 0.55} className="transition-opacity" />
        <path d="M calc(100% - 14px),0 L 100%,0 L 100%,14" fill="none" stroke="#FF6A3D" strokeWidth={2} opacity={hovered ? 1 : 0.55} className="transition-opacity" />
        <path d="M0,calc(100% - 14px) L0,100% L14,100%" fill="none" stroke="#FF6A3D" strokeWidth={2} opacity={hovered ? 1 : 0.55} className="transition-opacity" />
        <path d="M calc(100% - 14px),100% L100%,100% L100%,calc(100% - 14px)" fill="none" stroke="#FF6A3D" strokeWidth={2} opacity={hovered ? 1 : 0.55} className="transition-opacity" />
      </svg>

      {/* browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-line/40 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-ink-soft/40" />
        <span className="w-2 h-2 rounded-full bg-ink-soft/40" />
        <span className="w-2 h-2 rounded-full bg-ink-soft/40" />
        <span className="ml-2 font-mono text-[10px] text-ink-soft truncate">
          {displayUrl}
        </span>
      </div>

      {/* "preview" surface — abstract pattern standing in for the live screenshot */}
      <div className="relative h-32 bg-gradient-to-br from-line/50 to-ink flex items-center justify-center">
        <span className="font-display text-lg text-paper/70 text-center px-4">
          {name}
        </span>
      </div>

      {/* labels */}
      <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-signal bg-ink/80 px-1.5 py-0.5 rounded-sm z-10">
        Detected · {category}
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-confidence bg-ink/80 px-1.5 py-0.5 rounded-sm z-10">
        {confidence.toFixed(0)}%
      </div>

      <div className="p-4">
        <p className="text-ink-soft text-sm leading-relaxed">{note}</p>
      </div>
    </a>
  );
}
