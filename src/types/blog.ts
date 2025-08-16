// src/types/blog.ts
export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  tags: string[] | null;
  published_at: string; // ISO
  content?: string | null; // used on detail
};
