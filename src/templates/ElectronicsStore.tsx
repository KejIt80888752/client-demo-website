import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Star, CheckCircle, Phone, Mail, MapPin, ArrowRight, Package, Globe, Shield, Users } from "lucide-react";

const NAV = ["Home","About","Services","Process","Testimonials","Contact"];

const SERVICES = [
  { icon: <Package className="w-8 h-8"/>, title: "Export Solutions", desc: "End-to-end export management from sourcing to global delivery with full documentation support." },
  { icon: <Globe className="w-8 h-8"/>, title: "Global Distribution", desc: "Established network across 40+ countries ensuring timely and safe delivery of all shipments." },
  { icon: <Shield className="w-8 h-8"/>, title: "Quality Assurance", desc: "Strict quality checks at every stage — raw material, production, packaging, and dispatch." },
  { icon: <Users className="w-8 h-8"/>, title: "Custom Sourcing", desc: "Tailored sourcing solutions matching your exact product specifications and budget." },
];

const PROCESS = [
  { step: "01", title: "Enquiry & Consultation", desc: "Share your requirements. Our team analyses and provides a detailed proposal within 24 hours." },
  { step: "02", title: "Sourcing & Sampling", desc: "We source from certified suppliers and send physical samples for your approval before production." },
  { step: "03", title: "Production & QC", desc: "Manufacturing begins after your approval. Our QC team monitors every batch for consistency." },
  { step: "04", title: "Shipping & Delivery", desc: "We handle all export documentation, customs clearance, and ensure on-time global delivery." },
];

const TESTIMONIALS = [
  { name: "James Mitchell", role: "CEO, GlobalTrade UK", text: "Outstanding service! TerraCrafts handled our entire supply chain seamlessly. Product quality exceeded expectations.", rating: 5 },
  { name: "Sophie Laurent", role: "Buyer, Maison Paris", text: "Reliable, professional, and always on time. We've been working with them for 3 years and couldn't be happier.", rating: 5 },
  { name: "Ahmad Al-Rashid", role: "Director, Gulf Imports", text: "Best export partner we've ever had. Their documentation process is flawless and communication is excellent.", rating: 5 },
];

const PRODUCTS = ["Jute & Coir Products","Handwoven Textiles","Leather Goods","Artisan Handicrafts","Organic Spices","Palm Leaf Products"];

const C = { dark: "#3E2723", mid: "#6F4E37", light: "#C8A97E", cream: "#FFF8F0", white: "#FFFFFF", text: "#2C1810" };

