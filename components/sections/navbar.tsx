"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
const LINKS = [{ label: "About", href: "#about" }, { label: "Courses", href: "#subjects" }, { label: "Learning", href: "#features" }, { label: "FAQs", href: "#faq" }, { label: "Contact", href: "#contact" }];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = () => { setOpen(false); trigger.current?.focus(); };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const links = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
        const items: HTMLElement[] = trigger.current ? [trigger.current, ...links] : links;
        const first = items[0]; const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    const size = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener("keydown", key); window.addEventListener("resize", size);
    return () => { document.removeEventListener("keydown", key); window.removeEventListener("resize", size); };
  }, [open]);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || open ? "border-white/10 bg-ink-950/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/60 to-transparent"}`}>
    <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
      <a href="#top" className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 font-serif font-bold text-ink-950">S</span><span className="font-serif text-base text-white">Saurin Sir’s Tuition</span></a>
      <div className="hidden items-center gap-6 lg:flex">{LINKS.map(link => <a key={link.href} href={link.href} className="text-sm text-zinc-300 hover:text-gold-300">{link.label}</a>)}<a href="#contact" className="rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-ink-950">Enquire now</a></div>
      <button ref={trigger} onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" className="flex h-11 w-11 items-center justify-center text-white lg:hidden">{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div ref={panel} id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink-950 px-5 py-4 lg:hidden"><nav aria-label="Mobile navigation" className="flex flex-col">{LINKS.map(link => <a key={link.href} href={link.href} onClick={() => { setOpen(false); document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true }); }} className="rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5">{link.label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-gold-400 px-5 py-3 text-center font-semibold text-ink-950">Enquire now</a></nav></div>}
  </header>;
}
