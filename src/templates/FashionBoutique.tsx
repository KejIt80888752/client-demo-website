import { useState, useEffect } from "react";
import { Menu, X, Star, CheckCircle, Phone, Mail, MapPin, ArrowRight, Coffee, Clock, Heart, Award } from "lucide-react";

const NAV = ["Home","Menu","About","Gallery","Testimonials","Contact"];
const C = { dark: "#3E2723", mid: "#6F4E37", light: "#C8A97E", cream: "#FFF8F0", white: "#FFFFFF", text: "#2C1810" };

const MENU_ITEMS = [
  { cat: "Signature Coffees", items: [
    { name: "Mocha Velvet", price: "₹280", desc: "Rich espresso blended with dark chocolate and steamed milk, topped with cocoa dust." },
    { name: "Caramel Cortado", price: "₹260", desc: "Bold espresso cut with warm caramel-infused milk for a perfectly balanced sip." },
    { name: "Brown Sugar Latte", price: "₹270", desc: "Smooth espresso with brown sugar syrup, oat milk, and a hint of cinnamon." },
    { name: "Cold Brew Float", price: "₹320", desc: "24-hour cold brew topped with vanilla ice cream and toasted coconut flakes." },
  ]},
  { cat: "Artisan Bakes", items: [
    { name: "Walnut Brownie", price: "₹180", desc: "Fudgy dark chocolate brownie loaded with toasted walnuts and sea salt flakes." },
    { name: "Cinnamon Roll", price: "₹220", desc: "Soft, pillowy roll glazed with brown butter icing and crushed pecans." },
    { name: "Almond Croissant", price: "₹240", desc: "Flaky butter croissant filled with almond frangipane, baked to golden perfection." },
  ]},
];

const GALLERY = ["☕","🍰","🫘","🥐","🍵","🧁"];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Food Blogger", text: "The Brown Sugar Latte here is absolutely divine. Best café in the city — cozy vibes, incredible coffee!", rating: 5 },
  { name: "Rohan Mehta", role: "Regular Customer", text: "I work from here every weekend. The ambience is perfect, WiFi is great, and the Walnut Brownies are addictive.", rating: 5 },
  { name: "Ananya Das", role: "Instagram Foodie", text: "Every single item on the menu is a work of art. The Cold Brew Float is next level. Highly recommend!", rating: 5 },
];

