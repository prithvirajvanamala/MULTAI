'use client';
import React from 'react';

export default function AppDevelopment() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2">📱 App Development</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Building reliable, scalable mobile and web apps with modern tech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          'Mobile & Cross-Platform App Development',
          'Backend APIs & Cloud Integration (Supabase, Firebase)',
          'Real-Time Features (Sockets, Push Notifications)',
          'PWA & Hybrid App Development',
          'App Store Launch & Maintenance',
          'App Analytics & Crash Reporting',
          'In-app Payments & Subscription Systems',
          'CI/CD & Full Lifecycle DevOps Integration',
          'Product Engineering – From Concept to Scale',
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
          >
            <p className="text-gray-800 font-medium">✅ {item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
