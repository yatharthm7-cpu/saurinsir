"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, RotateCcw, BookText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { enquiryUrl } from "@/lib/site";

/**
 * A short, self-contained sample lesson — not a recorded class. It exists to
 * show how a concept can be explained, not to certify syllabus coverage.
 *
 * The transaction is deliberately simple so the accounting is airtight:
 * equipment comes in (+10,000 asset), cash goes out (−10,000 asset), so
 * total assets are unchanged and the equation still balances.
 */

type OptionId = "increase" | "same" | "decrease" | "expense";

const OPTIONS: {
  id: OptionId;
  label: string;
  correct: boolean;
  /** Shown the moment this option is chosen — encouraging, never shaming. */
  feedback: string;
}[] = [
  {
    id: "increase",
    label: "Total assets increase by ₹10,000",
    correct: false,
    feedback:
      "That is the most common answer, and it is easy to see why — equipment does arrive, so it feels like the business owns more. But ₹10,000 of cash leaves at the very same moment.",
  },
  {
    id: "same",
    label: "Total assets stay the same",
    correct: true,
    feedback:
      "That's right. The business gains equipment worth ₹10,000 and gives up ₹10,000 in cash — one asset swaps for another, so the total does not move.",
  },
  {
    id: "decrease",
    label: "Total assets decrease by ₹10,000",
    correct: false,
    feedback:
      "Cash does fall, but it is not lost — it is exchanged for equipment of the same value. Nothing leaves the business, so the total is not reduced.",
  },
  {
    id: "expense",
    label: "The ₹10,000 is recorded as an expense",
    correct: false,
    feedback:
      "A reasonable thought, since money did go out. Equipment is an asset: it helps the business for years, so its cost is spread over its useful life rather than booked as a single day's expense.",
  },
];

