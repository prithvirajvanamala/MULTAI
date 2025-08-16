// src/lib/env.ts
export function envBool(v: string | undefined, fallback = false): boolean {
  if (v == null) return fallback;
  return /^(1|true|yes|on)$/i.test(v.trim());
}
