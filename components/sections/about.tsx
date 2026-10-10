import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";

const LEVELS = ["Classes 11–12", "BCom", "MCom", "BBA", "MBA", "CA & ICMA Foundation"];

export default function About() {
  return (
    <section id="about" className="bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionLabel>Chapter 01 · The teacher</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
            A clearer way<br />to study commerce.
          </h2>
          <p className="mt-7 leading-relaxed text-zinc-300">
            Saurin Mehta teaches commerce in Naranpura, Ahmedabad — from Classes 11 and 12
            through BCom, MCom, BBA, MBA and foundation courses.
          </p>
          <p className="mt-5 leading-relaxed text-zinc-400">
            Accountancy, finance, law and statistics become easier to approach when the
            idea behind the rule comes first: what it means, why it works, and only then
            the method and the practice.
          </p>

          {/* A contents-page index of the levels — fine rules, no claims. */}
          <div className="mt-10 max-w-md">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Who he teaches</p>
            <ul className="mt-4">
              {LEVELS.map((level) => (
                <li
                  key={level}
                  className="flex items-baseline justify-between border-b border-white/10 py-2.5 text-sm text-zinc-300"
                >
                  {level}
                  <span aria-hidden="true" className="font-serif text-xs italic text-zinc-600">
                    {String(LEVELS.indexOf(level) + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="annotation mt-8 max-w-sm text-gold-300/90">
            Ask which batch fits your level — that depends on your syllabus, not just your year.
          </p>

          <a
            href="#try-a-concept"
            className="mt-8 inline-block text-gold-300 underline underline-offset-8 hover:text-gold-200"
          >
            Try a sample concept &rarr;
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="teacher-plate relative overflow-hidden rounded-sm border border-gold-400/25 p-6 sm:p-8">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-300">
              The commerce notebook
            </span>
            <div className="teacher-photo-backdrop my-8 rounded-sm border border-gold-400/25 p-3 sm:p-5">
              <div className="overflow-hidden rounded-sm border border-gold-400/20 shadow-[0_18px_40px_#0007]">
                <Image
                  src="/saurin-mehta-portrait.png"
                  alt="Saurin Mehta wearing a navy suit"
                  width={1024}
                  height={768}
                  sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, (min-width: 640px) 80vw, 82vw"
                  className="block h-auto w-full"
                />
              </div>
            </div>
            <p className="font-serif text-3xl text-ivory-50">
              Concepts first.<br />Understanding follows.
            </p>
            <div className="mt-10 border-t border-gold-400/20 pt-5 text-sm text-zinc-300">
              Saurin Mehta · Naranpura, Ahmedabad
            </div>
            <span
              aria-hidden="true"
              className="page-mark"
            >
              p. 01
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
