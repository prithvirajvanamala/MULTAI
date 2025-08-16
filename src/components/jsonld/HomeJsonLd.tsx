// src/components/jsonld/HomeJsonLd.tsx
import React from "react";

export function HomeJsonLd() {
  const BASE_URL = "https://www.multai.co.uk";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#org`,
        name: "MULTAI",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [
          "https://www.linkedin.com/company/multai",
          "https://github.com/multai",
          "https://www.instagram.com/multai.ltd"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+44 7442 245995",
          email: "info@multai.co.uk",
          areaServed: "GB"
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "93 Leven Dr",
          addressLocality: "Waltham Cross",
          postalCode: "EN99AX",
          addressCountry: "GB"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "MULTAI",
        publisher: { "@id": `${BASE_URL}/#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        url: BASE_URL,
        name: "MULTAI — Web, App & AI Solutions",
        description:
          "MULTAI is a UK-based tech company offering modern web development, app solutions, and AI-driven services. We help businesses grow through design, data, and innovation.",
        publisher: { "@id": `${BASE_URL}/#org` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`
        },
        mainEntity: { "@id": `${BASE_URL}/#org` }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#localbusiness`,
        name: "MULTAI",
        url: BASE_URL,
        image: `${BASE_URL}/logo.png`,
        description:
          "MULTAI is a UK-based tech company offering modern web development, app solutions, and AI-driven services. We help businesses grow through design, data, and innovation.",
        telephone: "+44 7442 245995",
        email: "info@multai.co.uk",
        address: {
          "@type": "PostalAddress",
          streetAddress: "93 Leven Dr",
          addressLocality: "Waltham Cross",
          postalCode: "EN99AX",
          addressCountry: "GB"
        },
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        sameAs: [
          "https://www.linkedin.com/company/multai",
          "https://github.com/multai",
          "https://www.instagram.com/multai.ltd"
        ],
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Ireland" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Italy" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Netherlands" },
          { "@type": "Country", name: "Sweden" },
          { "@type": "Country", name: "India" },
          { "@type": "Country", name: "Norway" },
          { "@type": "Country", name: "Denmark" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Austria" },
          { "@type": "Country", name: "Belgium" },
          { "@type": "Country", name: "Finland" },
          { "@type": "Country", name: "Greece" },
          { "@type": "Country", name: "Poland" },
          { "@type": "Country", name: "Czech Republic" },
          { "@type": "Country", name: "Portugal" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "Oman" },
          { "@type": "Country", name: "Kuwait" },
          { "@type": "Country", name: "Bahrain" },
          { "@type": "Country", name: "Jordan" },
          { "@type": "Country", name: "Israel" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "New Zealand" }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default HomeJsonLd;
