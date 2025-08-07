'use client';

import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/lib/fetchBlogs';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const load = async () => {
    const data = await fetchBlogs({ page });
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="block border rounded shadow hover:shadow-lg transition">
            <img src={blog.thumbnail_url} alt={blog.title} className="w-full h-40 object-cover rounded-t" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600">{new Date(blog.created_at).toLocaleDateString()}</p>
              <p className="text-xs mt-2 text-blue-500">{blog.category}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-4 py-2 border rounded">Previous</button>
        <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 border rounded">Next</button>
      </div>
    </div>
  );
}
