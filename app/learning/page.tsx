import type { Metadata } from "next";
import MiniLesson from "@/components/sections/mini-lesson";
import Features from "@/components/sections/features";
import { PageClosing, PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "Try a Commerce Concept | Saurin Sir’s Tuition", description: "Try a short interactive Accountancy example and explore a concept-first approach to commerce study.", alternates: { canonical: "/learning" } };

export default function LearningPage() {
  return <SitePage>
    <PageIntro number="03" eyebrow="A sample lesson" title="Try the idea before the answer." description="Work through one Accountancy transaction and see why each answer works—or doesn’t. This is an interactive sample, not a recording of a class." />
    <MiniLesson />
    <Features />
    <PageClosing title="Want help with your own syllabus?" text="Tell the centre your course and the concepts you want to work through." />
  </SitePage>;
}
