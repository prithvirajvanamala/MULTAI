// app/sitemap.ts
import { createClient } from "@supabase/supabase-js";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.multai.co.uk";
  const now = new Date().toISOString();

  // 1. Static routes with custom priority & changefreq
  const staticRoutes = [
    { path: "/", lastMod: now, changefreq: "daily", priority: 1.0 },
    { path: "/about", lastMod: now, changefreq: "weekly", priority: 0.8 },
    { path: "/careers", lastMod: now, changefreq: "weekly", priority: 0.8 },
    { path: "/contact", lastMod: now, changefreq: "weekly", priority: 0.8 },
    { path: "/services", lastMod: now, changefreq: "daily", priority: 0.9 },
    { path: "/privacy", lastMod: now, changefreq: "monthly", priority: 0.3 },
    { path: "/terms", lastMod: now, changefreq: "monthly", priority: 0.3 },
    { path: "/sitemap", lastMod: now, changefreq: "weekly", priority: 0.5 }
  ];

  // 2. Dynamic service pages from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: services } = await supabase
    .from("services")
    .select("slug, updated_at");

  const serviceRoutes = (services || []).map((s) => ({
    path: `/services/${s.slug}`,
    lastMod: s.updated_at ?? now,
    changefreq: "weekly",
    priority: 0.9
  }));

  // 3. (Optional) Dynamic blog pages from Supabase
  // Uncomment if you have a `posts` table with `slug` & `updated_at`
  
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at");

  const blogRoutes = (posts || []).map((p) => ({
    path: `/blog/${p.slug}`,
    lastMod: p.updated_at ?? now,
    changefreq: "weekly",
    priority: 0.7
  }));
  

  // 4. Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    // ...blogRoutes
  ];

  // 5. Return in Next.js Sitemap format
  return allRoutes.map(({ path, lastMod, changefreq, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: lastMod,
    changeFrequency: "daily", priority: 1,
  }));
}
