import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { WhatsAppAction } from "@/components/sections/contact";

export function SitePage({ children }: { children: ReactNode }) {
  return <div id="top" className="min-h-screen">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    <WhatsAppAction />
  </div>;
}

export function PageIntro({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return <section className="relative overflow-hidden border-b border-gold-400/20 bg-ink-950 px-5 pb-20 pt-36 text-white sm:px-8 sm:pb-28 sm:pt-44">
    <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-8 font-serif text-[15rem] leading-none text-white/[0.025] sm:text-[24rem]">{number}</div>
    <div className="relative mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">{eyebrow} <span className="ml-3 text-zinc-600">/ {number}</span></p>
      <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.99] tracking-tight">{title}</h1>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">{description}</p>
      <div className="mt-10 h-px max-w-xs bg-gradient-to-r from-gold-400/70 to-transparent" />
    </div>
  </section>;
}

export function PageClosing({ title, text, href = "/contact", action = "Talk to the centre" }: { title: string; text: string; href?: string; action?: string }) {
  return <section className="bg-ink-950 px-5 py-20 text-white sm:px-8 sm:py-24">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs uppercase tracking-[0.25em] text-gold-300">The next page</p><h2 className="mt-5 font-serif text-3xl sm:text-4xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300">{text}</p></div>
      <Link href={href} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-300">{action} <span aria-hidden="true" className="ml-2">↗</span></Link>
    </div>
  </section>;
}
