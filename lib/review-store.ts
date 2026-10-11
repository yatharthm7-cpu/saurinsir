import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

export type ReviewStatus = "pending" | "approved" | "rejected";
export type ReviewRecord = {
  id: string; name: string; role: "student" | "parent"; course: string;
  quote: string; rating: number | null; contact: string; sourceUrl: string;
  status: ReviewStatus; featured: boolean; createdAt: string; updatedAt: string;
  consentAt: string; verifiedAt: string | null;
};
export type PublicReview = Pick<ReviewRecord, "id" | "name" | "role" | "course" | "quote" | "rating" | "sourceUrl" | "featured" | "createdAt">;
type ReviewRow = {
  id: string; name: string; role: ReviewRecord["role"]; course: string;
  quote: string; rating: number | null; contact: string; source_url: string;
  status: ReviewStatus; featured: boolean; created_at: string; updated_at: string;
  consent_at: string; verified_at: string | null;
};

const LOCAL_DIR = path.join(process.cwd(), ".review-data", "reviews");
// A Vercel deployment must use persistent storage; local files are for preview only.
const local = process.env.NODE_ENV === "development" ||
  (process.env.REVIEW_STORAGE_MODE === "local" && !process.env.VERCEL);

export function reviewStoreReady() {
  return local || Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

function database() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Review storage is not configured");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function assertId(id: string) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error("Invalid review ID");
}
function localPath(id: string) { return path.join(LOCAL_DIR, `${id}.json`); }
function fromRow(row: ReviewRow): ReviewRecord {
  return {
    id: row.id, name: row.name, role: row.role, course: row.course,
    quote: row.quote, rating: row.rating, contact: row.contact,
    sourceUrl: row.source_url, status: row.status, featured: row.featured,
    createdAt: row.created_at, updatedAt: row.updated_at,
    consentAt: row.consent_at, verifiedAt: row.verified_at,
  };
}
function toRow(record: ReviewRecord): ReviewRow {
  return {
    id: record.id, name: record.name, role: record.role, course: record.course,
    quote: record.quote, rating: record.rating, contact: record.contact,
    source_url: record.sourceUrl, status: record.status, featured: record.featured,
    created_at: record.createdAt, updated_at: record.updatedAt,
    consent_at: record.consentAt, verified_at: record.verifiedAt,
  };
}

export async function getReview(id: string): Promise<ReviewRecord | null> {
  assertId(id);
  if (local) {
    try { return JSON.parse(await readFile(localPath(id), "utf8")) as ReviewRecord; }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }
  const { data, error } = await database().from("reviews").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as ReviewRow) : null;
}

export async function listReviews(): Promise<ReviewRecord[]> {
  if (local) {
    await mkdir(LOCAL_DIR, { recursive: true });
    const files = (await readdir(LOCAL_DIR)).filter((file) => /^[a-f0-9-]{36}\.json$/.test(file));
    return Promise.all(files.map(async (file) => JSON.parse(await readFile(path.join(LOCAL_DIR, file), "utf8")) as ReviewRecord));
  }
  const { data, error } = await database().from("reviews").select("*")
    .order("created_at", { ascending: false }).limit(1000);
  if (error) throw error;
  return (data as ReviewRow[]).map(fromRow);
}

export async function publicReviews(): Promise<PublicReview[]> {
  if (!reviewStoreReady()) return [];
  if (local) {
    return (await listReviews()).filter((review) => review.status === "approved")
      .map(({ id, name, role, course, quote, rating, sourceUrl, featured, createdAt }) =>
        ({ id, name, role, course, quote, rating, sourceUrl, featured, createdAt }))
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt));
  }
  const { data, error } = await database().from("reviews")
    .select("id,name,role,course,quote,rating,source_url,featured,created_at")
    .eq("status", "approved").order("featured", { ascending: false })
    .order("created_at", { ascending: false }).limit(100);
  if (error) throw error;
  return data.map((row) => ({
    id: row.id, name: row.name, role: row.role, course: row.course,
    quote: row.quote, rating: row.rating, sourceUrl: row.source_url,
    featured: row.featured, createdAt: row.created_at,
  }));
}

export async function createReview(input: Pick<ReviewRecord, "name" | "role" | "course" | "quote" | "rating" | "contact">) {
  if (!reviewStoreReady()) throw new Error("Review submissions are unavailable");
  const now = new Date().toISOString();
  const record: ReviewRecord = {
    ...input, id: randomUUID(), sourceUrl: "", status: "pending", featured: false,
    createdAt: now, updatedAt: now, consentAt: now, verifiedAt: null,
  };
  if (local) await writeLocal(record);
  else {
    const { error } = await database().from("reviews").insert(toRow(record));
    if (error) throw error;
  }
  return record.id;
}

async function writeLocal(record: ReviewRecord) {
  await mkdir(LOCAL_DIR, { recursive: true });
  const temporary = localPath(`${record.id}.${randomUUID()}`);
  await writeFile(temporary, JSON.stringify(record), { encoding: "utf8", flag: "wx" });
  await rename(temporary, localPath(record.id));
}

export async function changeReview(id: string, action: "approve" | "reject" | "unpublish" | "feature" | "unfeature") {
  const review = await getReview(id);
  if (!review) throw new Error("Review not found");
  const previousUpdate = review.updatedAt;
  const now = new Date().toISOString();
  if (action === "approve") {
    review.status = "approved"; review.verifiedAt = now;
  } else if (action === "reject") {
    review.status = "rejected"; review.featured = false;
  } else if (action === "unpublish") {
    review.status = "pending"; review.featured = false; review.verifiedAt = null;
  } else if (action === "feature" && review.status === "approved") {
    review.featured = true;
  } else if (action === "unfeature") {
    review.featured = false;
  } else throw new Error("Invalid moderation action");
  review.updatedAt = now;
  if (local) await writeLocal(review);
  else {
    const { data, error } = await database().from("reviews")
      .update(toRow(review)).eq("id", id).eq("updated_at", previousUpdate)
      .select("id").maybeSingle();
    if (error) throw error;
    if (!data) throw new Error("Review changed while moderating; refresh and try again");
  }
}

export async function deleteReview(id: string) {
  assertId(id);
  if (local) await unlink(localPath(id));
  else {
    const { error } = await database().from("reviews").delete().eq("id", id);
    if (error) throw error;
  }
}
