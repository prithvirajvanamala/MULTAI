// src/app/services/app-development/page.tsx

import AppDevelopmentContent from "./AppDevelopmentContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "App Development | High-Performance iOS & Android Apps | MULTAI",
  description:
    "We build high-performance, scalable iOS and Android applications with a focus on great user experience, reliable releases, and robust foundations.",
  openGraph: {
    title: "App Development | High-Performance iOS & Android Apps | MULTAI",
    description:
      "We build high-performance, scalable iOS and Android applications with a focus on great user experience, reliable releases, and robust foundations.",
    url: "https://www.multai.co.uk/services/app-development",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/app-development" },
  locale: "en_GB",
};

export default function AppDevelopmentPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
       <ServiceJsonLd/>
      <main>
        <AppDevelopmentContent />
      </main>
    </>
  );
}