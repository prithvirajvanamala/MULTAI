import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import DataAIContent from "./DataAIContent";
import { ServiceJsonLd } from "@/components/jsonld/ServiceJsonLd";

export const metadata = {
  title: "Data & AI Solutions | Intelligent Automation & Insights | MULTAI",
  description:
    "Unlock the power of your data with MULTAI’s AI-driven solutions. From intelligent automation to predictive analytics, we help businesses make smarter decisions.",
  openGraph: {
    title: "Data & AI Solutions | Intelligent Automation & Insights | MULTAI",
    description:
      "Unlock the power of your data with MULTAI’s AI-driven solutions. From intelligent automation to predictive analytics, we help businesses make smarter decisions.",
    url: "https://www.multai.co.uk/services/da-ai",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    type: "website",
  },
  alternates: { canonical: "/services/da-ai" },
  locale: "en_GB",
};

export default function DataAIPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ServiceJsonLd/>``
      <main>
        <DataAIContent />
      </main>
    </>
  );
}
