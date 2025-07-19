import supabase from '@/lib/supabase';

export default async function BlogList() {
  const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-6">
      <h1>All Blogs</h1>
      <ul>
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <a href={`/blog/${blog.slug}`}>{blog.title}</a> — {blog.updated_at?.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  );
}
