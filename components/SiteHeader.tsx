import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs tracking-widest uppercase text-ink-soft hover:text-signal transition-colors"
        >
          Hasnain / Lab Notebook
        </Link>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          <Link href="/experience" className="text-paper hover:text-signal transition-colors">
            Experience
          </Link>
          <Link href="/projects" className="text-paper hover:text-signal transition-colors">
            Experiments
          </Link>
          <Link href="/notes" className="text-paper hover:text-signal transition-colors">
            Field Notes
          </Link>
          <a
            href="mailto:hasnain@example.com"
            className="text-paper hover:text-signal transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
