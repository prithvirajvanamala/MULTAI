import CareersPageContent from "@/app/careers/CareersPageContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { Metadata } from "next";
import { CareersJsonLd } from "@/components/jsonld/CareersJsonLd";

export const metadata: Metadata = {
  title: "Careers at MULTAI | Join Our Cloud, App, Data & AI Team",
  description:
    "Explore career opportunities at MULTAI. Join our team and help us build amazing websites, mobile apps, and AI solutions for businesses worldwide.",
  openGraph: {
    title: "Careers at MULTAI | Join Our Cloud, App, Data & AI Team",
    description:
      "Explore career opportunities at MULTAI. Join our team and help us build amazing websites, mobile apps, and AI solutions for businesses worldwide.",
    url: "https://www.multai.co.uk/careers",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <CareersJsonLd />
      <main>
        <CareersPageContent />
      </main>
    </>
  );
}