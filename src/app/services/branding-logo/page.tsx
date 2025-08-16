// src/app/services/branding-logo-designing/page.tsx

import BrandingLogoDesigningContent from "./BrandingLogoDesigningPage";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "Branding & Logo Design | Visual Identity & Strategy | MULTAI",
  description:
    "Craft a memorable brand identity with MULTAI. From logo design to full branding strategy, we help businesses stand out with clarity, creativity, and consistency.",
  openGraph: {
    title: "Branding & Logo Design | Visual Identity & Strategy | MULTAI",
    description:
      "Craft a memorable brand identity with MULTAI. From logo design to full branding strategy, we help businesses stand out with clarity, creativity, and consistency.",
    url: "https://www.multai.co.uk/services/branding-logo-designing",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/branding-logo-designing" },
  locale: "en_GB",
};

export default function BrandingLogoDesigningPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
             <ServiceJsonLd/>

      <main>
        <BrandingLogoDesigningContent />
      </main>
    </>
  );
}
