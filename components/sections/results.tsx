import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "My daughter went from dreading Accountancy to solving full-board papers on her own. Her Class 12 board score was 96 — but the confidence mattered more to us.",
    name: "Mrs. Rajput",
    detail: "Parent of Class 12 Commerce student",
  },
  {
    quote:
      "Sir explains the same thing three different ways until it lands. The Statistics and Finance numericals stopped being a guessing game for me.",
    name: "Aditya",
    detail: "BCom, CA Foundation 2025 batch",
  },
  {
    quote:
      "The weekly tests are the real secret. By exam season nothing felt new — I had already fixed every mistake I could make.",
    name: "Sneha",
    detail: "Class 12 Commerce, 94% in boards",
  },
];

export default function Results() {
  const [lead, ...rest] = TESTIMONIALS;

  return (
    <section
      id="results"
      className="border-hairline-ivory bg-ivory-100 py-24 text-ivory-text sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel tone="ivory">Results</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              In their words
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory-text-dim">
              Marks are the headline; the reviews below are the reason families recommend the
              batch.
            </p>
          </Reveal>
        </div>

        {/* Lead quote gets the room — set large in the serif, hanging off a
            gold rule. The other two sit beneath as a quieter pair. */}
        <Reveal delay={80}>
          <figure className="mt-14 border-t border-ivory-line pt-10">
            <div className="flex gap-1 pb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-gold-500 text-gold-500" />
              ))}
            </div>
            <blockquote className="font-serif text-2xl font-medium leading-[1.35] tracking-tight sm:text-[2rem] sm:leading-[1.3]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold">{lead.name}</span>
              <span aria-hidden className="text-gold-600">
                ·
              </span>
              <span className="text-ivory-text-dim">{lead.detail}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-ivory-line bg-ivory-line sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={120 + i * 80}>
              <figure className="h-full bg-ivory-100 p-8 transition-colors duration-300 hover:bg-ivory-200 sm:p-9">
                <div className="flex gap-1 pb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg font-medium leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-ivory-line pt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="mt-0.5 block text-ivory-text-dim">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
