// src/app/careers/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase, Building2, Clock, X, UploadCloud } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { daysAgo, toCurrency } from "@/utils/format";
import type { Job as BaseJob } from "@/types/job";

type Job = BaseJob & { requirements?: string | null };
const API_PATH = "/api/submit-application";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Apply modal state
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyStage, setApplyStage] = useState<"idle" | "uploading" | "submitting">("idle");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb) {
      setLoading(false);
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await sb
        .from("jobs")
        .select(
          "id,title,department,location,work_mode,type,experience,salary_from,salary_to,currency,tags,posted_at,description,requirements"
        )
        .eq("id", id)
        .maybeSingle();

      if (error) setError(error.message);
      setJob((data as Job) || null);
      setLoading(false);
    })();
  }, [id]);

  const salaryText = useMemo(() => {
    if (!job) return "";
    const cur = job.currency || "GBP";
    const from = job.salary_from ? toCurrency(job.salary_from, cur) : "—";
    const to = job.salary_to ? toCurrency(job.salary_to, cur) : "—";
    if (!job.salary_from && !job.salary_to) return "Competitive";
    return `${from} – ${to} • per year`;
  }, [job]);

  const fileHint = useMemo(() => {
    if (!resumeFile) return "Upload or drag a PDF";
    const mb = (resumeFile.size / (1024 * 1024)).toFixed(1);
    return `${resumeFile.name} • ${mb}MB`;
  }, [resumeFile]);

  function validateFile(file: File | null) {
    if (!file) throw new Error("Please attach your resume (PDF).");
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!isPdf) throw new Error("Resume must be a PDF (.pdf).");
    if (file.size > 10 * 1024 * 1024) throw new Error("Resume must be under 10MB.");
  }

  async function handleApply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!job) return;

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
      if (!name) throw new Error("Please enter your full name.");
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Please enter a valid email.");
      validateFile(resumeFile);

      // 1) Upload resume
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

      // 2) Call our Next API proxy → Edge Function
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

      let payload: any = {};
      try {
        payload = await res.json();
      } catch {
        /* non-JSON */
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

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-600">Loading…</div>
      </section>
    );
  }

  if (error || !job) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
          {error || "Job not found."}
        </div>
        <button
          onClick={() => router.push("/careers")}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <button
            onClick={() => router.push("/careers")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{job.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              {job.department && (
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-4 w-4" /> {job.department}
                </span>
              )}
              {(job.type || job.work_mode) && (
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {job.type ?? "—"} • {job.work_mode ?? "—"}
                </span>
              )}
              {job.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {job.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> {daysAgo(job.posted_at)}
              </span>
            </div>
            <div className="mt-3 text-sm font-semibold text-gray-900">{salaryText}</div>

            <div className="mt-6 flex flex-wrap gap-2">
              {(job.tags ?? []).map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setApplyOpen(true);
                setApplyError(null);
                setApplySuccess(null);
              }}
              className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
            >
              Apply now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <article className="prose prose-gray max-w-none">
          <h2>About the role</h2>
          {job.description && <p className="text-gray-700">{job.description}</p>}

          {job.requirements ? (
            <>
              <h3>Requirements</h3>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800">
                {job.requirements}
              </pre>
            </>
          ) : null}
        </article>

        <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Ready to apply?</h3>
          <p className="mt-1 text-sm text-gray-600">Submit directly here. Your application will be attached to this role.</p>
          <button
            onClick={() => {
              setApplyOpen(true);
              setApplyError(null);
              setApplySuccess(null);
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
          >
            Apply now
          </button>
        </aside>
      </div>

      {/* Apply Modal */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Apply for</div>
                <div className="font-semibold text-gray-900">{job.title}</div>
              </div>
              <button onClick={() => setApplyOpen(false)} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
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
                <Input name="name" label="Full name" autoComplete="name" required />
                <Input name="email" type="email" label="Email" autoComplete="email" required />
              </div>
              <Input name="linkedin" label="LinkedIn (optional)" placeholder="https://linkedin.com/in/..." />
              <Input name="portfolio" label="Portfolio (optional)" placeholder="https://..." />
              <Textarea name="cover_letter" label="Cover letter (optional)" rows={4} />

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
                  onClick={() => setApplyOpen(false)}
                  disabled={applyLoading}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
                >
                  {applyLoading ? (applyStage === "uploading" ? "Uploading…" : "Submitting…") : "Submit application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

/* Reusable inputs */
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
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

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
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
