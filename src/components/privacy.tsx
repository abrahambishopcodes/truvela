import Image from "next/image";
import {
  Ban,
  Check,
  EyeOff,
  Hand,
  KeyRound,
  Scale,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";

const commitments: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: EyeOff,
    title: "It only sees what you share",
    body: "Truvela never reads your chats, contacts or photo library, and never scans in the background. It checks the one thing you send it, when you send it.",
  },
  {
    icon: Smartphone,
    title: "Your phone does the work first",
    body: "Photo and voice analysis runs on your device wherever possible, so those files don't need to leave your phone at all.",
  },
  {
    icon: KeyRound,
    title: "Encrypted, then let go",
    body: "When a check needs to look up sources online, it's encrypted in transit and kept only as long as the check takes, unless you save it to your history.",
  },
  {
    icon: Ban,
    title: "Never sold, never used for ads",
    body: "What you check is yours. Anything we learn about how misinformation spreads is aggregated and anonymous.",
  },
  {
    icon: Hand,
    title: "Advice, not censorship",
    body: "Truvela explains what it found and leaves the decision to you. It never deletes, blocks or publicly labels anything.",
  },
  {
    icon: Scale,
    title: "Built around privacy law",
    body: "Designed for GDPR and CCPA from day one, asking only for the permissions a check actually needs.",
  },
];

const sees = ["The message, image, link or clip you share", "Public sources it checks against"];
const neverSees = ["Your other chats and contacts", "Your photo library", "Who you share things with"];

export function Privacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-title"
      className="scroll-mt-6 bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        {/* statement */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <h2
            id="privacy-title"
            className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-balance text-ink"
          >
            Checking the truth shouldn&apos;t cost you your privacy
          </h2>
          <p className="mt-5 max-w-[32rem] text-[1.05rem] leading-relaxed text-pretty text-ink-soft">
            The things people ask Truvela about are often personal: a family
            group chat, a voice note, a photo of someone they know. So
            here&apos;s exactly how we treat them.
          </p>

          <div className="relative mt-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-32px_rgba(110,60,25,0.55)] sm:aspect-[4/3]">
            <Image
              src="/images/hero-dawn.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 34rem, 92vw"
              className="object-cover object-[12%_60%] scale-[1.35]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(60,30,10,0)_35%,rgba(45,30,15,0.55)_100%)]" />
            </div>

            {/* sees / never sees */}
            <div className="relative mx-3 -mt-14 grid gap-3 rounded-2xl bg-cream/95 p-4 text-[0.82rem] shadow-[0_12px_30px_-16px_rgba(40,25,10,0.6)] sm:absolute sm:inset-x-6 sm:bottom-6 sm:mx-0 sm:mt-0 sm:grid-cols-2 sm:p-5">
              <div>
                <p className="font-semibold text-ink">Truvela sees</p>
                <ul className="mt-2 space-y-1.5">
                  {sees.map((s) => (
                    <li key={s} className="flex gap-2 text-ink-soft">
                      <Check className="mt-[0.15rem] size-3.5 shrink-0 text-true" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-ink">Truvela never sees</p>
                <ul className="mt-2 space-y-1.5">
                  {neverSees.map((s) => (
                    <li key={s} className="flex gap-2 text-ink-soft">
                      <X className="mt-[0.15rem] size-3.5 shrink-0 text-false" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* commitments */}
        <ul className="border-t border-line">
          {commitments.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[3rem_1fr] sm:gap-x-5 sm:py-8"
            >
              <span className="grid size-10 place-items-center rounded-full bg-sand text-[#9a5a1f] sm:size-12">
                <Icon className="size-[1.15rem] sm:size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-[1.45rem] leading-tight tracking-[-0.015em] text-ink sm:text-[1.6rem]">
                  {title}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[0.97rem] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
