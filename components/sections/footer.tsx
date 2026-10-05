import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-hairline-ink bg-ink-950 py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-8">
          <a href="#top" className="group inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400 text-xs font-black text-ink-950 transition-transform group-hover:scale-105">
              S
            </span>
            <span className="font-serif text-base font-semibold tracking-tight text-white">
              Saurin Sir&rsquo;s Tuition
            </span>
          </a>

          <a
            href="#top"
            className="group inline-flex flex-col items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-gold-400"
          >
            Back to top
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>

          <div className="h-px w-full max-w-xs bg-white/10" />

          <p className="text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Saurin Sir&rsquo;s Tuition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
