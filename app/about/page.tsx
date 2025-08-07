// app/about/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | MULTAI',
  description:
    'Discover how MULTAI delivers modern, cloud-ready software solutions for businesses worldwide. Learn about our mission, team, and innovation-first approach.',
  openGraph: {
    title: 'About Us | MULTAI',
    description:
      'We are a team of passionate engineers delivering scalable, cloud-ready platforms to help your business grow.',
    url: 'https://www.multai.com/about',
    siteName: 'MULTAI',
    images: [
      {
        url: '/og-image.png', // Place this in your public folder
        width: 1200,
        height: 630,
        alt: 'About MULTAI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | MULTAI',
    description:
      'Discover how MULTAI empowers global businesses through scalable and modern software.',
    images: ['/og-image.png'],
  },
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        About Us
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        At <span className="font-semibold">MULTAI</span>, we're a team of passionate engineers
        building scalable, modern software solutions that empower global businesses. Our mission is
        to deliver high-quality, open-source-friendly, and cloud-ready platforms that help you grow
        and innovate with confidence.
      </p>
    </section>
  );
}
