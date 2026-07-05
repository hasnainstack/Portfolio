import { skillCategories } from "@/lib/skills";

export default function SkillLegend() {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
      {skillCategories.map((cat) => (
        <div key={cat.name}>
          <h3 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            {cat.name}
          </h3>
          <ul className="space-y-1.5">
            {cat.items.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-2 text-sm text-paper/90"
              >
                <span className="w-1 h-1 rounded-full bg-confidence shrink-0 translate-y-[-2px]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
