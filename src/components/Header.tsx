"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Code,
  Brain,
  ShieldCheck,
  Paintbrush,
  Megaphone,
  ChevronDown,
  Globe,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Service = {
  name: string;
  desc: string;
  icon: JSX.Element;
  href: string;
};

const services: Service[] = [
  { name: "Web Development",   desc: "Fast, scalable, SEO-friendly sites", icon: <Globe size={18} />,       href: "/services/web-development" },
  { name: "App Development",   desc: "Modern apps for any platform",       icon: <Code size={18} />,        href: "/services/app-development" },
  { name: "Data & AI",         desc: "Smart insights and automation",      icon: <Brain size={18} />,       href: "/services/data-ai" },
  { name: "QA Testing",        desc: "Bugs? Not on our watch",             icon: <ShieldCheck size={18} />, href: "/services/qa-testing" },
  { name: "UI/UX Design",      desc: "Designs that delight",               icon: <Paintbrush size={18} />,  href: "/services/ui-ux-design" },
  { name: "Branding & Logo",   desc: "Identity, guidelines, assets",       icon: <Palette size={18} />,     href: "/services/branding-logo" },
  { name: "Digital Marketing", desc: "Boost your reach",                   icon: <Megaphone size={18} />,   href: "/services/digital-marketing" },
];

/* ---------- Motion ---------- */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 8, pointerEvents: "none" as any },
  show: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as any,
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 22,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 22 } },
};
const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 24 } },
  exit:  { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Services menu: stable open/close logic ---
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };
  const close = (delay = 0) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (delay) {
      closeTimer.current = setTimeout(() => setServicesOpen(false), delay);
    } else {
      setServicesOpen(false);
    }
  };

  // ESC + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // lock body scroll when mobile menu is open (robust)
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  // link styles: text + gradient underline
  const linkBase =
    "relative group transition text-sm font-medium text-gray-800 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200";
  const underline = (active = false) =>
    `absolute left-0 -bottom-1 h-0.5 ${active ? "w-full" : "w-0 group-hover:w-full"} bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-gray-200 shadow-sm"
          : "bg-white/70 backdrop-blur-xl border-gray-200/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group" aria-label="Go to home">
          <img src="/logo.png" alt="MULTAI Logo" className="h-9 w-auto group-hover:opacity-95 transition" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[{ name: "Home", href: "/" }, { name: "About", href: "/about" }].map((l) => (
            <a key={l.name} href={l.href} className={linkBase} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.name}
              <span className={underline(isActive(l.href))} />
            </a>
          ))}

          {/* Services (hover/click/keyboard stable) */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={open}
            onMouseLeave={() => close(120)}
            onFocus={open}
            onBlur={(e) => {
              if (!servicesRef.current?.contains(e.relatedTarget as Node)) close();
            }}
          >
            <button
              className={`${linkBase} inline-flex items-center gap-1`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={(e) => {
                e.preventDefault();
                open(); // no toggle; avoids focus/click race
              }}
            >
              Services
              <ChevronDown size={16} className={`transition ${servicesOpen ? "rotate-180" : ""}`} />
              <span className={underline(servicesOpen || pathname?.startsWith("/services"))} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  id="services-menu"
                  key="dropdown"
                  role="menu"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 mt-3 w-[440px] bg-white rounded-2xl shadow-xl border border-gray-200 p-4 grid grid-cols-2 gap-3"
                >
                  {services.map((s) => (
                    <motion.a
                      variants={itemVariants}
                      key={s.name}
                      href={s.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 hover:shadow-sm transition"
                      role="menuitem"
                      onClick={() => close()}
                    >
                      <div className="text-blue-600 mt-0.5">{s.icon}</div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm truncate">{s.name}</div>
                        <div className="text-xs text-gray-500">{s.desc}</div>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[{ name: "Careers", href: "/careers" }, { name: "Contact", href: "/contact" }, { name: "Blogs", href: "/blog" }].map((l) => (
            <a key={l.name} href={l.href} className={linkBase} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.name}
              <span className={underline(isActive(l.href))} />
            </a>
          ))}

          {/* CTA */}
          <a
            href="/contact"
            className="ml-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition shadow-sm"
          >
            Let’s Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white border-t border-gray-200 shadow-sm"
          >
            <nav className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-gray-800" aria-label="Mobile">
              {[{ name: "Home", href: "/" }, { name: "About", href: "/about" }].map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="py-2">
                  {l.name}
                </a>
              ))}

              {/* Services accordion */}
              <details className="group">
                <summary className="py-2 cursor-pointer flex items-center justify-between">
                  <span>Services</span>
                  <ChevronDown size={18} className="transition group-open:rotate-180" />
                </summary>
                <div className="pl-3 mt-1 flex flex-col">
                  {services.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="py-2 text-gray-700 hover:text-blue-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </details>

              <a href="/careers" className="py-2" onClick={() => setMobileOpen(false)}>Careers</a>
              <a href="/contact" className="py-2" onClick={() => setMobileOpen(false)}>Contact</a>
              <a href="/blog" className="py-2" onClick={() => setMobileOpen(false)}>Blogs</a>

              <a
                href="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition shadow-sm"
                onClick={() => setMobileOpen(false)}
              >
                Let’s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
