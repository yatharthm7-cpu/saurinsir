import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces is the display serif — headings, numerals, pull quotes.
// One display face plus one workhorse sans is the whole type system.
// It ships as a variable font, so weight is left open to get the full
// range (and the optical-size axis) rather than a few static cuts.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Saurin Mehta Sir's Tuition — Commerce that clicks",
  description:
    "Commerce tuition for Class 11–12, BCom, MCom, BBA, MBA and CA & ICMA Foundation by Saurin Mehta in Naranpura, Ahmedabad. Explore subjects and enquire about current batches.",
  keywords: [
    "commerce tuition Ahmedabad",
    "Naranpura tuition",
    "Accountancy classes",
    "CA Foundation",
    "ICMA Foundation",
    "Class 12 commerce",
    "Saurin Mehta",
  ],
  authors: [{ name: "Saurin Mehta" }],
  openGraph: {
    title: "Saurin Mehta Sir's Tuition — Commerce that clicks",
    description:
      "Commerce tuition for Class 11–12, BCom, MCom, BBA, MBA and CA & ICMA Foundation in Naranpura, Ahmedabad. Explore subjects and enquire about current batches.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950">{children}</body>
    </html>
  );
}
