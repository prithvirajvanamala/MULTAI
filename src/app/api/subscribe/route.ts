export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Reuse your SMTP envs from contact route
const SMTP_HOST = process.env.SMTP_HOST || "smtp.livemail.co.uk";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || "contact@multai.co.uk";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_FROM = process.env.EMAIL_FROM || `MULTAI <${SMTP_USER}>`;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.multai.co.uk";

function tx() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    requireTLS: SMTP_PORT === 587,
    tls: { minVersion: "TLSv1.2", servername: SMTP_HOST },
  });
}

export async function POST(req: Request) {
  try {
    const { email, name, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    // Generate token for double opt-in
    const token = crypto.randomBytes(24).toString("hex");

    // Upsert by email: keep existing verified state if already verified
    const { data, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          token,
          source: source || "footer",
          user_agent: req.headers.get("user-agent") || null,
          ip: req.headers.get("x-forwarded-for") || null,
          // do not set verified here; wait for confirm
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (error) {
      // If unique violation or similar, still send confirm if not verified
      // Otherwise bubble up
      console.error(error);
    }

    // If already verified, just return success (idempotent UX)
    if (data?.verified) {
      return NextResponse.json({ ok: true, message: "You're already subscribed. Thank you!" });
    }

    if (!SMTP_PASS) {
      console.warn("SMTP not configured; skipping confirmation email.");
      return NextResponse.json({ ok: true, message: "Subscription saved. (Email not sent in this environment.)" });
    }

    const confirmUrl = `${BASE_URL}/api/subscribe/confirm?token=${encodeURIComponent(token)}`;

    await tx().sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: "Confirm your subscription — MULTAI",
      text: [
        `Hi${name ? " " + name : ""},`,
        ``,
        `Please confirm your subscription to MULTAI updates by clicking the link below:`,
        confirmUrl,
        ``,
        `If you didn’t request this, please ignore this email.`,
        ``,
        `— MULTAI`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, message: "Please check your inbox to confirm your subscription." });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
