import { supabase } from '@/lib/supabaseClient';

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const { data: blogs } = await supabase.from('blogs').select('*').eq('slug', params.slug).limit(1);
  const blog = blogs?.[0];

  if (!blog) return <div className="p-10 text-center text-gray-600">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img src={blog.thumbnail_url} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(blog.created_at).toLocaleDateString()} · By {blog.author}</p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
