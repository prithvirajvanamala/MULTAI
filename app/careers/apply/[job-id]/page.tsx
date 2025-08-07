'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import emailjs from '@emailjs/browser';

export default function JobApplyForm() {
  const { 'job-id': jobId } = useParams();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', resume: null as File | null });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files) {
      setForm((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.resume || !form.resume.name.endsWith('.pdf')) {
      alert('Resume must be a PDF file.');
      return;
    }

    setSubmitting(true);
    setStatus('Uploading resume...');

    try {
      // 1. Upload resume to Supabase Storage
      const fileName = `${Date.now()}-${form.resume.name}`;
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, form.resume, {
          contentType: 'application/pdf',
        });

      if (uploadError) throw new Error('Resume upload failed.');

      // 2. Insert application into Supabase table
      setStatus('Saving application...');
      const { error: insertError } = await supabase.from('job_applications').insert({
        job_id: jobId,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        resume_url: fileName,
      });

      if (insertError) throw new Error('Error saving application data.');

      // 3. Send confirmation via EmailJS
      setStatus('Sending confirmation email...');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_job!,
        {
          job_id: jobId,
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          resume: fileName,
          to_email: form.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('✅ Application submitted successfully!');
      setForm({ name: '', email: '', mobile: '', resume: null });
    } catch (error: any) {
      console.error(error);
      setStatus('❌ ' + (error.message || 'Something went wrong.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Apply for Job <span className="text-blue-600">#{jobId}</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          required
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile (+1...)"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          required
          name="resume"
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>

        {status && (
          <p className={`text-center text-sm ${status.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
