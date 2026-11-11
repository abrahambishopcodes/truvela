import Image from "next/image";
import { Logo } from "./logo";
import { WaitlistForm } from "./waitlist-form";

/**
 * Footer landscape. Uses the hero painting until a dedicated footer painting
 * is added, e.g. "/images/footer-dusk.png".
 */
const FOOTER_IMAGE = "/images/hero-dawn.png";

const links = [
  { href: "#what-it-checks", label: "What it checks" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#privacy", label: "Privacy" },
  { href: "#teams", label: "For teams" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-cream">
      {/* closing call to action */}
      <section
        aria-labelledby="closing-title"
        className="mx-auto max-w-3xl px-4 pt-8 text-center sm:px-8 sm:pt-12"
      >
        <h2
          id="closing-title"
          className="font-serif text-[clamp(2.3rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.03em] text-balance text-ink"
        >
          Be the one in the group chat who <em className="italic">checks first</em>
        </h2>
        <p className="mx-auto mt-5 max-w-[32rem] text-[1.05rem] leading-relaxed text-pretty text-ink-soft">
          Join the waitlist and you&apos;ll be among the first to try Truvela
          when early access opens.
        </p>
        <div className="mt-9">
          <WaitlistForm />
        </div>
      </section>

      {/* painted landscape with the footer resting on it */}
      <div className="relative mt-4 h-[38rem] sm:h-[32rem] lg:h-[36rem]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,transparent_0%,#000_38%)]"
        >
          <Image
            src={FOOTER_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_80%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(180deg,rgba(30,40,20,0)_0%,rgba(30,38,20,0.55)_45%,rgba(26,32,18,0.85)_100%)] sm:h-2/3 sm:bg-[linear-gradient(180deg,rgba(30,40,20,0)_0%,rgba(30,38,20,0.72)_100%)]" />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-8 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <div className="text-cream">
              <Logo className="[&_span]:text-cream [&_path[stroke]]:stroke-cream" />
              <p className="mt-3 max-w-[22rem] text-[0.9rem] leading-relaxed text-cream/80">
                Clear answers about what&apos;s real, with the sources to prove it.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <nav aria-label="Footer">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-cream/90">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="rounded-sm underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="text-[0.8rem] text-cream/70">
                © 2026 Truvela. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
