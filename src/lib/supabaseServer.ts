// src/lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Uses SERVICE ROLE key if present; falls back to anon (not recommended).
 * Keep SERVICE ROLE only on the server (never expose to client).
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function getServerSupabase() {
  if (!SUPABASE_URL || !SERVICE_ROLE) return null;
  return createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
  });
}
