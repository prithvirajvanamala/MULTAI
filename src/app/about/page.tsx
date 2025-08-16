import AboutContent from "@/app/about/AboutContent";
import OrganizationJsonLd from "@/components/jsonld/OrganizationJsonLd";
import LocalBusinessJsonLd from "@/components/jsonld/LocalBusinessJsonLd";
import BreadcrumbJsonLd from "@/components/jsonld/BreadcrumbJsonLd";
import WebPageJsonLd from "@/components/jsonld/WebPageJsonLd";

export const metadata = {
  title: "MULTAI | Cloud, App, Data & AI Partner | Transform Your Vision Into Reality",
  description:
    "MULTAI empowers businesses with custom websites, mobile apps, branding, cloud deployment, AI automation, and data analytics—tailored for growth and innovation.",
  openGraph: {
    title: "MULTAI | Cloud, App, Data & AI Partner | Transform Your Vision Into Reality",
  description:
    "MULTAI empowers businesses with custom websites, mobile apps, branding, cloud deployment, AI automation, and data analytics—tailored for growth and innovation.",
    url: "https://www.multai.co.uk/about",
    images: ["/og-image.png"],
     siteName: "MULTAI",
  },alternates: { canonical: "/about" },
  locale: "en_GB",
    type: "website"
};

export default function AboutPage() {
  // Server component shell — can render client components inside
return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      <WebPageJsonLd />
      <main>
        <AboutContent />
      </main>
    </>
  );
}
