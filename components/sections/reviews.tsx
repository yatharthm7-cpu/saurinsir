"use client";

import { useState } from "react";
import { Star, ExternalLink, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import {
  FEATURED_TESTIMONIAL,
  GOOGLE_BUSINESS,
  REVIEWS,
  VIDEO_TESTIMONIAL,
} from "@/lib/reviews";

/**
 * The primary trust section — calm, editorial, visitor-controlled.
 *
 * Renders NOTHING until owner-approved content is present in lib/reviews.ts.
 * No invented names, quotes, ratings, dates or photographs are ever shown:
 * a five-star graphic appears only beside a real rating, a photograph only
 * with permission, and every quotation is published verbatim.
 */
export default function Reviews() {
  const hasGoogle = Boolean(GOOGLE_BUSINESS.url);
  const hasContent = FEATURED_TESTIMONIAL !== null || REVIEWS.length > 0 || hasGoogle;

  if (!hasContent) return null;

  return (
    <section
      id="reviews"
      className="border-hairline-ivory bg-ivory-100 py-24 text-ivory-text sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel tone="ivory">In their words</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] sm:text-5xl">
            What students and parents say
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory-text-dim">
            Published with permission. Read each review in full — nothing here is
            paraphrased or condensed.
          </p>
        </Reveal>

        {hasGoogle && <GooglePanel />}

        {FEATURED_TESTIMONIAL && <Featured review={FEATURED_TESTIMONIAL} />}

        {REVIEWS.length > 0 && <ReviewCards />}

        <VideoTestimonial />
      </div>
    </section>
  );
}

/* ── Google Business attribution ─────────────────────────────────── */

function GooglePanel() {
  const { url, rating, reviewCount, asOf } = GOOGLE_BUSINESS;
  if (!url) return null;

  return (
    <Reveal delay={60}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border border-ivory-line bg-white px-7 py-5 transition-colors hover:border-gold-600"
      >
        {typeof rating === "number" && (
          <span className="flex items-baseline gap-3">
            <span className="font-serif text-3xl">{rating.toFixed(1)}</span>
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.round(rating) ? "fill-gold-500 text-gold-500" : "text-ivory-line"}
                />
              ))}
            </span>
          </span>
        )}
        <span className="text-sm leading-relaxed text-ivory-text-dim">
          {typeof reviewCount === "number" ? `${reviewCount} reviews on Google` : "Reviews on Google"}
          {asOf && (
            <span className="block text-xs text-ivory-text-dim/70">As of {asOf}</span>
          )}
        </span>
        <span className="ml-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-700">
          Read reviews on Google <ExternalLink size={15} className="shrink-0" />
        </span>
      </a>
    </Reveal>
  );
}

/* ── Featured testimonial ─────────────────────────────────────────── */

function Featured({ review }: { review: NonNullable<typeof FEATURED_TESTIMONIAL> }) {
  return (
    <Reveal delay={80}>
      <figure className="mt-14 border-t border-ivory-line pt-10">
        {review.photo ? (
          <img
            src={review.photo}
            alt=""
            width={120}
            height={120}
            loading="lazy"
            className="mb-8 h-28 w-28 rounded-full border border-ivory-line object-cover grayscale"
          />
        ) : null}
        {review.rating ? <Stars count={review.rating} /> : null}
        <blockquote className="font-serif text-2xl font-medium leading-[1.35] tracking-tight sm:text-[2rem] sm:leading-[1.3]">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold">{review.name}</span>
          <span aria-hidden="true" className="text-gold-600">·</span>
          <span className="text-ivory-text-dim">{review.detail}</span>
          {review.course && (
            <span className="text-ivory-text-dim">
              <span aria-hidden="true"> · </span>
              {review.course}
              {review.year ? `, ${review.year}` : ""}
            </span>
          )}
          {review.sourceUrl && (
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gold-700 underline underline-offset-4"
            >
              Source <ExternalLink size={13} className="shrink-0" />
            </a>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* ── Short review cards ──────────────────────────────────────────── */

const INITIAL_COUNT = 4;

function ReviewCards() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? REVIEWS : REVIEWS.slice(0, INITIAL_COUNT);
  const hasMore = REVIEWS.length > INITIAL_COUNT;

  return (
    <div className="mt-12">
      <div className="grid gap-px overflow-hidden border border-ivory-line bg-ivory-line sm:grid-cols-2">
        {visible.map((t, i) => (
          <Reveal key={`${t.name}-${i}`} delay={i * 70}>
            <ReviewCard review={t} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-950 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-ink-950 hover:text-ivory-50"
          >
            {expanded ? "Show fewer reviews" : `Show ${REVIEWS.length - INITIAL_COUNT} more reviews`}
            <ChevronDown
              size={15}
              className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const [open, setOpen] = useState(false);
  // A quote is treated as "long" past this length — the full text stays one
  // tap away, never deleted from the page.
  const isLong = review.quote.length > 220;
  const display = isLong && !open ? `${review.quote.slice(0, 200).trimEnd()}…` : review.quote;

  return (
    <figure className="h-full bg-ivory-100 p-8 transition-colors duration-300 hover:bg-ivory-200 sm:p-9">
      {review.rating ? <Stars count={review.rating} small /> : null}
      <blockquote className="font-serif text-lg font-medium leading-relaxed">
        &ldquo;{display}&rdquo;
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 inline-flex min-h-9 items-center text-sm font-medium text-gold-700 underline underline-offset-4"
        >
          {open ? "Show less" : "Read full review"}
        </button>
      )}
      <figcaption className="mt-6 border-t border-ivory-line pt-4 text-sm">
        <span className="font-semibold">{review.name}</span>
        <span className="mt-0.5 block text-ivory-text-dim">{review.detail}</span>
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold-700 underline underline-offset-4"
          >
            Read on Google <ExternalLink size={12} className="shrink-0" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

/* ── Shared bits ─────────────────────────────────────────────────── */

function Stars({ count, small = false }: { count: number; small?: boolean }) {
  const rounded = Math.round(count);
  return (
    <div className="flex gap-1 pb-5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={small ? 13 : 15}
          className={i < rounded ? "fill-gold-500 text-gold-500" : "text-ivory-line"}
        />
      ))}
    </div>
  );
}

/* ── Video testimonial ───────────────────────────────────────────── */

export function VideoTestimonial() {
  if (!VIDEO_TESTIMONIAL) return null;
  const { src, poster, captionSrc, transcript, name, detail } = VIDEO_TESTIMONIAL;

  return (
    <Reveal delay={100}>
      <div className="mt-14 border-t border-ivory-line pt-10">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-600">A student speaks</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg border border-ivory-line bg-ink-950">
            <video
              src={src}
              poster={poster}
              controls
              playsInline
              preload="none"
              className="block aspect-video w-full"
            >
              <track kind="captions" src={captionSrc} srcLang="en" label="English" default />
            </video>
          </div>
          <div>
            <blockquote className="font-serif text-xl leading-relaxed">
              &ldquo;{transcript}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-ivory-line pt-4 text-sm">
              <span className="font-semibold">{name}</span>
              <span className="mt-0.5 block text-ivory-text-dim">{detail}</span>
            </figcaption>
          </div>
        </div>
        <p className="sr-only">Video player — press play to begin. Captions available.</p>
      </div>
    </Reveal>
  );
}
