# Saurin Sir tuition website

Commerce tuition website built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Check and build

```sh
npm run lint
npm run build
npm start
```

The production build uses next/font and may need network access for font downloads.

## Content and assets

- Contact details: lib/site.ts
- Courses: components/sections/subjects.tsx
- Hero: components/ui/scroll-locked-video-hero.tsx
- Generated textbook cover and generation prompt: public/commerce-textbook-cover.png and public/commerce-textbook-prompt.txt
- Current implementation and owner-content checklist: PROMPT-AUDIT.md

The hero uses a scroll-controlled hardcover opening with a static reduced-motion presentation. Enquiries use phone and WhatsApp links.

Before publishing, confirm the existing contact information and course coverage, and supply approved photographs, testimonials and results. No unverified results are displayed on the page.
