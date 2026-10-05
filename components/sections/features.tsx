import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { BookOpen, PenLine, ClipboardCheck, TrendingUp } from "lucide-react";
const STEPS = [
  { title: "Understand", icon: BookOpen, text: "Start with the idea behind a rule. What does it mean, and why does it work?" },
  { title: "Practise", icon: PenLine, text: "Work through examples, then try the method on a question of your own." },
  { title: "Test", icon: ClipboardCheck, text: "Use practice questions to find the topics that need another look." },
  { title: "Improve", icon: TrendingUp, text: "Review mistakes, revisit the concept, and build a more confident next attempt." },
];
export default function Features() {
  return <section id="features" className="bg-ink-900 py-24 sm:py-32">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal><SectionLabel>Chapter 04 · The method</SectionLabel><h2 className="mt-6 max-w-xl font-serif text-4xl text-white sm:text-5xl">From a question<br />to understanding.</h2><p className="mt-5 max-w-xl text-zinc-300">A useful way to approach your commerce studies, one step at a time.</p></Reveal>
      <div className="journey mt-16 grid gap-8 md:grid-cols-4">
        {STEPS.map((step, i) => <Reveal key={step.title} delay={i * 100} className="journey-step relative">
          <div className="journey-node relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900 text-gold-300"><step.icon size={24} aria-hidden="true" /></div>
          <span className="mt-7 block text-xs tracking-widest text-gold-300">0{i + 1}</span>
          <h3 className="mt-3 font-serif text-2xl text-white">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-zinc-300">{step.text}</p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
