// src/app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { Blog } from "@/types/blog";

const TABLE = process.env.NEXT_PUBLIC_SUPABASE_BLOGS_TABLE || "blog_posts";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray((params as any)?.slug)
      ? (params as any).slug[0]
      : "";

  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) {
      setLoading(false);
      setErr("Supabase not configured.");
      return;
    }

    (async () => {
      setLoading(true);
      setErr(null);
      const { data, error } = await sb
        .from(TABLE)
        .select(
          "id,title,slug,excerpt,cover_url,tags,published_at,content"
        )
        .eq("slug", slug)
        .maybeSingle();

      if (error) setErr(error.message);
      setPost((data as Blog) || null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-600">
          Loading…
        </div>
      </section>
    );
  }

  if (err || !post) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
          {err || "Post not found."}
        </div>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6"
          >
            <time className="text-xs text-gray-500">
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </time>

            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              {post.title}
            </h1>

            {post.cover_url ? (
              <img
                src={post.cover_url}
                alt={post.title}
                className="mt-6 w-full rounded-2xl border border-gray-200"
                loading="lazy"
              />
            ) : null}

            <div className="mt-6 prose prose-gray max-w-none">
              {/* If your content is markdown/HTML, render accordingly.
                  For now we treat it as plain text (preserving newlines). */}
              {post.content ? (
                <pre className="whitespace-pre-wrap font-sans text-gray-800">
                  {post.content}
                </pre>
              ) : (
                <p className="text-gray-700">{post.excerpt}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
