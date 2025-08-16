"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

type Service = {
  name: string;
  href: string;
  icon: ReactNode;
  desc: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.a
      href={service.href}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-200"
      aria-label={`Learn more about ${service.name}`}
    >
      <div className="flex items-center gap-2 text-blue-600">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-50">
          {/* subtle icon bob on hover */}
          <motion.div
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {service.icon}
          </motion.div>
        </div>
        <h3 className="font-semibold text-gray-900">{service.name}</h3>
      </div>

      <p className="mt-3 text-sm text-gray-600">{service.desc}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
        Learn more
        <ChevronRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>

      {/* gradient underline on hover */}
      <span className="block mt-3 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full" />
    </motion.a>
  );
}