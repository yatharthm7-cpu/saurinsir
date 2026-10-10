# Prompt audit and delivery notes

**Pass of 2026-10-05** — upgrades on top of the existing textbook identity. The
book-opening hero, subject filters, roadmap, FAQ, contact details and map were
preserved; the additions extend the same editorial system rather than replacing
it.

## What was implemented

1. **Single source of truth for the offering** — `lib/courses.ts` now holds the
   subject catalogue, levels and filters. The subject grid, the course finder and
   every enquiry message read from it, so the offering cannot contradict itself
   in two places.
2. **"Try a concept" mini-lesson** (`components/sections/mini-lesson.tsx`) — a
   self-contained sample lesson: equipment-for-cash transaction, one
   multiple-choice question, per-option feedback that explains each wrong
   answer without shaming, a "Show explanation" toggle, a journal-entry ledger,
   an animated asset-effect panel, "Try again", and a contextual Accountancy
   enquiry. Clearly labelled as a sample, not a recorded class. Answer feedback
   is announced via `aria-live`; the explanation stays in the rendered HTML.
   Keyboard and touch friendly (44px targets). No backend, no data collection.
3. **Two-step course finder** (`components/sections/course-finder.tsx`) — "What
   are you studying?" → "Which subject do you need help with?" → a result with
   the subject description and a WhatsApp enquiry pre-filled with the selected
   level and subject. Full catalogue remains browsable below it; "Start over"
   resets; empty combinations are answered honestly rather than inferred.
4. **Syllabus-page subjects** — the grid reads from `lib/courses.ts` and now
   carries page numbers, fine rules and a hairline above each card's enquiry link.
5. **Teacher introduction** (`components/sections/about.tsx`) — editorial
   two-column layout, a ruled "Who he teaches" index, notebook annotations,
   chapter label and page mark. Contains only facts already on the site (name,
   location, levels, subjects). No qualifications, years of experience or
   student counts were claimed.
6. **Reusable reviews section** (`components/sections/reviews.tsx` +
   `lib/reviews.ts`) — the full presentation layer for a featured testimonial,
   short review cards with "Read full review", visitor-controlled "Show more",
   a Google Business attribution panel with an "As of" date, and a captions-
   enabled video testimonial with transcript. **It renders nothing by default**
   because no approved content exists. The fabricated `results.tsx` was deleted.
7. **Closing-page contact** — reframed as "Chapter 05 · The closing page", with
   the calm invitation "Find the right batch for your studies.", an annotation
   pointing back to the course finder, and the "End of the notebook" colophon.
   No invented demos, discounts or seat limits.
8. **Chapter rail** (`components/ui/chapter-rail.tsx`) — a fixed left-edge
   chapter indicator on `xl` screens that tracks scroll position. Label text
   appears only on hover/focus; numerals and the navbar carry the same
   destinations, so nothing depends on hover.
9. **Branding** — replaced the default Next.js favicon with a navy/gold `S`
   `app/icon.svg`; generated `app/opengraph-image.tsx` and `app/twitter-image.tsx`
   (1200×630, navy/ivory/gold, existing textbook cover, subject chips — no
   ratings, results or affiliations); updated `app/layout.tsx` with title,
   description, `metadataBase`, canonical, OpenGraph and Twitter metadata.
   Canonical uses `https://saurinsir.vercel.app` as supplied — change
   `SITE_URL` in `lib/site.ts` if the final domain differs.

## What was tested

- `npx tsc --noEmit` passes; `npm run lint` reports only two expected
  `<img>` warnings (one inside `next/og`, one for an optional reviewer photo);
  `npm run build` succeeds and prerenders `/icon.svg`, `/opengraph-image` and
  `/twitter-image`.
- Browser (desktop 1440×900 and mobile 390×844): all sections render; the
  reviews section is correctly absent; book hero scrubs forward (`--open`
  0 → 1) and backward (0.49 on scroll back, cover angle matrix correct); course
  finder BCom → Taxation produces the correct pre-filled WhatsApp message and
  resets fully; catalogue Foundation filter shows the right 4 subjects;
  mini-lesson wrong answer → encouraging feedback → explanation panel → correct
  answer marked; "Try again" resets options and re-hides the explanation;
  mobile menu opens and closes on Escape; no horizontal overflow at any point;
  no runtime console errors.
- Metadata verified against the production server: canonical
  `https://saurinsir.vercel.app`, og/twitter image URLs absolute at 1200×630.
- Keyboard: heading outline is a clean h1 → h2 → h3/h4 hierarchy; all
  interactive elements are semantic buttons/links with visible focus rings.
  Note: the in-app browser surface does not synthesise button activation from
  key events (verified against a native `<details>`, which also failed), so
  Enter/Space activation was not exercised live — the components rely on native
  `<button>`/`<summary>` activation, which needs no page-side code.

## Content-dependent sections not published (by design)

- **Reviews and testimonials** — no approved feedback exists. The components and
  data structure are ready in `lib/reviews.ts`; the section renders nothing
  until it is filled.
- **Google Reviews** — no verified Google Business Profile link, so no rating,
  count or link is shown. `GOOGLE_BUSINESS.url` is the single field to set.
- **Featured testimonial, video testimonial, progress stories, classroom photo
  gallery** — omitted; no approved footage, evidence or photographs.
- **Introduction video** — not supplied, so no video or credentials were
  invented. The teacher section uses the supplied original photograph.

## Owner material still needed

1. Introduction footage with captions and a poster.
2. Google Business Profile link (to be verified as the correct centre).
3. Approved student/parent testimonials, with permission for names, photos and
   video; preserved verbatim.
4. Confirmation of qualifications, teaching experience and a teaching
   philosophy the teacher approves for publication.
5. Supported results or progress stories, contextualised and attributed.
6. Classroom photographs with permission (especially for minors).
7. Exact course/subject mappings — particularly CA & ICMA Foundation syllabus
   coverage — and confirmation of the current batch timetable, fees and demo
   availability. Until then the copy invites enquiries rather than promising
   availability.

## Limitations

- Canonical and social URLs assume `https://saurinsir.vercel.app`.
- Mini-lesson covers one concept, intentionally; it is a demonstration, not a
  course platform.
- Reduced-motion and no-JavaScript paths were reviewed in code (hero collapses
  to a static stage, reveals resolve visible, the explanation is server-rendered
  in the HTML); they were not emulated live in the browser.
- Real-device Safari, slow networks and media-error fallbacks remain untested.
- The visual judge agent was unavailable in this session, so the visual pass
  was done programmatically (layout metrics, overflow, pixel sampling of the
  generated images) rather than by image review.

The upgrade is prepared for GitHub. The configured site URL is the owner-confirmed https://saurinsir.vercel.app; change SITE_URL in lib/site.ts when the custom domain is connected. The local preview remains
available at http://localhost:3000.

Portrait update: the supplied real teacher photograph replaces the Sm. placeholder and is preserved unaltered at public/saurin-mehta-portrait.png. It is shown on a deep-blue backdrop inside the notebook card. A generated background mask was removed after it produced visible cutout edges around the teacher. Later generated blue-background edits were rejected because they altered his face and clothing. The original outdoor scene remains inside the photograph to preserve his appearance.
