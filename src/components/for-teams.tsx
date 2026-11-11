import { Landmark, Newspaper, School, type LucideIcon } from "lucide-react";
import { TeamInterestForm } from "./team-interest-form";

const audiences: { icon: LucideIcon; title: string; body: string; offer: string }[] = [
  {
    icon: Newspaper,
    title: "Newsrooms & fact-checkers",
    body: "Check claims, images and clips on deadline, with every source in one report your editor can follow.",
    offer: "Multi-claim reports · shared team history",
  },
  {
    icon: Landmark,
    title: "Banks, fintech & telecoms",
    body: "Stop voice-clone and phishing fraud before money moves, by building Truvela's checks into your own apps and support flows.",
    offer: "Verification API · fraud dashboards",
  },
  {
    icon: School,
    title: "Schools & NGOs",
    body: "Teach media literacy with real examples, and give students and communities a free way to check what they see.",
    offer: "Classroom access · community programmes",
  },
];

export function ForTeams() {
  return (
    <section id="teams" aria-labelledby="teams-title" className="scroll-mt-6 bg-cream px-3 pb-24 sm:px-6 sm:pb-32">
      <div className="relative isolate mx-auto max-w-[78rem] overflow-hidden rounded-[2rem] bg-[#2b2420] px-5 py-16 sm:px-12 sm:py-20 lg:px-16">
        {/* dusk glow along the lower edge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_15%_120%,rgba(232,149,107,0.38)_0%,rgba(232,149,107,0)_60%),radial-gradient(90%_60%_at_95%_-10%,rgba(157,179,148,0.16)_0%,rgba(157,179,148,0)_60%)]"
        />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2
              id="teams-title"
              className="font-serif text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.028em] text-balance text-cream"
            >
              Truvela for teams that can&apos;t afford to get it wrong
            </h2>
            <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-pretty text-cream/75">
              The same verification engine, built into the way your organisation
              already works.
            </p>

            <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {audiences.map(({ icon: Icon, title, body, offer }) => (
                <li key={title} className="grid grid-cols-[2.25rem_1fr] gap-x-4 py-6">
                  <Icon className="mt-1 size-5 text-peach" aria-hidden="true" />
                  <div>
                    <h3 className="text-[1.08rem] font-semibold tracking-[-0.01em] text-cream">{title}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[0.95rem] leading-relaxed text-cream/70">{body}</p>
                    <p className="mt-2.5 text-[0.8rem] text-sage">{offer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-10 lg:self-start lg:pt-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <TeamInterestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
