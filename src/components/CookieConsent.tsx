// src/components/CookieConsent.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X } from "lucide-react";

type Consent = {
  necessary: true;          // always on
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const COOKIE_NAME = "multai_consent";
const DAYS = 180;

/* ---------------- helpers ---------------- */
function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function writeCookie(name: string, value: string, days = DAYS) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax${secure}`;
}
function defaultConsent(): Consent {
  return { necessary: true, analytics: false, marketing: false, preferences: false };
}
function parseConsent(): Consent | null {
  try {
    const raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    const c = JSON.parse(raw);
    return {
      necessary: true,
      analytics: !!c.analytics,
      marketing: !!c.marketing,
      preferences: !!c.preferences,
    };
  } catch {
    return null;
  }
}

/* Allow opening the prefs modal from anywhere (e.g., a footer link calling window.MULTAI_openCookiePrefs()) */
declare global {
  interface Window {
    MULTAI_openCookiePrefs?: () => void;
  }
}

/* ---------------- component ---------------- */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [openPrefs, setOpenPrefs] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [temp, setTemp] = useState<Consent>(defaultConsent());

  useEffect(() => {
    setMounted(true);
    const c = parseConsent();
    setConsent(c);
    window.MULTAI_openCookiePrefs = () => setOpenPrefs(true);
    // notify listeners on load so any layout using offsets can recompute
    window.dispatchEvent(new CustomEvent("multai:consent-updated", { detail: c }));
    return () => {
      delete window.MULTAI_openCookiePrefs;
    };
  }, []);

  useEffect(() => {
    if (openPrefs) setTemp(consent ?? defaultConsent());
  }, [openPrefs, consent]);

  const applyConsent = (c: Consent) => {
    writeCookie(COOKIE_NAME, JSON.stringify(c));
    setConsent(c);
    window.dispatchEvent(new CustomEvent("multai:consent-updated", { detail: c }));
  };

  if (!mounted) return null;

  const needBanner = !consent;

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {needBanner && (
          <motion.div
            id="cookie-consent"
            data-cookie-consent
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-4 left-0 right-0 z-[60] px-4"
            role="dialog"
            aria-live="polite"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-lg">
              <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-gray-900">We use cookies</p>
                  <p className="mt-1">
                    We use essential cookies and, with your consent, analytics and marketing cookies as per our{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => applyConsent({ necessary: true, analytics: false, marketing: false, preferences: false })}
                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Reject all
                  </button>
                  <button
                    onClick={() => setOpenPrefs(true)}
                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Manage preferences
                  </button>
                  <button
                    onClick={() => applyConsent({ necessary: true, analytics: true, marketing: true, preferences: true })}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {openPrefs && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenPrefs(false)}
              className="fixed inset-0 z-[70] bg-black"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed inset-0 z-[75] grid place-items-center px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
            >
              <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl">
                <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-blue-600" />
                    <h2 id="cookie-prefs-title" className="text-lg font-semibold text-gray-900">Cookie preferences</h2>
                  </div>
                  <button aria-label="Close" onClick={() => setOpenPrefs(false)}>
                    <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4 text-sm text-gray-700">
                  <CookieRow title="Strictly necessary" desc="Needed for core site functionality and security." locked checked onChange={() => {}} />
                  <CookieRow
                    title="Preferences"
                    desc="Remember your settings (e.g., language, UI)."
                    checked={temp.preferences}
                    onChange={(v) => setTemp((c) => ({ ...c, preferences: v }))}
                  />
                  <CookieRow
                    title="Analytics"
                    desc="Help us improve with usage insights."
                    checked={temp.analytics}
                    onChange={(v) => setTemp((c) => ({ ...c, analytics: v }))}
                  />
                  <CookieRow
                    title="Marketing"
                    desc="Measure campaigns and personalise ads."
                    checked={temp.marketing}
                    onChange={(v) => setTemp((c) => ({ ...c, marketing: v }))}
                  />

                  <p className="text-xs text-gray-500">
                    Learn more in our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. You can update choices anytime from the footer.
                  </p>
                </div>

                <div className="p-4 md:p-5 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setOpenPrefs(false)}
                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      applyConsent({ necessary: true, analytics: temp.analytics, marketing: temp.marketing, preferences: temp.preferences });
                      setOpenPrefs(false);
                    }}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
                  >
                    Save choices
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Manage button — HIDDEN (removed). If you ever want it back, re-enable this block.
      {consent && (
        <button
          data-cookie-manage
          onClick={() => setOpenPrefs(true)}
          className="fixed bottom-4 right-4 z-[55] inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:shadow"
          aria-label="Manage cookie preferences"
        >
          <Settings2 className="h-4 w-4 text-blue-600" />
          Cookies
        </button>
      )}
      */}
    </>
  );
}

/* ---------- small row component ---------- */
function CookieRow({
  title, desc, checked, onChange, locked,
}: {
  title: string; desc: string; checked?: boolean; onChange: (v: boolean) => void; locked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 p-3">
      <div>
        <div className="font-medium text-gray-900">
          {title} {locked && <span className="ml-1 text-xs text-gray-500">(always on)</span>}
        </div>
        <div className="text-gray-600 text-sm">{desc}</div>
      </div>
      <label className={`relative inline-flex h-6 w-11 items-center ${locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
        <input
          type="checkbox"
          className="peer sr-only"
          checked={!!checked}
          onChange={(e) => !locked && onChange(e.target.checked)}
          disabled={locked}
          aria-checked={!!checked}
        />
        <span className="absolute left-0 right-0 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-600 transition-colors" />
        <span className="relative left-0 h-5 w-5 translate-x-0 peer-checked:translate-x-5 rounded-full bg-white shadow transition-transform" />
      </label>
    </div>
  );
}
