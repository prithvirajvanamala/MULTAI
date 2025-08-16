// src/app/services/digital-marketing/page.tsx

import DigitalMarketingContent from "./DigitalMarketingPage";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "Digital Marketing Services | SEO, PPC & Content Strategy | MULTAI",
  description:
    "Drive traffic, boost conversions, and grow your brand with MULTAI’s digital marketing services. We deliver tailored SEO, PPC, and content strategies that get results.",
  openGraph: {
    title: "Digital Marketing Services | SEO, PPC & Content Strategy | MULTAI",
    description:
      "Drive traffic, boost conversions, and grow your brand with MULTAI’s digital marketing services. We deliver tailored SEO, PPC, and content strategies that get results.",
    url: "https://www.multai.co.uk/services/digital-marketing",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/digital-marketing" },
  locale: "en_GB",
};

export default function DigitalMarketingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ServiceJsonLd />
      <main>
        <DigitalMarketingContent />
      </main>
    </>
  );
}
