import { isAdmin } from "@/lib/admin-auth";
import { listReviews, reviewStoreReady } from "@/lib/review-store";

function csv(value: unknown) {
  const raw = String(value ?? "");
  // A quoted CSV cell can still execute as a formula when opened in a spreadsheet.
  const safe = /^[\s]*[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replaceAll('"', '""')}"`;
}

export async function GET() {
  if (!await isAdmin()) return new Response("Unauthorized", { status: 401 });
  if (!reviewStoreReady()) return new Response("Storage unavailable", { status: 503 });
  const rows = await listReviews();
  const columns = ["id", "status", "name", "role", "course", "rating", "quote", "contact", "createdAt", "consentAt", "approvedAt", "featured"] as const;
  const data = [columns.join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))].join("\r\n");
  return new Response(`\uFEFF${data}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=saurinsir-reviews.csv", "Cache-Control": "private, no-store" } });
}
