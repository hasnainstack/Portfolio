import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  return { title: project ? `${project.title} · Hasnain` : "Not found" };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/projects"
        className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
      >
        ← All experiments
      </Link>

      <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
        <span>{project.code}</span>
        <span>·</span>
        <span>{project.status}</span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl mt-4 mb-6">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-12">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-ink-soft border border-line rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <Section title="Problem">
        <p className="text-paper/90 leading-relaxed">{project.problem}</p>
      </Section>

      <Section title="Approach">
        <ul className="space-y-3">
          {project.approach.map((item, i) => (
            <li key={i} className="flex gap-3 text-paper/90 leading-relaxed">
              <span className="font-mono text-signal shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Architecture">
        <div className="flex flex-wrap items-center gap-2">
          {project.architecture.split("→").map((step, i, arr) => (
            <span key={i} className="contents">
              <span className="font-mono text-xs text-ink-soft border border-line rounded-sm px-3 py-2 leading-snug">
                {step.trim()}
              </span>
              {i < arr.length - 1 && (
                <span className="font-mono text-signal text-sm shrink-0">→</span>
              )}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Challenges">
        <ul className="space-y-3">
          {project.challenges.map((item, i) => (
            <li key={i} className="flex gap-3 text-paper/90 leading-relaxed">
              <span className="font-mono text-signal shrink-0">!</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {project.links.length > 0 && (
        <Section title="Links">
          <div className="flex gap-4 font-mono text-xs uppercase tracking-widest">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border border-line px-4 py-2 rounded-sm hover:border-signal hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
