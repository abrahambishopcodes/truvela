import { ScanEye } from "lucide-react";

/** Small illustrative example: a photo flagged for signs of AI generation. */
export function ImageCheckChip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`items-center gap-3 rounded-2xl border border-white/70 bg-cream/95 py-2.5 pr-4 pl-2.5 shadow-[0_18px_44px_-18px_rgba(60,40,25,0.45),0_2px_6px_-2px_rgba(60,40,25,0.1)] ${className}`}
    >
      {/* thumbnail of the photo being checked */}
      <span
        aria-hidden="true"
        className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(160deg,#f6d3b4_0%,#e8a585_45%,#7f9a74_100%)]"
      >
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#5f7d58]" />
        <span className="absolute top-2 left-3 size-3 rounded-full bg-[#fff1da]" />
      </span>
      <span className="text-left">
        <span className="flex items-center gap-1.5 text-[0.75rem] text-ink-soft">
          <ScanEye className="size-3.5" aria-hidden="true" />
          Photo check · example
        </span>
        <span className="mt-0.5 block text-[0.88rem] font-semibold text-[#9a5a1f]">
          Signs of AI generation
        </span>
      </span>
    </div>
  );
}
