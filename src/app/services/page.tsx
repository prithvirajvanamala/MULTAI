import ServicesPageContent from "@/app/services/ServicesPageContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Web, App, AI, Data & Design Solutions",
  description:
    "We offer a full spectrum of digital services from web & app development to AI, data, and design. Partner with us to build, launch, and scale your product.",
  openGraph: {
    title: "Our Services | Web, App, AI, Data & Design Solutions",
    description:
      "We offer a full spectrum of digital services from web & app development to AI, data, and design. Partner with us to build, launch, and scale your product.",
    url: "https://www.multai.co.uk/services/web-development",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/services/web-development" },
};

export default function ServicesPage() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <main>
        <ServicesPageContent />
      </main>
    </>
  );
}