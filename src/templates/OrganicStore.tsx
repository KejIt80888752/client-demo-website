import { useState } from "react";
import { Leaf, ShoppingBasket, Star, Search, Heart, ChevronRight, Menu, X, Droplets, Wind, Sun } from "lucide-react";

const products = [
  { id: 1, name: "Raw Wildflower Honey", price: 18, rating: 4.9, unit: "350g", category: "Pantry", img: "🍯", tag: "Organic", tagColor: "bg-amber-100 text-amber-700" },
  { id: 2, name: "Cold-Pressed Olive Oil", price: 24, rating: 4.8, unit: "500ml", category: "Pantry", img: "🫒", tag: "Raw", tagColor: "bg-green-100 text-green-700" },
  { id: 3, name: "Superfood Berry Mix", price: 32, rating: 4.7, unit: "200g", category: "Snacks", img: "🫐", tag: "Vegan", tagColor: "bg-purple-100 text-purple-700" },
  { id: 4, name: "Herbal Sleep Tea", price: 15, rating: 4.9, unit: "30 bags", category: "Drinks", img: "🍵", tag: "Caffeine Free", tagColor: "bg-teal-100 text-teal-700" },
  { id: 5, name: "Cacao Protein Powder", price: 45, rating: 4.6, unit: "500g", category: "Supplements", img: "🍫", tag: "Non-GMO", tagColor: "bg-brown-100 text-yellow-800" },
  { id: 6, name: "Spirulina Capsules", price: 28, rating: 4.8, unit: "90 caps", category: "Supplements", img: "💊", tag: "Lab Tested", tagColor: "bg-lime-100 text-lime-700" },
];

const benefits = [
  { icon: <Leaf className="w-6 h-6" />, label: "100% Organic", sub: "Certified by USDA" },
  { icon: <Droplets className="w-6 h-6" />, label: "No Additives", sub: "Pure & natural always" },
  { icon: <Wind className="w-6 h-6" />, label: "Eco Packaging", sub: "Plastic-free shipping" },
  { icon: <Sun className="w-6 h-6" />, label: "Farm Direct", sub: "Traceable sourcing" },
];

export default function OrganicStore() {
  const [basket, setBasket] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [qty, setQty] = useState<Record<number, number>>({});

  const addToBasket = (id: number) => {
    setBasket((p) => [...p, id]);
    setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));
  };
  const toggleWish = (id: number) =>
    setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f8f5f0", color: "#2d2a24" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e8e0d4] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-bold text-lg tracking-tight">Verdure</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-500">
            {["Shop", "About", "Our Farms", "Blog", "Recipes"].map((n) => (
              <button key={n} className="hover:text-green-700 transition">{n}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full"><Search className="w-4 h-4" /></button>
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBasket className="w-4 h-4" />
              {basket.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{basket.length}</span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-2 text-sm text-gray-500 border-t border-gray-100">
            {["Shop", "About", "Our Farms", "Blog", "Recipes"].map((n) => (
              <button key={n} className="text-left py-1 hover:text-green-700">{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="relative py-20 px-5 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #f8f5f0 100%)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              <Leaf className="w-3 h-3" /> Certified Organic · No Compromises
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#2d2a24]">
              Nourish Your Body<br />
              <span className="text-green-600">Naturally.</span>
            </h1>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Handpicked from regenerative farms. Every product is traceable, pure, and packed with nature's goodness.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold text-sm flex items-center gap-2 transition shadow-lg shadow-green-200">
                Shop Now <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-white border border-green-200 text-green-700 rounded-full font-semibold text-sm hover:bg-green-50 transition">
                Our Story
              </button>
            </div>
            <p className="text-xs text-gray-400">⭐ 12,000+ happy customers · 4.9/5 average rating</p>
          </div>
          <div className="text-[130px] select-none drop-shadow-lg">🌿</div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-white border-y border-[#e8e0d4] py-6 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-700 rounded-xl">{icon}</div>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center mb-10">
          <p className="text-xs text-green-600 tracking-widest uppercase mb-2">Best Sellers</p>
          <h2 className="text-3xl font-bold">From Earth to Your Table</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">All products are lab-tested, non-GMO, and free from artificial additives.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-[#e8e0d4] hover:shadow-lg transition group">
              <div className="relative bg-[#f8f5f0] p-8 flex items-center justify-center">
                <span className="text-8xl group-hover:scale-110 transition duration-300">{p.img}</span>
                <button
                  onClick={() => toggleWish(p.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-rose-400 text-rose-400" : "text-gray-300"}`} />
                </button>
                <span className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-medium ${p.tagColor}`}>{p.tag}</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{p.unit}</p>
                  </div>
                  <span className="text-lg font-bold text-green-700">${p.price}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? "fill-current" : "text-gray-200"}`} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{p.rating}</span>
                </div>
                <button
                  onClick={() => addToBasket(p.id)}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBasket className="w-4 h-4" />
                  {qty[p.id] ? `In Basket (${qty[p.id]})` : "Add to Basket"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Banner */}
      <section
        className="py-16 px-5 text-center"
        style={{ background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)" }}
      >
        <Leaf className="w-10 h-10 text-green-200 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-3">1% of Revenue Funds Reforestation</h2>
        <p className="text-green-200 max-w-lg mx-auto text-sm leading-relaxed mb-6">
          We've planted over 80,000 trees globally. Every purchase you make directly supports regenerative farming and forest restoration.
        </p>
        <button className="px-8 py-3 bg-white text-green-800 rounded-full font-semibold text-sm hover:bg-green-50 transition">
          Learn More
        </button>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-14 px-5 text-center border-t border-[#e8e0d4]">
        <h2 className="text-2xl font-bold mb-2">Get Weekly Wellness Tips</h2>
        <p className="text-gray-400 text-sm mb-6">Recipes, health guides, and exclusive offers — straight to your inbox.</p>
        <div className="flex max-w-sm mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2.5 border border-[#e8e0d4] rounded-xl text-sm focus:outline-none focus:border-green-400"
          />
          <button className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </section>

      <footer className="bg-[#2d2a24] text-gray-400 py-8 px-5 text-center text-xs">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Leaf className="w-4 h-4 text-green-400" />
          <span className="text-white font-bold text-base">Verdure</span>
        </div>
        <div className="flex justify-center gap-5 mb-3">
          {["Shop", "About", "Sustainability", "Contact", "Privacy"].map((l) => (
            <button key={l} className="hover:text-white transition">{l}</button>
          ))}
        </div>
        <p>© 2026 Verdure Organics. Made with 🌱 for the planet.</p>
      </footer>
    </div>
  );
}
