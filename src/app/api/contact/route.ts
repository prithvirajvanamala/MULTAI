// src/app/api/contact/route.ts
export const runtime = "nodejs"; // Nodemailer needs Node runtime

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getServerSupabase } from "../../../lib/supabaseServer"; // remove if you don't use Supabase

// ---------- ENV ----------
const SMTP_HOST = process.env.SMTP_HOST || "smtp.livemail.co.uk"; // Fasthosts SMTP
const SMTP_PORT = Number(process.env.SMTP_PORT || 587); // 587 = STARTTLS (recommended). Use 465 for implicit TLS if you prefer.
const SMTP_USER = process.env.SMTP_USER || "contact@multai.co.uk";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_FROM_CONF = process.env.EMAIL_FROM || `MULTAI <${SMTP_USER}>`; // pretty From header
const EMAIL_TO = process.env.EMAIL_TO || "contact@multai.co.uk";           // owner inbox

// Normalized "MAIL FROM" envelope address (must be the mailbox)
const EMAIL_FROM_MAILBOX = EMAIL_FROM_CONF.replace(/^.*<(.*)>.*$/, "$1");
const EMAIL_FROM_DISPLAY = EMAIL_FROM_CONF;

// ---------- Helpers ----------
function buildTransport(port: number, secure: boolean) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,                          // 465 => true (implicit TLS), 587 => false (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    authMethod: "LOGIN",
    requireTLS: !secure,             // require STARTTLS on 587
    tls: { minVersion: "TLSv1.2", servername: SMTP_HOST },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    logger: true,                    // useful server-side logs
    debug: true,
  });
}

async function verifyOrFallback(tx: nodemailer.Transporter) {
  try {
    await tx.verify();
    return tx;
  } catch {
    const fallback = buildTransport(587, false);
    await fallback.verify();
    return fallback;
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ownerHtml(opts: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const { name, email, phone, subject, message } = opts;
  return [
    '<div style="font-family:Arial,sans-serif;color:#111827">',
    '<h2 style="color:#2563eb;margin:0 0 8px">New Contact Message</h2>',
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
    `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
    "<p><strong>Message:</strong></p>",
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    '<hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb"/>',
    '<p style="font-size:12px;color:#6b7280">Sent from MULTAI contact form.</p>',
    "</div>",
  ].join("");
}

// keep the receipt plain-text first for better deliverability to Gmail
function receiptText(opts: { name: string; subject: string }) {
  const { name, subject } = opts;
  return [
    `Hi ${name},`,
    `We’ve received your message about "${subject}". Our team will get back to you shortly.`,
    ``,
    `If you need to add anything, just reply to this email.`,
    ``,
    `— The MULTAI Team`,
  ].join("\n");
}

// ---------- Main handler ----------
export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // basic validation (now includes phone)
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields." },
        { status: 400 }
      );
    }

    // 1) Save to Supabase (best-effort; non-fatal if not configured)
    try {
      const sb = getServerSupabase();
      if (sb) {
        const { error } = await sb
          .from("contact_messages")
          .insert({ name, email, phone, subject, message }); // <-- phone included
        if (error) console.error("Supabase insert failed:", error.message);
      } else {
        console.warn("Supabase not configured. Skipping DB insert.");
      }
    } catch (e) {
      console.error("Supabase error:", e);
    }

    // If SMTP not configured, succeed without sending (but DB is saved above)
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.warn("SMTP not configured. Skipping email sends.");
      return NextResponse.json({ ok: true, note: "Saved (if SB). Email skipped." });
    }

    // 2) OWNER NOTIFICATION
    {
      const primary = buildTransport(SMTP_PORT, SMTP_PORT === 465);
      const tx = await verifyOrFallback(primary);

      const info = await tx.sendMail({
        from: EMAIL_FROM_DISPLAY,
        to: EMAIL_TO,
        replyTo: email, // reply to sender
        subject: `Contact: ${subject} — ${name} (${phone})`, // <-- include phone in subject
        html: ownerHtml({ name, email, phone, subject, message }),
        envelope: {
          from: EMAIL_FROM_MAILBOX,
          to: EMAIL_TO,
        },
      });

      console.log("Owner mail:", {
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
        messageId: info.messageId,
      });
    }

    await wait(2000);

    // 3) SENDER AUTO-REPLY (plain text)
    {
      const primary = buildTransport(SMTP_PORT, SMTP_PORT === 465);
      const tx = await verifyOrFallback(primary);

      const subjectClean = "We received your message - MULTAI";
      const text = receiptText({ name, subject });

      const info = await tx.sendMail({
        from: EMAIL_FROM_DISPLAY,
        to: email,
        replyTo: EMAIL_TO,
        subject: subjectClean,
        text,
        envelope: {
          from: EMAIL_FROM_MAILBOX,
          to: email,
        },
      });

      console.log("Receipt mail:", {
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
        messageId: info.messageId,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
