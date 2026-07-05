"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const ALL = "All";

const allTags = [ALL, ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function ProjectsPage() {
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-3">Log</p>
      <h1 className="font-display text-4xl mb-8">All experiments</h1>

      {/* tag filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`font-mono text-[10px] uppercase tracking-wider border rounded-full px-3 py-1 transition-colors ${
              active === tag
                ? "border-signal text-signal bg-signal/10"
                : "border-line text-ink-soft hover:border-signal hover:text-signal"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
