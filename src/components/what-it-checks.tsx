"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  AudioLines,
  CircleDot,
  Clapperboard,
  Image as ImageIcon,
  Link2,
  MessagesSquare,
  Newspaper,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

type Tone = "false" | "warn";

type Check = {
  id: string;
  label: string;
  icon: LucideIcon;
  availability: "At launch" | "Coming next";
  summary: string;
  verdict: string;
  tone: Tone;
  input: ReactNode;
  reasons: string[];
  basis: string;
};

const checks: Check[] = [
  {
    id: "claims",
    label: "Claims & headlines",
    icon: Newspaper,
    availability: "At launch",
    summary:
      "Paste a headline or share a post. Truvela pulls out each claim and checks it against fact-checks and primary sources.",
    verdict: "False",
    tone: "false",
    input: (
      <Quote>
        &ldquo;Drinking hot water every 15 minutes washes the virus out of your
        throat before it can infect you.&rdquo;
      </Quote>
    ),
    reasons: [
      "Health authorities say drinking water does not prevent viral infection",
      "Matches a hoax that has circulated since 2020",
      "No medical study supports the claim",
    ],
    basis: "4 fact-checks · 2 official health sources",
  },
  {
    id: "photos",
    label: "Photos & screenshots",
    icon: ImageIcon,
    availability: "At launch",
    summary:
      "Check whether an image was made or edited with AI, and whether it has appeared before in another context.",
    verdict: "Likely AI-generated",
    tone: "warn",
    input: <PhotoPreview />,
    reasons: [
      "Pixel patterns match common image generators",
      "No camera metadata or content credentials (C2PA)",
      "No earlier copies found in reverse image search",
    ],
    basis: "On-device analysis · reverse image search",
  },
  {
    id: "links",
    label: "Links",
    icon: Link2,
    availability: "At launch",
    summary:
      "Before you tap, see whether a link is a known phishing page, a lookalike domain, or brand new.",
    verdict: "Dangerous link",
    tone: "false",
    input: (
      <div className="flex items-center gap-2 rounded-xl bg-sand/70 px-3.5 py-3 font-mono text-[0.85rem] text-ink">
        <Link2 className="size-4 shrink-0 text-ink-soft" aria-hidden="true" />
        <span className="truncate">mybank-secure-login.co/verify-account</span>
      </div>
    ),
    reasons: [
      "Domain was registered 3 days ago",
      "Page imitates a bank login form",
      "Listed on phishing blocklists",
    ],
    basis: "Phishing blocklists · domain records",
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    availability: "Coming next",
    summary:
      "Frame-by-frame deepfake analysis that points to the exact moments that look manipulated.",
    verdict: "Signs of manipulation",
    tone: "warn",
    input: <VideoTimeline />,
    reasons: [
      "Lip movement drifts from the audio at 0:12–0:19",
      "Face edges flicker between frames",
      "Lighting on the face doesn't match the room",
    ],
    basis: "Frame analysis · audio sync check",
  },
  {
    id: "voice",
    label: "Voice notes",
    icon: AudioLines,
    availability: "Coming next",
    summary:
      "Catch cloned voices in voice notes and calls, the trick behind the newest family and CEO scams.",
    verdict: "Likely cloned voice",
    tone: "false",
    input: <Waveform />,
    reasons: [
      "Breathing and pauses are unnaturally regular",
      "Spectral artifacts typical of voice cloning",
      "Asks for an urgent money transfer",
    ],
    basis: "On-device voice analysis",
  },
  {
    id: "chats",
    label: "Forwarded chats",
    icon: MessagesSquare,
    availability: "Coming next",
    summary:
      "Share a conversation and Truvela flags impersonation, pressure tactics and false claims inside it.",
    verdict: "Likely scam",
    tone: "false",
    input: <ChatPreview />,
    reasons: [
      "Classic “new number” impersonation pattern",
      "Creates urgency around sending money",
      "Asks to move to a different payment method",
    ],
    basis: "Scam pattern library · claim check",
  },
];

