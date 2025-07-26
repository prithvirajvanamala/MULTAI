// app/newsletter/page.tsx
/*'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsletterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Insert into Supabase
      const { error } = await supabase.from('newsletter_subscribers').insert([{ name, email }]);
      if (error) throw error;

      // Send EmailJS notification
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setMessage('✅ Thank you for subscribing!');
      setName('');
      setEmail('');
    } catch (err: any) {
      setMessage('❌ Subscription failed. ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Your Name"
          className="w-full p-2 border rounded dark:bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="Your Email"
          className="w-full p-2 border rounded dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
*/