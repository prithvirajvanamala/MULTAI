'use client';
import React from "react";
import { usePathname } from "next/navigation";

const BASE_URL = "https://www.multai.co.uk";

const keywordMap: Record<string, string> = {
  "about": "About MULTAI UK",
  "services": "MULTAI Services",
  "app-development": "App Development",
  "data-ai": "Data & AI Solutions",
  "qa-testing": "QA Testing",
  "ui-ux-design": "UI/UX Design",
  "digital-marketing": "Digital Marketing",
  "branding-logo": "Branding & Logo",
  "cloud-devops": "Cloud & DevOps",
  "system-integration": "System Integration",
  "careers": "Careers at MULTAI",
  "blogs": "MULTAI Blog",
  "contact": "Contact MULTAI UK",
};

const BreadcrumbJsonLd = () => {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const name = keywordMap[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const item = `${BASE_URL}/${arr.slice(0, index + 1).join("/")}`;

      return {
        "@type": "ListItem",
        position: index + 2,
        name,
        item,
      };
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MULTAI UK",
        item: BASE_URL,
      },
      ...segments,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbJsonLd;
