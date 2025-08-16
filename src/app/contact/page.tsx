import ContactPageContent from "@/app/contact/ContactPageContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";
import { Metadata } from "next";
import ContactJsonLd from "@/components/jsonld/ContactJsonLd";

export const metadata: Metadata = {
  title: "Contact MULTAI | Get in touch for Cloud, App, Data & AI solutions",
  description:
    "Contact MULTAI to discuss your project. We offer custom websites, mobile apps, AI automation, and cloud services. We're here to help you transform your vision into reality.",
  openGraph: {
    title: "Contact MULTAI | Get in touch for Cloud, App, Data & AI solutions",
    description:
      "Contact MULTAI to discuss your project. We offer custom websites, mobile apps, AI automation, and cloud services. We're here to help you transform your vision into reality.",
    url: "https://www.multai.co.uk/contact",
    images: ["/og-image.png"],
    siteName: "MULTAI",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <ContactJsonLd />
      <main>
        <ContactPageContent />
      </main>
    </>
  );
}