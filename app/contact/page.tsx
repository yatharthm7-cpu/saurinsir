import type { Metadata } from "next";
import Contact from "@/components/sections/contact";
import { PageIntro, SitePage } from "@/components/ui/site-page";

export const metadata: Metadata = { title: "Contact & Directions | Saurin Sir’s Tuition", description: "Call, message or find Saurin Sir’s Tuition at Swapneel Complex in Naranpura, Ahmedabad.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <SitePage><PageIntro number="06" eyebrow="Contact" title="Turn the page. Start a conversation." description="Ask about your exact syllabus, available batches, timings, fees and teaching format. Call ahead before visiting the centre." /><Contact /></SitePage>;
}
