export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-ink-soft">
        <span>© {new Date().getFullYear()} Hasnain · logged from Peshawar, PK</span>
        <span>Built with Next.js, no template used</span>
      </div>
    </footer>
  );
}
