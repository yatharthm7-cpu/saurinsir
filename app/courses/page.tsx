import type { Metadata } from "next";
import Subjects from "@/components/sections/subjects";
import { PageClosing, PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "Commerce Courses & Subjects | Saurin Sir’s Tuition", description: "Explore commerce subjects by study level and enquire about syllabus coverage and current batches.", alternates: { canonical: "/courses" } };

export default function CoursesPage() {
  return <SitePage>
    <PageIntro number="02" eyebrow="Courses & subjects" title="Find your starting point." description="Choose your study level, then see the subjects you can enquire about. Confirm your exact board, university or foundation syllabus with the centre before joining." />
    <Subjects />
    <section className="bg-ivory-100 px-5 pb-20 text-ivory-text sm:px-8"><div className="mx-auto max-w-6xl border-t border-ivory-line pt-10"><p className="annotation max-w-2xl text-ivory-text-dim">The catalogue is a starting point. Current batch timings, fees, teaching format and chapter coverage are confirmed directly for your course.</p></div></section>
    <PageClosing title="See how a concept is explained." text="Try a short sample lesson before you enquire about a batch." href="/learning" action="Try the lesson" />
  </SitePage>;
}
