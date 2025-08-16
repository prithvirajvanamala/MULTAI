"use client";

import { useMemo } from "react";
import useCookieBannerOffset from "@/hooks/useCookieBannerOffset";

export type FloatingWhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
  className?: string;
  zIndexClass?: string;
  extraBottom?: number;
};

export default function FloatingWhatsAppButton({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  message = "Hi! I'd like to learn more about MULTAI.",
  className = "fixed right-4",
  zIndexClass = "z-50",
  extraBottom = 0,
}: FloatingWhatsAppButtonProps) {
  const cookieOffset = useCookieBannerOffset(16 + extraBottom);
  const href = useMemo(() => {
    if (!phoneNumber) return "";
    const digitsOnly = phoneNumber.replace(/[^\d]/g, "");
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
  }, [phoneNumber, message]);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`${className} ${zIndexClass} grid place-items-center h-12 w-12 rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] transition`}
      style={{ bottom: `calc(${cookieOffset}px + env(safe-area-inset-bottom, 0px))` }}
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.07c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.63.15-.18.29-.72.93-.88 1.12-.16.19-.33.21-.62.07-.29-.15-1.25-.46-2.38-1.48-.88-.79-1.47-1.76-1.64-2.05-.17-.29 0-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.63-1.52-.86-2.08-.22-.53-.44-.46-.62-.46h-.53c-.18 0-.46.07-.7.33-.24.26-.91.89-.91 2.18 0 1.29.93 2.54 1.06 2.72.13.18 1.83 2.8 4.44 3.93.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.49-.07 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.2-.55-.35z"
        />
        <path
          fill="currentColor"
          d="M16 3.1A12.89 12.89 0 0 0 3.1 16c0 2.27.62 4.38 1.8 6.21L3 29l6.98-1.82A12.86 12.86 0 0 0 16 28.9 12.89 12.89 0 0 0 28.9 16 12.89 12.89 0 0 0 16 3.1zm7.61 18.16c-.32.9-1.86 1.78-2.61 1.9-.67.11-1.52.16-2.46-.15-2.83-.92-4.64-3.19-4.79-3.35-.14-.16-1.14-1.52-1.14-2.91 0-1.39.73-2.06.99-2.35.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.64.48.22.55.74 1.92.8 2.06.07.14.11.3.02.49-.08.19-.13.3-.27.47-.14.17-.3.39-.43.53-.13.14-.18.26-.06.45.11.19.49.8 1.08 1.3.74.64 1.36.84 1.56.93.2.09.35.08.49-.05.14-.13.57-.66.73-.89.16-.23.31-.19.52-.11.21.08 1.35.64 1.58.76.23.12.38.17.44.26.06.09.06.9-.26 1.8z"
          opacity=".25"
        />
      </svg>
    </a>
  );
}
