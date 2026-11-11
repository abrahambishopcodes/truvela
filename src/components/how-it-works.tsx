import Image from "next/image";
import {
  AudioLines,
  Clapperboard,
  Image as ImageIcon,
  Link2,
  MessageCircle,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

const inputs: { icon: LucideIcon; label: string }[] = [
  { icon: MessageCircle, label: "Forwarded message" },
  { icon: ImageIcon, label: "Screenshot or photo" },
  { icon: Link2, label: "Link" },
  { icon: Clapperboard, label: "Video clip" },
  { icon: AudioLines, label: "Voice note" },
];

const checks = [
  "Claims vs. fact-checks",
  "Official sources",
  "AI & edit detection",
  "Link reputation",
];

const steps = [
  {
    title: "Share it to Truvela",
    body: "Tap share in WhatsApp, your gallery, your browser or any other app. You can also paste text or upload a file straight into Truvela.",
  },
  {
    title: "Truvela checks every part",
    body: "Claims are matched against fact-checks and primary sources, media is scanned for signs of AI or editing, and links are checked against phishing lists. Photo and voice analysis runs on your phone wherever it can.",
  },
  {
    title: "You see the reasons, then decide",
    body: "A plain verdict with a confidence level, the evidence behind it and links to every source. When the evidence is thin, Truvela says “uncertain” instead of guessing.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-6 bg-[#f4ebdf] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-balance text-ink"
          >
            From &ldquo;is this real?&rdquo; to an answer in seconds
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-pretty text-ink-soft">
            No copying into search engines, no guessing which site to trust.
            Share it once and Truvela does the digging.
          </p>
        </div>

        {/* flow diagram */}
        <div
          className="mt-16 grid items-center gap-4 lg:mb-14 lg:grid-cols-[1fr_auto_minmax(0,1.15fr)_auto_1fr] lg:gap-0"
          aria-label="How a check flows through Truvela"
          role="group"
        >
          {/* inputs */}
          <ul className="flex flex-wrap justify-center gap-2 lg:flex-col lg:items-end">
            {inputs.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-2 text-[0.85rem] text-ink shadow-[0_6px_16px_-10px_rgba(70,45,25,0.35)]"
              >
                <Icon className="size-4 text-ink-soft" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <Connector />

          {/* engine */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative h-36 overflow-hidden rounded-full shadow-[0_24px_50px_-24px_rgba(120,60,20,0.6)] ring-1 ring-white/50 sm:h-40">
              <Image
                src="/images/hero-dawn.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, 90vw"
                className="object-cover object-[50%_55%] scale-[1.6]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,40,10,0.05)_0%,rgba(80,40,10,0.35)_100%)]" />
              <span className="absolute inset-0 grid place-items-center font-serif text-[2.4rem] tracking-[-0.02em] text-white [text-shadow:0_2px_18px_rgba(80,35,10,0.55)]">
                Truvela
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[0.8rem] text-ink-soft lg:absolute lg:inset-x-0 lg:top-full">
              {checks.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-apricot" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <Connector />

          {/* output */}
          <div className="mx-auto w-full max-w-[17rem] rounded-2xl bg-cream p-4 shadow-[0_20px_44px_-22px_rgba(70,45,25,0.5),0_2px_6px_-2px_rgba(70,45,25,0.1)] lg:mr-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-false/10 px-2.5 py-1 text-[0.8rem] font-semibold text-false">
              <ShieldAlert className="size-3.5" aria-hidden="true" />
              Likely false
            </span>
            <dl className="mt-3.5 space-y-2 text-[0.8rem]">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Confidence</dt>
                <dd className="font-medium text-ink">High</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Sources</dt>
                <dd className="font-medium tabular-nums text-ink">5 linked</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Reasons</dt>
                <dd className="font-medium tabular-nums text-ink">3 shown</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* steps */}
        <ol className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="font-serif text-[1.6rem] leading-none text-apricot tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-3 text-[1.1rem] font-semibold tracking-[-0.01em] text-ink">
                {s.title}
              </h3>
              <p className="mt-2.5 max-w-[34ch] text-[0.95rem] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Dashed flow line: horizontal on desktop, vertical when stacked. */
function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center">
      <span className="block h-10 w-px border-l border-dashed border-ink/30 lg:h-px lg:w-16 lg:border-t lg:border-l-0 xl:w-24" />
    </div>
  );
}
