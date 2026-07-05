import Link from "next/link";
import type { Project } from "@/lib/projects";

const statusColor: Record<Project["status"], string> = {
  Shipped: "text-confidence border-confidence/40",
  "In Progress": "text-signal border-signal/40",
  Experiment: "text-ink-soft border-ink-soft/40",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-line rounded-sm p-6 hover:border-signal transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-ink-soft tracking-widest">
          {project.code}
        </span>
        <span
          className={`font-mono text-[10px] uppercase tracking-widest border rounded-full px-2 py-0.5 ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <h3 className="font-display text-2xl mb-2 group-hover:text-signal transition-colors">
        {project.title}
      </h3>
      <p className="text-ink-soft text-sm leading-relaxed mb-4">
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-ink-soft border border-line rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
