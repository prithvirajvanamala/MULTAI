// src/app/api/submit-application/route.ts
import { NextResponse } from "next/server";
import nodemailer, { Transporter } from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  job_id: string;
  name: string;
  email: string;

  // optional extras we IGNORE for DB (not in schema) but can use in emails if you want
  job_title?: string;
  cover_letter?: string | null;

  // table has "mobile"
  mobile?: string | null;     // preferred key
  phone?: string | null;      // will map to mobile if provided

  // Option A (client already uploaded):
  resume_url?: string;

  // Option B (server upload):
  resume_base64?: string; // base64, with or without data:*;base64, prefix
  resume_name?: string;   // e.g., "cv.pdf"
};

/* ---------------- SMTP ---------------- */

let cachedTransporter: Transporter | null = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const SMTP_HOST = mustEnv("SMTP_HOST");
  const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
  const SMTP_SECURE = (process.env.SMTP_SECURE ?? "false") === "true"; // 465 -> true
  const SMTP_USER =
    process.env.SMTP_USER_carrers ??
    process.env.SMTP_USER_careers ??
    process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP_USER(_carrers) or SMTP_PASS missing");
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

/* --------------- Route --------------- */

export async function GET() {
  return NextResponse.json({ ok: true, via: "next-mail+db+storage" });
}

