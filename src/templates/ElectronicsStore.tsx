import { useState } from "react";
import { ShoppingCart, Search, Star, Zap, Shield, Truck, ChevronRight, Heart, Menu, X } from "lucide-react";

const products = [
  { id: 1, name: "ProMax Laptop 16\"", price: 1299, rating: 4.8, reviews: 2341, tag: "Best Seller", badge: "bg-blue-500", img: "💻" },
  { id: 2, name: "Nova Wireless Earbuds", price: 199, rating: 4.7, reviews: 5832, tag: "New", badge: "bg-green-500", img: "🎧" },
  { id: 3, name: "UltraTab Pro 12", price: 849, rating: 4.6, reviews: 1204, tag: "Hot Deal", badge: "bg-red-500", img: "📱" },
  { id: 4, name: "4K SmartWatch X", price: 349, rating: 4.9, reviews: 987, tag: "Top Rated", badge: "bg-purple-500", img: "⌚" },
  { id: 5, name: "Mechanical Keyboard RGB", price: 149, rating: 4.5, reviews: 3210, tag: "Sale", badge: "bg-orange-500", img: "⌨️" },
  { id: 6, name: "Gaming Mouse Pro", price: 89, rating: 4.7, reviews: 7643, tag: "Popular", badge: "bg-cyan-500", img: "🖱️" },
];

export default function ElectronicsStore() {
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const addToCart = (id: number) => setCart((prev) => [...prev, id]);
  const toggleWish = (id: number) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-400 w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">TechNova</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            {["Laptops", "Phones", "Audio", "Wearables", "Accessories"].map((n) => (
              <button key={n} className="hover:text-white transition">{n}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"><Search className="w-4 h-4" /></button>
            <button className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
            <button className="md:hidden p-2 rounded-lg bg-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-3 flex flex-col gap-2 text-sm text-gray-400">
            {["Laptops", "Phones", "Audio", "Wearables", "Accessories"].map((n) => (
              <button key={n} className="text-left py-1 hover:text-white">{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-950 py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-5">
            <span className="inline-block px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">New Arrivals 2026</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Next-Gen Tech.<br />
              <span className="text-blue-400">Delivered Fast.</span>
            </h1>
            <p className="text-gray-400 max-w-md">Premium electronics with 2-day shipping, 1-year warranty, and hassle-free returns.</p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold flex items-center gap-2 transition">
                Shop Now <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-xl font-semibold transition">View Deals</button>
            </div>
          </div>
          <div className="text-9xl select-none">💻</div>
        </div>
      </section>

      {/* Trust badges */}
      <div className="bg-gray-900 border-y border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          {[["🚚", "Free 2-Day Shipping"], ["🛡️", "1-Year Warranty"], ["🔄", "30-Day Returns"], ["⭐", "4.8/5 Rating"]].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2">{icon} {text}</div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-blue-500/50 transition group">
              <div className="relative">
                <div className="text-7xl text-center py-6 bg-gray-800 rounded-xl mb-4 group-hover:scale-105 transition">{p.img}</div>
                <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs rounded-full text-white ${p.badge}`}>{p.tag}</span>
                <button
                  onClick={() => toggleWish(p.id)}
                  className="absolute top-2 right-2 p-1.5 bg-gray-900 rounded-lg"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                </button>
              </div>
              <h3 className="font-semibold mb-1">{p.name}</h3>
              <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                <Star className="w-3 h-3 fill-current" />
                <span>{p.rating}</span>
                <span className="text-gray-500">({p.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-400">${p.price}</span>
                <button
                  onClick={() => addToCart(p.id)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition flex items-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900 border-t border-gray-800 py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            [<Truck className="w-8 h-8 mx-auto text-blue-400" />, "Free Shipping", "On all orders over $50"],
            [<Shield className="w-8 h-8 mx-auto text-green-400" />, "Secure Payment", "256-bit SSL encryption"],
            [<Zap className="w-8 h-8 mx-auto text-yellow-400" />, "24/7 Support", "Live chat & phone support"],
          ].map(([icon, title, sub]) => (
            <div key={String(title)} className="space-y-2">
              {icon}
              <h3 className="font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-950 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        © 2026 TechNova. All rights reserved.
      </footer>
    </div>
  );
}
