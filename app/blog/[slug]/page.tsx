import supabase from '@/lib/supabase';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { data: blog } = await supabase.from('blogs').select('*').eq('slug', params.slug).single();

  return (
    <article className="p-6">
      <h1>{blog.title}</h1>
      <p>{blog.summary}</p>
      <div>{blog.content}</div>
      <p>Last updated: {blog.updated_at?.slice(0, 10)}</p>
    </article>
  );
}
