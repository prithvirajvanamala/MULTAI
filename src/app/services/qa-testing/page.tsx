// src/app/services/qa-testing/page.tsx

import QATestingContent from "./QATestingContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "QA Testing Services | Automated & Manual Testing | MULTAI",
  description:
    "Ensure flawless performance and reliability with MULTAI’s QA testing services. We offer end-to-end manual and automated testing to help you ship with confidence.",
  openGraph: {
    title: "QA Testing Services | Automated & Manual Testing | MULTAI",
    description:
      "Ensure flawless performance and reliability with MULTAI’s QA testing services. We offer end-to-end manual and automated testing to help you ship with confidence.",
    url: "https://www.multai.co.uk/services/qa-testing",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/qa-testing" },
  locale: "en_GB",
};

export default function QATestingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ServiceJsonLd />
      <main>
        <QATestingContent />
      </main>
    </>
  );
}
