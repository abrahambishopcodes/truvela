"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ORG_TYPES = [
  "Newsroom or media",
  "Bank or fintech",
  "Telecom",
  "School or university",
  "NGO or public sector",
  "Other",
] as const;

export function TeamInterestForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [orgType, setOrgType] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<{ field: "email" | "org" | "form"; msg: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setError({ field: "email", msg: "Enter your work email so we can reach you." });
      return;
    }
    if (!orgType) {
      setStatus("error");
      setError({ field: "org", msg: "Choose the kind of organisation you work for." });
      return;
    }
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, audience: "teams", orgType }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError({ field: "form", msg: "We couldn't send that just now. Please try again in a moment." });
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-sage text-ink">
          <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <p className="font-serif text-[1.6rem] leading-tight text-cream">Thanks, we&apos;ll be in touch.</p>
        <p className="text-[0.95rem] leading-relaxed text-cream/75">
          We&apos;re talking to a small group of organisations before launch.
          Expect a personal email from the team, not a newsletter.
        </p>
      </div>
    );
  }

  const fieldBase =
    "w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-[0.95rem] text-cream transition-colors duration-200 placeholder:text-cream/55 focus:border-peach focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="font-serif text-[1.6rem] leading-tight text-cream">Register your interest</p>
      <p className="-mt-1 text-[0.92rem] leading-relaxed text-cream/75">
        Tell us where you work and we&apos;ll reach out about early access and pricing.
      </p>

      <div>
        <label htmlFor={`${id}-email`} className="mb-1.5 block text-[0.82rem] font-medium text-cream/85">
          Work email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@organisation.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error?.field === "email") setError(null);
          }}
          aria-invalid={error?.field === "email"}
          aria-describedby={error?.field === "email" ? `${id}-err` : undefined}
          className={`${fieldBase} ${error?.field === "email" ? "border-[#f0a08a]" : "border-white/15"}`}
        />
      </div>

      <div>
        <label htmlFor={`${id}-org`} className="mb-1.5 block text-[0.82rem] font-medium text-cream/85">
          Organisation type
        </label>
        <div className="relative">
          <select
            id={`${id}-org`}
            value={orgType}
            onChange={(e) => {
              setOrgType(e.target.value);
              if (error?.field === "org") setError(null);
            }}
            aria-invalid={error?.field === "org"}
            aria-describedby={error?.field === "org" ? `${id}-err` : undefined}
            className={`${fieldBase} appearance-none pr-10 ${orgType ? "" : "text-cream/55"} ${
              error?.field === "org" ? "border-[#f0a08a]" : "border-white/15"
            }`}
          >
            <option value="" disabled className="text-ink">
              Choose one
            </option>
            {ORG_TYPES.map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-cream/60"
            aria-hidden="true"
          />
        </div>
      </div>

      {error && (
        <p id={`${id}-err`} role="alert" className="text-[0.85rem] text-[#f6b7a4]">
          {error.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 text-[0.95rem] font-medium text-ink transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Talk to us about early access
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
