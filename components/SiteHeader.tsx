"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  function navClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `transition-colors ${
      active ? "text-signal" : "text-paper hover:text-signal"
    }`;
  }

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
          <Link href="/experience" className={navClass("/experience")}>Experience</Link>
          <Link href="/projects" className={navClass("/projects")}>Experiments</Link>
          <Link href="/notes" className={navClass("/notes")}>Field Notes</Link>
          <a href="mailto:hasnain@example.com" className="text-paper hover:text-signal transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}
