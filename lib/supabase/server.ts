// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerComponentClient({
    cookies: () => cookieStore,
  })
}
export function createServerClient() {
  return createServerComponentClient({ cookies });
}
