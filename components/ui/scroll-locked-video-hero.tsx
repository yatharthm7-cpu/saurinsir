"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { enquiryUrl } from "@/lib/site";

export default function MetroHero() {
  const track = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = track.current;
    const media = video.current;
    if (!el || !media) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let progress = 0;
    let target = 0;
    let lastSeek = 0;
    let visible = true;
    const frame = (time: number) => {
      progress += (target - progress) * 0.18;
      el.style.setProperty("--open", String(progress));
      if (Number.isFinite(media.duration) && media.duration > 0 && time - lastSeek > 100 && !media.seeking) {
        const desired = Math.min(media.duration - 0.05, progress * media.duration);
        if (Math.abs(media.currentTime - desired) > 0.05) media.currentTime = desired;
        lastSeek = time;
      }
      if (visible && !motion.matches && Math.abs(target - progress) > 0.001) raf = requestAnimationFrame(frame);
      else { raf = 0; el.style.setProperty("--open", String(target)); }
    };
    const update = () => {
      const rect = el.getBoundingClientRect();
      target = motion.matches ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, el.offsetHeight - window.innerHeight)));
      if (motion.matches) { cancelAnimationFrame(raf); raf = 0; el.style.setProperty("--open", "1"); return; }
      if (visible && !raf) raf = requestAnimationFrame(frame);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update(); else { cancelAnimationFrame(raf); raf = 0; }
    });
    observer.observe(el);
    const load = () => { el.classList.add("hero-media-ready"); update(); };
    const fail = () => el.classList.remove("hero-media-ready");
    media.addEventListener("loadeddata", load);
    media.addEventListener("error", fail);
    if (media.readyState >= 2) load();
    const prime = media.play();
    if (prime) prime.then(() => media.pause()).catch(() => {});
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    motion.addEventListener("change", update);
    el.classList.add("hero-enhanced");
    update();
    return () => {
      observer.disconnect(); cancelAnimationFrame(raf);
      media.removeEventListener("loadeddata", load); media.removeEventListener("error", fail);
      window.removeEventListener("scroll", update); window.removeEventListener("resize", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  return <section ref={track} className="book-hero" aria-label="Introduction">
    <div className="book-stage">
      <video ref={video} src="/hero-section.mp4" muted playsInline preload="metadata" aria-hidden="true" className="hero-video" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-layout">

      <div className="hero-copy relative z-10">
        <p className="text-xs uppercase leading-loose tracking-[0.2em] text-gold-300">Commerce tuition · Naranpura, Ahmedabad</p>
        <h1 className="mt-6 font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-tight text-white">Saurin Sir</h1>
        <p className="mt-6 font-serif text-2xl text-ivory-100 sm:text-3xl">Where learning finally makes sense.</p>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-200 sm:text-base">Classes 11–12, commerce degrees and foundation courses. Explore your subjects and find your next step.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={enquiryUrl()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-300">Enquire about classes <ArrowUpRight className="ml-1 inline" size={16} /></a>
          <a href="#subjects" className="rounded-full border border-white/30 bg-ink-950/40 px-6 py-3 text-sm text-white">Explore classes</a>
        </div>
      </div>
      <div className="textbook-scene" aria-label="Illustrated commerce textbook">
        <div className="textbook-volume">
          <div className="textbook-pages" aria-hidden="true">
            <span className="page-eyebrow">YOUR NEXT CHAPTER</span>
            <p className="page-title">A clearer way<br />to learn.</p>
            <div className="page-rule" />
            <p className="page-note">Understand the concept.<br />Practise the method.<br />Build your confidence.</p>
            <span className="page-number">01 — COMMERCE</span>
          </div>
          <div className="textbook-front">
            <Image src="/commerce-textbook-cover.png" alt="Saurin Sir’s Commerce Notebook cover: Accountancy, Legal Studies, Finance, Statistics, Taxation, and Cost & Management Accounting" width={1024} height={1536} sizes="(max-width: 767px) 190px, (max-width: 1100px) 300px, 380px" preload className="textbook-art" />
            <div className="textbook-cover-light" aria-hidden="true" />
          </div>
          <div className="textbook-spine" aria-hidden="true" />
        </div>
        <p className="textbook-caption">Six subjects. One thoughtful beginning.</p>
      </div>
      </div>
      <a href="#about" className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-xs uppercase tracking-widest text-gold-300">Scroll to open <ArrowDown size={16} /></a>
      <div className="hero-progress" aria-hidden="true" />
    </div>
  </section>;
}
