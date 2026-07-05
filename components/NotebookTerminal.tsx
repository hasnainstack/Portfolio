"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SkillLegend from "@/components/SkillLegend";
import DetectionSiteCard from "@/components/DetectionSiteCard";
import { experience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { liveSites, genAiApps } from "@/lib/sites";
import type { NoteMeta } from "@/lib/notes";

type Cell = {
  id: number;
  count: number;
  command: string;
  output: React.ReactNode;
};

const COMMANDS = [
  "experience",
  "skills",
  "projects",
  "notes",
  "sites",
  "genai",
  "about",
  "contact",
  "help",
  "clear",
];

const ALIASES: Record<string, string> = {
  exp: "experience",
  work: "experience",
  wordpress: "sites",
  apps: "genai",
  writing: "notes",
  blog: "notes",
  whoami: "about",
  "?": "help",
};

export default function NotebookTerminal({ notes }: { notes: NoteMeta[] }) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [value, setValue] = useState("");
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const countRef = useRef(0);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function resolve(raw: string) {
    const key = raw.trim().toLowerCase();
    return ALIASES[key] ?? key;
  }

  function renderOutput(raw: string): React.ReactNode {
    const cmd = resolve(raw);

    switch (cmd) {
      case "experience":
        return (
          <div className="space-y-4">
            {experience.slice(0, 2).map((job) => (
              <div key={job.role + job.org}>
                <p className="font-display text-lg">
                  {job.role} <span className="text-ink-soft">· {job.org}</span>
                </p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft mb-2">
                  {job.period}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wider text-signal border border-signal/40 rounded-full px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/experience"
              className="inline-block font-mono text-xs uppercase tracking-widest text-signal hover:underline"
            >
              full experience log →
            </Link>
          </div>
        );

      case "skills":
        return <SkillLegend />;

      case "projects":
        return (
          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="block hover:text-signal transition-colors"
              >
                <span className="font-mono text-[11px] text-ink-soft mr-2">
                  {p.code}
                </span>
                <span className="font-display text-lg">{p.title}</span>
              </Link>
            ))}
            <Link
              href="/projects"
              className="inline-block font-mono text-xs uppercase tracking-widest text-signal hover:underline"
            >
              all experiments →
            </Link>
          </div>
        );

      case "notes":
        return notes.length === 0 ? (
          <p className="text-ink-soft font-mono text-sm">
            no entries logged yet.
          </p>
        ) : (
          <div className="space-y-3">
            {notes.slice(0, 4).map((n) => (
              <Link
                key={n.slug}
                href={`/notes/${n.slug}`}
                className="block hover:text-signal transition-colors"
              >
                <span className="font-mono text-[11px] text-ink-soft mr-2">
                  {n.date}
                </span>
                <span className="font-display text-lg">{n.title}</span>
              </Link>
            ))}
            <Link
              href="/notes"
              className="inline-block font-mono text-xs uppercase tracking-widest text-signal hover:underline"
            >
              all field notes →
            </Link>
          </div>
        );

      case "sites":
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            {liveSites.slice(0, 2).map((site) => (
              <DetectionSiteCard key={site.url} {...site} />
            ))}
          </div>
        );

      case "genai":
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            {genAiApps.slice(0, 2).map((app) => (
              <DetectionSiteCard key={app.url} {...app} />
            ))}
          </div>
        );

      case "contact":
        return <ContactForm />;

      case "about":
        return (
          <p className="text-paper/90 leading-relaxed max-w-lg">
            Computer vision and applied AI engineer, also shipping WordPress
            sites and GenAI agents. Currently building an AI voice
            interviewer and training detection models end to end.
          </p>
        );

      case "help":
        return (
          <div>
            <p className="text-ink-soft text-sm mb-3">available commands:</p>
            <div className="flex flex-wrap gap-2">
              {COMMANDS.map((c) => (
                <button
                  key={c}
                  onClick={() => run(c)}
                  className="font-mono text-[11px] uppercase tracking-wider border border-line rounded-full px-2 py-0.5 hover:border-signal hover:text-signal transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        );

      case "contact":
        return <ContactForm />;

      case "":
        return null;

      default:
        return (
          <p className="font-mono text-sm text-signal">
            command not found: {raw} — try{" "}
            <button
              onClick={() => run("help")}
              className="underline hover:text-paper"
            >
              help
            </button>
          </p>
        );
    }
  }

  function run(raw: string) {
    const cmd = resolve(raw);
    if (cmd === "clear") {
      setCells([]);
      countRef.current = 0;
      setValue("");
      return;
    }
    countRef.current += 1;
    idRef.current += 1;
    const output = renderOutput(raw);
    setCells((prev) => [
      ...prev,
      { id: idRef.current, count: countRef.current, command: raw, output },
    ]);
    setValue("");
    setHistoryIdx(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim().length > 0) {
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cells.length === 0) return;
      const nextIdx =
        historyIdx === null ? cells.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setValue(cells[nextIdx].command);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cells.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(nextIdx);
        setValue(cells[nextIdx].command);
      }
    }
  }

  return (
    <div
      className="border border-line rounded-sm bg-line/10 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-line">
        <span className="w-2 h-2 rounded-full bg-signal/60" />
        <span className="w-2 h-2 rounded-full bg-confidence/60" />
        <span className="w-2 h-2 rounded-full bg-ink-soft/60" />
        <span className="ml-2 text-[11px] uppercase tracking-widest text-ink-soft">
          lab_notebook.ipynb
        </span>
      </div>

      <div className="p-4 space-y-6 max-h-[420px] overflow-y-auto">
        {cells.map((cell) => (
          <div key={cell.id}>
            <div className="flex gap-2 text-ink-soft">
              <span className="text-confidence shrink-0">In [{cell.count}]:</span>
              <span className="text-paper">{cell.command}</span>
            </div>
            {cell.output && (
              <div className="mt-2 pl-[4.5rem] -indent-[4.5rem]">
                <div className="flex gap-2">
                  <span className="text-ink-soft shrink-0">
                    Out[{cell.count}]:
                  </span>
                  <div className="indent-0 flex-1">{cell.output}</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2 items-center">
          <span className="text-confidence shrink-0">
            In [{countRef.current + 1}]:
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="try: experience, skills, projects, notes, sites, genai, help"
            className="flex-1 bg-transparent outline-none text-paper placeholder:text-ink-soft/60"
            aria-label="Notebook command input"
          />
        </div>
      </div>
    </div>
  );
}
