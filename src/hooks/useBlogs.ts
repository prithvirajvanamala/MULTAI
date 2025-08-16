// src/hooks/useBlogs.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { Blog } from "@/types/blog";

const TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_BLOGS_TABLE || "blog_posts";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) {
      setLoading(false);
      setError(
        "Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);

      // Select only the columns we need for the list
      const { data, error } = await sb
        .from(TABLE)
        .select("id,title,slug,excerpt,cover_url,tags,published_at")
        .order("published_at", { ascending: false });

      if (error) {
        setError(error.message);
        setBlogs([]);
      } else {
        setBlogs((data ?? []) as Blog[]);
      }
      setLoading(false);
    })();
  }, []);

  const allTags = useMemo(() => {
    const t = new Set<string>();
    blogs.forEach((b) => (b.tags || []).forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, [blogs]);

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesQ =
        !qlc ||
        b.title.toLowerCase().includes(qlc) ||
        (b.excerpt || "").toLowerCase().includes(qlc) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(qlc));
      const matchesTag = !tag || (b.tags || []).includes(tag);
      return matchesQ && matchesTag;
    });
  }, [blogs, q, tag]);

  return {
    blogs,
    loading,
    error,
    q,
    setQ,
    tag,
    setTag,
    allTags,
    filtered,
  };
}
