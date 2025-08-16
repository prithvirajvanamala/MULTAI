// src/components/blog/BlogCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Blog } from "@/types/blog";

export function BlogCard({ post }: { post: Blog }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
    >
      {post.cover_url ? (
        <Link href={`/blog/${post.slug}`}>
          <img
            src={post.cover_url}
            alt={post.title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        </Link>
      ) : null}

      <div className="p-5">
        <time className="text-xs text-gray-500">
          {new Date(post.published_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </time>
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-700 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {(post.tags || []).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] text-gray-700"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
