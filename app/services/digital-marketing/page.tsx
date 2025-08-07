'use client';
import React from 'react';

export default function DigitalMarketing() {
  const services = [
    'SEO & SEM Campaign Strategy',
    'Paid Social & Display Ad Campaigns',
    'Email Marketing & Automation Funnels',
    'Content Strategy & Copywriting',
    'Landing Page & Funnel Optimization',
    'Conversion Rate Analysis & Reporting',
    'Brand Storytelling & Positioning',
    'Affiliate & Influencer Marketing',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2">🎯 Digital Marketing</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Amplify your online presence and engagement with our end-to-end digital marketing services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
          >
            <p className="text-gray-800 font-medium">📌 {item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
