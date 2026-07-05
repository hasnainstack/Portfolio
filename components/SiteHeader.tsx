"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Experiments" },
  { href: "/notes", label: "Field Notes" },
  { href: "mailto:hassnaink462@gmail.com", label: "Contact", external: true },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  function navClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `transition-colors ${active ? "text-signal" : "text-paper hover:text-signal"}`;
  }

  return (
    <header className="border-b border-line relative z-50">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs tracking-widest uppercase text-ink-soft hover:text-signal transition-colors"
        >
          Hasnain / Lab Notebook
        </Link>

        {/* desktop nav */}
        <nav className="hidden sm:flex gap-6 font-mono text-xs uppercase tracking-widest">
          {NAV.map((item) =>
            item.external ? (
              <a key={item.label} href={item.href} className="text-paper hover:text-signal transition-colors">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={navClass(item.href)}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* mobile hamburger */}
        <button
          className="sm:hidden font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-signal transition-colors flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-current transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-line bg-ink">
          <nav className="flex flex-col px-6 py-4 gap-5 font-mono text-xs uppercase tracking-widest">
            {NAV.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} className="text-paper hover:text-signal transition-colors">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={navClass(item.href)}>
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
