import {
  BookOpen,
  Calculator,
  ChartNoAxesCombined,
  Landmark,
  Layers,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type Level = "Classes 11–12" | "BCom" | "MCom" | "BBA / MBA" | "Foundation";

export type Subject = {
  title: string;
  icon: LucideIcon;
  description: string;
  levels: Level[];
};

/**
 * The subject catalogue. This is the single source of truth — the subject
 * grid, the course finder and any enquiry message all read from here, so
 * the offering can never disagree with itself in two places.
 *
 * Broad course levels are retained provisionally; confirm exact syllabus
 * coverage for each with the owner before promising it in copy.
 */
export const SUBJECTS: Subject[] = [
  {
    title: "Accountancy",
    icon: BookOpen,
    description: "Journal entries, final accounts and the logic behind the ledger.",
    levels: ["Classes 11–12", "BCom", "Foundation"],
  },
  {
    title: "Legal Studies",
    icon: Scale,
    description: "Contracts, business law and the framework behind business decisions.",
    levels: ["Classes 11–12", "BBA / MBA"],
  },
  {
    title: "Finance",
    icon: ChartNoAxesCombined,
    description: "Financial management and the numbers behind business decisions.",
    levels: ["Classes 11–12", "BCom", "Foundation"],
  },
  {
    title: "Statistics",
    icon: Calculator,
    description: "Data, correlation, probability and working through numerical questions.",
    levels: ["Classes 11–12", "BCom", "BBA / MBA"],
  },
  {
    title: "Taxation",
    icon: Landmark,
    description: "Tax concepts and practical examples for commerce studies.",
    levels: ["BCom", "MCom", "Foundation"],
  },
  {
    title: "Cost & Management Accounting",
    icon: Layers,
    description: "Costing methods, budgets and the ideas behind cost decisions.",
    levels: ["BCom", "MCom", "Foundation"],
  },
];

export const LEVELS: Level[] = [
  "Classes 11–12",
  "BCom",
  "MCom",
  "BBA / MBA",
  "Foundation",
];

/** Filter chips for the catalogue grid — "All subjects" plus every level. */
export const FILTERS: ("All subjects" | Level)[] = ["All subjects", ...LEVELS];

export function subjectsForLevel(level: Level): Subject[] {
  return SUBJECTS.filter((s) => s.levels.includes(level));
}
