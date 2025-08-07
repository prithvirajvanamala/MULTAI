// lib/fetchBlogs.ts
import { supabase } from './supabaseClient';

export async function fetchBlogs({ page = 1, pageSize = 6, category, tag, author }: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  author?: string;
}) {
  let query = supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (category) query = query.eq('category', category);
  if (author) query = query.eq('author', author);
  if (tag) query = query.contains('tags', [tag]);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}
