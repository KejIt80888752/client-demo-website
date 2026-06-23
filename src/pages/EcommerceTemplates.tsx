import { useState } from "react";
import { Zap, Shirt, Leaf } from "lucide-react";
import ElectronicsStore from "@/templates/ElectronicsStore";
import FashionBoutique from "@/templates/FashionBoutique";
import OrganicStore from "@/templates/OrganicStore";

const templates = [
  {
    id: "electronics",
    label: "Electronics Store",
    icon: <Zap className="w-4 h-4" />,
    desc: "Dark, modern tech store",
    color: "bg-blue-500",
    component: <ElectronicsStore />,
  },
  {
    id: "fashion",
    label: "Fashion Boutique",
    icon: <Shirt className="w-4 h-4" />,
    desc: "Minimal luxury fashion",
    color: "bg-rose-400",
    component: <FashionBoutique />,
  },
  {
    id: "organic",
    label: "Organic Store",
    icon: <Leaf className="w-4 h-4" />,
    desc: "Earthy natural products",
    color: "bg-green-500",
    component: <OrganicStore />,
  },
];

export default function EcommerceTemplates() {
  const [active, setActive] = useState("electronics");
  const current = templates.find((t) => t.id === active)!;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Switcher Bar */}
      <div className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">Templates:</p>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition border ${
                  active === t.id
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${t.color}`}>
                  {t.icon}
                </span>
                {t.label}
                <span className={`hidden sm:inline text-xs ${active === t.id ? "text-gray-300" : "text-gray-400"}`}>
                  — {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render active template */}
      <div>{current.component}</div>
    </div>
  );
}
