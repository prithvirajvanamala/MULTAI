'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // ✅ 1. Send email via EmailJS
      await emailjs.send(
        'service_n9sc3wy',
        'template_x6zsyer',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          phone: form.phone,
        },
        '3mHVu1l_wM8lKIjcn'
      );

      // ✅ 2. Store in DB via /api/contact
      const dbRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let dbData = null;
      try {
        dbData = await dbRes.json();
      } catch {
        throw new Error('Could not parse DB response');
      }

      if (!dbRes.ok) throw new Error(dbData?.error || 'DB Error');

      setStatus('✅ Message sent & stored!');
      setForm({ name: '', email: '', message: '', phone: '' }); // Reset form
    } catch (error: any) {
      console.error('❌ Error:', error);
      setStatus('❌ ' + error.message);
    }
  };

  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded min-h-[100px]"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Send
        </button>
        {status && (
          <p className="text-center mt-4 text-sm font-medium">
            {status.startsWith('✅') ? (
              <span className="text-green-600">{status}</span>
            ) : (
              <span className="text-red-600">{status}</span>
            )}
          </p>
        )}
      </form>
    </section>
  );
}
