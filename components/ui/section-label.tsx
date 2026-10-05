import { cn } from "cn";

/**
 * Small section eyebrow — a hairline rule, a gold label, then the heading
 * hangs off it. Used identically on both materials so a reader can tell
 * "this is a section start" from anywhere on the page.
 */
export function SectionLabel({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "h-px w-8 shrink-0",
          tone === "ink" ? "bg-gold-500/60" : "bg-gold-600/70"
        )}
      />
      <span
        className={cn(
          "text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
          tone === "ink" ? "text-gold-400" : "text-gold-600"
        )}
      >
        {children}
      </span>
    </div>
  );
}
