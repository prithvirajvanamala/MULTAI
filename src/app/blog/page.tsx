// src/app/blog/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, X, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { useBlogs } from "@/hooks/useBlogs";

const PER_PAGE = 9; // 3 x 3

export default function BlogIndexPage() {
  const b = useBlogs();

  // pagination state
  const [page, setPage] = useState(1);

  // reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [b.q, b.tag]);

  const total = b.filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  // clamp page if data shrinks
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const start = (page - 1) * PER_PAGE;
  const visible = useMemo(() => b.filtered.slice(start, start + PER_PAGE), [b.filtered, start]);

  // counts per tag (for nicer pills)
  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    b.blogs.forEach((p) => (p.tags || []).forEach((t) => m.set(t, (m.get(t) || 0) + 1)));
    return m;
  }, [b.blogs]);

  const toggleTag = (t: string) => b.setTag(b.tag === t ? null : t);
  const clearFilters = () => {
    b.setQ("");
    b.setTag(null);
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl">
              Insights, updates, and stories from the team.
            </p>
          </motion.div>

          {/* Filters: Search (full width) + Tags (wrap) */}
          <div className="mt-8 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={b.q}
                onChange={(e) => b.setQ(e.target.value)}
                placeholder="Search posts, topics, tags…"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => b.setTag(null)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                  b.tag === null
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                ].join(" ")}
              >
                <Tag className="h-4 w-4" /> All
              </button>

              {b.allTags.map((t) => {
                const active = b.tag === t;
                const count = tagCounts.get(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
                    ].join(" ")}
                    title={active ? `Remove #${t}` : `Filter by #${t}`}
                  >
                    #{t}
                    {typeof count === "number" ? (
                      <span
                        className={[
                          "ml-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[11px]",
                          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              {(b.q || b.tag) && (
                <button
                  onClick={clearFilters}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  title="Clear filters"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {b.loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
            Loading posts…
          </div>
        ) : b.error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
            {b.error}
          </div>
        ) : total === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
            No posts found. Try another search or tag.
          </div>
        ) : (
          <>
            {/* results grid: 3 columns on lg, 9 per page total */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* footer: range + pagination */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(start + 1, total)}–{Math.min(start + PER_PAGE, total)}
                </span>{" "}
                of <span className="font-semibold text-gray-900">{total}</span>
              </p>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                onGoto={(n) => setPage(n)}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------- Pagination component ---------------- */

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onGoto,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (n: number) => void;
}) {
  // build compact page list (1 … neighbors … last)
  const pages = useMemo(() => {
    const arr: (number | "...")[] = [];
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
      return arr;
    }
    const add = (n: number) => arr.push(n);
    const addDots = () => arr.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    add(1);
    if (start > 2) addDots();
    for (let i = start; i <= end; i++) add(i);
    if (end < totalPages - 1) addDots();
    add(totalPages);
    return arr;
  }, [page, totalPages]);

  const btnBase =
    "inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm";
  const btnInactive = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
  const btnActive = "bg-blue-600 text-white border-blue-600";
  const btnDisabled = "opacity-50 pointer-events-none";

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button
        onClick={onPrev}
        className={[btnBase, btnInactive, page === 1 ? btnDisabled : ""].join(" ")}
        aria-disabled={page === 1}
        title="Previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onGoto(p)}
            className={[btnBase, p === page ? btnActive : btnInactive].join(" ")}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={onNext}
        className={[
          btnBase,
          btnInactive,
          page === totalPages ? btnDisabled : "",
        ].join(" ")}
        aria-disabled={page === totalPages}
        title="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
