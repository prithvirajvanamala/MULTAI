import { NextResponse } from "next/server";

type Blog = {
  id: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  created_at?: string;
  cover?: string;
};

// TODO: replace MOCK with your DB (Supabase, etc.)
const MOCK: Blog[] = [
  { id: "1", title: "Hello World", tags: ["news"], created_at: "2025-08-10" },
  { id: "2", title: "Tips & Tricks", tags: ["tips","react"], created_at: "2025-08-12" },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const tag = (url.searchParams.get("tag") || "").toLowerCase();

  let rows = MOCK;

  if (q) {
    rows = rows.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.excerpt || "").toLowerCase().includes(q) ||
      (r.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }
  if (tag) rows = rows.filter(r => (r.tags || []).some(t => t.toLowerCase() === tag));

  return NextResponse.json({ blogs: rows });
}
