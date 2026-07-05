import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllNotes, getNote } from "@/lib/notes";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  return { title: note ? `${note.title} · Hasnain` : "Not found" };
}

export default function NoteDetail({ params }: { params: { slug: string } }) {
  const note = getNote(params.slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-20">
      <Link
        href="/notes"
        className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal"
      >
        ← Field notes
      </Link>

      <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        <span>{note.date}</span>
        <span>·</span>
        <span>{note.tag}</span>
      </div>

      <h1 className="font-display text-4xl mt-4 mb-10">{note.title}</h1>

      <div
        className="prose-notebook leading-relaxed text-paper/90 space-y-5 [&_p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: note.html }}
      />
    </article>
  );
}
