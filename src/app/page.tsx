"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// New: consistent Lucide icons for the Why Choose section
import {
  Target,
  Bot,
  Rocket,
  Wrench,
  Shield,
  Link2,
  Zap,
  Palette,
} from "lucide-react";

export default function WhatWeOffer() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const services = [
    { title: "Web Development", desc: "Custom websites using modern stacks: fast, responsive, SEO-friendly.", icon: "/services/web.svg" },
    { title: "App Development", desc: "Build performant mobile apps with native or cross-platform frameworks.", icon: "/services/mobile-development.svg" },
    { title: "UI/UX Design", desc: "User-first, intuitive, and inclusive experiences that wow.", icon: "/services/design.svg" },
    { title: "Branding & Logo", desc: "Crafting strong brand identity through visuals & storytelling.", icon: "/services/branding.svg" },
    { title: "Digital Marketing", desc: "SEO, social media, paid ads & campaigns that convert.", icon: "/services/marketing.svg" },
    { title: "Cloud & DevOps", desc: "Deploy scalable solutions on AWS, Azure, GCP with CI/CD.", icon: "/services/cloud.svg" },
    { title: "AI & Automation", desc: "Enhance platforms with AI chatbots, predictions & workflows.", icon: "/services/ai.svg" },
    { title: "QA & Testing", desc: "Ensure quality through manual, automated, and performance testing.", icon: "/services/qa.svg" },
    { title: "Data & Analytics", desc: "Turn your data into actionable insights with modern BI.", icon: "/services/data.svg" },
    { title: "System Integration", desc: "Seamlessly connect your apps and services for better workflows.", icon: "/services/integration.svg" },
  ];

  // Updated: consistent icon components instead of emojis
  const whyChoose = [
    {
      title: "Custom-Tailored Solutions",
      desc: "Every project is uniquely crafted — no copy-paste templates.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "AI & Automation Ready",
      desc: "We embed smart automation and AI models to boost efficiency.",
      icon: <Bot className="h-6 w-6" />,
    },
    {
      title: "End-to-End Ownership",
      desc: "From discovery to deployment — we handle the entire lifecycle.",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Maintenance & Support",
      desc: "We’re your partner beyond launch — 24/7 support & updates.",
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      title: "Security First Approach",
      desc: "Data encryption, compliance, and secured-by-default systems.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Seamless Integrations",
      desc: "Plug into your tech stack — Salesforce, Stripe, Zapier & more.",
      icon: <Link2 className="h-6 w-6" />,
    },
    {
      title: "Speed + Scalability",
      desc: "Fast MVPs that scale — powered by cloud-native architecture.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Human-Centered Design",
      desc: "Built for people. We focus on accessibility and user delight.",
      icon: <Palette className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-white text-gray-900">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="text-center py-24 px-6 bg-gradient-to-r from-blue-100 via-white to-cyan-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Transform Your Vision <br /> Into{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto text-justify"
        >
          At MULTAI, we empower businesses through expertly crafted websites,
          immersive UI/UX design, custom branding, logo creation, targeted
          digital marketing, quality assurance testing, scalable cloud
          deployment, AI-driven automation, data analytics, and seamless system
          integration — all tailored for growth and innovation.
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500  text-white px-8 py-3 rounded-full font-semibold text-sm transition"
        >
          Let’s Talk
        </motion.a>
      </motion.div>

      {/* What We Offer */}
      <div className="max-w-7xl mx-auto py-20 px-6 relative">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>

        {/* Nav buttons */}
        <button
          ref={prevRef}
          className="hidden md:flex absolute left-[-70px] top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all shadow"
        >
          ←
        </button>
        <button
          ref={nextRef}
          className="hidden md:flex absolute right-[-70px] top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all shadow"
        >
          →
        </button>

        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          pagination={{ el: ".custom-pagination", clickable: true }}
          autoplay={{ delay: 4000 }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {services.map(({ title, desc, icon }, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 h-full text-center flex flex-col justify-between transition"
              >
                <div>
                  <img src={icon} alt={title} className="h-12 mb-6 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm text-justify">{desc}</p>
                </div>
                <a
                  href="/contact"
                  className="mt-4 inline-block text-blue-500 to-cyan-500 text-sm font-semibold hover:underline"
                >
                  Learn More →
                </a>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-10 flex justify-center gap-2"></div>
      </div>

      {/* About MULTAI */}
      <div className="relative py-24 px-6 bg-gradient-to-r from-blue-100 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
              About <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">MULTAI</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
              We craft, launch, and scale world-class digital solutions from start to finish.
              From bold branding, high-impact web & mobile apps, and powerful digital marketing—
              to AI, analytics, QA automation, CRM integration, and seamless cloud migration—we
              blend creativity and technology to turn ideas into lasting impact.
            </p>
            <a
              href="/about"
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-700 transition"
            >
              Know More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <img src="/about-illustration.svg" alt="About MULTAI" className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>

      {/* Why Choose MULTAI (icons now consistent) */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MULTAI?</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {whyChoose.map(({ title, desc, icon }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -5, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm text-justify">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
