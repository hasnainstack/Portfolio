import Link from "next/link";
import Scanner from "@/components/Scanner";
import ProjectCard from "@/components/ProjectCard";
import DetectionSiteCard from "@/components/DetectionSiteCard";
import NotebookTerminal from "@/components/NotebookTerminal";
import TypingWord from "@/components/TypingWord";
import FitScanner from "@/components/FitScanner";
import { projects } from "@/lib/projects";
import { liveSites } from "@/lib/sites";
import { getAllNotes } from "@/lib/notes";

export default function Home() {
  const notes = getAllNotes();

  return (
    <div>
      {/* hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-28 pb-16 sm:pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-8 sm:mb-10">
          Log start · subject entering frame
        </p>

        <Scanner label="Subject: Hasnain · CV/AI Engineer">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-3xl">
            I build systems that <TypingWord word="see" delay={1200} className="text-signal" />,
            then explain what they saw.
          </h1>
        </Scanner>

        <p className="mt-8 sm:mt-10 max-w-xl text-ink-soft leading-relaxed text-sm sm:text-base">
          Computer vision and applied AI engineering, logged the way an
          experiment gets logged: what the problem was, what was tried, what
          broke, and what shipped. Currently building a real-time voice
          interviewer app and training detection models end to end.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 font-mono text-xs uppercase tracking-widest">
          <Link
            href="/projects"
            className="border border-signal text-signal px-5 py-3 rounded-sm hover:bg-signal hover:text-ink transition-colors text-center"
          >
            View experiments
          </Link>
          <Link
            href="/notes"
            className="border border-line px-5 py-3 rounded-sm hover:border-paper transition-colors text-center"
          >
            Read field notes
          </Link>
        </div>
      </section>

      {/* notebook terminal */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
          Run a cell · try experience or skills
        </p>
        <NotebookTerminal notes={notes} />
      </section>

      {/* live sites */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-28">
        <div className="flex items-baseline justify-between mb-6 sm:mb-8">
          <h2 className="font-display text-xl sm:text-2xl">Live sites · detected</h2>
          <Link
            href="/experience"
            className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
          >
            All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {liveSites.slice(0, 3).map((site) => (
            <DetectionSiteCard key={site.url} {...site} />
          ))}
        </div>
      </section>

      {/* recent experiments */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-28">
        <div className="flex items-baseline justify-between mb-6 sm:mb-8">
          <h2 className="font-display text-xl sm:text-2xl">Recent experiments</h2>
          <Link
            href="/projects"
            className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
          >
            All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {projects.slice(0, 4).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* fit scanner */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-28">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-3">
          Run the match
        </p>
        <p className="text-ink-soft mb-6 max-w-xl text-sm sm:text-base">
          Select what you are hiring for. Score is computed live against actual experience and project data.
        </p>
        <FitScanner />
      </section>

      {/* contact */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16 sm:pb-28">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
          Open a channel
        </p>
        <NotebookTerminal notes={notes} initialCommand="contact" />
      </section>
    </div>
  );
}
