const tagColor: Record<string, string> = {
  "Web & WordPress": "border-signal/40 text-signal",
  "Backend & Languages": "border-confidence/40 text-confidence",
  "Computer Vision": "border-paper/40 text-paper",
  "GenAI & Agents": "border-signal/40 text-signal",
  "Data & Visualization": "border-confidence/40 text-confidence",
};

export default function ExperienceCard({
  role,
  org,
  period,
  location,
  bullets,
  skills,
}: {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
}) {
  return (
    <div className="border-l-2 border-line pl-6 pb-12 relative">
      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-signal" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        <h3 className="font-display text-xl">
          {role} <span className="text-ink-soft">· {org}</span>
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft whitespace-nowrap">
          {period}
        </span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft mb-4">
        {location}
      </p>

      <ul className="space-y-2 mb-4">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-paper/90 leading-relaxed">
            <span className="text-signal shrink-0 font-mono">→</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`font-mono text-[10px] uppercase tracking-wider border rounded-full px-2 py-0.5 ${
              tagColor[skill] ?? "border-line text-ink-soft"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
