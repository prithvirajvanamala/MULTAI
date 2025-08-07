import { supabase } from './supabase/client';

export async function fetchBlogs(category?: string) {
let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });
if (category) query = query.eq('category', category);
const { data, error } = await query;
if (error) throw new Error(error.message);
return data;
}

export async function fetchBlogBySlug(slug: string) {
const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
if (error) throw new Error(error.message);
return data;
}