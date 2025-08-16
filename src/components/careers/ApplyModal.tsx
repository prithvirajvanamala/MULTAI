// src/components/careers/ApplyModal.tsx
"use client";

import { useState, type FormEvent, useMemo } from "react";
import { X, UploadCloud } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { Job } from "@/types/job";

const API_PATH = "/api/submit-application";

export function ApplyModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyStage, setApplyStage] = useState<"idle" | "uploading" | "submitting">("idle");
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  const fileHint = useMemo(() => {
    if (!resumeFile) return "Upload or drag a PDF";
    const mb = (resumeFile.size / (1024 * 1024)).toFixed(1);
    return `${resumeFile.name} • ${mb}MB`;
  }, [resumeFile]);

  function validateFile(file: File | null) {
    if (!file) throw new Error("Please attach your resume (PDF).");
    // allow both mime check and extension fallback (some browsers misreport)
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!isPdf) throw new Error("Resume must be a PDF (.pdf).");
    if (file.size > 10 * 1024 * 1024) throw new Error("Resume must be under 10MB.");
  }

  async function handleApply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const sb = getSupabaseClient();
    if (!sb) {
      setApplyError("Supabase client not available.");
      return;
    }

    setApplyLoading(true);
    setApplyStage("idle");
    setApplyError(null);
    setApplySuccess(null);

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const linkedin = String(fd.get("linkedin") || "").trim();
    const portfolio = String(fd.get("portfolio") || "").trim();
    const cover_letter = String(fd.get("cover_letter") || "").trim();

    try {
      // basic client-side check to avoid 400s
      if (!name) throw new Error("Please enter your full name.");
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Please enter a valid email.");
      validateFile(resumeFile);

      // 1) Upload resume to Supabase Storage
      setApplyStage("uploading");
      const pathSafeName = resumeFile!.name.replace(/[^\w.\-]/g, "_");
      const path = `${job.id}/${Date.now()}_${pathSafeName}`;

      const { data: up, error: upErr } = await sb.storage
        .from("resumes")
        .upload(path, resumeFile!, { cacheControl: "3600", upsert: false });
      if (upErr) throw new Error(`Resume upload failed: ${upErr.message}`);

      const { data: pub } = sb.storage.from("resumes").getPublicUrl(up.path);
      const resume_url = pub?.publicUrl;
      if (!resume_url) throw new Error("Could not get public URL for resume.");

      // 2) Call our Next.js API route (proxy → Edge Function)
      setApplyStage("submitting");
      const res = await fetch(API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: job.id,
          job_title: job.title,
          name,
          email,
          linkedin: linkedin || null,
          portfolio: portfolio || null,
          cover_letter: cover_letter || null,
          resume_url,
        }),
      });

      // Try to parse JSON, but don't crash if it's non-JSON
      let payload: any = {};
      try {
        payload = await res.json();
      } catch {
        /* ignore non-JSON */
      }

      if (res.status === 404) {
        throw new Error(
          "Submit API route not found. Ensure file exists at app/api/submit-application/route.ts (or pages/api/submit-application.ts) and restart the dev server."
        );
      }
      if (!res.ok || payload?.error) {
        const msg = payload?.error || `Submit failed (${res.status})`;
        throw new Error(msg);
      }

      setApplySuccess("Application submitted! We’ll be in touch.");
      setResumeFile(null);
      form.reset();
    } catch (err: any) {
      setApplyError(err?.message || "Something went wrong while applying.");
    } finally {
      setApplyLoading(false);
      setApplyStage("idle");
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">Apply for</div>
            <div className="font-semibold text-gray-900">{job.title}</div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleApply} aria-busy={applyLoading} className="p-4 space-y-3">
          {applyError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert" aria-live="assertive">
              {applyError}
            </div>
          )}
          {applySuccess && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status" aria-live="polite">
              {applySuccess}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <LabeledInput name="name" label="Full name" autoComplete="name" required />
            <LabeledInput name="email" type="email" label="Email" autoComplete="email" required />
          </div>
          <LabeledInput name="linkedin" label="LinkedIn (optional)" placeholder="https://linkedin.com/in/..." />
          <LabeledInput name="portfolio" label="Portfolio (optional)" placeholder="https://..." />
          <LabeledTextarea name="cover_letter" label="Cover letter (optional)" rows={4} />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-900">Resume (PDF)</label>
            <label className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-3 text-sm hover:bg-gray-50 cursor-pointer">
              <UploadCloud className="h-4 w-4" />
              <span className="text-gray-700">{fileHint}</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500">Max 10MB. PDF only.</p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={applyLoading}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={applyLoading}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
            >
              {applyLoading ? (applyStage === "uploading" ? "Uploading…" : "Submitting…") : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LabeledInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="space-y-1 text-sm">
      <span className="font-medium text-gray-900">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function LabeledTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="space-y-1 text-sm block">
      <span className="font-medium text-gray-900">{label}</span>
      <textarea
        {...rest}
        className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
