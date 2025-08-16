import React from "react";

export function ServiceJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.multai.co.uk/#org",
        "name": "MULTAI Ltd",
        "url": "https://www.multai.co.uk",
        "logo": "https://www.multai.co.uk/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/multai-ltd",
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
          "streetAddress": "93 Leven Drive",
          "addressLocality": "Waltham Cross",
          "postalCode": "EN99AX",
          "addressCountry": "GB"
        }
      },
      {
        "@type": "OfferCatalog",
        "name": "MULTAI Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/web-development" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/app-development" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/data-ai" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/qa-testing" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/ui-ux-design" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/digital-marketing" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/branding-logo" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/cloud-devops" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/ai-automation" } },
          { "@type": "Offer", "itemOffered": { "@id": "https://www.multai.co.uk/services/system-integration" } }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Web Development",
        "@id": "https://www.multai.co.uk/services/web-development",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/web-development",
        "description": "Custom websites and web apps using Next.js, Supabase, and scalable architecture.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/web-development.jpg",
        "keywords": "Next.js, web development, UK tech agency"
      },
      {
        "@type": "Service",
        "serviceType": "App Development",
        "@id": "https://www.multai.co.uk/services/app-development",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/app-development",
        "description": "Cross-platform mobile and desktop app development tailored to business needs.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/app-development.jpg",
        "keywords": "React Native, Flutter, mobile apps, UK software"
      },
      {
        "@type": "Service",
        "serviceType": "Data & AI",
        "@id": "https://www.multai.co.uk/services/data-ai",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/data-ai",
        "description": "AI-driven solutions, data engineering, and automation using Python and OpenAI.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/data-ai.jpg",
        "keywords": "AI, data pipelines, automation, UK tech"
      },
      {
        "@type": "Service",
        "serviceType": "QA Testing",
        "@id": "https://www.multai.co.uk/services/qa-testing",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/qa-testing",
        "description": "Automated and manual testing to ensure software reliability and performance.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/qa-testing.jpg",
        "keywords": "QA testing, software reliability, UK tech"
      },
      {
        "@type": "Service",
        "serviceType": "UI/UX Design",
        "@id": "https://www.multai.co.uk/services/ui-ux-design",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/ui-ux-design",
        "description": "User-centered design, wireframing, and branding for digital products.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/ui-ux-design.jpg",
        "keywords": "UI design, UX research, Figma, UK agency"
      },
      {
        "@type": "Service",
        "serviceType": "Digital Marketing",
        "@id": "https://www.multai.co.uk/services/digital-marketing",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/digital-marketing",
        "description": "SEO, content strategy, and campaign management to grow your online presence.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/digital-marketing.jpg",
        "keywords": "SEO, digital marketing, UK growth agency"
      },
      {
        "@type": "Service",
        "serviceType": "Branding & Logo",
        "@id": "https://www.multai.co.uk/services/branding-logo",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/branding-logo",
        "description": "Professional branding, logo design, and visual identity for businesses.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/branding-logo.jpg",
        "keywords": "Brand identity, logo design, UK creative agency"
      },
      {
        "@type": "Service",
        "serviceType": "Cloud & DevOps",
        "@id": "https://www.multai.co.uk/services/cloud-devops",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/cloud-devops",
        "description": "Deploy scalable solutions on AWS, Azure, GCP with CI/CD pipelines and infrastructure as code.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/cloud-devops.jpg",
        "keywords": "Cloud engineering, DevOps, CI/CD, UK tech"
      },
      {
        "@type": "Service",
        "serviceType": "AI & Automation",
        "@id": "https://www.multai.co.uk/services/ai-automation",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/ai-automation",
        "description": "Enhance platforms with AI chatbots, predictions, and automated workflows using OpenAI and Python.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/ai-automation.jpg",
        "keywords": "AI automation, chatbots, OpenAI, UK tech"
      },
      {
        "@type": "Service",
        "serviceType": "System Integration",
        "@id": "https://www.multai.co.uk/services/system-integration",
        "provider": { "@id": "https://www.multai.co.uk/#org" },
        "url": "https://www.multai.co.uk/services/system-integration",
        "description": "Seamlessly connect your apps and services for better workflows and operational efficiency.",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "image": "https://www.multai.co.uk/images/services/system-integration.jpg",
        "keywords": "System integration, APIs, workflows, UK tech"
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
