"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/projects";

const statusColor: Record<Project["status"], string> = {
  Shipped: "text-confidence border-confidence/40",
  "In Progress": "text-signal border-signal/40",
  Experiment: "text-ink-soft border-ink-soft/40",
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [scanning, setScanning] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block border border-line rounded-sm p-6 hover:border-signal transition-colors overflow-hidden"
        onMouseEnter={() => setScanning(true)}
        onMouseLeave={() => setScanning(false)}
      >
        {/* scanline sweep on hover */}
        {scanning && (
          <motion.div
            className="absolute left-0 right-0 h-px bg-signal/60 z-10 pointer-events-none"
            initial={{ top: "0%", opacity: 1 }}
            animate={{ top: "100%", opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-ink-soft tracking-widest">{project.code}</span>
          <span className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${statusColor[project.status]}`}>
            {project.status}
          </span>
        </div>
        <h3 className="font-display text-2xl mb-2 group-hover:text-signal transition-colors">
          {project.title}
        </h3>
        <p className="text-ink-soft text-sm leading-relaxed mb-4">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-ink-soft border border-line rounded-full px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
