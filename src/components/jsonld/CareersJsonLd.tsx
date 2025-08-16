// src/components/jsonld/CareersJsonLd.tsx
import React from "react";

export function CareersJsonLd() {
  const BASE_URL = "https://www.multai.co.uk";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#org`,
        "name": "MULTAI",
        "url": BASE_URL,
        "logo": `${BASE_URL}/logo.png`,
        "sameAs": [
          "https://www.linkedin.com/company/multai",
          "https://github.com/multai",
          "https://www.instagram.com/multai.ltd"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "telephone": "+44 7442 245995",
          "email": "info@multai.co.uk",
          "areaServed": "GB"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "93 Leven Dr",
          "addressLocality": "Waltham Cross",
          "postalCode": "EN99AX",
          "addressCountry": "GB"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/careers#webpage`,
        "url": `${BASE_URL}/careers`,
        "name": "Careers at MULTAI",
        "description": "Explore career opportunities at MULTAI. Join our team of developers, designers, strategists, and innovators.",
        "publisher": { "@id": `${BASE_URL}/#org` }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Careers",
            "item": `${BASE_URL}/careers`
          }
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

export default CareersJsonLd;
