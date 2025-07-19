export default function ServicesPage() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-10 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* App Development */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">📱 App Development</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Mobile & Cross-Platform App Development</li>
            <li>Backend APIs & Cloud Integration (Supabase, Firebase)</li>
            <li>Real-Time Features (Sockets, Push Notifications)</li>
            <li>PWA & Hybrid App Development</li>
            <li>App Store Launch & Maintenance</li>
            <li>App Analytics & Crash Reporting</li>
            <li>In-app Payments & Subscription Systems</li>
            <li>CI/CD & Full Lifecycle DevOps Integration</li>
            <li>Product Engineering – From Concept to Scale</li>
          </ul>
        </div>

        {/* Data & AI */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">🧠 Data & AI</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Data Engineering & Visualization</li>
            <li>Machine Learning & Predictive Analytics</li>
            <li>Generative AI & NLP Solutions</li>
            <li>AI-powered Chatbots & Automation</li>
            <li>ML Model Evaluation & Fine-Tuning</li>
            <li>Power BI ↔ Tableau Migration</li>
            <li>Enterprise BI Dashboards & Architecture</li>
            <li>Data Lake Modernization</li>
            <li>AI/ML Migration Across Platforms</li>
          </ul>
        </div>

        {/* Digital Marketing */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">🎯 Digital Marketing</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>SEO & SEM Campaign Strategy</li>
            <li>Paid Social & Display Ad Campaigns</li>
            <li>Email Marketing & Automation Funnels</li>
            <li>Content Strategy & Copywriting</li>
            <li>Landing Page & Funnel Optimization</li>
            <li>Conversion Rate Analysis & Reporting</li>
            <li>Brand Storytelling & Positioning</li>
            <li>Affiliate & Influencer Marketing</li>
          </ul>
        </div>

        {/* Quality Assurance (QA) */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">🧪 Quality Assurance (QA)</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Manual & Automated Testing</li>
            <li>Performance & Load Testing</li>
            <li>Security & Vulnerability Audits</li>
            <li>DevOps Test Integration</li>
            <li>Accessibility & Compliance Testing</li>
            <li>Regression Testing for Major Updates</li>
            <li>Test Strategy & Documentation</li>
            <li>API Testing & Monitoring</li>
          </ul>
        </div>

        {/* UI/UX Design */}
        <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">🎨 UI/UX Design</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Wireframing & Prototyping (Figma, Adobe XD)</li>
            <li>User Journey Mapping & Research</li>
            <li>Responsive, Accessible Design</li>
            <li>Design Systems & Component Libraries</li>
            <li>Motion Design & Micro-Interactions</li>
            <li>Multi-Device UX Strategy</li>
            <li>Persona Development & UX Audits</li>
            <li>Usability Testing & Heuristic Evaluation</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
