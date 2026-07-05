import Link from "next/link";
import { getAllNotes } from "@/lib/notes";

export const metadata = { title: "Field Notes · Hasnain" };

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-3">
        Observations
      </p>
      <h1 className="font-display text-4xl mb-4">Field notes</h1>
      <p className="text-ink-soft mb-12 max-w-xl">
        Shorter, less structured than the experiment log · thoughts written
        while building.
      </p>

      {notes.length === 0 && (
        <p className="text-ink-soft font-mono text-sm">
          No entries yet. Add a .md file to content/notes/ to get started.
        </p>
      )}

      <div className="divide-y divide-line">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="group block py-6"
          >
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft mb-2">
              <span>{note.date}</span>
              <span>·</span>
              <span>{note.tag}</span>
            </div>
            <h2 className="font-display text-2xl group-hover:text-signal transition-colors">
              {note.title}
            </h2>
            {note.excerpt && (
              <p className="text-ink-soft mt-2 leading-relaxed">{note.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
