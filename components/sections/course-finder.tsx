"use client";

import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { LEVELS, subjectsForLevel, type Level } from "@/lib/courses";
import { enquiryUrl, subjectEnquiryUrl } from "@/lib/site";

/**
 * A short guided path to one relevant subject: level → subject → contextual
 * enquiry. The full catalogue grid below stays accessible to browsers, and
 * the reset action returns to step one. Combinations with no listed subjects
 * are answered honestly rather than papered over.
 */
export default function CourseFinder() {
  const [level, setLevel] = useState<Level | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  const options = level ? subjectsForLevel(level) : [];
  const picked = options.find((s) => s.title === subject) ?? null;

  const reset = () => {
    setLevel(null);
    setSubject(null);
  };

  const stepState = (done: boolean, active: boolean) =>
    done ? "done" : active ? "active" : "todo";

  return (
    <div className="finder rounded-lg border border-ivory-line bg-white p-6 shadow-[0_14px_30px_#0a0e170d] sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-serif text-2xl">Find your subject in two steps</h3>
        <span aria-hidden="true" className="font-serif text-xs italic text-ivory-text-dim">
          p. 02
        </span>
      </div>

      <div className="mt-7 flex items-center gap-3" aria-hidden="true">
        <span className={`finder-step ${stepState(level !== null, level === null)}`}>1</span>
        <span className="finder-rule" />
        <span className={`finder-step ${stepState(picked !== null, level !== null && picked === null)}`}>2</span>
        <span className="finder-rule" />
        <span className={`finder-step ${stepState(picked !== null, picked !== null)}`}>✓</span>
      </div>

      {/* Step 1 — level */}
      <fieldset className="mt-8 border-0 p-0">
        <legend className="font-serif text-lg">1. What are you studying?</legend>
        <div role="group" className="mt-4 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={level === l}
              onClick={() => {
                setLevel(l);
                setSubject(null);
              }}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
                level === l
                  ? "border-ink-950 bg-ink-950 text-ivory-50"
                  : "border-ivory-line hover:border-gold-600"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Step 2 — subject, only once a level is chosen */}
      {level && (
        <fieldset className="mt-9 border-0 p-0">
          <legend className="font-serif text-lg">2. Which subject do you need help with?</legend>
          {options.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-ivory-text-dim">
              No subjects are listed for {level} yet. Enquire directly and ask about your
              exact syllabus — coverage can often be arranged even where it is not listed.
              <a
                href={enquiryUrl(level)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-ivory-50"
              >
                Enquire about {level}
                <ArrowUpRight size={15} className="shrink-0" />
              </a>
            </p>
          ) : (
            <div role="group" className="mt-4 flex flex-wrap gap-2">
              {options.map((s) => (
                <button
                  key={s.title}
                  type="button"
                  aria-pressed={subject === s.title}
                  onClick={() => setSubject(s.title)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
                    subject === s.title
                      ? "border-gold-600 bg-gold-500/15 font-medium"
                      : "border-ivory-line hover:border-gold-600"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </fieldset>
      )}

      {/* Result */}
      <p aria-live="polite" className="sr-only">
        {picked ? `${picked.title} selected for ${level}.` : subject ? `No subject selected.` : ""}
      </p>

      {picked && (
        <div className="mt-9 border-t border-ivory-line pt-7">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-lg">
              <span className="text-xs uppercase tracking-[0.2em] text-gold-600">
                {level} · {picked.levels.join(" · ")}
              </span>
              <h4 className="mt-3 font-serif text-2xl sm:text-3xl">{picked.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-ivory-text-dim">
                {picked.description}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-ivory-text-dim">
                Enquire to confirm the current batch, timings and exact syllabus coverage
                for {level} — availability is confirmed per batch, not assumed here.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <a
                href={subjectEnquiryUrl(level!, picked.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
              >
                Enquire about {picked.title}
                <ArrowUpRight size={16} className="shrink-0" />
              </a>
              <button
                type="button"
                onClick={() => setSubject(null)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-gold-700 transition-colors hover:text-gold-800"
              >
                Choose another subject
              </button>
            </div>
          </div>
        </div>
      )}

      {level && (
        <div className="mt-8 border-t border-ivory-line pt-6">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-ivory-text-dim transition-colors hover:text-ink-950"
          >
            <RotateCcw size={15} />
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
