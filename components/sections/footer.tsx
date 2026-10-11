import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-hairline-ink bg-ink-950 py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400 text-xs font-black text-ink-950 transition-transform group-hover:scale-105">
              S
            </span>
            <span className="font-serif text-base font-semibold tracking-tight text-white">
              Saurin Sir&rsquo;s Tuition
            </span>
          </Link>

          <Link
            href="/"
            className="group inline-flex flex-col items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-gold-400"
          >
            Back to the cover
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </Link>

          <div className="h-px w-full max-w-xs bg-white/10" />

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-zinc-400">
            <a href="/courses" className="hover:text-gold-300">Courses</a>
            <a href="/reviews" className="hover:text-gold-300">Reviews</a>
            <a href="/contact" className="hover:text-gold-300">Contact</a>
            <a href="/privacy" className="hover:text-gold-300">Privacy</a>
          </nav>

          <p className="text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Saurin Sir&rsquo;s Tuition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
