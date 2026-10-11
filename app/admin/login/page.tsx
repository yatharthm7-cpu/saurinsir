import { redirect } from "next/navigation";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/app/actions";
import { adminReady, isAdmin } from "@/lib/admin-auth";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (await isAdmin()) redirect("/admin");
  const params = await searchParams;
  const ready = adminReady();
  return <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 py-20 text-white">
    <div className="w-full max-w-md border border-gold-400/25 bg-ink-900 p-7 shadow-2xl sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-400 text-ink-950"><LockKeyhole size={24} /></div>
      <p className="mt-8 text-xs uppercase tracking-[0.24em] text-gold-300">Private notebook</p>
      <h1 className="mt-4 font-serif text-4xl">Review administration.</h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">Sign in to verify submissions and choose which reviews appear on the public site.</p>
      {!ready ? <p role="alert" className="mt-7 border border-gold-400/30 bg-gold-400/10 p-4 text-sm leading-relaxed text-gold-300">Admin access is not configured yet. Set a strong ADMIN_PASSWORD of at least 20 characters and a random ADMIN_SESSION_SECRET of at least 32 characters in the server environment.</p> : <form action={loginAdmin} className="mt-8 space-y-5">
        {params.error === "invalid" && <p role="alert" className="border border-red-300/40 bg-red-300/10 p-3 text-sm text-red-200">That password was not accepted.</p>}
        <label className="block text-sm">Admin password<input type="password" name="password" required autoComplete="current-password" className="mt-2 w-full rounded-md border border-white/20 bg-ink-950 px-4 py-3" /></label>
        <button type="submit" className="min-h-12 w-full rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-300">Open the review desk</button>
      </form>}
      <Link href="/" className="mt-8 inline-block text-sm text-zinc-400 underline underline-offset-4 hover:text-white">Return to the website</Link>
    </div>
  </main>;
}
