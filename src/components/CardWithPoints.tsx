"use client";

import { motion, type Variants } from "framer-motion";
import { type LucideProps } from "lucide-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Define a type for the icon component, which is a Lucide icon
type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

// Update the props to accept the icon as a component reference
type CardWithPointsProps = {
  icon?: IconComponent;
  title: string;
  points?: string[];
  bullets?: string[];
};

// Destructure the 'icon' prop and alias it to 'Icon' for proper JSX rendering
export default function CardWithPoints({
  icon: Icon,
  title,
  points,
  bullets,
}: CardWithPointsProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.06)" }}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        {/* Check if an Icon component exists, then render it */}
        {Icon && (
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
            {/* Instantiate the component with JSX syntax */}
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm text-gray-600 list-disc pl-5">
        {(points || bullets || []).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </motion.div>
  );
}