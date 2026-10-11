# Saurin Sir tuition website

Commerce tuition website built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` and replace both admin secrets with long,
random values. Local review submissions use an ignored `.review-data` directory.
The admin login is at `/admin/login`.

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

## Pages and review moderation

The public site has dedicated About, Courses, Learning, Reviews, FAQ, Contact,
and Privacy pages, plus a themed 404 page. The existing homepage remains the
visual overview. Search engines receive a sitemap and an admin crawl exclusion.

Visitors submit a review at `/reviews`. Phone or email is optional and used
only for a possible follow-up. Submissions stay **pending and private** until
an admin reviews them for spam, private information and publishing consent,
then approves them at `/admin`. Approval is not an independent identity check.
The admin desk shows counts, search and status filters, optional private
contact, approval, rejection, unpublishing, featuring, permanent deletion and
CSV export. Only approved reviews appear publicly; contact details are never
sent to the public review component. No example or invented review is preloaded.

For production on Vercel:

1. Create a dedicated Supabase project, then apply the SQL migrations in
   `supabase/migrations` in filename order. The table enables
   row-level security, denies browser roles, and grants only `service_role`
   access. In Vercel Production variables, set `SUPABASE_URL` and
   `SUPABASE_SECRET_KEY` from that project's API settings. Use a modern
   `sb_secret_...` key; never add it to `NEXT_PUBLIC_` variables.
2. Set `ADMIN_PASSWORD` to a unique random string of at least 20 characters and
   `ADMIN_SESSION_SECRET` to an independent random string of at least 32
   characters in the project's Production environment. Redeploy after setting
   them. Do not reuse the local preview credentials.
3. Test a submission, confirm it appears in Pending but not on the public page,
   then test approval with a real, consented review. Keep the initial live queue
   empty until genuine reviews arrive.

When private storage is missing or unavailable in production, the form closes
instead of accepting reviews that could be lost. The admin page reports the
configuration problem. `REVIEW_STORAGE_MODE=local` is ignored on Vercel.

This first release uses a honeypot field and manual approval. Before promoting
the form broadly, add a rate limit or a challenge on review
submissions to protect the queue from automated spam.

The hero uses a scroll-controlled hardcover opening with a static reduced-motion presentation. Enquiries use phone and WhatsApp links.

Before publishing, confirm the existing contact information and course coverage, and supply approved photographs, testimonials and results. No unverified results are displayed on the page.
