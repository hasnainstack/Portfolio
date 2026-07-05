"use client";

import { useRef, useState, useEffect } from "react";
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

function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="font-mono text-sm text-confidence">
        transmission received · I&apos;ll get back to you soon.
      </p>
    );
  }

  const inputCls =
    "w-full bg-transparent border border-line rounded-sm px-3 py-2 text-paper placeholder:text-ink-soft/50 focus:outline-none focus:border-signal transition-colors font-mono text-sm";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-3 max-w-md"
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          placeholder="name"
          value={fields.name}
          onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          className={inputCls}
        />
        <input
          required
          type="email"
          placeholder="email"
          value={fields.email}
          onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
          className={inputCls}
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="message"
        value={fields.message}
        onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
        className={`${inputCls} resize-none`}
      />
      <button
        type="submit"
        className="font-mono text-[11px] uppercase tracking-widest border border-signal text-signal px-4 py-2 rounded-sm hover:bg-signal hover:text-ink transition-colors"
      >
        send transmission →
      </button>
    </form>
  );
}

const CONTACT_OPTS = [
  { key: "contact", label: "contact form" },
  { key: "email", label: "email" },
  { key: "linkedin", label: "linkedin" },
  { key: "github", label: "github" },
];

function ContactCell() {
  const [chosen, setChosen] = useState<string | null>(null);

  const output: Record<string, React.ReactNode> = {
    contact: <ContactForm />,
    email: (
      <a
        href="mailto:hassnaink462@gmail.com"
        className="font-mono text-sm text-signal hover:underline"
      >
        hassnaink462@gmail.com
      </a>
    ),
    linkedin: (
      <a
        href="https://linkedin.com/in/hassnainkdev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm text-signal hover:underline"
      >
        linkedin.com/in/hassnainkdev →
      </a>
    ),
    github: (
      <a
        href="https://github.com/hasnainstack"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm text-signal hover:underline"
      >
        github.com/hasnainstack →
      </a>
    ),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CONTACT_OPTS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setChosen(opt.key)}
            className={`font-mono text-[11px] uppercase tracking-wider border rounded-full px-3 py-1 transition-colors ${
              chosen === opt.key
                ? "border-signal text-signal bg-signal/10"
                : "border-line text-ink-soft hover:border-signal hover:text-signal"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {chosen && <div>{output[chosen]}</div>}
    </div>
  );
}

export default function NotebookTerminal({
  notes,
  initialCommand,
}: {
  notes: NoteMeta[];
  initialCommand?: string;
}) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [value, setValue] = useState("");
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const countRef = useRef(0);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const didInit = useRef(false);

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
        return <ContactCell />;

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

      case "":
        return null;

      default:
        return (
          <p className="font-mono text-sm text-signal">
            command not found: {raw} · try{" "}
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (initialCommand && !didInit.current) {
      didInit.current = true;
      run(initialCommand);
    }
  }, []);

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

      <div className="p-4 space-y-6 max-h-[520px] overflow-y-auto">
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
            placeholder="try: experience, skills, projects, notes, sites, genai, contact, help"
            className="flex-1 bg-transparent outline-none text-paper placeholder:text-ink-soft/60"
            aria-label="Notebook command input"
          />
        </div>
      </div>
    </div>
  );
}
