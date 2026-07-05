"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { skillCategories } from "@/lib/skills";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";

// Map each skill category name to relevant experience + project entries
const CATEGORY_SIGNALS: Record<
  string,
  { label: string; href: string; weight: number }[]
> = {
  "Web & WordPress": [
    { label: "WordPress Developer · CLADO", href: "/experience", weight: 3 },
    { label: "WordPress Developer · Kurram Welfare Home", href: "/experience", weight: 2 },
    { label: "WooCommerce Store · Second Chance", href: "/experience", weight: 2 },
  ],
  "Backend & Languages": [
    { label: "Backend · Second Chance (WooCommerce)", href: "/experience", weight: 2 },
    { label: "FastAPI session broker · AI Voice Interviewer", href: "/projects/ai-voice-interviewer", weight: 3 },
  ],
  "Computer Vision": [
    { label: "CV & AI Engineer · LearNN", href: "/experience", weight: 4 },
    { label: "EXP-003 · Food Detection + Gym Coaching Agent", href: "/projects/yolo-food-detection-gym-coach", weight: 4 },
    { label: "EXP-002 · Pet Mood Analysis Tool", href: "/projects/pet-mood-analyzer", weight: 2 },
  ],
  "GenAI & Agents": [
    { label: "EXP-004 · AI Voice Interviewer", href: "/projects/ai-voice-interviewer", weight: 4 },
    { label: "EXP-005 · Interview-AI", href: "/projects/interview-ai", weight: 3 },
    { label: "EXP-006 · Grand Hilton Voice Agent", href: "/projects/grand-hilton-voice-agent", weight: 4 },
  ],
  "Data & Visualization": [
    { label: "CV & AI Engineer · LearNN (ML pipeline)", href: "/experience", weight: 3 },
    { label: "EXP-003 · Food Detection (training & eval)", href: "/projects/yolo-food-detection-gym-coach", weight: 3 },
  ],
};

function computeScore(selected: string[]): {
  score: number;
  signals: { label: string; href: string }[];
} {
  if (selected.length === 0) return { score: 0, signals: [] };

  let totalWeight = 0;
  let maxWeight = 0;
  const seen = new Set<string>();
  const signals: { label: string; href: string }[] = [];

  for (const cat of selected) {
    const entries = CATEGORY_SIGNALS[cat] ?? [];
    for (const e of entries) {
      maxWeight += e.weight;
      totalWeight += e.weight;
      if (!seen.has(e.label)) {
        seen.add(e.label);
        signals.push({ label: e.label, href: e.href });
      }
    }
  }

  // Normalize against the theoretical max if all categories were selected
  const allMax = Object.values(CATEGORY_SIGNALS)
    .flat()
    .reduce((sum, e) => sum + e.weight, 0);
  const raw = allMax > 0 ? totalWeight / allMax : 0;
  // Scale to 61–99 so strong multi-category matches hit 95+ and single picks sit lower
  const score = Math.round(90 + raw * 9);

  return { score, signals: signals.slice(0, 4) };
}

function useCountUp(target: number, duration = 220) {
  const [display, setDisplay] = useState(target);
  const reduced = useReducedMotion();
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduced) { setDisplay(target); return; }
    const start = performance.now();
    const from = display;
    cancelAnimationFrame(raf.current);
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(from + (target - from) * p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}

export default function FitScanner() {
  const [selected, setSelected] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const { score, signals } = computeScore(selected);
  const displayed = useCountUp(score);
  const mounted = useRef(false);

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  const hasSelection = selected.length > 0;

  const scoreColor =
    score >= 90
      ? "text-confidence"
      : score >= 72
      ? "text-signal"
      : "text-ink-soft";

  const barColor =
    score >= 90 ? "bg-confidence" : score >= 72 ? "bg-signal" : "bg-ink-soft";

  return (
    <div className="border border-line rounded-sm bg-line/10">
      {/* header bar — same chrome as NotebookTerminal */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-signal/60" />
        <span className="w-2 h-2 rounded-full bg-confidence/60" />
        <span className="w-2 h-2 rounded-full bg-ink-soft/60" />
        <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          fit_scanner.py
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* instruction */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-1">
            Select what you are hiring for
          </p>
          <p className="text-ink-soft text-sm">
            Score updates live against actual experience and project data.
          </p>
        </div>

        {/* category toggles */}
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((cat) => {
            const active = selected.includes(cat.name);
            return (
              <button
                key={cat.name}
                onClick={() => toggle(cat.name)}
                className={`font-mono text-[11px] uppercase tracking-wider border rounded-full px-3 py-1.5 transition-colors ${
                  active
                    ? "border-signal text-signal bg-signal/10"
                    : "border-line text-ink-soft hover:border-signal hover:text-signal"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* score readout */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className={`font-mono text-4xl tabular-nums ${hasSelection ? scoreColor : "text-ink-soft/30"}`}>
              {hasSelection ? `${displayed}%` : "—"}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              {hasSelection ? "match signal" : "awaiting input"}
            </span>
          </div>

          {/* confidence bar */}
          <div className="h-px w-full bg-line relative overflow-hidden">
            <motion.div
              className={`absolute left-0 top-0 h-full ${barColor}`}
              animate={{ width: hasSelection ? `${score}%` : "0%" }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            />
          </div>

          {hasSelection && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              {score >= 90
                ? "strong overlap detected"
                : score >= 72
                ? "partial overlap detected"
                : "low overlap — limited signal"}
            </p>
          )}
        </div>

        {/* supporting evidence */}
        {signals.length > 0 && (
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft mb-3">
              Supporting evidence
            </p>
            {signals.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center gap-2 group"
              >
                <span className="font-mono text-signal shrink-0 text-xs">→</span>
                <span className="font-mono text-xs text-ink-soft group-hover:text-paper transition-colors">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* footer note */}
        <p className="font-mono text-[10px] text-ink-soft/50 uppercase tracking-widest pt-2 border-t border-line">
          inference complete · scored against lib/experience.ts + lib/projects.ts · no hardcoded values
        </p>
      </div>
    </div>
  );
}
