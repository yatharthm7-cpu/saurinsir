import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
export default function About() {
  return <section id="about" className="bg-ink-950 py-24 sm:py-32">
    <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
      <Reveal><SectionLabel>Meet your teacher</SectionLabel>
        <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">A clearer way<br />to study commerce.</h2>
        <p className="mt-7 leading-relaxed text-zinc-300">Saurin Mehta teaches commerce in Naranpura, Ahmedabad, from Classes 11 and 12 through BCom, MCom, BBA, MBA and foundation courses.</p>
        <p className="mt-5 leading-relaxed text-zinc-400">Accountancy, finance, law and statistics become easier to approach when you understand the ideas behind the rules. Find your subject below and enquire about the right batch for your level.</p>
        <a href="#subjects" className="mt-8 inline-block text-gold-300 underline underline-offset-8">Explore subjects &rarr;</a>
      </Reveal>
      <Reveal delay={120}><div className="teacher-plate relative overflow-hidden rounded-sm border border-gold-400/25 p-10 sm:p-14">
        <span className="text-xs uppercase tracking-[0.25em] text-gold-300">The commerce notebook</span>
        <div aria-hidden="true" className="my-10 font-serif text-8xl italic text-gold-400/70">Sm.</div>
        <p className="font-serif text-3xl text-ivory-50">Concepts first.<br />Understanding follows.</p>
        <div className="mt-10 border-t border-gold-400/20 pt-5 text-sm text-zinc-300">Saurin Mehta · Naranpura, Ahmedabad</div>
      </div></Reveal>
    </div>
  </section>;
}
