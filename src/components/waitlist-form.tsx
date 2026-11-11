"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("That email doesn't look right. Check for a typo and try again.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("We couldn't add you just now. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full bg-white/80 px-5 py-3.5 text-[0.95rem] text-ink shadow-[0_8px_30px_-12px_rgba(43,37,32,0.25)]"
      >
        <span className="grid size-6 place-items-center rounded-full bg-true text-cream">
          <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        You&apos;re on the list. We&apos;ll email you when Truvela opens.
      </div>
    );
  }

  const invalid = status === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-md">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div
        className={`flex items-center gap-1.5 rounded-full border bg-white/85 p-1.5 shadow-[0_10px_30px_-14px_rgba(43,37,32,0.35)] transition-colors duration-200 focus-within:border-apricot ${
          invalid ? "border-false" : "border-line"
        }`}
      >
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-msg` : `${id}-hint`}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-soft/80 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-medium text-cream transition-[background-color,transform] duration-200 hover:bg-[#3d342d] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Joining…
            </>
          ) : (
            <>
              Join waitlist
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
      <p
        id={invalid ? `${id}-msg` : `${id}-hint`}
        role={invalid ? "alert" : undefined}
        className={`mt-3 text-center text-[0.82rem] ${invalid ? "text-false" : "text-ink-soft"}`}
      >
        {invalid
          ? message
          : "Free during early access. One email when we launch, nothing else."}
      </p>
    </form>
  );
}
