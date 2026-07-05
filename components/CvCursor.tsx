"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replaces the system cursor with a small detection reticle — corner ticks
 * around a center point, a live x/y coordinate readout, and a state label
 * that switches from "tracking" to "locked" over clickable elements.
 * Disabled on touch/coarse-pointer devices (there is no cursor to replace).
 */
export default function CvCursor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("cv-cursor-active");

    function onMove(e: MouseEvent) {
      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (labelRef.current) {
        labelRef.current.textContent = `x:${e.clientX} y:${e.clientY}`;
      }
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button']"
      );
      setLocked(!!interactive);
    }

    function onLeave() {
      if (boxRef.current) boxRef.current.style.opacity = "0";
    }

    function onEnter() {
      if (boxRef.current) boxRef.current.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("cv-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  const size = locked ? 30 : 22;
  const color = locked ? "#FF6A3D" : "#3DDC97";

  return (
    <div
      ref={boxRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        transform: "translate(-100px, -100px)",
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transition: "opacity 0.15s ease",
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ transition: "width 0.12s ease, height 0.12s ease" }}
      >
        <g stroke={color} strokeWidth="1.3" fill="none">
          <path d="M1,6.5 L1,1 L6.5,1" />
          <path d="M17.5,1 L23,1 L23,6.5" />
          <path d="M23,17.5 L23,23 L17.5,23" />
          <path d="M6.5,23 L1,23 L1,17.5" />
        </g>
        <circle cx="12" cy="12" r="1.2" fill={color} />
      </svg>

      <div
        className="absolute whitespace-nowrap font-mono text-[9px] uppercase tracking-widest"
        style={{ top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 4, color }}
      >
        {locked ? "locked" : "tracking"}
      </div>
      <div
        ref={labelRef}
        className="absolute whitespace-nowrap font-mono text-[9px]"
        style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 4, color }}
      >
        x:0 y:0
      </div>
    </div>
  );
}
