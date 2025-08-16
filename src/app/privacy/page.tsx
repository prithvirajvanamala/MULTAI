"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PrivacyPage() {
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
            Privacy <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Policy</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-gray-700 text-lg"
          >
            How MULTAI collects, uses, shares and protects your personal data.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-2 text-sm text-gray-500"
          >
            Last updated: {updated}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Intro & Controller */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <h2 className="text-2xl font-bold text-gray-900">Who we are</h2>
          <p className="mt-3 text-gray-700">
            MULTAI LTD (“we”, “us”, “our”) is the data controller for the personal data described in this policy.
            Our details: <span className="font-medium">MULTAI LTD, 93 Leven Dr, Waltham Cross, EN99AX, England, United Kingdom</span>.
            Contact: <a className="text-blue-600 hover:underline" href="mailto:info@multai.co.uk">info@multai.co.uk</a>.
          </p>
        </motion.div>

        {/* Data we collect */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Personal data we collect</h3>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">Contact</span>: name, email, phone, company, role.</li>
            <li><span className="font-medium">Project</span>: goals, requirements, files you upload or share.</li>
            <li><span className="font-medium">Usage</span>: pages viewed, actions (analytics & logs), approximate location, device/browser data.</li>
            <li><span className="font-medium">Marketing preferences</span> and communication history.</li>
            <li><span className="font-medium">Support</span>: messages you send via forms, email or chat.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-500">We don’t intentionally collect special category data. Please avoid sending sensitive data unless requested under a contract with appropriate safeguards.</p>
        </motion.div>

        {/* Purposes & legal bases */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">How we use your data & legal bases</h3>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">Responding to enquiries & providing services</span> (performing a contract or steps prior to a contract).</li>
            <li><span className="font-medium">Improving our website, products and security</span> (legitimate interests).</li>
            <li><span className="font-medium">Marketing communications</span> such as newsletters or event invites (consent or legitimate interests; you can opt out at any time).</li>
            <li><span className="font-medium">Compliance</span> with legal obligations (e.g., tax, accounting, fraud prevention).</li>
          </ul>
        </motion.div>

        {/* Sharing */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Sharing your data</h3>
          <p className="mt-3 text-gray-700">
            We use trusted service providers (e.g., cloud hosting, analytics, email, payments, CRM) under data-processing agreements.
            We only share what’s necessary and require confidentiality and security.
            We’ll disclose data where required by law or to protect rights, safety, or prevent fraud.
          </p>
        </motion.div>

        {/* International transfers */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">International transfers</h3>
          <p className="mt-3 text-gray-700">
            Where data is transferred outside the UK, we rely on appropriate safeguards such as
            UK adequacy regulations or the UK International Data Transfer Agreement (or Addendum) and standard contractual clauses.
          </p>
        </motion.div>

        {/* Retention */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">How long we keep data</h3>
          <p className="mt-3 text-gray-700">
            We retain personal data only as long as necessary for the purposes above, typically:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
            <li>Enquiries: up to 24 months after last contact.</li>
            <li>Client records: duration of the contract + up to 7 years for compliance.</li>
            <li>Analytics & logs: typically 12–24 months.</li>
          </ul>
        </motion.div>

        {/* Your rights */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Your rights (UK GDPR)</h3>
          <p className="mt-3 text-gray-700">You have the right to: be informed, access, rectification, erasure, restrict processing, data portability, object, and rights in relation to automated decision-making. To exercise a right, email <a className="text-blue-600 hover:underline" href="mailto:info@multai.co.uk">info@multai.co.uk</a>. You can also complain to the ICO.</p>
          <p className="mt-2 text-sm text-gray-500">
            See the ICO’s guide to individual rights for details. We may ask for ID to verify your request and we will respond within one month unless extensions apply.
          </p>
        </motion.div>

        {/* Cookies & PECR */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Cookies & similar technologies</h3>
          <p className="mt-3 text-gray-700">
            We use essential cookies (for site functionality) and, with your consent, optional cookies for analytics/marketing.
            You can manage preferences via our cookie banner or your browser settings.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Under PECR, consent is generally required for non-essential cookies. Guidance is maintained by the UK ICO and may evolve.
          </p>
        </motion.div>

        {/* Marketing */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Marketing</h3>
          <p className="mt-3 text-gray-700">
            We only send marketing with a lawful basis (consent or legitimate interests) and you can unsubscribe at any time using the link in emails or by contacting us.
          </p>
        </motion.div>

        {/* Security */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Security</h3>
          <p className="mt-3 text-gray-700">
            We apply technical and organisational measures such as access controls, encryption in transit, secure development practices and regular reviews. No method is 100% secure, but we aim for industry best practice.
          </p>
        </motion.div>

        {/* Children */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Children</h3>
          <p className="mt-3 text-gray-700">Our services are not directed at children. If you believe a child’s data was provided to us, contact us and we will delete it where appropriate.</p>
        </motion.div>

        {/* Complaints */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Questions or complaints</h3>
          <p className="mt-3 text-gray-700">
            Email <a className="text-blue-600 hover:underline" href="mailto:info@multai.co.uk">info@multai.co.uk</a>.
            You also have the right to complain to the UK Information Commissioner’s Office (ICO).
          </p>
        </motion.div>

        {/* Changes */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="text-xl font-semibold text-gray-900">Changes to this policy</h3>
          <p className="mt-3 text-gray-700">We may update this policy to reflect changes in law or our practices. We’ll post the new version here and update the “Last updated” date.</p>
        </motion.div>
      </div>
    </section>
  );
}
