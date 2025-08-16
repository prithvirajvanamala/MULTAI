"use client";

import { useMemo } from "react";
import useCookieBannerOffset from "@/hooks/useCookieBannerOffset";

export type FloatingWhatsAppButtonProps = {
  phoneNumber?: string;
  message?: string;
  className?: string;
  zIndexClass?: string;
  extraBottom?: number;
  /** Size of the button (px). Default 48 (= h-12 w-12) */
  sizePx?: number;
};

export default function FloatingWhatsAppButton({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  message = "Hi! I'd like to learn more about MULTAI.",
  className = "fixed right-4",
  zIndexClass = "z-50",
  extraBottom = 0,
  sizePx = 48,
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
      title="Chat on WhatsApp"
      className={`${className} ${zIndexClass} grid place-items-center rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] transition`}
      style={{
        bottom: `calc(${cookieOffset}px + env(safe-area-inset-bottom, 0px))`,
        width: sizePx,
        height: sizePx,
      }}
    >
      {/* WhatsApp glyph — inherits currentColor (white) */}
      <img src="./icons/whatsapp.svg" alt="" aria-hidden className="h-6 w-6" />

    </a>
  );
}
