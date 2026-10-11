import Link from "next/link";
import { BookOpen, ArrowLeft, Search } from "lucide-react";
import { SitePage } from "@/components/ui/site-page";

export default function NotFound() {
  return <SitePage><section className="relative flex min-h-[85svh] items-center overflow-hidden bg-ink-950 px-5 pb-20 pt-32 text-white sm:px-8">
    <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-16 rotate-[-12deg] font-serif text-[18rem] leading-none text-white/[0.035] sm:text-[34rem]">404</div>
    <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div><p className="text-xs uppercase tracking-[0.28em] text-gold-300">Page 404 · A missing chapter</p><h1 className="mt-7 max-w-2xl font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.96]">This page slipped out of the notebook.</h1><p className="mt-8 max-w-lg leading-relaxed text-zinc-300">The link may have changed, or the page may never have existed. The rest of the story is still here.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-300"><ArrowLeft size={16} /> Return to the cover</Link><Link href="/courses" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-gold-300"><Search size={16} /> Explore courses</Link></div></div>
      <div aria-hidden="true" className="relative mx-auto w-full max-w-md rotate-[-4deg] border border-gold-400/40 bg-ivory-100 p-8 text-ivory-text shadow-[18px_20px_0_#c4a65d20] sm:p-12"><div className="flex items-center justify-between border-b border-ivory-line pb-5 text-xs uppercase tracking-[0.22em] text-gold-600"><span>The commerce notebook</span><BookOpen size={20} /></div><div className="py-20 text-center"><span className="font-serif text-8xl text-gold-600/60">404</span><p className="mt-4 font-serif text-xl italic">Chapter not found</p></div><div className="border-t border-ivory-line pt-5 text-right font-serif text-xs italic text-ivory-text-dim">Turn back to continue →</div></div>
    </div>
  </section></SitePage>;
}
