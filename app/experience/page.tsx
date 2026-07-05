import SkillLegend from "@/components/SkillLegend";
import ExperienceCard from "@/components/ExperienceCard";
import DetectionSiteCard from "@/components/DetectionSiteCard";
import { experience, freelance } from "@/lib/experience";
import { liveSites, genAiApps } from "@/lib/sites";

export const metadata = { title: "Experience — Hasnain" };

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-3">
        Log
      </p>
      <h1 className="font-display text-3xl sm:text-4xl mb-4">Experience</h1>
      <p className="text-ink-soft max-w-xl mb-10 sm:mb-16 text-sm sm:text-base">
        Roles logged in order, each tagged with the skill classes it drew on ·
        the same way a detector reports which classes it found in a frame.
      </p>

      <section className="mb-12 sm:mb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-6">
          Skill classes
        </h2>
        <SkillLegend />
      </section>

      <section className="mb-12 sm:mb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-6 sm:mb-8">
          Roles
        </h2>
        <div>
          {experience.map((job) => (
            <ExperienceCard key={job.role + job.org} {...job} />
          ))}
        </div>
      </section>

      <section className="mb-12 sm:mb-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-6 sm:mb-8">
          Freelance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {freelance.map((f) => (
            <div key={f.org} className="border border-line rounded-sm p-5">
              <h3 className="font-display text-lg mb-3">{f.org}</h3>
              <ul className="space-y-2 mb-4">
                {f.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-paper/90 leading-relaxed">
                    <span className="text-signal shrink-0 font-mono">→</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {f.skills.map((s) => (
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
        </div>
      </section>

      <section className="mb-12 sm:mb-20">
        <div className="mb-6 sm:mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-2">
            Live sites · detected
          </h2>
          <p className="text-ink-soft text-sm max-w-xl">
            Shipped WordPress sites, framed like detections. Every card links
            to the live site.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {liveSites.map((site) => (
            <DetectionSiteCard key={site.url} {...site} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 sm:mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-2">
            GenAI apps · detected
          </h2>
          <p className="text-ink-soft text-sm max-w-xl">
            Deployed prototypes and agents from personal projects.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {genAiApps.map((app) => (
            <DetectionSiteCard key={app.url} {...app} />
          ))}
        </div>
      </section>
    </div>
  );
}
