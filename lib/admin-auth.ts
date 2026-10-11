import "server-only";

import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "saurin_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

export function adminReady() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 20 && process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32);
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function passwordMatches(value: string) {
  return adminReady() && safeEqual(value, process.env.ADMIN_PASSWORD!);
}

function signature(payload: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(payload).digest("hex");
}

export async function startAdminSession() {
  if (!adminReady()) throw new Error("Admin is not configured");
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = `${expires}.${randomBytes(16).toString("hex")}`;
  (await cookies()).set(COOKIE, `${payload}.${signature(payload)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict",
    path: "/admin", maxAge: SESSION_SECONDS,
  });
}

export async function endAdminSession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin() {
  if (!adminReady()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [expiration, nonce, provided] = token.split(".");
  if (!expiration || !/^[a-f0-9]{32}$/.test(nonce || "") || !/^[a-f0-9]{64}$/.test(provided || "")) return false;
  if (!Number.isSafeInteger(Number(expiration)) || Number(expiration) < Date.now() / 1000) return false;
  return safeEqual(provided, signature(`${expiration}.${nonce}`));
}
