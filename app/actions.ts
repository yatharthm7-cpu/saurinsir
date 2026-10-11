"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminReady, endAdminSession, isAdmin, passwordMatches, startAdminSession } from "@/lib/admin-auth";
import { changeReview, createReview, deleteReview, reviewStoreReady } from "@/lib/review-store";
import { LEVELS } from "@/lib/courses";

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitReview(form: FormData) {
  if (field(form, "website")) redirect("/reviews?sent=1");
  if (!reviewStoreReady()) redirect("/reviews?error=unavailable");
  const name = field(form, "name");
  const role = field(form, "role");
  const course = field(form, "course");
  const quote = field(form, "quote");
  const contact = field(form, "contact");
  const ratingValue = field(form, "rating");
  const rating = ratingValue ? Number(ratingValue) : null;
  const consent = field(form, "consent") === "yes";
  if (name.length < 2 || name.length > 80 || !["student", "parent"].includes(role) ||
      !LEVELS.includes(course as (typeof LEVELS)[number]) || quote.length < 30 || quote.length > 1200 ||
      (contact.length > 0 && contact.length < 5) || contact.length > 150 ||
      (rating !== null && (![1, 2, 3, 4, 5].includes(rating))) || !consent) {
    redirect("/reviews?error=invalid#write-review");
  }
  try {
    await createReview({ name, role: role as "student" | "parent", course, quote, contact: contact || null, rating });
  } catch (error) {
    console.error("Review submission failed", error);
    redirect("/reviews?error=unavailable#write-review");
  }
  redirect("/reviews?sent=1#write-review");
}

export async function loginAdmin(form: FormData) {
  if (!adminReady()) redirect("/admin/login?error=setup");
  if (!passwordMatches(field(form, "password"))) redirect("/admin/login?error=invalid");
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await endAdminSession();
  redirect("/admin/login");
}

export async function moderateReview(form: FormData) {
  if (!await isAdmin()) redirect("/admin/login");
  const id = field(form, "id");
  const action = field(form, "action");
  if (!/^[a-f0-9-]{36}$/.test(id)) redirect("/admin?error=invalid");
  if (!["delete", "approve", "reject", "unpublish", "feature", "unfeature"].includes(action)) redirect("/admin?error=invalid");
  try {
    if (action === "delete") await deleteReview(id);
    else await changeReview(id, action as "approve" | "reject" | "unpublish" | "feature" | "unfeature");
  } catch (error) {
    console.error("Review moderation failed", error);
    redirect("/admin?error=storage");
  }
  revalidatePath("/");
  revalidatePath("/reviews");
  redirect("/admin?updated=1");
}
