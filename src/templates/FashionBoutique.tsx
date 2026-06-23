import { useState } from "react";
import { ShoppingBag, Search, Heart, ChevronRight, Star, Menu, X, Instagram, Twitter, Facebook } from "lucide-react";

const products = [
  { id: 1, name: "Linen Oversized Blazer", price: 189, oldPrice: 240, color: "Ivory", category: "Outerwear", img: "🧥", hot: true },
  { id: 2, name: "Silk Slip Dress", price: 145, oldPrice: null, color: "Champagne", category: "Dresses", img: "👗", hot: false },
  { id: 3, name: "Wide-Leg Trousers", price: 99, oldPrice: 130, color: "Camel", category: "Bottoms", img: "👖", hot: true },
  { id: 4, name: "Knit Crop Cardigan", price: 79, oldPrice: null, color: "Sage", category: "Tops", img: "🧶", hot: false },
  { id: 5, name: "Leather Mini Bag", price: 225, oldPrice: 280, color: "Cognac", category: "Bags", img: "👜", hot: true },
  { id: 6, name: "Platform Mules", price: 169, oldPrice: null, color: "Black", category: "Shoes", img: "👠", hot: false },
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear", "Bags", "Shoes"];

export default function FashionBoutique() {
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [bag, setBag] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleWish = (id: number) =>
    setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900 font-serif">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white text-center text-xs py-2 tracking-widest uppercase">
        Free Shipping on Orders Over $150 · Use Code: LUXE20
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#faf9f7]/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden md:flex gap-7 text-xs tracking-widest uppercase text-gray-500">
            {["New In", "Clothing", "Accessories", "Sale"].map((n) => (
              <button key={n} className="hover:text-gray-900 transition">{n}</button>
            ))}
          </div>
          <h1 className="text-2xl font-bold tracking-[0.15em] uppercase absolute left-1/2 -translate-x-1/2">Maison·Elé</h1>
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-gray-100 rounded-full"><Search className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full relative">
              <ShoppingBag className="w-4 h-4" />
              {bag.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{bag.length}</span>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-xs tracking-widest uppercase text-gray-500">
            {["New In", "Clothing", "Accessories", "Sale"].map((n) => (
              <button key={n} className="text-left py-1 hover:text-gray-900">{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative bg-[#f0ebe3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500">Summer Collection 2026</p>
            <h2 className="text-5xl md:text-7xl font-bold leading-none">
              Effortless<br />
              <em className="font-normal not-italic text-[#c8a882]">Elegance</em>
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
              Thoughtfully crafted pieces for the modern woman. Timeless silhouettes, sustainable fabrics.
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setBag((p) => [...p, 0])}
                className="px-8 py-3 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-700 transition"
              >
                Shop Collection
              </button>
              <button className="px-8 py-3 border border-gray-300 text-xs tracking-widest uppercase hover:border-gray-500 transition">
                Lookbook
              </button>
            </div>
          </div>
          <div className="text-[140px] select-none">👗</div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="border-b border-gray-200 bg-white sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-6 overflow-x-auto py-3 text-xs tracking-widest uppercase">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap pb-1 border-b-2 transition ${active === c ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-[#f0ebe3] rounded aspect-[3/4] flex items-center justify-center mb-4">
                <span className="text-8xl group-hover:scale-110 transition duration-500">{p.img}</span>
                {p.hot && (
                  <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs px-2 py-0.5 tracking-widest uppercase">Hot</span>
                )}
                {p.oldPrice && (
                  <span className="absolute top-3 right-10 bg-[#c8a882] text-white text-xs px-2 py-0.5 tracking-widest uppercase">Sale</span>
                )}
                <button
                  onClick={() => toggleWish(p.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm"
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlist.includes(p.id) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
                </button>
                <button
                  onClick={() => setBag((prev) => [...prev, p.id])}
                  className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white text-xs tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition duration-300"
                >
                  Quick Add
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 tracking-widest uppercase">{p.color}</p>
                <h3 className="text-sm font-medium">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">${p.price}</span>
                  {p.oldPrice && <span className="text-xs text-gray-400 line-through">${p.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="bg-gray-900 text-white py-16 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Sustainability Pledge</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Made to Last. Worn to Love.</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed mb-6">
          Every piece is crafted from ethically sourced materials. We plant one tree for every order placed.
        </p>
        <button className="border border-white text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-gray-900 transition">
          Our Story
        </button>
      </section>

      {/* Newsletter */}
      <section className="bg-[#f0ebe3] py-14 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">Stay in the Loop</p>
        <h2 className="text-2xl font-bold mb-4">Get Early Access to New Arrivals</h2>
        <div className="flex max-w-sm mx-auto gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 border border-gray-300 bg-white text-sm focus:outline-none focus:border-gray-500"
          />
          <button className="px-5 py-2 bg-gray-900 text-white text-xs tracking-widest uppercase whitespace-nowrap">
            Join
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold tracking-widest uppercase text-lg">Maison·Elé</span>
          <div className="flex gap-5 text-xs tracking-widest uppercase">
            {["About", "Returns", "Contact", "Sustainability"].map((l) => (
              <button key={l} className="hover:text-white transition">{l}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition" />
            <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition" />
            <Facebook className="w-4 h-4 hover:text-white cursor-pointer transition" />
          </div>
        </div>
        <p className="text-center text-xs mt-6 text-gray-600">© 2026 Maison·Elé. All rights reserved.</p>
      </footer>
    </div>
  );
}
