/**
 * Reviews, testimonials and verified external ratings.
 *
 * Everything here is EMPTY BY DESIGN. The public section is only rendered
 * when real, owner-approved content is present. Do not fill these with
 * invented names, quotes, ratings or results — see PROMPT-AUDIT.md.
 *
 * To publish:
 *  1. Paste approved quotations VERBATIM into `quote` (never rewrite them).
 *  2. Use the display name the reviewer approved.
 *  3. Add `sourceUrl` for attributable feedback (e.g. a Google review).
 *  4. Add `rating`/`stars` only where a real rating supports it.
 *  5. Add `photo` only with explicit permission.
 */

export type Review = {
  /** Exact approved wording — never paraphrased or "tidied". */
  quote: string;
  /** Approved display name. */
  name: string;
  /** Student or parent identification, course and year where confirmed. */
  detail: string;
  /** Attributable source, e.g. a link to the Google review. */
  sourceUrl?: string;
  /** Only with a supporting rating. */
  rating?: number;
  /** Only with explicit permission to display. */
  photo?: string;
};

export type FeaturedTestimonial = Review & {
  /** Course and year, where confirmed. */
  course?: string;
  year?: string;
};

export const GOOGLE_BUSINESS = {
  /**
   * Verified Google Business Profile URL. Set only after confirming the
   * profile belongs to this tuition centre — never guess a review URL.
   */
  url: null as string | null,
  /** Manually stored; must ship with an "as of" date below. */
  rating: null as number | null,
  reviewCount: null as number | null,
  /** e.g. "October 2026". Marks the figure as a snapshot, not live data. */
  asOf: null as string | null,
};

/** One prominent story. Keep `null` until approved content exists. */
export const FEATURED_TESTIMONIAL: FeaturedTestimonial | null = null;

/**
 * A small, specific set of reviews. Useful themes: understanding difficult
 * concepts, quality of explanations, confidence with numerical questions,
 * doubt-solving, classroom experience, preparation and feedback.
 */
export const REVIEWS: Review[] = [];

export const VIDEO_TESTIMONIAL: {
  src: string;
  poster: string;
  /** Path to a WebVTT captions file. */
  captionSrc: string;
  /** Text version / transcript, shown alongside the player. */
  transcript: string;
  name: string;
  detail: string;
} | null = null;

/**
 * Verified progress stories — original challenge, approach used, reported
 * improvement, course and period, with approved attribution. Marks are used
 * only when confirmed and contextualised. Keep empty without evidence.
 */
export type ProgressStory = {
  student: string;
  challenge: string;
  approach: string;
  outcome: string;
  course: string;
  period: string;
};

export const PROGRESS_STORIES: ProgressStory[] = [];

/** Approved classroom photographs with factual captions. Minors need permission. */
export type ClassroomPhoto = { src: string; alt: string; caption: string };

export const CLASSROOM_PHOTOS: ClassroomPhoto[] = [];
