import type { Metadata } from "next";
import About from "@/components/sections/about";
import { PageClosing, PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "About Saurin Sir | Saurin Sir’s Tuition", description: "Meet Saurin Mehta and explore the commerce subjects and levels taught in Naranpura, Ahmedabad.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <SitePage>
    <PageIntro number="01" eyebrow="The teacher" title="Meet the person behind the pages." description="Commerce lessons begin with a teacher you can talk to. Learn who teaches here, what subjects are offered, and how to ask whether a batch fits your syllabus." />
    <About />
    <section className="bg-ivory-100 px-5 py-20 text-ivory-text sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[0.22em] text-gold-600">Before you join</p><h2 className="mt-4 font-serif text-3xl sm:text-4xl">Three useful things to bring to a conversation.</h2><div className="mt-10 grid gap-px border border-ivory-line bg-ivory-line md:grid-cols-3">{["Your course, year and syllabus", "The subjects or chapters you need help with", "Your questions about timing, format and fees"].map((item, index) => <div key={item} className="bg-ivory-100 p-7"><span className="font-serif text-2xl text-gold-600">0{index + 1}</span><p className="mt-5 text-sm leading-relaxed">{item}</p></div>)}</div></div></section>
    <PageClosing title="See what you can study." text="Browse the subject list and use the course finder before you enquire." href="/courses" action="Explore courses" />
  </SitePage>;
}
