// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { OrgAndSiteJsonLd } from "@/components/jsonld/OrgAndSiteJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";
import { SitemapJsonLd } from "@/components/jsonld/SitemapJsonLd";
import ContactJsonLd from "@/components/jsonld/ContactJsonLd";
import { CareersJsonLd } from "@/components/jsonld/CareersJsonLd";
import { HomeJsonLd } from "@/components/jsonld/HomeJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import ChatbotWidget from "@/components/ChatbotWidget";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { envBool } from "@/lib/env";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.multai.co.uk"),
  title: "MULTAI | Cloud, App, Data & AI Partner | Transform Your Vision Into Reality",
  description:
    "MULTAI empowers businesses with custom websites, mobile apps, branding, cloud deployment, AI automation, and data analytics—tailored for growth and innovation.",
  keywords: [
    "MULTAI", "web development", "app development", "AI solutions", "Supabase",
    "Next.js", "UI/UX design", "digital marketing", "branding"
  ],
  openGraph: {
    title: "MULTAI | Cloud, App, Data & AI Partner | Transform Your Vision Into Reality",
    description:
      "MULTAI empowers businesses with custom websites, mobile apps, branding, cloud deployment, AI automation, and data analytics—tailored for growth and innovation.",
    url: "/",
    type: "website",
    images: [{ url: "/logo.png", alt: "MULTAI Logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "MULTAI — Web, App & AI Solutions",
    description: "We build modern websites, apps, and AI-powered tools to help businesses grow.",
    images: ["/logo.png"]
  },
//  themeColor: "#000000",
  applicationName: "MULTAI",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
    shortcut: ["/favicon.ico"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const showWhatsApp = envBool(process.env.NEXT_PUBLIC_SHOW_WHATSAPP, true);
  const showChatbot  = envBool(process.env.NEXT_PUBLIC_SHOW_CHATBOT, false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <html lang="en">
      <body className={inter.className}>
        <OrgAndSiteJsonLd />
        <HomeJsonLd />
        <ServiceJsonLd />
        <SitemapJsonLd />
        <ContactJsonLd />
        <CareersJsonLd />
        <LocalBusinessJsonLd />

        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <AnalyticsScripts />

        {showWhatsApp && (
  <FloatingWhatsAppButton
    phoneNumber={whatsappNumber}
    message="Hi! I'd like to learn more about MULTAI."
    className="fixed right-4"
    zIndexClass="z-50"
    extraBottom={0}
  />
)}

{showChatbot && (
  <ChatbotWidget
    rightClassName="right-4"
    zIndexClass="z-50"
    title="MULTAI Support"
    welcome="Hi! 👋 How can we help today?"
    extraFabBottom={72}
    extraPanelBottom={160}
  />
)}
      </body>
    </html>
  );
}