export default function MiniLesson() {
  const [selected, setSelected] = useState<OptionId | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const answered = selected !== null;
  const chosen = OPTIONS.find((o) => o.id === selected);

  const reset = () => {
    setSelected(null);
    setShowExplanation(false);
    document.getElementById("mini-lesson-options")?.focus();
  };

  return (
    <section id="try-a-concept" className="border-hairline-ivory bg-ivory-50 py-24 text-ivory-text sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel tone="ivory">Chapter 02 · Try a concept</SectionLabel>
          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              One question. Two sides to every entry.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ivory-text-dim">
              A two-minute sample of how a concept can be explained. Not a recorded
              class — just a taste of the approach.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Notebook page: scenario + question */}
          <Reveal>
            <div className="mini-notebook relative rounded-sm border border-ivory-line bg-white p-7 shadow-[0_18px_35px_#0a0e1710] sm:p-10">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-600">
                The scenario
              </span>
              <p className="mt-5 font-serif text-2xl leading-relaxed sm:text-3xl">
                A business buys equipment for <span className="text-gold-gradient">₹10,000</span> and pays in cash.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-ivory-text-dim">
                Suppose the business has <strong className="font-medium text-ivory-text">₹10,000 in cash</strong> and
                no equipment yet. Before you answer, picture what the business owns
                before the purchase — then what it owns after.
              </p>

              <div className="mt-9 border-t border-ivory-line pt-7">
                <p id="mini-lesson-question" className="font-serif text-xl">
                  What happens to the business&rsquo;s total assets?
                </p>
                <div
                  id="mini-lesson-options"
                  role="group"
                  aria-labelledby="mini-lesson-question"
                  tabIndex={-1}
                  className="mt-5 space-y-3 outline-none"
                >
                  {OPTIONS.map((option) => {
                    const isChosen = selected === option.id;
                    const reveal = answered && option.correct;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelected(option.id)}
                        aria-pressed={isChosen}
                        className={`mini-option flex min-h-11 w-full items-center gap-3.5 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                          reveal
                            ? "border-gold-500 bg-gold-500/10 font-medium"
                            : isChosen
                              ? "border-ink-950 bg-ivory-100 font-medium"
                              : "border-ivory-line bg-ivory-50 hover:border-gold-600"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                            reveal
                              ? "border-gold-500 bg-gold-500 text-white"
                              : isChosen
                                ? "border-ink-950 bg-ink-950 text-white"
                                : "border-ivory-line text-transparent"
                          }`}
                        >
                          {reveal ? "✓" : "•"}
                        </span>
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live region: feedback is announced as soon as a choice is made. */}
              <p aria-live="polite" className="mt-6 min-h-0 text-sm leading-relaxed text-ivory-text-dim">
                {answered ? (
                  <span>
                    <span className="font-medium text-ivory-text">
                      {chosen!.correct ? "Correct. " : "Not quite — "}
                    </span>
                    {chosen!.feedback}
                  </span>
                ) : (
                  <span className="text-transparent">Pick an answer to see the reasoning.</span>
                )}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowExplanation((v) => !v)}
                  aria-expanded={showExplanation}
                  aria-controls="mini-lesson-explanation"
                  disabled={!answered}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-950 px-5 py-2.5 text-sm font-medium transition-colors enabled:hover:bg-ink-950 enabled:hover:text-ivory-50 disabled:opacity-40"
                >
                  <BookText size={15} />
                  {showExplanation ? "Hide explanation" : "Show explanation"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={!answered}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-gold-700 transition-colors enabled:hover:text-gold-800 disabled:opacity-40"
                >
                  <RotateCcw size={15} />
                  Try again
                </button>
              </div>
            </div>
          </Reveal>

          {/* Explanation: always in the HTML, hidden only until requested. */}
          <Reveal delay={100}>
            <div
              id="mini-lesson-explanation"
              hidden={!showExplanation}
              className={`mini-explanation rounded-sm border border-ink-950/80 bg-ink-950 p-7 text-ivory-100 shadow-[0_18px_35px_#0a0e1733] sm:p-10${
                showExplanation ? " is-shown" : ""
              }`}
            >
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-300">
                Why it works
              </span>
              <p className="mt-5 leading-relaxed text-zinc-300">
                Every transaction has two sides. The business receives equipment worth
                ₹10,000 and gives up ₹10,000 in cash. One asset is exchanged for another,
                so the total of assets stays at ₹10,000 — and the equation still balances.
              </p>

              {/* Journal entry */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">The journal entry</p>
                <table className="mt-4 w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15 text-xs uppercase tracking-wider text-zinc-500">
                      <th scope="col" className="pb-2 font-medium">Account</th>
                      <th scope="col" className="pb-2 text-right font-medium">Dr (₹)</th>
                      <th scope="col" className="pb-2 text-right font-medium">Cr (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="font-serif">
                    <tr className="border-b border-white/10">
                      <td className="py-3">Equipment A/c</td>
                      <td className="py-3 text-right text-gold-300">10,000</td>
                      <td className="py-3 text-right text-zinc-600">—</td>
                    </tr>
                    <tr>
                      <td className="py-3">Cash A/c</td>
                      <td className="py-3 text-right text-zinc-600">—</td>
                      <td className="py-3 text-right text-ivory-100">10,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Effect on each asset, before and after */}
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Effect on assets</p>
                <ul className="mt-4 space-y-5">
                  <li>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-zinc-300">Equipment</span>
                      <span className="font-serif text-gold-300">+ ₹10,000</span>
                    </div>
                    <div className="mini-bar mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <span
                        className="mini-bar-fill block h-full rounded-full bg-gold-400"
                        style={{ "--w": "100%", transitionDelay: "120ms" } as CSSProperties}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-zinc-300">Cash</span>
                      <span className="font-serif text-ivory-100">− ₹10,000</span>
                    </div>
                    <div className="mini-bar mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <span
                        className="mini-bar-fill block h-full rounded-full bg-ivory-300"
                        style={{ "--w": "0%", transitionDelay: "240ms" } as CSSProperties}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-zinc-300">Total assets</span>
                      <span className="font-serif text-gold-300">₹10,000 → ₹10,000</span>
                    </div>
                    {/* Static full bar: the point is that it does not move. */}
                    <div className="mini-bar mt-2 h-2.5 w-full overflow-hidden rounded-full border border-gold-600/40 bg-gold-600/10">
                      <span className="block h-full w-full bg-gold-600/25" />
                    </div>
                  </li>
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                  Equipment was ₹0 and becomes ₹10,000. Cash was ₹10,000 and becomes ₹0.
                  Add them up either way and the business still holds ₹10,000.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-relaxed text-zinc-300">
                  This is the idea behind every journal entry: for every debit, a credit.
                </p>
                <a
                  href={enquiryUrl("Accountancy (Classes 11–12)")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-300"
                >
                  Ask about Accountancy classes
                  <ArrowUpRight size={16} className="shrink-0" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
