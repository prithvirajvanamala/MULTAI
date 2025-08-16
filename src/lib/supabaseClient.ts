import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Lazy + browser-only Supabase client. Returns null if env vars are missing. */
export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  // Only create in the browser (no SSR)
  if (typeof window === "undefined") return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: { persistSession: false },
  });

  return client;
}
