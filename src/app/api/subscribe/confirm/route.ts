// app/api/subscribe/confirm/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";          // ensure Node (service key safe)
export const dynamic = "force-dynamic";   // don't cache

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Invalid token.", { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({
        verified: true,
        verified_at: new Date().toISOString(),
        token: null,
      })
      .eq("token", token)
      .is("unsubscribed_at", null)
      .select()
      .maybeSingle(); // don't throw if 0 rows

    if (error || !data) {
      return new Response("Token not found, expired, or already used.", { status: 400 });
    }

    const thankYou =
      process.env.NEXT_PUBLIC_SUBSCRIBE_THANKYOU_URL || "/";
    // make it absolute to avoid redirect errors
    const absolute = new URL(thankYou, url.origin).toString();

    return NextResponse.redirect(absolute, 302);
  } catch (e) {
    console.error("subscribe/confirm error:", e);
    return new Response("Server error.", { status: 500 });
  }
}
