"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SitemapPage() {
  const updated = "10 August 2025";

  const groups = [
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Services (overview)", href: "/services" },
        { name: "Web Development", href: "/services/web-development" },
        { name: "App Development", href: "/services/app-development" },
        { name: "Data & AI", href: "/services/data-ai" },
        { name: "QA Testing", href: "/services/qa-testing" },
        { name: "UI/UX Design", href: "/services/ui-ux-design" },
        { name: "Digital Marketing", href: "/services/digital-marketing" },
        { name: "Branding & Logo", href: "/services/branding-logo" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
      ],
    },
  ];

  return (
    <section className="text-gray-800">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            HTML <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Sitemap</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-4 text-gray-700">
            A quick map of everything on our website. Last updated: {updated}.
          </motion.p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((g) => (
          <motion.div key={g.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-lg font-semibold text-gray-900">{g.title}</h2>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* XML hint */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
          Looking for the search-engine sitemap? Add <code className="bg-gray-100 px-1 py-0.5 rounded">/sitemap.xml</code> via your Next.js config or a route handler so crawlers can discover all URLs programmatically.
        </motion.div>
      </div>
    </section>
  );
}
