'use client';

import Link from 'next/link';

export default function ServicesPage() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
     <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">Our Services</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/services/app-development" className="block border rounded-xl p-6 hover:shadow-lg transition bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">📱 App Development</h3>
          <p className="text-gray-600 dark:text-gray-300">Cross-platform, APIs, real-time features, lifecycle CI/CD, and more.</p>
        </Link>

        <Link href="/services/data-ai" className="block border rounded-xl p-6 hover:shadow-lg transition bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🧠 Data & AI</h3>
          <p className="text-gray-600 dark:text-gray-300">Data engineering, ML, Generative AI, dashboards, and automation.</p>
        </Link>

        <Link href="/services/digital-marketing" className="block border rounded-xl p-6 hover:shadow-lg transition bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🎯 Digital Marketing</h3>
          <p className="text-gray-600 dark:text-gray-300">SEO, ads, content strategy, email funnels, and influencer marketing.</p>
        </Link>

        <Link href="/services/qa" className="block border rounded-xl p-6 hover:shadow-lg transition bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🧪 Quality Assurance (QA)</h3>
          <p className="text-gray-600 dark:text-gray-300">Manual/automated testing, audits, DevOps integration, and more.</p>
        </Link>

        <Link href="/services/ui-ux" className="block border rounded-xl p-6 hover:shadow-lg transition bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">🎨 UI/UX Design</h3>
          <p className="text-gray-600 dark:text-gray-300">Wireframes, design systems, motion, persona dev, and usability testing.</p>
        </Link>
      </div>
    </section>
  );
}
