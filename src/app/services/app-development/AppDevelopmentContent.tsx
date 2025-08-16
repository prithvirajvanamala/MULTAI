// src/app/services/app-development/AppDevelopmentContent.tsx

"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CardWithPoints from "@/components/CardWithPoints";
import CardWithTags from "@/components/CardWithTags";
import {
  fadeUp,
  containerStagger,
  scope,
  quality,
  deliverables,
  process,
  tech,
} from "./app-development.data";

export default function AppDevelopmentContent() {
  return (
    <section className="text-gray-800">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            App{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Development
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            High-performance iOS & Android apps with great UX, reliable releases, and scalable foundations.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-6 py-3 text-sm font-semibold text-white shadow-sm transition"
            >
              Start a Project
            </a>
            <a
              href="/services"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
            >
              All Services
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* What we’ll do */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-bold text-center text-gray-900"
        >
          What we’ll do
        </motion.h2>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {scope.map((item) => (
            <CardWithPoints key={item.title} {...item} />
          ))}
        </motion.div>
      </div>

      {/* Quality & delivery */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl font-bold text-center text-gray-900"
          >
            Quality & delivery
          </motion.h2>
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quality.map((item) => (
              <CardWithPoints key={item.title} {...item} />
            ))}
          </motion.div>

          {/* Link to QA service page */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <a
              href="/services/qa-testing"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-6 py-3 text-sm font-semibold text-white transition"
            >
              Explore QA Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-bold text-center text-gray-900"
        >
          What you get
        </motion.h2>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {deliverables.map((item) => (
            <CardWithPoints key={item.title} {...item} />
          ))}
        </motion.div>
        <p className="mt-4 text-center text-xs text-gray-500">
          KT, training and handover are included. Documentation is part of the work—not an afterthought.
        </p>
      </div>

      {/* Process */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-bold text-center text-gray-900"
        >
          How we work
        </motion.h2>
        <motion.ol
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid md:grid-cols-7 gap-6"
        >
          {process.map((p) => (
            <motion.li
              key={p.step}
              variants={fadeUp}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="text-xs font-semibold text-blue-600">{p.step}</div>
              <div className="mt-1 font-semibold text-gray-900">{p.title}</div>
              <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {/* Tech & tools */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-bold text-center text-gray-900"
        >
          Tech & tools
        </motion.h2>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tech.map((item) => (
            <CardWithTags key={item.title} {...item} />
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 p-6 md:p-10 text-center text-white shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Ready to launch your app?
            </h3>
            <p className="mt-2 opacity-90">
              Tell us your goals — we’ll map the fastest path to value.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90"
            >
              Talk to the team
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}