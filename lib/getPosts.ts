import supabase from './supabase';

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
