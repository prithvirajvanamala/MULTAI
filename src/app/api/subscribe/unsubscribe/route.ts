import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: false, error: "Email required." }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", email.toLowerCase());

  if (error) return NextResponse.json({ ok: false, error: "Unable to unsubscribe." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
