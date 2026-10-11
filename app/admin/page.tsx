import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { logoutAdmin, moderateReview } from "@/app/actions";
import { isAdmin } from "@/lib/admin-auth";
import { listReviews, reviewStoreReady, type ReviewRecord, type ReviewStatus } from "@/lib/review-store";

const FILTERS: ("all" | ReviewStatus)[] = ["pending", "approved", "rejected", "all"];

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await connection();
  if (!await isAdmin()) redirect("/admin/login");
  const params = await searchParams;
  const status = FILTERS.includes(params.status as (typeof FILTERS)[number]) ? params.status as (typeof FILTERS)[number] : "pending";
  const query = typeof params.q === "string" ? params.q.trim().toLowerCase().slice(0, 100) : "";
  const ready = reviewStoreReady();
  const { records, storageError } = ready ? await listReviews().then((records) => ({
    records, storageError: false,
  })).catch((error) => {
    console.error("Unable to load review queue", error);
    return { records: [] as ReviewRecord[], storageError: true };
  }) : { records: [] as ReviewRecord[], storageError: false };
  records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const filtered = records.filter((record) => (status === "all" || record.status === status) && (!query || `${record.name} ${record.course} ${record.quote}`.toLowerCase().includes(query)));
  const count = (value: ReviewStatus) => records.filter((record) => record.status === value).length;

  return <main className="min-h-screen bg-ink-950 px-5 py-8 text-white sm:px-8">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-7"><div><p className="text-xs uppercase tracking-[0.25em] text-gold-300">Private review desk</p><h1 className="mt-3 font-serif text-4xl sm:text-5xl">Review administration.</h1></div><div className="flex flex-wrap items-center gap-3"><Link href="/reviews" className="min-h-11 rounded-full border border-white/25 px-5 py-3 text-sm hover:border-gold-300">View public page ↗</Link><a href="/admin/export" className="min-h-11 rounded-full border border-white/25 px-5 py-3 text-sm hover:border-gold-300">Export CSV</a><form action={logoutAdmin}><button type="submit" className="min-h-11 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-950">Sign out</button></form></div></header>
      {!ready && <p role="alert" className="mt-8 border border-gold-400/40 bg-gold-400/10 p-5 text-sm text-gold-300">Private review storage is not connected. Check the server’s Supabase settings before accepting reviews.</p>}
      {storageError && <p role="alert" className="mt-8 border border-red-300/40 bg-red-300/10 p-5 text-sm text-red-200">The private review store could not be read. The counts below are unavailable until the connection is restored.</p>}
      {params.updated === "1" && <p role="status" className="mt-6 border border-gold-400/40 bg-gold-400/10 p-4 text-sm text-gold-300">The review queue has been updated.</p>}
      {params.error === "storage" && <p role="alert" className="mt-6 border border-red-300/40 bg-red-300/10 p-4 text-sm text-red-200">The review could not be updated. Please try again after checking the private store connection.</p>}
      <div className="mt-9 grid gap-3 sm:grid-cols-3">{(["pending", "approved", "rejected"] as ReviewStatus[]).map((item) => <div key={item} className="border border-white/10 bg-ink-900 p-6"><p className="text-xs uppercase tracking-[0.22em] text-zinc-400">{item}</p><p className="mt-3 font-serif text-4xl text-gold-300">{storageError ? "—" : count(item)}</p></div>)}</div>
      <div className="mt-10 flex flex-col gap-5 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between"><nav aria-label="Review status" className="flex flex-wrap gap-2">{FILTERS.map((item) => <Link key={item} href={`/admin?status=${item}`} aria-current={status === item ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm capitalize ${status === item ? "border-gold-400 bg-gold-400 text-ink-950" : "border-white/20 text-zinc-300 hover:border-gold-400"}`}>{item}</Link>)}</nav><form method="get" className="flex gap-2"><input type="hidden" name="status" value={status} /><label className="sr-only" htmlFor="review-search">Search reviews</label><input id="review-search" name="q" defaultValue={query} placeholder="Search name or review" className="min-h-11 min-w-0 rounded-md border border-white/20 bg-ink-900 px-4 text-sm text-white" /><button className="rounded-md border border-white/25 px-4 text-sm">Search</button></form></div>
      {!storageError && (filtered.length === 0 ? <div className="py-20 text-center"><p className="font-serif text-2xl">No reviews in this view.</p><p className="mt-3 text-sm text-zinc-400">New submissions appear under Pending.</p></div> : <div className="mt-7 grid gap-5">{filtered.map((review) => <ReviewDeskCard key={review.id} review={review} />)}</div>)}
      <p className="mt-12 border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">Review submissions for spam, private information, and publishing consent before approval. Approval does not independently confirm identity or claims. Contact details stay private; deletion removes a record from the queue.</p>
    </div>
  </main>;
}

function ReviewDeskCard({ review }: { review: ReviewRecord }) {
  return <article className="border border-white/10 bg-ink-900 p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className={`inline-block rounded-full border px-3 py-1 text-xs capitalize ${review.status === "approved" ? "border-green-400/40 text-green-300" : review.status === "rejected" ? "border-red-300/40 text-red-200" : "border-gold-400/40 text-gold-300"}`}>{review.status}{review.featured ? " · Featured" : ""}</span><h2 className="mt-4 font-serif text-2xl">{review.name}</h2><p className="mt-1 text-sm text-zinc-400">{review.role === "parent" ? "Parent" : "Student"} · {review.course}{review.rating ? ` · ${review.rating}/5 stars` : ""}</p></div><p className="text-xs text-zinc-500">Submitted {new Date(review.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })}</p></div>
    <blockquote className="mt-7 border-l-2 border-gold-400/60 pl-5 font-serif text-lg leading-relaxed text-zinc-100">&ldquo;{review.quote}&rdquo;</blockquote>
    <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 text-sm text-zinc-300 sm:grid-cols-2"><p><span className="block text-xs uppercase tracking-widest text-zinc-500">Contact for follow-up</span><span className="mt-1 block break-all">{review.contact || "Not provided"}</span></p><p><span className="block text-xs uppercase tracking-widest text-zinc-500">Permission recorded</span><span className="mt-1 block">{new Date(review.consentAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</span></p></div>
    <div className="mt-7 flex flex-wrap items-end gap-3">{review.status !== "approved" && <form action={moderateReview} className="flex flex-wrap items-center gap-3"><input type="hidden" name="id" value={review.id} /><input type="hidden" name="action" value="approve" /><button type="submit" className="min-h-10 rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-ink-950">Approve & publish</button></form>}
      {review.status === "pending" && <Action id={review.id} action="reject" label="Reject" />}
      {review.status === "approved" && <><Action id={review.id} action="unpublish" label="Unpublish" /><Action id={review.id} action={review.featured ? "unfeature" : "feature"} label={review.featured ? "Remove feature" : "Feature review"} /></>}
      <details className="ml-auto text-sm text-red-200"><summary className="min-h-10 cursor-pointer list-none rounded-full border border-red-300/30 px-5 py-2">Delete permanently</summary><form action={moderateReview} className="mt-3 flex items-center gap-3"><input type="hidden" name="id" value={review.id} /><input type="hidden" name="action" value="delete" /><span className="text-xs">Cannot be undone.</span><button type="submit" className="rounded-full bg-red-300 px-4 py-2 text-xs font-semibold text-ink-950">Confirm delete</button></form></details>
    </div>
  </article>;
}

function Action({ id, action, label }: { id: string; action: string; label: string }) {
  return <form action={moderateReview}><input type="hidden" name="id" value={id} /><input type="hidden" name="action" value={action} /><button type="submit" className="min-h-10 rounded-full border border-white/25 px-5 py-2 text-sm hover:border-gold-300">{label}</button></form>;
}
