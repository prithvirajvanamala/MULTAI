"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------- Motion presets (consistent across site) ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 190, damping: 22 },
  },
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blog" }
  ];

  // Newsletter state (wired to /api/subscribe)
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") || "").toString().trim();

    setOk(null);
    setErr(null);
    if (!email) {
      setErr("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Failed to subscribe.");
      setOk(data?.message || "Thanks! Please check your inbox to confirm.");
      form.reset();
    } catch (e: any) {
      setErr(e?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 text-gray-800 border-t border-gray-200 px-6 pt-16 pb-8 font-sans">
      {/* top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent"
      />
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="MULTAI" className="h-10 w-auto" />
              {/*<motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="text-l font-bold tracking-wide bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] text-transparent bg-clip-text drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]"
              >
                MULTAI
              </motion.span>*/}
            </div>

            {/* Brand line aligned with your hero language */}
            <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
              <span className="font-semibold">Transform Your Vision</span>
              <br />
              <span className="font-semibold">Into Reality — at MULTAI.</span>
            </p>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition shadow-sm"
              >
                Say Hello
                <ArrowRight size={16} className="opacity-90" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            aria-label="Quick links"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <motion.ul variants={listStagger} className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li variants={itemFade} key={link.name}>
                  <motion.a
                    href={link.href}
                    className="group relative inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                    whileHover={{ x: 2 }}
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-px h-0.5 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden
                    />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>

          {/* Office (UK only) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Office</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="space-y-1">
                <strong className="text-gray-900">MULTAI LTD</strong>
                <address className="not-italic">
                  <a
                    href="https://maps.google.com/?q=MULTAI%20LTD%2C%2093%20Leven%20Dr%2C%20Waltham%20Cross%2C%20EN99AX%2C%20United%20Kingdom"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    93 Leven Dr,
                    <br />
                    Waltham Cross, EN99AX
                    <br />
                    United Kingdom
                  </a>
                </address>
              </div>
              <p>
                <span className="font-medium text-gray-600">Phone:</span>{" "}
                <a className="hover:underline" href="tel:+447442245995">
                  +44 7442 245995
                </a>
              </p>
              <p>
                <span className="font-medium text-gray-600">Email:</span>{" "}
                <a className="hover:underline" href="mailto:info@multai.co.uk">
                  info@multai.co.uk
                </a>
              </p>
            </div>
          </motion.div>

          {/* Newsletter + Social */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h4>

            <form className="flex items-center gap-2 mb-3" onSubmit={onSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                inputMode="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm "
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 disabled:opacity-60 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-sm"
                aria-label="Join newsletter"
              >
                {loading ? "Please wait…" : "Join"}
              </button>
            </form>

            {/* messages */}
            {ok && (
              <p className="text-xs text-emerald-700 mb-3" role="status" aria-live="polite">
                {ok}
              </p>
            )}
            {err && (
              <p className="text-xs text-red-600 mb-3" role="alert" aria-live="assertive">
                {err}
              </p>
            )}

            <div className="flex items-center gap-4">
              {[
                { icon: "linkedin",  alt: "LinkedIn",  href: "https://www.linkedin.com/company/multai-ltd" },
                { icon: "instagram", alt: "Instagram", href: "https://www.instagram.com/multai.ltd" },
                { icon: "whatsapp",  alt: "WhatsApp",  href: "https://wa.me/447442245995" },
                { icon: "youtube",   alt: "YouTube",   href: "https://www.youtube.com/@multai-ltd" },
              ].map(({ icon, alt, href }) => (
                <motion.a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={alt}
                  title={alt}
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow transition"
                >
                  <img src={`/icons/${icon}.svg`} alt={alt} className="h-5 w-5" />
                  <span className="sr-only">{alt}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-12 pt-6 border-t border-gray-100 text-center"
        >
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MULTAI. All rights reserved.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-gray-700 transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gray-700 transition">
              Terms
            </a>
            <a href="/sitemap" className="hover:text-gray-700 transition">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
