"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "cn";
export function Reveal({ children, as, className, delay = 0, once = true }: {
  children: ReactNode; as?: ElementType; className?: string; delay?: number; once?: boolean;
}) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const show = () => el.classList.remove("reveal-init");
    if (motion.matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add("reveal-init");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { show(); if (once) observer.disconnect(); }
      else if (!once) el.classList.add("reveal-init");
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
    observer.observe(el);
    motion.addEventListener("change", show);
    return () => { observer.disconnect(); motion.removeEventListener("change", show); show(); };
  }, [once]);
  return <Tag ref={ref} className={cn("reveal-transition", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