export function WhatItChecks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const current = checks[active];

  function select(i: number) {
    setActive(i);
    // keep the chosen chip visible in the scrolling row on small screens
    tabRefs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % checks.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + checks.length) % checks.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = checks.length - 1;
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="what-it-checks"
      aria-labelledby="checks-title"
      className="scroll-mt-6 bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="max-w-2xl">
          <h2
            id="checks-title"
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-balance text-ink"
          >
            One place to check everything that lands on your phone
          </h2>
          <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-pretty text-ink-soft">
            Misinformation doesn&apos;t arrive in one format, so Truvela
            doesn&apos;t check just one. Every verdict comes with the reasons
            and sources behind it, never just a label.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          {/* tabs */}
          <div
            role="tablist"
            aria-label="Content types Truvela checks"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {checks.map((c, i) => {
              const selected = i === active;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={`group shrink-0 snap-start rounded-full border px-4 py-2 text-left transition-colors duration-200 lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-5 ${
                    selected
                      ? "border-ink bg-ink text-cream lg:border-line lg:bg-transparent lg:text-ink"
                      : "border-line text-ink-soft hover:text-ink lg:border-line"
                  } ${i === checks.length - 1 ? "lg:border-b" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className={`size-4 shrink-0 lg:size-[1.15rem] ${selected ? "lg:text-apricot" : ""}`}
                      aria-hidden="true"
                    />
                    <span className="text-[0.9rem] font-medium whitespace-nowrap lg:text-[1.05rem]">
                      {c.label}
                    </span>
                    <span
                      className={`ml-auto hidden text-[0.72rem] lg:inline ${
                        c.availability === "At launch" ? "text-true" : "text-ink-soft"
                      }`}
                    >
                      {c.availability}
                    </span>
                  </span>
                  <span
                    className={`hidden overflow-hidden pl-[1.9rem] text-[0.92rem] leading-relaxed text-ink-soft transition-[grid-template-rows,opacity] duration-300 lg:grid ${
                      selected ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="min-h-0">{c.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${current.id}`}
            className="relative flex flex-col justify-center overflow-hidden rounded-[1.75rem] lg:min-h-[33rem] bg-[linear-gradient(160deg,#f6dcc4_0%,#efd2b6_45%,#d9d3ad_100%)] p-4 sm:p-10"
          >
            {/* mobile: description lives above the result */}
            <p className="mb-4 px-1 text-[0.95rem] leading-relaxed text-ink lg:hidden">
              {current.summary}{" "}
              <span className="text-ink-soft">({current.availability.toLowerCase()})</span>
            </p>

            <ResultCard key={current.id} check={current} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ check }: { check: Check }) {
  const toneClasses =
    check.tone === "false" ? "bg-false/10 text-false" : "bg-[#9a5a1f]/10 text-[#8a4f18]";
  const VerdictIcon = check.tone === "false" ? ShieldAlert : AlertTriangle;
  const Icon = check.icon;

  return (
    <article className="animate-panel-in mx-auto w-full max-w-xl rounded-2xl bg-cream p-5 shadow-[0_30px_70px_-30px_rgba(70,45,25,0.5),0_2px_6px_-2px_rgba(70,45,25,0.12)] sm:p-6">
      <header className="flex items-center justify-between text-[0.78rem] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5" aria-hidden="true" />
          {check.label}
        </span>
        <span>Example check</span>
      </header>

      <div className="mt-3.5">{check.input}</div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.85rem] font-semibold ${toneClasses}`}
        >
          <VerdictIcon className="size-4" aria-hidden="true" />
          {check.verdict}
        </span>
        <span className="text-[0.78rem] text-ink-soft">{check.basis}</span>
      </div>

      <h3 className="mt-5 text-[0.8rem] font-medium text-ink">Why Truvela says so</h3>
      <ul className="mt-2.5 space-y-2.5">
        {check.reasons.map((r) => (
          <li key={r} className="flex gap-2.5 text-[0.9rem] leading-snug text-ink-soft">
            <CircleDot className="mt-[0.1rem] size-4 shrink-0 text-apricot" aria-hidden="true" />
            {r}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- example inputs ---------- */

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="rounded-xl bg-sand/70 px-4 py-3.5 font-serif text-[1.08rem] leading-snug text-ink">
      {children}
    </blockquote>
  );
}

function PhotoPreview() {
  return (
    <div
      role="img"
      aria-label="Example photo of a dramatic sunset over a lake"
      className="relative h-40 overflow-hidden rounded-xl bg-[linear-gradient(180deg,#f7c9a0_0%,#ee9c7a_40%,#b9867a_62%,#5f7d6c_63%,#3f5a4c_100%)]"
    >
      <span className="absolute top-[30%] left-[58%] size-10 rounded-full bg-[#fff0d6] blur-[1px]" />
      <span className="absolute inset-x-0 top-[63%] h-px bg-white/40" />
      {/* scan highlight over suspicious region */}
      <span className="absolute top-[18%] left-[50%] h-[40%] w-[28%] rounded-md border-2 border-dashed border-cream/90" />
    </div>
  );
}

function VideoTimeline() {
  return (
    <div className="rounded-xl bg-sand/70 p-3.5">
      <div
        role="img"
        aria-label="Example video frame of a person speaking"
        className="relative h-32 overflow-hidden rounded-lg bg-[linear-gradient(160deg,#cdb79b_0%,#a88d73_100%)]"
      >
        <span className="absolute bottom-0 left-1/2 h-24 w-28 -translate-x-1/2 rounded-t-full bg-[#7c6656]" />
        <span className="absolute bottom-16 left-1/2 size-14 -translate-x-1/2 rounded-full bg-[#c99f84]" />
      </div>
      <div className="mt-3 flex items-center gap-3 text-[0.72rem] tabular-nums text-ink-soft">
        <span>0:00</span>
        <span className="relative h-1.5 flex-1 rounded-full bg-cream">
          <span className="absolute inset-y-0 left-[30%] w-[18%] rounded-full bg-[#c47a2c]" />
        </span>
        <span>0:40</span>
      </div>
    </div>
  );
}

function Waveform() {
  const bars = [
    4, 7, 12, 9, 15, 20, 14, 8, 11, 18, 24, 19, 13, 9, 6, 10, 16, 22, 26, 21, 15, 11,
    8, 12, 17, 13, 9, 7, 11, 15, 10, 6, 4,
  ];
  return (
    <div
      role="img"
      aria-label="Example voice note waveform, 0:14 long, with the middle section flagged"
      className="flex items-center gap-3 rounded-xl bg-sand/70 px-4 py-4"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-cream">
        <AudioLines className="size-4" aria-hidden="true" />
      </span>
      <span className="flex h-8 flex-1 items-center justify-between">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h + 4}px` }}
            className={`w-[3px] shrink-0 rounded-full ${i >= 9 && i <= 22 ? "bg-false/80" : "bg-ink/35"}`}
          />
        ))}
      </span>
      <span className="text-[0.75rem] tabular-nums text-ink-soft">0:14</span>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="space-y-2 rounded-xl bg-sand/70 p-3.5 text-[0.9rem]">
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-cream px-3.5 py-2 text-ink">
        Hi Mum, I dropped my phone, this is my new number 😩
      </p>
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-cream px-3.5 py-2 text-ink">
        Can you send £450 for rent today? Bank app isn&apos;t working, I&apos;ll
        pay you back tomorrow
      </p>
    </div>
  );
}
