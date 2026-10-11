"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, Star } from "lucide-react";
import type { PublicReview } from "@/lib/review-store";
import { GOOGLE_BUSINESS } from "@/lib/reviews";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const INITIAL_COUNT = 4;

export default function Reviews({ entries, standalone = false, unavailable = false }: { entries: PublicReview[]; standalone?: boolean; unavailable?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const featured = entries.find((review) => review.featured);
  const remaining = entries.filter((review) => review.id !== featured?.id);
  const visible = expanded ? remaining : remaining.slice(0, INITIAL_COUNT);

  return <section id="reviews" className="border-hairline-ivory bg-ivory-100 py-24 text-ivory-text sm:py-32">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal>
        <SectionLabel tone="ivory">In their own words</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] sm:text-5xl">What students and parents say</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-ivory-text-dim">Reviews are published only after verification. Their words are shown as submitted, with their permission.</p>
      </Reveal>

      {GOOGLE_BUSINESS.url && <a href={GOOGLE_BUSINESS.url} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-11 items-center gap-2 border-b border-gold-600 text-sm font-medium text-gold-700">Read reviews on Google <ExternalLink size={15} /></a>}

      {featured && <figure className="mt-12 border-y border-ivory-line py-10">
        <Stars count={featured.rating} />
        <blockquote className="max-w-4xl font-serif text-2xl leading-snug sm:text-3xl">&ldquo;{featured.quote}&rdquo;</blockquote>
        <figcaption className="mt-7 text-sm font-medium">{featured.name} <span className="font-normal text-ivory-text-dim">· {featured.role === "parent" ? "Parent" : "Student"} · {featured.course}</span></figcaption>
      </figure>}

      {remaining.length > 0 && <>
        <div className="mt-12 grid gap-px overflow-hidden border border-ivory-line bg-ivory-line sm:grid-cols-2">
          {visible.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
        {remaining.length > INITIAL_COUNT && <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} className="mx-auto mt-8 flex min-h-11 items-center gap-2 rounded-full border border-ink-950 px-6 py-2.5 text-sm font-medium hover:bg-ink-950 hover:text-white">{expanded ? "Show fewer" : `Show ${remaining.length - INITIAL_COUNT} more`} <ChevronDown size={16} className={expanded ? "rotate-180" : ""} /></button>}
      </>}

      {entries.length === 0 && <div className="mt-12 border border-ivory-line bg-white p-8 sm:p-10"><p className="font-serif text-2xl">{unavailable ? "Reviews are temporarily unavailable." : "The first page is still being written."}</p><p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory-text-dim">{unavailable ? "Please check back later or contact the centre directly." : "No student or parent reviews have been verified for publication yet. If you have studied here, you can share your experience for review."}</p></div>}

      {!standalone && !unavailable && <Link href="/reviews#write-review" className="mt-9 inline-flex min-h-11 items-center rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white hover:bg-ink-800">Share your experience <span aria-hidden="true" className="ml-2">↗</span></Link>}
    </div>
  </section>;
}

function ReviewCard({ review }: { review: PublicReview }) {
  const [open, setOpen] = useState(false);
  const long = review.quote.length > 220;
  return <figure className="bg-ivory-100 p-8 sm:p-9">
    <Stars count={review.rating} />
    <blockquote className="font-serif text-lg leading-relaxed">&ldquo;{long && !open ? `${review.quote.slice(0, 200).trimEnd()}…` : review.quote}&rdquo;</blockquote>
    {long && <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="mt-4 min-h-9 text-sm font-medium text-gold-700 underline underline-offset-4">{open ? "Show less" : "Read full review"}</button>}
    <figcaption className="mt-6 border-t border-ivory-line pt-4 text-sm"><span className="font-semibold">{review.name}</span><span className="mt-0.5 block text-ivory-text-dim">{review.role === "parent" ? "Parent" : "Student"} · {review.course}</span>{review.sourceUrl && <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-gold-700 underline">View source <ExternalLink size={12} /></a>}</figcaption>
  </figure>;
}

function Stars({ count }: { count: number | null }) {
  if (count === null) return null;
  return <div className="mb-5 flex gap-1" aria-label={`${count} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} aria-hidden="true" className={index < count ? "fill-gold-500 text-gold-500" : "text-ivory-line"} />)}</div>;
}
