'use client';
import React from 'react';

export default function Qa() {
  const qaServices = [
    'Manual & Automated Testing',
    'Performance & Load Testing',
    'Security & Vulnerability Audits',
    'DevOps Test Integration',
    'Accessibility & Compliance Testing',
    'Regression Testing for Major Updates',
    'Test Strategy & Documentation',
    'API Testing & Monitoring',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-2">
          🧪 Quality Assurance (QA)
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Ensure your product’s reliability, security, and performance with our comprehensive QA solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {qaServices.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
          >
            <p className="text-gray-800 font-medium">✅ {service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
