import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "Privacy | Saurin Sir’s Tuition", description: "How review submissions and contact details are handled on the Saurin Sir’s Tuition website.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <SitePage><PageIntro number="07" eyebrow="Privacy note" title="Your words remain yours." description="A short explanation of what happens when you submit a review through this website." />
    <section className="bg-ivory-100 px-5 py-20 text-ivory-text sm:px-8"><div className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-ivory-text-dim">
      <div><h2 className="font-serif text-2xl text-ivory-text">What we collect</h2><p className="mt-3">The review form collects the display name, role, study level, rating if supplied, and your written review. You may also leave a phone number or email address if you would like us to follow up.</p></div>
      <div><h2 className="font-serif text-2xl text-ivory-text">How it is used</h2><p className="mt-3">Submissions go to a private admin queue. If you provide a contact detail, it may be used to follow up about your review; it is not published. Only approved reviews are shown publicly, with the submitted display name, role, study level, rating if supplied, and original wording. Admin approval is not an independent check of the reviewer’s identity or claims.</p></div>
      <div><h2 className="font-serif text-2xl text-ivory-text">Your choices</h2><p className="mt-3">If you want a submitted or published review removed, <Link href="/contact" className="text-gold-700 underline underline-offset-4">contact the centre</Link>. Do not include another student’s private details in a review. If you are under 18, ask a parent or guardian to submit on your behalf.</p></div>
      <div><h2 className="font-serif text-2xl text-ivory-text">Storage</h2><p className="mt-3">Review data is held in a private store accessible to the site’s server and admin. Rejected submissions remain in the moderation queue until an admin deletes them. Approved reviews can be unpublished or deleted by the admin.</p></div>
    </div></section>
  </SitePage>;
}
