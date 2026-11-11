import Link from "next/link";
import { Logo } from "./logo";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-it-checks", label: "What it checks" },
  { href: "#privacy", label: "Privacy" },
  { href: "#teams", label: "For teams" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
      <Link href="/" aria-label="Truvela home" className="rounded-md">
        <Logo />
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-8 text-[0.9rem] text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-sm transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="#waitlist"
        className="rounded-full border border-ink/80 px-4 py-2 text-[0.9rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
      >
        Join waitlist
      </a>
    </header>
  );
}
