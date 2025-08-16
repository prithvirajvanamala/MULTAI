// src/components/jsonld/WebPageJsonLd.tsx
import React from "react";

const WebPageJsonLd = () => {
  const BASE_URL = "https://www.multai.co.uk";
  const pagePath = "/about";
  const pageUrl = `${BASE_URL}${pagePath}`;

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
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "MULTAI",
        "publisher": { "@id": `${BASE_URL}/#org` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${BASE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": "About MULTAI",
        "description": "MULTAI crafts, launches, and scales world-class digital solutions—from branding and web apps to AI, analytics, and cloud migration.",
        "publisher": { "@id": `${BASE_URL}/#org` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.multai.co.uk/og-image.png",
          "width": 1200,
          "height": 630
        },
        "inLanguage": "en-GB",
        "isPartOf": { "@id": `${BASE_URL}/#website` }
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
            "name": "About",
            "item": pageUrl
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
};

export default WebPageJsonLd;
