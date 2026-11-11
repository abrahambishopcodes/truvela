import { FileSearch, MessageCircle, ShieldAlert } from "lucide-react";

/**
 * Illustrative example of a Truvela check: a forwarded message resolves
 * from "checking" to a sourced verdict. Not a real result.
 */
export function VerdictCard({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`w-[min(100%,22rem)] rounded-2xl border border-white/70 bg-cream/95 p-4 text-left shadow-[0_24px_60px_-20px_rgba(60,40,25,0.45),0_2px_6px_-2px_rgba(60,40,25,0.12)] ${className}`}
    >
      <div className="flex items-center justify-between text-[0.75rem] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-3.5" aria-hidden="true" />
          Forwarded message
        </span>
        <span>Example check</span>
      </div>

      <blockquote className="mt-3 rounded-xl bg-sand/70 px-3.5 py-3 font-serif text-[1.02rem] leading-snug text-ink">
        &ldquo;All banks will freeze accounts this Monday. Withdraw your money
        today and forward this to everyone.&rdquo;
      </blockquote>

      <div className="relative mt-3 min-h-[7.25rem]">
        {/* checking state */}
        <div
          className="animate-checking-out absolute inset-x-0 top-0"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 text-[0.82rem] text-ink-soft">
            <FileSearch className="size-4" />
            Checking fact-checks and official sources…
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand">
            <div className="animate-scan h-full w-2/5 rounded-full bg-apricot/80" />
          </div>
        </div>

        {/* verdict */}
        <figcaption className="animate-verdict-in">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-false/10 px-2.5 py-1 text-[0.8rem] font-semibold text-false">
              <ShieldAlert className="size-3.5" aria-hidden="true" />
              Likely false
            </span>
            <span className="text-[0.75rem] tabular-nums text-ink-soft">
              5 sources checked
            </span>
          </div>
          <p className="mt-2.5 text-[0.84rem] leading-relaxed text-ink-soft">
            No bank or regulator has announced a freeze. The same wording
            matches an older hoax that fact-checkers already debunked.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-ink-soft">
            <span>Confidence</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
              <span className="block h-full w-[88%] rounded-full bg-false/80" />
            </span>
            <span className="tabular-nums">High</span>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
