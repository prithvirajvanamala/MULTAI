// src/components/CardWithTags.tsx

"use client";

import { motion, type Variants } from "framer-motion";
import { type LucideProps } from "lucide-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Define a type for the icon component, which is a Lucide icon
type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// Update the props to include the 'icon' prop
type CardWithTagsProps = {
  icon: IconComponent;
  title: string;
  tags: string[];
};

// Destructure the 'icon' prop and rename it to 'Icon' for JSX rendering
export default function CardWithTags({ icon: Icon, title, tags }: CardWithTagsProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-2">
        {/* Render the icon component passed as a prop */}
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {tag}
          </span>
        ))}
        <span className="inline-flex items-center rounded-full border border-gray-300 border-dashed bg-white px-3 py-1 text-xs font-medium text-gray-600">
          + many more
        </span>
      </div>
    </motion.div>
  );
}