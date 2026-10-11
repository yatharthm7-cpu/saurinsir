import type { Metadata } from "next";
import Faq from "@/components/sections/faq";
import { PageClosing, PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "Frequently Asked Questions | Saurin Sir’s Tuition", description: "Answers about courses, batches, demos, fees and visiting Saurin Sir’s Tuition in Naranpura.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  return <SitePage>
    <PageIntro number="05" eyebrow="Questions" title="Good questions lead to the right batch." description="Start here for the practical details. If your board, year or subject needs a more specific answer, contact the centre directly." />
    <Faq />
    <PageClosing title="Still have a question?" text="Share your course, year and subjects so the centre can give you a specific answer." />
  </SitePage>;
}
