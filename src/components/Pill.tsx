import type { ReactNode } from "react";

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-xs border transition",
        active
          ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default Pill;