export default function BrewAndBloom() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeCat, setActiveCat] = useState("Signature Coffees");
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", date:"", time:"", guests:"", message:"" }); }, 4000);
  };

  const currentItems = MENU_ITEMS.find(m => m.cat === activeCat)?.items || [];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: C.white, color: C.text }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? C.white : "transparent",
        boxShadow: scrolled ? `0 2px 20px ${C.mid}20` : "none",
        borderBottom: scrolled ? `1px solid ${C.light}40` : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Coffee style={{ width: 28, height: 28, color: C.mid }} />
            <span style={{ fontSize: 22, fontWeight: 800, color: C.dark }}>Brew <span style={{ color: C.mid }}>&</span> Bloom</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="bb-desktop">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                  background: activeNav === n ? C.mid : "transparent", color: activeNav === n ? C.white : C.dark }}>
                {n}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginLeft: 8, padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white }}>
              Reserve a Table
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="bb-mobile">
            {menuOpen ? <X style={{ color: C.dark }} /> : <Menu style={{ color: C.dark }} />}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.light}40`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ padding: "12px 16px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", fontSize: 15,
                  background: activeNav === n ? `${C.mid}15` : "transparent", color: activeNav === n ? C.mid : C.dark }}>
                {n}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginTop: 8, padding: "12px 22px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white }}>
              Reserve a Table
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media(max-width:768px){ .bb-desktop{display:none!important} .bb-mobile{display:flex!important} }
        @media(min-width:769px){ .bb-mobile{display:none!important} }
        input,textarea,select{ outline:none; font-family:inherit; }
        input:focus,textarea:focus,select:focus{ border-color:${C.mid}!important; box-shadow:0 0 0 3px ${C.mid}20!important; }
      `}</style>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg, ${C.cream} 0%, #EDE0D4 50%, ${C.light}40 100%)`, padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.mid}15`, borderRadius: 50, padding: "6px 16px", marginBottom: 24, border: `1px solid ${C.mid}30` }}>
              <span style={{ fontSize: 13 }}>☕</span>
              <span style={{ color: C.mid, fontSize: 13, fontWeight: 600 }}>Artisan Coffee & Bakehouse</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: C.dark, lineHeight: 1.1, marginBottom: 20 }}>
              Where Every Cup Tells a <span style={{ color: C.mid }}>Story</span>
            </h1>
            <p style={{ fontSize: 17, color: "#5D4037", lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
              Handcrafted coffees, freshly baked pastries, and a warm space to slow down. From bean to cup — every detail, perfected.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("Menu")}
                style={{ padding: "16px 32px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", gap: 8, boxShadow: `0 8px 30px ${C.mid}40` }}>
                Explore Menu <ArrowRight style={{ width: 18, height: 18 }}/>
              </button>
              <button onClick={() => scrollTo("Contact")}
                style={{ padding: "16px 32px", borderRadius: 50, cursor: "pointer", fontSize: 15, fontWeight: 600,
                  background: "transparent", color: C.dark, border: `2px solid ${C.mid}50` }}>
                Reserve Table
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
              {[["4.9★","Google Rating"],["500+","Daily Coffees"],["Mon–Sun","Open Daily"],["7 AM–10 PM","Hours"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.dark }}>{v}</div>
                  <div style={{ fontSize: 12, color: "#8D6E63", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {GALLERY.map((emoji, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 20, padding: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, boxShadow: `0 4px 24px ${C.mid}15`, border: `1px solid ${C.light}40`, aspectRatio: "1", transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Our Menu</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Crafted With Passion</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 480, margin: "0 auto" }}>Every item is made fresh daily using locally sourced, premium ingredients.</p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {MENU_ITEMS.map(m => (
              <button key={m.cat} onClick={() => setActiveCat(m.cat)}
                style={{ padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s",
                  background: activeCat === m.cat ? `linear-gradient(135deg, ${C.dark}, ${C.mid})` : C.cream,
                  color: activeCat === m.cat ? C.white : C.mid,
                  border: activeCat === m.cat ? "none" : `1px solid ${C.light}60` }}>
                {m.cat}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {currentItems.map(item => (
              <div key={item.name} style={{ background: C.cream, borderRadius: 16, padding: "28px 24px", border: `1px solid ${C.light}40`, transition: "all 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${C.mid}20`; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: C.dark }}>{item.name}</h3>
                  <span style={{ fontSize: 16, fontWeight: 800, color: C.mid, whiteSpace: "nowrap", marginLeft: 12 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: 14, color: "#8D6E63", lineHeight: 1.7 }}>{item.desc}</p>
                <button onClick={() => scrollTo("Contact")}
                  style={{ marginTop: 16, padding: "8px 18px", borderRadius: 50, border: `1px solid ${C.mid}50`, background: "transparent", color: C.mid, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              [<Coffee className="w-8 h-8"/>, "Single Origin", "Beans sourced from award-winning farms in Coorg, Chikmagalur & Ooty."],
              [<Heart className="w-8 h-8"/>, "Made with Love", "Every recipe handcrafted by our in-house baristas and pastry chefs."],
              [<Award className="w-8 h-8"/>, "Award Winning", "Best Café in City — Times Food Awards 2023 & 2024."],
              [<Clock className="w-8 h-8"/>, "Open Daily", "7 days a week, 7 AM to 10 PM. Always here when you need us."],
            ].map(([icon, title, sub]) => (
              <div key={String(title)} style={{ background: C.white, borderRadius: 16, padding: "24px", boxShadow: `0 4px 16px ${C.mid}10`, border: `1px solid ${C.light}30` }}>
                <div style={{ color: C.mid, marginBottom: 12 }}>{icon as React.ReactNode}</div>
                <h4 style={{ fontWeight: 700, color: C.dark, marginBottom: 6, fontSize: 15 }}>{String(title)}</h4>
                <p style={{ fontSize: 13, color: "#8D6E63", lineHeight: 1.6 }}>{String(sub)}</p>
              </div>
            ))}
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Our Story</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 20px", lineHeight: 1.2 }}>
              Born From a Love of Good Coffee
            </h2>
            <p style={{ fontSize: 16, color: "#5D4037", lineHeight: 1.8, marginBottom: 16 }}>
              Brew & Bloom started in 2018 as a small corner café in Bengaluru. Today, we serve over 500 cups daily to coffee lovers who believe that great coffee deserves great company.
            </p>
            <p style={{ fontSize: 16, color: "#5D4037", lineHeight: 1.8, marginBottom: 28 }}>
              We work directly with smallholder farms across South India, ensuring fair wages for farmers and extraordinary flavour in your cup.
            </p>
            {["100% single-origin, traceable beans", "Zero-plastic, eco-friendly packaging", "Free WiFi & laptop-friendly seating", "Monthly coffee tasting events"].map(pt => (
              <div key={pt} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <CheckCircle style={{ width: 18, height: 18, color: C.mid, flexShrink: 0 }}/>
                <span style={{ fontSize: 15, color: C.text }}>{pt}</span>
              </div>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginTop: 28, padding: "14px 28px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", gap: 8 }}>
              Visit Us <ArrowRight style={{ width: 18, height: 18 }}/>
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Reviews</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0" }}>Our Regulars Love Us</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: C.cream, borderRadius: 20, padding: "36px 28px", border: `1px solid ${C.light}40`, position: "relative" }}>
                <div style={{ fontSize: 48, color: `${C.light}40`, position: "absolute", top: 16, right: 24, fontFamily: "Georgia, serif" }}>"</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} style={{ width: 16, height: 16, fill: C.light, color: C.light }}/>)}
                </div>
                <p style={{ fontSize: 15, color: "#5D4037", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: C.white, fontWeight: 700, fontSize: 16 }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.dark, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "#8D6E63" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / RESERVATION */}
      <section id="contact" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Find Us</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Reserve Your Table</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 480, margin: "0 auto" }}>Book your spot in advance and we'll have your favourite brew ready when you arrive.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              {[
                [<Phone style={{ width: 20, height: 20 }}/>, "Reservations", "+91 80123 45678"],
                [<Mail style={{ width: 20, height: 20 }}/>, "Email", "hello@brewandbloom.in"],
                [<MapPin style={{ width: 20, height: 20 }}/>, "Address", "12 Church Street, Indiranagar, Bengaluru 560038"],
                [<Clock style={{ width: 20, height: 20 }}/>, "Hours", "Mon – Sun: 7:00 AM – 10:00 PM"],
              ].map(([icon, label, val]) => (
                <div key={String(label)} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.mid}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, flexShrink: 0 }}>
                    {icon as React.ReactNode}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "#8D6E63", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{String(label)}</div>
                    <div style={{ fontSize: 15, color: C.dark, fontWeight: 600, marginTop: 4 }}>{String(val)}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, borderRadius: 16, padding: "28px", color: C.cream, marginTop: 16 }}>
                <h4 style={{ fontWeight: 700, marginBottom: 8 }}>Weekend Special 🎉</h4>
                <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>Buy any 2 coffees on Saturday or Sunday and get a free pastry of your choice. Valid 8 AM – 12 PM.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ background: C.white, borderRadius: 20, padding: "40px", border: `1px solid ${C.light}40`, boxShadow: `0 8px 40px ${C.mid}10` }}>
              {submitted && (
                <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle style={{ width: 18, height: 18, color: "#4CAF50" }}/>
                  <span style={{ color: "#2E7D32", fontWeight: 600, fontSize: 14 }}>Table reserved! See you soon ☕</span>
                </div>
              )}
              <h3 style={{ fontWeight: 800, color: C.dark, marginBottom: 24, fontSize: 20 }}>Book a Table</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[["Full Name","name","text","Your name"],["Phone","phone","tel","+91 00000 00000"]].map(([label,field,type,ph]) => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label} <span style={{ color: C.mid }}>*</span></label>
                    <input required type={type} placeholder={ph} value={(form as any)[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, boxSizing: "border-box", transition: "all 0.2s" }}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Email <span style={{ color: C.mid }}>*</span></label>
                <input required type="email" placeholder="your@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, boxSizing: "border-box", transition: "all 0.2s" }}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[["Date","date","date",""],["Time","time","time",""],["Guests","guests","number","2"]].map(([label,field,type,ph]) => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={ph} value={(form as any)[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      min={type === "number" ? "1" : undefined}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, boxSizing: "border-box", transition: "all 0.2s" }}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Special Requests</label>
                <textarea placeholder="Any dietary preferences, seating preferences, or special occasions?" value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={3} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, resize: "vertical", boxSizing: "border-box", transition: "all 0.2s" }}/>
              </div>
              <button type="submit"
                style={{ width: "100%", padding: "15px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Confirm Reservation <ArrowRight style={{ width: 18, height: 18 }}/>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, color: C.cream, padding: "60px 24px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Coffee style={{ width: 22, height: 22, color: C.light }}/>
                <span style={{ fontWeight: 800, fontSize: 18 }}>Brew & Bloom</span>
              </div>
              <p style={{ fontSize: 14, color: `${C.cream}90`, lineHeight: 1.8 }}>Artisan coffee & bakes crafted with love in Bengaluru since 2018.</p>
            </div>
            {[
              ["Quick Links", NAV],
              ["Our Menu", MENU_ITEMS.map(m => m.cat)],
              ["Contact", ["+91 80123 45678","hello@brewandbloom.in","Indiranagar, Bengaluru"]],
            ].map(([title, items]) => (
              <div key={String(title)}>
                <h4 style={{ fontWeight: 700, color: C.light, marginBottom: 14, fontSize: 15 }}>{String(title)}</h4>
                {(items as string[]).map(item => (
                  <div key={item} style={{ fontSize: 14, color: `${C.cream}90`, marginBottom: 8, cursor: "pointer" }}
                    onClick={() => { const n = NAV.find(x => x === item); if(n) scrollTo(n); }}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.white}15`, paddingTop: 24, textAlign: "center", fontSize: 13, color: `${C.cream}55` }}>
            © 2026 Brew & Bloom. Made with ☕ in Bengaluru.
          </div>
        </div>
      </footer>
    </div>
  );
}
