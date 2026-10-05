"use client";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { enquiryUrl } from "@/lib/site";
import { FILTERS, SUBJECTS, type Level } from "@/lib/courses";
import CourseFinder from "@/components/sections/course-finder";

function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--tilt-x", `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 6}deg`);
  event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX - rect.left - rect.width / 2) / rect.width * 6}deg`);
}
export default function Subjects() {
  const [filter, setFilter] = useState<"All subjects" | Level>("All subjects");
  const subjects = filter === "All subjects" ? SUBJECTS : SUBJECTS.filter((s) => s.levels.includes(filter));
  return <section id="subjects" className="bg-ivory-100 py-24 text-ivory-text sm:py-32">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal><SectionLabel tone="ivory">Chapter 03 · The subjects</SectionLabel><div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-serif text-4xl sm:text-5xl">Your next chapter.</h2><p className="max-w-md text-sm leading-relaxed text-ivory-text-dim">Find your subject in two steps below, or browse the whole catalogue by level.</p></div></Reveal>

      <Reveal delay={80} className="mt-12"><CourseFinder /></Reveal>

      <div id="catalogue" className="mt-20 flex flex-col justify-between gap-6 border-t border-ivory-line pt-10 md:flex-row md:items-end sm:mt-24">
        <h3 className="font-serif text-2xl sm:text-3xl">The full catalogue</h3>
        <p className="max-w-md text-sm leading-relaxed text-ivory-text-dim">Six subjects, taught across school, degree and foundation levels.</p>
      </div>

      <div aria-label="Filter subjects by level" className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${filter === f ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-ivory-line hover:border-gold-600"}`}>{f}</button>)}
      </div>
      <p aria-live="polite" className="mt-5 text-xs text-ivory-text-dim">{subjects.length} subjects · {filter}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s, i) => <Reveal key={s.title} delay={i * 45}><article onPointerMove={tilt} onPointerLeave={e => { e.currentTarget.style.setProperty("--tilt-x", "0deg"); e.currentTarget.style.setProperty("--tilt-y", "0deg"); }} className="subject-card relative flex h-full flex-col rounded-xl border border-ivory-line bg-white p-7">
          <span aria-hidden="true" className="pointer-events-none absolute right-6 top-6 font-serif text-xs italic text-gold-600/70">p. {String(i + 1).padStart(2, "0")}</span>
          <div aria-hidden="true" className="subject-art mb-8 flex h-24 items-center justify-center"><span className="subject-icon flex h-16 w-16 items-center justify-center rounded-xl border border-gold-600/20 bg-ivory-100 text-gold-600"><s.icon size={30} /></span></div>
          <h4 className="font-serif text-2xl">{s.title}</h4><p className="mt-3 text-sm leading-relaxed text-ivory-text-dim">{s.description}</p>
          <p className="mt-5 text-xs leading-relaxed text-ivory-text-dim">{s.levels.join(" · ")}</p>
          <a href={enquiryUrl(`${s.title}${filter !== "All subjects" ? ` (${filter})` : ""}`)} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between gap-3 border-t border-ivory-line pt-6 text-sm font-semibold">Enquire about {s.title}<ArrowUpRight size={16} className="shrink-0" /></a>
        </article></Reveal>)}
      </div>
      <p className="mt-6 text-xs text-ivory-text-dim">Foundation courses: enquire about CA and ICMA Foundation subjects and syllabus coverage.</p>
    </div>
  </section>;
}
