"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; preferences: boolean };

function getConsent(): Consent | null {
  const m = document.cookie.match(/(?:^|; )multai_consent=([^;]*)/);
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[1])); } catch { return null; }
}

export default function AnalyticsScripts() {
  const [c, setC] = useState<Consent | null>(null);

  useEffect(() => {
    const update = () => setC(getConsent());
    update();
    window.addEventListener("multai:consent-updated" as any, update as any);
    return () => window.removeEventListener("multai:consent-updated" as any, update as any);
  }, []);

  if (!c) return null;

  return (
    <>
      {/* Google Analytics (analytics consent) */}
      {c.analytics && process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel or other marketing (marketing consent) */}
      {c.marketing && process.env.NEXT_PUBLIC_META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
