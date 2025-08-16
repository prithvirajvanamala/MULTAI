import WebDevelopmentPageContent from "@/app/services/web-development/WebDevelopmentPageContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata: Metadata = {
  title: "Web Development Services | Next.js, React & Cloud Solutions",
  description:
    "We design and build fast, secure, and SEO-ready websites and web applications using modern technologies like Next.js, React, and serverless architecture.",
  openGraph: {
    title: "Web Development Services | Next.js, React & Cloud Solutions",
    description:
      "We design and build fast, secure, and SEO-ready websites and web applications using modern technologies like Next.js, React, and serverless architecture.",
    url: "https://www.multai.co.uk/services/web-development",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/services/web-development" },
};

export default function WebDevelopmentPage() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ServiceJsonLd/>
      <main>
        <WebDevelopmentPageContent />
      </main>
    </>
  );
}