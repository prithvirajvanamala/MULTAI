"use client";

import { motion, type Variants } from "framer-motion";
import {
  Globe,
  Code,
  Brain,
  ShieldCheck,
  Paintbrush,
  Megaphone,
  Palette,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

/* ---------- Motion presets ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function ServicesPageContent() {
  const services = [
    {
      name: "Web Development",
      href: "/services/web-development",
      icon: <Globe className="h-5 w-5" />,
      desc: "Fast, secure, SEO-ready websites and web apps built on modern stacks that scale.",
    },
    {
      name: "App Development",
      href: "/services/app-development",
      icon: <Code className="h-5 w-5" />,
      desc: "iOS & Android apps with smooth UX, robust APIs, and CI/CD for reliable releases.",
    },
    {
      name: "Data & AI",
      href: "/services/data-ai",
      icon: <Brain className="h-5 w-5" />,
      desc: "Pipelines, BI dashboards, and practical AI (chatbots, RAG, copilots) with guardrails.",
    },
    {
      name: "QA Testing",
      href: "/services/qa-testing",
      icon: <ShieldCheck className="h-5 w-5" />,
      desc: "Strategy, automation, and CI gates for quality at speed—unit, API, E2E, perf, a11y.",
    },
    {
      name: "UI/UX Design",
      href: "/services/ui-ux-design",
      icon: <Paintbrush className="h-5 w-5" />,
      desc: "Human-centered research, flows, prototypes, and design systems that ship cleanly.",
    },
    {
      name: "Branding & Logo",
      href: "/services/branding-logo",
      icon: <Palette className="h-5 w-5" />,
      desc: "Brand strategy, visual identity, logo suites, and brand kits for a consistent launch.",
    },
    {
      name: "Digital Marketing",
      href: "/services/digital-marketing",
      icon: <Megaphone className="h-5 w-5" />,
      desc: "Technical SEO, content, and paid campaigns that convert—with clear reporting.",
    },
  ];

  return (
    <section className="text-gray-800">
      {/* Hero (consistent with site) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Decorative blobs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-24 -right-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Strategy to scale—design, build, data, AI, and growth under one roof.
            Click any card to explore the service in detail.
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <ServiceCard key={s.name} service={s} />
          ))}
        </motion.div>
      </div>

      {/* CTA strip */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 md:p-10 text-center text-white shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Not sure where to start?
            </h3>
            <p className="mt-2 opacity-90">
              Tell us your goals—we’ll map the fastest path to value.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500/10 px-6 py-3 text-sm font-semibold hover:opacity-90 bg-white/20 transition"
            >
              Talk to the team
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}