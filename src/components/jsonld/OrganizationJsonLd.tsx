// src/components/jsonld/OrgAndSiteJsonLd.tsx
import React from "react";

export function OrgAndSiteJsonLd() {
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

export default OrgAndSiteJsonLd;
