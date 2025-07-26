'use client';
import React from 'react';

export default function Data_AiPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-2">🧠 Data & AI</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Powering intelligence and innovation through data-driven solutions and advanced AI technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          'Data Engineering & Visualization',
          'Machine Learning & Predictive Analytics',
          'Generative AI & NLP Solutions',
          'AI-powered Chatbots & Automation',
          'ML Model Evaluation & Fine-Tuning',
          'Power BI ↔ Tableau Migration',
          'Enterprise BI Dashboards & Architecture',
          'Data Lake Modernization',
          'AI/ML Migration Across Platforms',
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
