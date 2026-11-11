/** Truvela mark: a sun clearing the horizon, so things come into view. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 28 28"
        className="size-7"
        aria-hidden="true"
        fill="none"
      >
        <path d="M5 17.5a9 9 0 0 1 18 0Z" fill="var(--apricot)" />
        <path
          d="M2.5 17.5h23"
          stroke="var(--ink)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M7 22h14"
          stroke="var(--ink)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      <span className="font-serif text-[1.45rem] leading-none tracking-[-0.02em] text-ink">
        Truvela
      </span>
    </span>
  );
}
