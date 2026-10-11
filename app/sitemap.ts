import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/courses", "/learning", "/reviews", "/faq", "/contact", "/privacy"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/reviews" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/courses" ? 0.9 : 0.7,
  }));
}