export async function POST(req: Request) {
  try {
    const b = (await req.json()) as Partial<Payload>;
    const missing = ["job_id", "name", "email"].filter((k) => !b?.[k as keyof Payload]);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: `Missing: ${missing.join(", ")}` }, { status: 400 });
    }

    /* 1) Ensure resume is in Storage (resumes bucket) */
    let resumeUrl = (b.resume_url || "").trim();
    if (!resumeUrl) {
      if (!b.resume_base64 || !b.resume_name) {
        return NextResponse.json(
          { ok: false, error: "Missing resume. Provide resume_url OR (resume_base64 + resume_name)." },
          { status: 400 }
        );
      }
      const { bytes, safeName } = decodeBase64File(b.resume_base64, String(b.resume_name));
      const path = `${b.job_id}/${Date.now()}_${safeName}`;

      const supaUrl = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
      const anon = mustEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      const service = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
      const bucket = process.env.SUPABASE_RESUMES_BUCKET || "resumes";

      const upload = await fetch(
        `${supaUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${encodeURIComponent(path)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-upsert": "false",
            apikey: anon,
            Authorization: `Bearer ${service}`,
            "Cache-Control": "public, max-age=3600",
          },
          body: bytes,
        }
      );

      if (!upload.ok) {
        const t = await safeText(upload);
        return NextResponse.json(
          { ok: false, error: `Resume upload failed (${upload.status})`, details: t || "(no details)" },
          { status: 500 }
        );
      }

      // assumes public bucket
      resumeUrl = toPublicUrl(supaUrl, bucket, path);
    }

    /* 2) Insert into DB: public.job_applications */
    const supaUrl = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
    const service = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
    const anon = mustEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

    const schema = process.env.SUPABASE_SCHEMA || "public";
    const table = process.env.SUPABASE_TABLE || "job_applications";

    // map only columns that exist in your table
    const insertBody = {
      job_id: b.job_id,
      name: b.name,
      email: b.email,
      mobile: b.mobile ?? b.phone ?? null,
      resume_url: resumeUrl,
    };

    const r = await fetch(`${supaUrl}/rest/v1/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anon,
        Authorization: `Bearer ${service}`,
        Prefer: "return=representation",
        ...(schema !== "public" ? { "Content-Profile": schema } : {}),
      },
      body: JSON.stringify(insertBody),
    });

    const bodyText = await r.text().catch(() => "");
    let inserted: any = null;
    try {
      inserted = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      /* keep raw text */
    }

    if (!r.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `DB insert failed (${r.status})`,
          details: typeof inserted === "string" ? inserted : inserted?.message ?? inserted,
        },
        { status: 500 }
      );
    }

    /* 3) Emails */
    const EMAIL_FROM =
      process.env.EMAIL_FROM_carrers ??
      process.env.EMAIL_FROM_careers ??
      process.env.EMAIL_FROM;
    const EMAIL_TO =
      process.env.EMAIL_TO_carrers ??
      process.env.EMAIL_TO_careers ??
      process.env.EMAIL_TO;
    if (!EMAIL_FROM || !EMAIL_TO) {
      return NextResponse.json(
        { ok: false, error: "Email env missing. Set EMAIL_FROM(_carrers) & EMAIL_TO(_carrers)" },
        { status: 500 }
      );
    }

    const transporter = getTransporter();

    // Internal
    const subject = `New application: ${b.job_title ?? b.job_id} — ${b.name}`;
    const text = [
      `Job: ${b.job_title ?? b.job_id}`,
      `Name: ${b.name}`,
      `Email: ${b.email}`,
      insertBody.mobile ? `Mobile: ${insertBody.mobile}` : "",
      `Resume: ${resumeUrl}`,
      "",
      "Cover letter:",
      b.cover_letter || "(none)",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <h2>New Job Application</h2>
      <p><strong>Job:</strong> ${escapeHtml(String(b.job_title ?? b.job_id))}</p>
      <p><strong>Name:</strong> ${escapeHtml(String(b.name))}</p>
      <p><strong>Email:</strong> ${escapeHtml(String(b.email))}</p>
      ${insertBody.mobile ? `<p><strong>Mobile:</strong> ${escapeHtml(String(insertBody.mobile))}</p>` : ""}
      <p><strong>Resume:</strong> <a href="${escapeAttr(String(resumeUrl))}">Download</a></p>
      <p><strong>Cover letter:</strong></p>
      <pre style="white-space:pre-wrap;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica Neue;">${escapeHtml(String(b.cover_letter || "(none)"))}</pre>
    `;

    const attach = (process.env.ATTACH_RESUME ?? "false") === "true";
    const attachments =
      attach && resumeUrl ? [{ filename: guessFilename(String(resumeUrl)) ?? "resume.pdf", path: String(resumeUrl) }] : [];

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject,
      text,
      html,
      replyTo: b.email || undefined,
      attachments,
    });

    // Applicant confirmation (non-fatal if it fails)
    const SEND_APPLICANT = (process.env.SEND_APPLICANT_CONFIRMATION ?? "true") === "true";
    if (SEND_APPLICANT && b.email) {
      const company = process.env.COMPANY_NAME ?? extractDisplayName(EMAIL_FROM) ?? "MULTAI";
      const subj2 =
        process.env.APPLICANT_SUBJECT ?? `Thanks for applying${b.job_title ? ` for ${b.job_title}` : ""} — ${company}`;
      const text2 = [
        `Hi ${b.name},`,
        "",
        `Thanks for applying${b.job_title ? ` for ${b.job_title}` : ""}. We’ve received your application and will review it shortly.`,
        "",
        `If we’re a match, we’ll reach out at ${b.email}.`,
        "",
        `— ${company} Careers`,
      ].join("\n");

      const html2 = `
        <p>Hi ${escapeHtml(String(b.name))},</p>
        <p>Thanks for applying${b.job_title ? ` for <strong>${escapeHtml(String(b.job_title))}</strong>` : ""}. We’ve received your application and will review it shortly.</p>
        <p>If we’re a match, we’ll reach out at <strong>${escapeHtml(String(b.email))}</strong>.</p>
        <p>— ${escapeHtml(company)} Careers</p>
      `;

      try {
        await transporter.sendMail({
          from: EMAIL_FROM,
          to: String(b.email),
          subject: subj2,
          text: text2,
          html: html2,
        });
      } catch (e) {
        console.warn("Applicant confirmation failed (non-fatal):", e);
      }
    }

    return NextResponse.json({ ok: true, inserted, resume_url: resumeUrl });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
  }
}

/* ------------- helpers ------------- */

function mustEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function toPublicUrl(baseUrl: string, bucket: string, path: string) {
  return `${baseUrl.replace(/\/$/, "")}/storage/v1/object/public/${encodeURIComponent(bucket)}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

function decodeBase64File(b64: string, filename: string) {
  const cleaned = b64.replace(/^data:.*;base64,/, "");
  const bytes = Buffer.from(cleaned, "base64");
  const safeName = filename.replace(/[^\w.\-]/g, "_");
  return { bytes, safeName };
}

async function safeText(r: Response) {
  try { return await r.text(); } catch { return ""; }
}

function guessFilename(url: string) {
  try {
    const u = new URL(url);
    const last = decodeURIComponent(u.pathname.split("/").pop() || "");
    return last || null;
  } catch { return null; }
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]!));
}
function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;");
}
function extractDisplayName(from: string): string | null {
  const m = from.match(/^\s*"?([^"<]+?)"?\s*<[^>]+>\s*$/);
  return m?.[1]?.trim() || null;
}
