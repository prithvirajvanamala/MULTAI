'use client';
import React from 'react';

export default function UiUx() {
  const uiuxServices = [
    'Wireframing & Prototyping (Figma, Adobe XD)',
    'User Journey Mapping & Research',
    'Responsive, Accessible Design',
    'Design Systems & Component Libraries',
    'Motion Design & Micro-Interactions',
    'Multi-Device UX Strategy',
    'Persona Development & UX Audits',
    'Usability Testing & Heuristic Evaluation',
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-2">
          🎨 UI/UX Design
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Creating intuitive, elegant, and inclusive user experiences across all platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {uiuxServices.map((service, index) => (
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
