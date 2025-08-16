"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function TermsPage() {
  const updated = "10 August 2025";

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
            Terms & <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Conditions</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-4 text-gray-700 text-lg">
            The legal terms for using our website and engaging our services.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="mt-2 text-sm text-gray-500">
            Last updated: {updated}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-gray-900">1. About us</h2>
          <p className="mt-3 text-gray-700">
            MULTAI LTD, 93 Leven Dr, Waltham Cross, EN99AX, England, United Kingdom (“we”, “us”, “our”).
            Contact: <a href="mailto:info@multai.co.uk" className="text-blue-600 hover:underline">info@multai.co.uk</a>.
          </p>
          <p className="mt-2 text-sm text-gray-500">These Terms apply to our website and to proposals, statements of work, or master services agreements (collectively “Agreements”). If a signed Agreement conflicts with these Terms, the signed Agreement prevails.</p>
        </motion.div>

        <Section n={2} title="Your use of the website">
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the site lawfully; don’t attempt to disrupt, reverse engineer, or misuse it.</li>
            <li>Content on the site is provided “as is” for general information without warranties.</li>
            <li>We may change or withdraw the site at any time.</li>
          </ul>
        </Section>

        <Section n={3} title="Engaging our services">
          <ul className="list-disc pl-5 space-y-2">
            <li>Work is governed by a proposal/SOW describing scope, timeline, fees, and assumptions.</li>
            <li>Client responsibilities include timely feedback, access to systems, and decision-making.</li>
            <li>Change requests are handled through a change control process and may affect fees/timelines.</li>
          </ul>
        </Section>

        <Section n={4} title="Fees & payment">
          <ul className="list-disc pl-5 space-y-2">
            <li>Invoices are payable within the period stated in the Agreement (typically 14–30 days, plus VAT if applicable).</li>
            <li>Late payments may accrue interest at the statutory rate and/or suspend delivery.</li>
            <li>Expenses (e.g., travel, software, cloud usage) are chargeable if pre-agreed.</li>
          </ul>
        </Section>

        <Section n={5} title="Intellectual property">
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Client materials</span> remain the Client’s IP; you grant us a licence to use them to deliver the services.</li>
            <li><span className="font-medium">Deliverables</span>: as specified in your Agreement—usually assigned to the Client on full payment, excluding our pre-existing IP, frameworks, or open-source components which are licensed.</li>
            <li>We may reuse generic know-how that does not reveal Client confidential information.</li>
          </ul>
        </Section>

        <Section n={6} title="Open-source & third-party services">
          <p>Deliverables may include open-source or third-party software subject to their licences/terms. We’ll identify key dependencies where relevant.</p>
        </Section>

        <Section n={7} title="Confidentiality & data protection">
          <ul className="list-disc pl-5 space-y-2">
            <li>Both parties will keep confidential information secret and use it only for the project.</li>
            <li>Personal data is handled per our <a className="text-blue-600 hover:underline" href="/privacy">Privacy Policy</a> and applicable UK data protection laws.</li>
          </ul>
        </Section>

        <Section n={8} title="Warranties">
          <ul className="list-disc pl-5 space-y-2">
            <li>We warrant services will be performed with reasonable skill and care.</li>
            <li>Except as set out above, we disclaim all other warranties to the fullest extent permitted by law.</li>
          </ul>
        </Section>

        <Section n={9} title="Liability">
          <ul className="list-disc pl-5 space-y-2">
            <li>Nothing limits liability for death or personal injury caused by negligence, fraud, or other liability that cannot be excluded by law.</li>
            <li>We are not liable for indirect or consequential loss, loss of profit, revenue, data, or goodwill.</li>
            <li>Our total aggregate liability under an Agreement is capped at the fees paid (or another cap specified in the Agreement).</li>
          </ul>
        </Section>

        <Section n={10} title="Term, suspension & termination">
          <ul className="list-disc pl-5 space-y-2">
            <li>Either party may terminate for material breach not remedied within a reasonable period.</li>
            <li>We may suspend services for non-payment or security concerns.</li>
            <li>On termination, amounts due become payable and access to deliverables may be suspended until settlement.</li>
          </ul>
        </Section>

        <Section n={11} title="Consumer laws">
          <p>
            If you are a consumer, your statutory rights under UK law (including the Consumer Rights Act 2015 and the Consumer Contracts Regulations 2013 for distance/online sales) are unaffected.
          </p>
        </Section>

        <Section n={12} title="Governing law">
          <p>These Terms and any dispute are governed by the laws of England and Wales. Courts of England and Wales have exclusive jurisdiction.</p>
        </Section>

        <Section n={13} title="Changes to these Terms">
          <p>We may update these Terms from time to time. Changes take effect when posted on this page with the new “Last updated” date.</p>
        </Section>
      </div>
    </section>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <h3 className="text-xl font-semibold text-gray-900">{n}. {title}</h3>
      <div className="mt-3 text-gray-700">{children}</div>
    </motion.div>
  );
}
