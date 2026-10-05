import MetroHero from "@/components/ui/scroll-locked-video-hero";
import Navbar from "@/components/sections/navbar";
import About from "@/components/sections/about";
import MiniLesson from "@/components/sections/mini-lesson";
import Subjects from "@/components/sections/subjects";
import Features from "@/components/sections/features";
import Reviews from "@/components/sections/reviews";
import Faq from "@/components/sections/faq";
import Contact, { WhatsAppAction } from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ChapterRail from "@/components/ui/chapter-rail";

export default function Home() {
  return (
    <div id="top">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <ChapterRail />
      <main id="main-content" tabIndex={-1}>
        <MetroHero />
        <About />
        <MiniLesson />
        <Subjects />
        <Features />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppAction />
    </div>
  );
}
