import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { CONTACT, enquiryUrl } from "@/lib/site";

/**
 * The closing page of the book. The invitation stays calm and honest — no
 * limited seats, no discounts, no guaranteed marks — and every action
 * reaches a real channel rather than a pretend form.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 sm:p-12 lg:grid-cols-2 lg:p-16">
          <Reveal>
            <SectionLabel>Chapter 05 · The closing page</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
              Find the right batch<br />for your studies.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-zinc-300">
              Share your course and subjects. Enquire about batches, current
              timings, fees and teaching format — and ask anything you want to
              know before you decide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-300"
              >
                <Phone size={16} /> Call now
              </a>
              <a
                href={enquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                Chat on WhatsApp
              </a>
            </div>
            <p className="annotation mt-10 max-w-sm text-gold-300/90">
              If you are unsure which subject to ask about, start with the course finder above.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-7 text-zinc-300">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-start gap-4 border-b border-white/10 pb-6"
              >
                <Phone size={20} className="shrink-0 text-gold-300" />
                <span>
                  <span className="block text-xs uppercase tracking-widest">Call the centre</span>
                  <span className="mt-2 block text-xl text-white">{CONTACT.displayPhone}</span>
                </span>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4"
              >
                <MapPin size={20} className="shrink-0 text-gold-300" />
                <span>
                  <span className="block text-xs uppercase tracking-widest">Visit the centre</span>
                  <span className="mt-2 block text-sm leading-relaxed">{CONTACT.address}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold-300">
                    Get directions <ArrowUpRight size={16} />
                  </span>
                </span>
              </a>
              <p className="border-t border-white/10 pt-6 text-sm">
                Call ahead to confirm the current batch timetable and visiting hours.
              </p>
            </div>
          </Reveal>
        </div>
        <div id="map" className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <iframe
            title="Tuition centre location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&z=15&output=embed`}
            width="100%"
            height="300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
          />
        </div>
        <p className="mt-8 text-center font-serif text-xs italic text-zinc-600">
          End of the notebook · Saurin Mehta · Naranpura, Ahmedabad
        </p>
      </div>
    </section>
  );
}

export function WhatsAppAction() {
  return (
    <a
      href={enquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="whatsapp-action fixed bottom-5 right-5 z-40 flex min-h-12 items-center gap-2 rounded-full border border-gold-400/40 bg-ink-900 px-4 py-3 text-sm text-gold-300 shadow-xl"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Enquire on WhatsApp</span>
    </a>
  );
}
