// src/components/jsonld/SitemapJsonLd.tsx
import React from "react";

export function SitemapJsonLd() {
  const BASE_URL = "https://www.multai.co.uk";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#org`,
        "name": "MULTAI LTD",
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
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "MULTAI LTD",
        "publisher": { "@id": `${BASE_URL}/#org` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${BASE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/sitemap#webpage`,
        "url": `${BASE_URL}/sitemap`,
        "name": "HTML Sitemap",
        "description": "A quick map of everything on our website. Last updated: 10 August 2025.",
        "dateModified": "2025-08-10",
        "publisher": { "@id": `${BASE_URL}/#org` },
        "mainEntity": {
          "@type": "SiteNavigationElement",
          "name": "Sitemap XML",
          "url": `${BASE_URL}/sitemap.xml`
        }
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
            "name": "Sitemap",
            "item": `${BASE_URL}/sitemap`
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

export default SitemapJsonLd;
