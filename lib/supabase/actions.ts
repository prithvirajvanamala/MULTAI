import { supabase } from './client';

export async function createBlog(formData: {
  title: string;
  slug: string;
  category: string;
  content: string;
  thumbnail: string;
}) {
  const { data, error } = await supabase
    .from('blogs')
    .insert([formData]);

  if (error) {
    throw error;
  }
  return data;
}