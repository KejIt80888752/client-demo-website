import { useState } from "react";
import { Globe, Coffee, Home } from "lucide-react";
import TerraCrafts from "@/templates/ElectronicsStore";
import BrewAndBloom from "@/templates/FashionBoutique";
import MochaStudio from "@/templates/OrganicStore";

const templates = [
  { id: "export", label: "TerraCrafts", sublabel: "Export Business", icon: <Globe className="w-4 h-4" />, color: "bg-amber-700", component: <TerraCrafts /> },
  { id: "cafe",   label: "Brew & Bloom", sublabel: "Café & Bakery",   icon: <Coffee className="w-4 h-4" />, color: "bg-yellow-800", component: <BrewAndBloom /> },
  { id: "design", label: "Mocha Studio", sublabel: "Interior Design", icon: <Home className="w-4 h-4" />,   color: "bg-stone-700",  component: <MochaStudio /> },
];

export default function EcommerceTemplates() {
  const [active, setActive] = useState("export");
  const current = templates.find((t) => t.id === active)!;

  return (
    <div className="min-h-screen" style={{ background: "#f5f0eb" }}>
      {/* Switcher Bar */}
      <div className="sticky top-0 z-[100] bg-white border-b shadow-sm" style={{ borderColor: "#C8A97E40" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: "#8D6E63" }}>
            Client Templates:
          </p>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition border`}
                style={{
                  background: active === t.id ? "#3E2723" : "#FFF8F0",
                  color: active === t.id ? "#FFF8F0" : "#6F4E37",
                  borderColor: active === t.id ? "#3E2723" : "#C8A97E60",
                  boxShadow: active === t.id ? "0 4px 16px rgba(62,39,35,0.25)" : "none",
                }}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-white ${t.color}`}>
                  {t.icon}
                </span>
                <span>{t.label}</span>
                <span className="hidden sm:inline text-xs opacity-60">— {t.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>{current.component}</div>
    </div>
  );
}
