import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
const QUESTIONS = [
  { q: "Which courses can I enquire about?", a: "The course list includes Classes 11–12, BCom, MCom, BBA, MBA and CA & ICMA Foundation. Use the subject filters above, then enquire about coverage for your exact syllabus." },
  { q: "How do I find the right batch?", a: "Send your course, year and subjects on WhatsApp, or call the centre. Ask about the available batches, teaching format and timings before enrolling." },
  { q: "Can I attend a demo class?", a: "Contact the centre to ask whether a demo is available for your subject and batch, and whether any fee applies." },
  { q: "Where are classes held?", a: "The centre is at Swapneel Complex in Naranpura, Ahmedabad. The full address and map are in the contact section below." },
  { q: "What are the fees and batch timings?", a: "Please contact the centre for the current fees and timetable for your course. These can depend on the subject and batch." },
];
export default function Faq() {
  return <section id="faq" className="bg-ivory-100 py-24 text-ivory-text sm:py-32"><div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
    <Reveal><SectionLabel tone="ivory">Before you enquire</SectionLabel><h2 className="mt-6 font-serif text-4xl sm:text-5xl">A few useful<br />answers.</h2><p className="mt-5 max-w-sm leading-relaxed text-ivory-text-dim">Have your course and subjects ready. We can help you ask the right questions.</p></Reveal>
    <div>{QUESTIONS.map(item => <details key={item.q} className="faq-item border-b border-ivory-line py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-medium">{item.q}<span aria-hidden="true" className="faq-plus text-2xl font-light">+</span></summary><p className="mt-4 max-w-xl pr-8 text-sm leading-relaxed text-ivory-text-dim">{item.a}</p></details>)}</div>
  </div></section>;
}
