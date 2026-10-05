"use client";
import { useState, type PointerEvent } from "react";
import { BookOpen, Scale, ChartNoAxesCombined, Calculator, Landmark, Layers, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { enquiryUrl } from "@/lib/site";
const SUBJECTS = [
  { title: "Accountancy", icon: BookOpen, description: "Journal entries, final accounts and the logic behind the ledger.", levels: ["Classes 11–12", "BCom", "Foundation"] },
  { title: "Legal Studies", icon: Scale, description: "Contracts, business law and the framework behind business decisions.", levels: ["Classes 11–12", "BBA / MBA"] },
  { title: "Finance", icon: ChartNoAxesCombined, description: "Financial management and the numbers behind business decisions.", levels: ["Classes 11–12", "BCom", "Foundation"] },
  { title: "Statistics", icon: Calculator, description: "Data, correlation, probability and working through numerical questions.", levels: ["Classes 11–12", "BCom", "BBA / MBA"] },
  { title: "Taxation", icon: Landmark, description: "Tax concepts and practical examples for commerce studies.", levels: ["BCom", "MCom", "Foundation"] },
  { title: "Cost & Management Accounting", icon: Layers, description: "Costing methods, budgets and the ideas behind cost decisions.", levels: ["BCom", "MCom", "Foundation"] },
];
const FILTERS = ["All subjects", "Classes 11–12", "BCom", "MCom", "BBA / MBA", "Foundation"];
function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 6}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 6}deg`);
}
export default function Subjects() {
  const [filter, setFilter] = useState("All subjects");
  const subjects = SUBJECTS.filter(s => filter === "All subjects" || s.levels.includes(filter));
  return <section id="subjects" className="bg-ivory-50 py-24 text-ivory-text sm:py-32">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal><SectionLabel tone="ivory">Find your subject</SectionLabel><div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-serif text-4xl sm:text-5xl">Your next chapter.</h2><p className="max-w-md text-sm leading-relaxed text-ivory-text-dim">Explore the existing course offering by level. Ask about the syllabus and available batch for your course.</p></div></Reveal>
      <div aria-label="Filter subjects by level" className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${filter === f ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-ivory-line hover:border-gold-600"}`}>{f}</button>)}
      </div>
      <p aria-live="polite" className="mt-5 text-xs text-ivory-text-dim">{subjects.length} subjects · {filter}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s, i) => <Reveal key={s.title} delay={i * 45}><article onPointerMove={tilt} onPointerLeave={e => { e.currentTarget.style.setProperty("--tilt-x", "0deg"); e.currentTarget.style.setProperty("--tilt-y", "0deg"); }} className="subject-card flex h-full flex-col rounded-xl border border-ivory-line bg-white p-7">
          <div aria-hidden="true" className="subject-art mb-8 flex h-24 items-center justify-center"><span className="subject-icon flex h-16 w-16 items-center justify-center rounded-xl border border-gold-600/20 bg-ivory-100 text-gold-600"><s.icon size={30} /></span></div>
          <h3 className="font-serif text-2xl">{s.title}</h3><p className="mt-3 text-sm leading-relaxed text-ivory-text-dim">{s.description}</p>
          <p className="mt-5 text-xs leading-relaxed text-ivory-text-dim">{s.levels.join(" · ")}</p>
          <a href={enquiryUrl(`${s.title}${filter !== "All subjects" ? ` (${filter})` : ""}`)} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between gap-3 pt-7 text-sm font-semibold">Enquire about {s.title}<ArrowUpRight size={16} className="shrink-0" /></a>
        </article></Reveal>)}
      </div>
      <p className="mt-6 text-xs text-ivory-text-dim">Foundation courses: enquire about CA and ICMA Foundation subjects and syllabus coverage.</p>
    </div>
  </section>;
}
