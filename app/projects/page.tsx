import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata = { title: "Experiments — Hasnain" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-3">
        Log
      </p>
      <h1 className="font-display text-4xl mb-12">All experiments</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
