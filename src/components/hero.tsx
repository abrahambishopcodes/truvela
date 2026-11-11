import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { DawnScene } from "./dawn-scene";
import { ImageCheckChip } from "./image-check-chip";
import { VerdictCard } from "./verdict-card";
import { WaitlistForm } from "./waitlist-form";

/**
 * Painted hero landscape. Drop the artwork into /public/images and set the
 * path here, e.g. "/images/hero-dawn.webp". While null, a code-drawn
 * dawn scene stands in.
 */
const HERO_IMAGE: string | null = "/images/hero-dawn.png";

export function Hero() {
  return (
    <section
      id="waitlist"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden"
    >
      {/* sky: cream overhead warming to peach at the horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,var(--cream)_0%,var(--cream)_28%,#f8e4cf_58%,#f4cfb0_100%)]"
      />

      <div className="mx-auto w-full max-w-3xl px-4 pt-12 text-center sm:px-8 sm:pt-20">
        <h1
          id="hero-title"
          className="animate-settle font-serif text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] font-normal tracking-[-0.03em] text-balance text-ink"
        >
          Know what&apos;s <em className="italic">real</em> before you share it
        </h1>
        <p
          className="animate-settle mx-auto mt-6 max-w-[38rem] text-[1.05rem] leading-relaxed text-pretty text-ink-soft sm:text-[1.125rem]"
          style={{ animationDelay: "120ms" }}
        >
          Truvela checks the claims, photos, videos, voice notes, links and
          forwarded chats that land on your phone, and shows you the sources
          behind every verdict.
        </p>
        <div
          className="animate-settle mt-9"
          style={{ animationDelay: "240ms" }}
        >
          <WaitlistForm />
        </div>
      </div>

      {/* landscape: fills the lower part of the hero, behind the content */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] min-h-[24rem] [mask-image:linear-gradient(180deg,transparent_0%,#000_30%)]"
      >
        <div className="absolute inset-0">
          {HERO_IMAGE ? (
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          ) : (
            <>
              <DawnScene />
              {process.env.NODE_ENV === "development" && (
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-[0.7rem] text-white">
                  <ImageIcon className="size-3" />
                  Hero art slot: set HERO_IMAGE in hero.tsx
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* example checks resting on the landscape */}
      <div className="relative mx-auto mt-12 flex w-full max-w-6xl flex-1 items-end justify-center px-4 pb-10 sm:px-8 md:mt-4 md:justify-between md:pb-14">
        <ImageCheckChip className="animate-settle hidden lg:flex lg:mb-24 lg:ml-[4%]" />
        <VerdictCard className="animate-settle md:ml-auto md:mr-[4%]" />
      </div>
    </section>
  );
}
