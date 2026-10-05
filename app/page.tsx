import MetroHero from "@/components/ui/scroll-locked-video-hero";
import Navbar from "@/components/sections/navbar";
import About from "@/components/sections/about";
import Subjects from "@/components/sections/subjects";
import Features from "@/components/sections/features";
import Faq from "@/components/sections/faq";
import Contact, { WhatsAppAction } from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
export default function Home() {
  return <div id="top"><a href="#main-content" className="skip-link">Skip to content</a><Navbar /><main id="main-content" tabIndex={-1}><MetroHero /><About /><Subjects /><Features /><Faq /><Contact /></main><Footer /><WhatsAppAction /></div>;
}
