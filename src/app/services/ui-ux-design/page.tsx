// src/app/services/ui-ux-design/page.tsx

import UIUXDesignContent from "./UIUXDesignPage";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "UI/UX Design Services | Intuitive Interfaces & User Journeys | MULTAI",
  description:
    "Deliver seamless digital experiences with MULTAI’s UI/UX design services. We craft intuitive interfaces and user journeys that drive engagement and conversion.",
  openGraph: {
    title: "UI/UX Design Services | Intuitive Interfaces & User Journeys | MULTAI",
    description:
      "Deliver seamless digital experiences with MULTAI’s UI/UX design services. We craft intuitive interfaces and user journeys that drive engagement and conversion.",
    url: "https://www.multai.co.uk/services/ui-ux-design",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/ui-ux-design" },
  locale: "en_GB",
};

export default function UIUXDesignPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ServiceJsonLd/>
      <main>
        <UIUXDesignContent />
      </main>
    </>
  );
}
