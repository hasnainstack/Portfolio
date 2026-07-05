import Link from "next/link";
import Scanner from "@/components/Scanner";
import ProjectCard from "@/components/ProjectCard";
import DetectionSiteCard from "@/components/DetectionSiteCard";
import NotebookTerminal from "@/components/NotebookTerminal";
import { projects } from "@/lib/projects";
import { liveSites } from "@/lib/sites";
import { getAllNotes } from "@/lib/notes";

export default function Home() {
  const notes = getAllNotes();

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-10">
          Log start — subject entering frame
        </p>

        <Scanner label="Subject: Hasnain — CV/AI Engineer">
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] max-w-3xl">
            I build systems that <em className="italic text-signal">see</em>,
            then explain what they saw.
          </h1>
        </Scanner>

        <p className="mt-10 max-w-xl text-ink-soft leading-relaxed">
          Computer vision and applied AI engineering, logged the way an
          experiment gets logged: what the problem was, what was tried, what
          broke, and what shipped. Currently building a real-time voice
          interviewer app and training detection models end to end.
        </p>

        <div className="mt-8 flex gap-4 font-mono text-xs uppercase tracking-widest">
          <Link
            href="/projects"
            className="border border-signal text-signal px-5 py-3 rounded-sm hover:bg-signal hover:text-ink transition-colors"
          >
            View experiments
          </Link>
          <Link
            href="/notes"
            className="border border-line px-5 py-3 rounded-sm hover:border-paper transition-colors"
          >
            Read field notes
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
          Run a cell — try &quot;experience&quot; or &quot;skills&quot;
        </p>
        <NotebookTerminal notes={notes} />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl">Live sites — detected</h2>
          <Link
            href="/experience"
            className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
          >
            All →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {liveSites.slice(0, 3).map((site) => (
            <DetectionSiteCard key={site.url} {...site} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl">Recent experiments</h2>
          <Link
            href="/projects"
            className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
          >
            All →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