export default function TerraCrafts() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [form, setForm] = useState({ name:"", email:"", phone:"", product:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", product:"", message:"" }); }, 4000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: C.white, color: C.text }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? C.white : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(62,39,35,0.12)" : "none",
        transition: "all 0.3s",
        borderBottom: scrolled ? `1px solid ${C.light}40` : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe style={{ width: 20, height: 20, color: C.cream }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px" }}>Terra<span style={{ color: C.mid }}>Crafts</span></span>
          </div>

          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                  background: active === n ? C.mid : "transparent",
                  color: active === n ? C.white : C.dark,
                }}>
                {n}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginLeft: 8, padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, boxShadow: `0 4px 16px ${C.mid}50` }}>
              Get Enquiry
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="show-mobile">
            {menuOpen ? <X style={{ color: C.dark }} /> : <Menu style={{ color: C.dark }} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: C.white, borderTop: `1px solid ${C.light}40`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ padding: "12px 16px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", fontSize: 15, fontWeight: 500,
                  background: active === n ? `${C.mid}15` : "transparent", color: active === n ? C.mid : C.dark }}>
                {n}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginTop: 8, padding: "12px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white }}>
              Get Enquiry
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media(max-width:768px){ .hidden-mobile{display:none!important} .show-mobile{display:flex!important} }
        @media(min-width:769px){ .show-mobile{display:none!important} }
        input,textarea,select{ outline:none; font-family:inherit; }
        input:focus,textarea:focus,select:focus{ border-color:${C.mid}!important; box-shadow:0 0 0 3px ${C.mid}20!important; }
      `}</style>

      {/* HERO */}
      <section id="home" style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.mid} 60%, ${C.light} 100%)`, padding: "140px 24px 100px", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.white}20`, borderRadius: 50, padding: "6px 16px", marginBottom: 24, border: `1px solid ${C.white}30` }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }}/>
            <span style={{ color: C.cream, fontSize: 13, fontWeight: 500 }}>Trusted by 200+ Global Buyers</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,6vw,68px)", fontWeight: 900, color: C.white, lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
            Connecting Indian <span style={{ color: C.light }}>Craftsmanship</span> to Global Markets
          </h1>
          <p style={{ fontSize: 18, color: `${C.cream}CC`, maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
            Premium export solutions for handcrafted goods, textiles, and natural products. Quality assured. Delivery guaranteed.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")}
              style={{ padding: "16px 32px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700,
                background: C.white, color: C.dark, display: "flex", alignItems: "center", gap: 8, boxShadow: `0 8px 30px ${C.dark}40` }}>
              Get Free Consultation <ArrowRight style={{ width: 18, height: 18 }}/>
            </button>
            <button onClick={() => scrollTo("Services")}
              style={{ padding: "16px 32px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 600,
                background: "transparent", color: C.white, border: `2px solid ${C.white}60` }}>
              Our Services
            </button>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
            {[["200+","Global Buyers"],["40+","Countries"],["10+","Years Exp"],["98%","Satisfaction"]].map(([num,label]) => (
              <div key={label}>
                <div style={{ fontSize: 36, fontWeight: 900, color: C.white }}>{num}</div>
                <div style={{ fontSize: 13, color: `${C.cream}AA`, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>About Us</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 20px", lineHeight: 1.2 }}>
              Your Trusted Export Partner Since 2014
            </h2>
            <p style={{ fontSize: 16, color: "#5D4037", lineHeight: 1.8, marginBottom: 20 }}>
              TerraCrafts specialises in sourcing and exporting premium Indian handcrafted products to buyers worldwide. We bridge the gap between skilled artisans and global markets with integrity, transparency, and excellence.
            </p>
            <p style={{ fontSize: 16, color: "#5D4037", lineHeight: 1.8, marginBottom: 32 }}>
              Our team of experienced trade professionals ensures every shipment meets international quality standards, delivered on time, every time.
            </p>
            {[["Certified ISO 9001:2015 quality management"],["End-to-end export documentation support"],["Dedicated account manager for every client"],["30-day free sample policy"]].map(pt => (
              <div key={pt[0]} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <CheckCircle style={{ width: 20, height: 20, color: C.mid, flexShrink: 0, marginTop: 2 }}/>
                <span style={{ fontSize: 15, color: C.text }}>{pt[0]}</span>
              </div>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginTop: 24, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", gap: 8 }}>
              Work With Us <ChevronRight style={{ width: 18, height: 18 }}/>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[["200+","Active Clients","Worldwide"],["40+","Countries","Reached"],["10+","Years","Experience"],["98%","Client","Satisfaction"]].map(([num,l1,l2]) => (
              <div key={l1} style={{ background: C.white, borderRadius: 16, padding: "32px 24px", textAlign: "center", boxShadow: `0 4px 20px ${C.mid}15`, border: `1px solid ${C.light}30` }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: C.mid }}>{num}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 4 }}>{l1}</div>
                <div style={{ fontSize: 13, color: "#8D6E63" }}>{l2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>What We Offer</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Our Core Services</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 500, margin: "0 auto" }}>Comprehensive export solutions designed to make your international trade effortless and profitable.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 28 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ padding: "36px 28px", borderRadius: 16, border: `1px solid ${C.light}40`, background: C.cream, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${C.mid}25`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ width: 60, height: 60, borderRadius: 14, background: `linear-gradient(135deg, ${C.dark}15, ${C.mid}25)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, marginBottom: 20 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#8D6E63", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 20, textAlign: "center" }}>Products We Export</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {PRODUCTS.map(p => (
                <span key={p} style={{ padding: "10px 20px", borderRadius: 50, border: `1px solid ${C.light}`, background: C.cream, color: C.mid, fontSize: 14, fontWeight: 600 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "100px 24px", background: `linear-gradient(135deg, ${C.dark} 0%, ${C.mid} 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: 2 }}>How It Works</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.white, margin: "12px 0 16px" }}>Our 4-Step Process</h2>
            <p style={{ fontSize: 16, color: `${C.cream}BB`, maxWidth: 500, margin: "0 auto" }}>Simple, transparent, and designed around your needs.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 28 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ background: `${C.white}10`, border: `1px solid ${C.white}20`, borderRadius: 16, padding: "36px 28px", position: "relative" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: `${C.light}40`, position: "absolute", top: 20, right: 20 }}>{p.step}</div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: C.light, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: C.dark }}>{i + 1}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: `${C.cream}BB`, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Client Reviews</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0" }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: C.white, borderRadius: 16, padding: "36px 28px", boxShadow: `0 4px 24px ${C.mid}12`, border: `1px solid ${C.light}30` }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
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

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Get In Touch</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Send Us An Enquiry</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 500, margin: "0 auto" }}>Ready to start your export journey? Fill in the form and we'll get back within 24 hours.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              {[
                [<Phone style={{ width: 20, height: 20 }}/>, "Phone", "+91 98765 43210"],
                [<Mail style={{ width: 20, height: 20 }}/>, "Email", "enquiry@terracrafts.com"],
                [<MapPin style={{ width: 20, height: 20 }}/>, "Address", "123 Export House, Bengaluru, Karnataka 560001"],
              ].map(([icon, label, val]) => (
                <div key={String(label)} style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.mid}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: "#8D6E63", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{String(label)}</div>
                    <div style={{ fontSize: 15, color: C.dark, fontWeight: 600, marginTop: 4 }}>{String(val)}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 40, padding: "28px", background: C.cream, borderRadius: 16, border: `1px solid ${C.light}40` }}>
                <h4 style={{ fontWeight: 700, color: C.dark, marginBottom: 8 }}>Business Hours</h4>
                <p style={{ fontSize: 14, color: "#8D6E63" }}>Mon – Sat: 9:00 AM – 6:00 PM IST</p>
                <p style={{ fontSize: 14, color: "#8D6E63" }}>Sunday: Closed</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ background: C.cream, borderRadius: 20, padding: "40px", border: `1px solid ${C.light}40` }}>
              {submitted && (
                <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: 10, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle style={{ width: 20, height: 20, color: "#4CAF50" }}/>
                  <span style={{ color: "#2E7D32", fontWeight: 600 }}>Enquiry sent! We'll contact you within 24 hours.</span>
                </div>
              )}
              {[["Full Name","name","text","Your full name"],["Email Address","email","email","your@email.com"],["Phone Number","phone","tel","+91 00000 00000"]].map(([label, field, type, ph]) => (
                <div key={field} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label} <span style={{ color: C.mid }}>*</span></label>
                  <input required type={type} placeholder={ph} value={(form as any)[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${C.light}60`, background: C.white, fontSize: 15, color: C.text, transition: "all 0.2s", boxSizing: "border-box" }}/>
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Product Category</label>
                <select value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${C.light}60`, background: C.white, fontSize: 15, color: C.text, transition: "all 0.2s" }}>
                  <option value="">Select a product</option>
                  {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Message <span style={{ color: C.mid }}>*</span></label>
                <textarea required placeholder="Tell us about your requirements, quantity needed, destination country..." value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${C.light}60`, background: C.white, fontSize: 15, color: C.text, resize: "vertical", boxSizing: "border-box", transition: "all 0.2s" }}/>
              </div>
              <button type="submit"
                style={{ width: "100%", padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 6px 24px ${C.mid}40` }}>
                Send Enquiry <ArrowRight style={{ width: 18, height: 18 }}/>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, color: C.cream, padding: "60px 24px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 50 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.mid, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Globe style={{ width: 18, height: 18, color: C.cream }}/>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800 }}>TerraCrafts</span>
              </div>
              <p style={{ fontSize: 14, color: `${C.cream}AA`, lineHeight: 1.8 }}>Connecting Indian craftsmanship to global markets since 2014.</p>
            </div>
            {[
              ["Quick Links", NAV],
              ["Products", PRODUCTS.slice(0,4)],
              ["Contact", ["+91 98765 43210", "enquiry@terracrafts.com", "Bengaluru, India"]],
            ].map(([title, items]) => (
              <div key={String(title)}>
                <h4 style={{ fontWeight: 700, marginBottom: 16, color: C.light, fontSize: 15 }}>{String(title)}</h4>
                {(items as string[]).map(item => (
                  <div key={item} style={{ fontSize: 14, color: `${C.cream}AA`, marginBottom: 8, cursor: "pointer" }}
                    onClick={() => { const n = NAV.find(x => x === item); if(n) scrollTo(n); }}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.white}15`, paddingTop: 24, textAlign: "center", fontSize: 13, color: `${C.cream}66` }}>
            © 2026 TerraCrafts Impex Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
