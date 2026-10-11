import type { Metadata } from "next";
import { connection } from "next/server";
import { submitReview } from "@/app/actions";
import Reviews from "@/components/sections/reviews";
import { PageIntro, SitePage } from "@/components/ui/site-page";
import { LEVELS } from "@/lib/courses";
import { publicReviews, reviewStoreReady } from "@/lib/review-store";

export const metadata: Metadata = { title: "Student & Parent Reviews | Saurin Sir’s Tuition", description: "Read student and parent experiences or submit your own review for approval.", alternates: { canonical: "/reviews" } };

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  const params = await searchParams;
  const { entries, storageError } = await publicReviews().then((entries) => ({
    entries, storageError: false,
  })).catch((error) => {
    console.error("Unable to load public reviews", error);
    return { entries: [], storageError: true };
  });
  const ready = reviewStoreReady() && !storageError;
  return <SitePage>
    <PageIntro number="04" eyebrow="Reviews" title="The words that matter most are theirs." description="Read student and parent experiences. If you’ve studied here, share your own words; submissions are reviewed privately before anything appears on the site." />
    <Reviews entries={entries} standalone unavailable={storageError} />
    <section id="write-review" className="bg-ink-900 px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div><p className="text-xs uppercase tracking-[0.25em] text-gold-300">Add your voice</p><h2 className="mt-5 font-serif text-4xl sm:text-5xl">Share your experience.</h2><p className="mt-6 max-w-md leading-relaxed text-zinc-300">Use your own words. You can leave a contact detail if you would like the centre to follow up; it will not appear with your review.</p><div className="annotation mt-9 max-w-md text-gold-300">If you are under 18, ask a parent or guardian to submit on your behalf. We do not publish grades, rankings or guarantees without supporting evidence.</div></div>
        <div className="rounded-xl border border-white/15 bg-ink-950 p-6 sm:p-9">
          {params.sent === "1" && <p role="status" className="mb-6 border border-gold-400/40 bg-gold-400/10 p-4 text-sm text-gold-300">Thank you. Your review has reached the private review queue. It will appear only if approved.</p>}
          {params.error === "invalid" && <p role="alert" className="mb-6 border border-red-300/40 bg-red-300/10 p-4 text-sm text-red-200">Please check every field and confirm permission before submitting.</p>}
          {(params.error === "unavailable" || storageError) && <p role="alert" className="mb-6 border border-red-300/40 bg-red-300/10 p-4 text-sm text-red-200">Review submissions are temporarily unavailable. Please try again later.</p>}
          {ready ? <form action={submitReview} className="grid gap-5">
            <div className="hidden" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-zinc-200">Name to display <input name="name" required minLength={2} maxLength={80} autoComplete="name" className="mt-2 w-full rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white" placeholder="Your approved display name" /></label><label className="text-sm text-zinc-200">I am a <select name="role" required className="mt-2 w-full rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white"><option value="student">Student</option><option value="parent">Parent / guardian</option></select></label></div>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-zinc-200">Study level <select name="course" required defaultValue="" className="mt-2 w-full rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white"><option value="" disabled>Choose one</option>{LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}</select></label><label className="text-sm text-zinc-200">Rating <span className="text-zinc-500">(optional)</span><select name="rating" defaultValue="" className="mt-2 w-full rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white"><option value="">No rating</option>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} out of 5</option>)}</select></label></div>
            <label className="text-sm text-zinc-200">Your review <textarea name="quote" required minLength={30} maxLength={1200} rows={6} className="mt-2 w-full resize-y rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white" placeholder="What was your experience of learning here?" /><span className="mt-1 block text-xs text-zinc-500">30–1200 characters. Please avoid sharing private information about other students.</span></label>
            <label className="text-sm text-zinc-200">Phone or email <span className="text-zinc-500">(optional)</span><input name="contact" minLength={5} maxLength={150} className="mt-2 w-full rounded-md border border-white/20 bg-ink-900 px-4 py-3 text-white" placeholder="Your phone number or email" /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"><input type="checkbox" name="consent" value="yes" required className="mt-1 accent-gold-400" /><span>I confirm this is my genuine experience, and I permit Saurin Sir’s Tuition to display my name and review if approved. I have read the <a href="/privacy" className="text-gold-300 underline">privacy note</a>.</span></label>
            <button type="submit" className="mt-2 min-h-12 rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-300">Submit review</button>
          </form> : <p className="text-sm leading-relaxed text-zinc-300">The private review queue is being set up. Submissions will open when secure storage is connected. You can still contact the centre directly.</p>}
        </div>
      </div>
    </section>
  </SitePage>;
}
