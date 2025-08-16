// app/robots.ts
import type { MetadataRoute } from "next";

// Pull from your .env, with a sane default
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.multai.co.uk";

export default function robots(): MetadataRoute.Robots {
  // In preview/staging builds, block all crawling
  if (process.env.NODE_ENV !== "production") {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Next.js internals
          "/_next",
          "/api",
          // Your admin/portal subpath
          //"/portal",
        ],
      },
      // Example: block Google’s image crawler from private images
      {
        userAgent: "Googlebot-Image",
        disallow: ["/images/private"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
