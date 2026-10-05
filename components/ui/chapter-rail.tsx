"use client";

import { useEffect, useState } from "react";

/**
 * A subtle chapter marker, fixed to the left edge on wide screens — the
 * same "you are here" cue a textbook running head gives. It never moves on
 * its own; it only reacts to the reader's own scroll.
 *
 * Width is kept to a single column of numerals so it sits inside the page
 * margin; section names appear as a label on hover/focus. It is decorative
 * reinforcement — the navbar carries the same destinations, so nothing
 * essential depends on a hover state.
 */
const CHAPTERS = [
  { n: "01", label: "The Teacher", href: "#about" },
  { n: "02", label: "Try a Concept", href: "#try-a-concept" },
  { n: "03", label: "The Subjects", href: "#subjects" },
  { n: "04", label: "The Method", href: "#features" },
  { n: "05", label: "Enquire", href: "#contact" },
];

export default function ChapterRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = CHAPTERS
      .map((c) => document.getElementById(c.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      // The current chapter is the last one whose top has passed the
      // middle of the viewport.
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= window.innerHeight * 0.5) {
          current = i;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      aria-label="Chapter navigation"
      className="chapter-rail pointer-events-none fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto relative space-y-1">
        <span
          aria-hidden="true"
          className="chapter-spine absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/15"
        />
        {CHAPTERS.map((chapter, i) => {
          const isActive = i === active;
          return (
            <li key={chapter.href} className="relative">
              <a
                href={chapter.href}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Chapter ${chapter.n} — ${chapter.label}`}
                className={`group flex h-9 w-9 items-center justify-center rounded-full text-[0.65rem] font-medium tracking-wide transition-colors ${
                  isActive
                    ? "bg-gold-400 text-ink-950"
                    : "text-zinc-500 hover:text-gold-300"
                }`}
              >
                {chapter.n}
              </a>
              <span
                aria-hidden="true"
                className={`chapter-label absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-ink-900 px-2.5 py-1 text-xs text-zinc-300 transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                }`}
              >
                <span className="font-serif italic text-gold-300">{chapter.n}</span> · {chapter.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
