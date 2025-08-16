"use client";

import { useRef } from "react";
import {
  motion,
  type Variants,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Script from "next/script";
import {
  Code2,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Cpu,
  Smartphone,
  LineChart,
  Database,
  Workflow,
  Bot,
  Layers,
  Cog,
  Palette,
  Megaphone,
  BadgeCheck,
  RefreshCcw,
} from "lucide-react";

/* ---------- Motion presets (buttery-ease) ---------- */
const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const floatIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

export default function AboutContent() {
  const prefersReducedMotion = useReducedMotion();

  /* ---------- Scroll-based parallax for hero ---------- */
  const containerRef = useRef<HTMLDivElement | null>(null); // NEW: explicit container
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    container: containerRef, // tell Framer which container to measure
    offset: ["start start", "end start"],
  });

  const heroY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -60]),
    { stiffness: 120, damping: 22, mass: 0.25 }
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.84]);

  /* ---------- Data: What we do ---------- */
  const whatWeDo = [
    { icon: <Sparkles className="h-5 w-5" />, title: "Web Design", bullets: ["Brand-aligned UI/UX", "Responsive systems", "Accessibility (WCAG)"] },
    { icon: <Code2 className="h-5 w-5" />, title: "Web & App Development", bullets: ["Next.js / React", "Secure, scalable APIs", "Performance & SEO"] },
    { icon: <Smartphone className="h-5 w-5" />, title: "Mobile Apps", bullets: ["iOS & Android (React Native)", "App store readiness", "Analytics & crashes"] },
    { icon: <Palette className="h-5 w-5" />, title: "Branding & Logo", bullets: ["Visual identity systems", "Logo, color, type", "Brand guidelines & assets"] },
    { icon: <Megaphone className="h-5 w-5" />, title: "Digital Marketing", bullets: ["SEO & content", "Paid ads & social", "Conversion tracking"] },
    { icon: <LineChart className="h-5 w-5" />, title: "Data & Analytics", bullets: ["Dashboards (Power BI, Tableau)", "Event tracking & funnels", "Experimentation"] },
    { icon: <Database className="h-5 w-5" />, title: "Reports / Data Migration", bullets: ["Legacy → Cloud (Snowflake, Redshift)", "ETL/ELT & schema design", "Data quality & lineage"] },
    { icon: <Workflow className="h-5 w-5" />, title: "QA & Test Automation", bullets: ["Unit, API, UI automation", "CI/CD gates & coverage", "Performance & security tests"] },
    { icon: <Bot className="h-5 w-5" />, title: "AI Integration", bullets: ["Chatbots, RAG, copilots", "OpenAI/Vertex/Azure OpenAI", "Ethical & secure by design"] },
    { icon: <Layers className="h-5 w-5" />, title: "CRM Integration", bullets: ["Salesforce, HubSpot, Zoho", "Leads, pipelines, automations", "Data syncs & webhooks"] },
    { icon: <Cpu className="h-5 w-5" />, title: "Cloud-Native Foundations", bullets: ["AWS / Azure / GCP", "IaC, security, observability", "Scalable architectures"] },
    { icon: <Cog className="h-5 w-5" />, title: "All Services", bullets: ["Consulting & discovery", "Product roadmaps", "Long-term support & SLAs"] },
  ];

  /* ---------- Data: Values (final 6) ---------- */
  const values = [
    { icon: <HeartHandshake className="h-6 w-6" />, name: "People First", desc: "We build with people in mind so technology truly helps clients, users, and our team." },
    { icon: <Cpu className="h-6 w-6" />, name: "Tech Leaders", desc: "We use the best, latest tools to deliver smart, future-ready solutions." },
    { icon: <ShieldCheck className="h-6 w-6" />, name: "Quality Without Compromise", desc: "Every deliverable is robust, secure, and built to last." },
    { icon: <BadgeCheck className="h-6 w-6" />, name: "Integrity & Trust", desc: "Honest communication and long-term partnerships you can rely on." },
    { icon: <Sparkles className="h-6 w-6" />, name: "Innovation with Purpose", desc: "New ideas that solve real problems and drive results." },
    { icon: <RefreshCcw className="h-6 w-6" />, name: "Agility & Adaptability", desc: "We move fast and adjust quickly as needs and markets change." },
  ];

  return (
    <>
      {/* SEO Schema */}
      <Script id="org-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MULTAI",
          url: "https://www.multai.co.uk",
          logo: "https://www.multai.co.uk/logo.png",
          sameAs: [
            "https://www.linkedin.com/company/multai",
            "https://www.instagram.com/multai",
            "https://www.youtube.com/@multai",
          ],
          address: { "@type": "PostalAddress", addressCountry: "UK", addressLocality: "London" },
        })}
      </Script>

      {/* IMPORTANT: container must be positioned */}
      <section ref={containerRef} className="relative overflow-hidden">
        {/* Decorative blobs (hero) */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
              animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-24 -right-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl"
              animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Hero */}
        <div ref={heroRef} className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="text-center"
            >
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900"
              >
                About{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  MULTAI
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto"
              >
                We craft, launch, and scale world-class digital solutions from start to finish.
                From bold branding, high-impact web & mobile apps, and powerful digital marketing—
                to AI, analytics, QA automation, CRM integration, and seamless cloud migration—
                we blend creativity and technology to turn ideas into lasting impact.
              </motion.p>

              <motion.div variants={floatIn} className="mt-8">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-6 py-3 text-sm font-semibold text-white shadow-sm transition"
                >
                  Start a Project
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "-80px" }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">
                Transform Your Vision Into Reality —
              </span>{" "}
              we deliver creative, reliable software that solves real problems,
              blends seamlessly into your workflows, and scales with your growth. We obsess
              over quality, performance, and usability.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3, margin: "-80px" }}
          >
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To be the go-to partner for businesses ready to innovate—helping them launch faster,
              stand out with exceptional design, and operate smarter through the power of cloud,
              AI, and human-centred technology.
            </p>
          </motion.div>
        </div>

        {/* What we do */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
          {!prefersReducedMotion && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-10 left-1/3 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl"
                animate={{ y: [0, 14, 0], x: [0, -6, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 right-1/4 h-60 w-60 rounded-full bg-cyan-200/30 blur-3xl"
                animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          <div className="relative max-w-6xl mx-auto px-6">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="text-xl font-semibold text-gray-900 text-center"
            >
              What we do
            </motion.h3>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mt-2 text-center text-sm text-gray-700 max-w-2xl mx-auto"
            >
              From idea to impact—brand, UX, engineering, data, AI, marketing, and integrations under one roof.
            </motion.p>

            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whatWeDo.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: "0 14px 28px rgba(0,0,0,0.12)" }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm will-change-transform"
                >
                  <div className="flex items-center gap-2 text-blue-600">
                    <motion.div
                      aria-hidden
                      animate={prefersReducedMotion ? {} : { rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-50"
                    >
                      {item.icon}
                    </motion.div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600 list-disc pl-5">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Our Values */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-xl font-semibold text-gray-900 text-center"
          >
            Our Values
          </motion.h3>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-2 text-center text-sm text-gray-600 max-w-2xl mx-auto"
          >
            The principles that guide our work and shape our culture.
          </motion.p>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {v.icon}
                </div>
                <div className="mt-3 font-semibold text-gray-900">{v.name}</div>
                <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 md:p-10 text-center text-white shadow-lg"
            >
              <motion.h3 variants={floatIn} className="text-2xl md:text-3xl font-extrabold">
                Let’s build something great together.
              </motion.h3>
              <motion.p variants={floatIn} className="mt-2 opacity-90">
                Tell us what you’re trying to achieve—we’ll map the fastest path to value.
              </motion.p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-6 py-3 text-sm font-semibold transition"
              >
                Talk to the team
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
