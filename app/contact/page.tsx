'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // ✅ Send email via EmailJS
      await emailjs.send(
        'service_n9sc3wy',      // replace with your Service ID
        'template_x6zsyer', 
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        '3mHVu1l_wM8lKIjcn'
      );

      // ✅ Save to Supabase via internal API
      const dbRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const dbResult = await dbRes.json();
      if (!dbRes.ok) throw new Error(dbResult.message);

      setStatus('Message sent & saved successfully!');
    } catch (error: any) {
      console.error(error);
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <section>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <button type="submit">Send</button>
        {status && <p>{status}</p>}
      </form>
    </section>
  );
}
