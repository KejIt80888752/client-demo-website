import { useState, useEffect } from "react";
import { Menu, X, Star, CheckCircle, Phone, Mail, MapPin, ArrowRight, Home, Layers, Palette, Users } from "lucide-react";

const NAV = ["Home","Services","Portfolio","About","Testimonials","Contact"];
const C = { dark: "#3E2723", mid: "#6F4E37", light: "#C8A97E", cream: "#FFF8F0", white: "#FFFFFF", text: "#2C1810" };

const SERVICES = [
  { icon: <Home className="w-7 h-7"/>, title: "Residential Interiors", price: "From ₹1,200/sq.ft", desc: "Transform your home into a sanctuary of warmth and style. Living rooms, bedrooms, kitchens — complete makeovers." },
  { icon: <Layers className="w-7 h-7"/>, title: "Commercial Spaces", price: "From ₹950/sq.ft", desc: "Office spaces, retail stores, restaurants — functional designs that make a lasting first impression on your clients." },
  { icon: <Palette className="w-7 h-7"/>, title: "3D Visualisation", price: "From ₹8,000", desc: "Photorealistic 3D renders of your space before a single nail is hammered. See your dream space before it exists." },
  { icon: <Users className="w-7 h-7"/>, title: "Design Consultation", price: "₹2,500/session", desc: "One-on-one session with a senior designer. Get expert advice, moodboards, and a personalised design roadmap." },
];

const PORTFOLIO = [
  { title: "Brown Walnut Living Room", tag: "Residential", emoji: "🛋️" },
  { title: "Warm Tone Master Bedroom", tag: "Residential", emoji: "🛏️" },
  { title: "Espresso Kitchen Design", tag: "Kitchen", emoji: "🍳" },
  { title: "Mocha Office Space", tag: "Commercial", emoji: "💼" },
  { title: "Cafe Interiors — Koramangala", tag: "Hospitality", emoji: "☕" },
  { title: "Boutique Retail Store", tag: "Commercial", emoji: "🏪" },
];

const TESTIMONIALS = [
  { name: "Deepa & Arvind", role: "Homeowners, Whitefield", text: "Mocha Studio turned our bare flat into a warm, beautiful home. Every corner feels intentional. Best investment we've made!", rating: 5 },
  { name: "Kavya Reddy", role: "Restaurant Owner", text: "They understood the café vibe we wanted instantly. The earthy tones and custom furniture they sourced are absolutely stunning.", rating: 5 },
  { name: "Suresh Iyer", role: "Office Manager, IT Firm", text: "Our new office space has completely changed team morale. The layout is efficient, warm, and impresses every client who walks in.", rating: 5 },
];

const PROCESS = [
  { step: "01", title: "Discovery Call", desc: "We understand your vision, lifestyle, budget, and timeline in a free 30-minute consultation." },
  { step: "02", title: "Concept & Moodboard", desc: "Our designers craft a personalised moodboard with colour palette, materials, and layout concepts." },
  { step: "03", title: "3D Design & Approval", desc: "You see your space in full 3D before execution begins. We refine until you love every detail." },
  { step: "04", title: "Execution & Handover", desc: "Our trusted contractors execute the design on-time, on-budget. We do a final walkthrough together." },
];

export default function MochaStudio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [activePortfolio, setActivePortfolio] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
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
    setTimeout(() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", service:"", budget:"", message:"" }); }, 4000);
  };

  const tags = ["All", ...Array.from(new Set(PORTFOLIO.map(p => p.tag)))];
  const filtered = activePortfolio === "All" ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === activePortfolio);

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
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.cream, fontWeight: 900, fontSize: 16 }}>M</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: "-0.3px" }}>Mocha <span style={{ color: C.mid }}>Studio</span></span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="ms-desktop">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                  background: activeNav === n ? C.mid : "transparent", color: activeNav === n ? C.white : C.dark }}>
                {n}
              </button>
            ))}
            <button onClick={() => scrollTo("Contact")}
              style={{ marginLeft: 8, padding: "10px 22px", borderRadius: 8, border: `2px solid ${C.dark}`, cursor: "pointer", fontSize: 14, fontWeight: 700,
                background: "transparent", color: C.dark, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.dark; (e.currentTarget as HTMLElement).style.color = C.white; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = C.dark; }}>
              Free Consultation
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="ms-mobile">
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
              style={{ marginTop: 8, padding: "12px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white }}>
              Free Consultation
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media(max-width:768px){ .ms-desktop{display:none!important} .ms-mobile{display:flex!important} }
        @media(min-width:769px){ .ms-mobile{display:none!important} }
        input,textarea,select{ outline:none; font-family:inherit; }
        input:focus,textarea:focus,select:focus{ border-color:${C.mid}!important; box-shadow:0 0 0 3px ${C.mid}20!important; }
      `}</style>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: C.cream, padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `linear-gradient(135deg, ${C.light}20, ${C.mid}15)`, clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" }}/>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.mid}15`, borderRadius: 50, padding: "6px 16px", marginBottom: 24, border: `1px solid ${C.mid}25` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 1 }}>Award Winning Interior Design</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: C.dark, lineHeight: 1.1, marginBottom: 20 }}>
                Spaces That Feel Like <span style={{ color: C.mid, fontStyle: "italic" }}>Home</span>
              </h1>
              <p style={{ fontSize: 17, color: "#5D4037", lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
                We design warm, functional, beautiful interiors rooted in earthy tones and timeless elegance. Your space, reimagined.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("Contact")}
                  style={{ padding: "16px 32px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                    background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", gap: 8, boxShadow: `0 8px 30px ${C.mid}40` }}>
                  Book Free Consultation <ArrowRight style={{ width: 18, height: 18 }}/>
                </button>
                <button onClick={() => scrollTo("Portfolio")}
                  style={{ padding: "16px 32px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 600,
                    background: "transparent", color: C.dark, border: `2px solid ${C.mid}50` }}>
                  View Our Work
                </button>
              </div>
              <div style={{ display: "flex", gap: 36, marginTop: 48, flexWrap: "wrap" }}>
                {[["150+","Projects Done"],["8+","Years Exp"],["98%","Client Happy"],["15+","Awards"]].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: C.mid }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#8D6E63", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: C.white, borderRadius: 24, padding: "40px", textAlign: "center", fontSize: 80, boxShadow: `0 8px 40px ${C.mid}20`, border: `1px solid ${C.light}40` }}>🛋️</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, borderRadius: 16, padding: "24px", textAlign: "center", fontSize: 48 }}>🛏️</div>
                <div style={{ background: C.white, borderRadius: 16, padding: "24px", textAlign: "center", fontSize: 48, boxShadow: `0 4px 20px ${C.mid}15`, border: `1px solid ${C.light}30` }}>🍳</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>What We Do</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Our Design Services</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 500, margin: "0 auto" }}>From concept to completion, we handle every aspect of your interior transformation.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ background: C.cream, borderRadius: 20, padding: "36px 28px", border: `1px solid ${C.light}40`, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${C.mid}20`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = `${C.mid}50`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.borderColor = `${C.light}40`; }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${C.dark}15, ${C.mid}25)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, marginBottom: 20 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{s.title}</h3>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, display: "block", marginBottom: 10 }}>{s.price}</span>
                <p style={{ fontSize: 14, color: "#8D6E63", lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                <button onClick={() => scrollTo("Contact")}
                  style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${C.mid}`, background: "transparent", color: C.mid, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.mid; (e.currentTarget as HTMLElement).style.color = C.white; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = C.mid; }}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Our Work</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Recent Projects</h2>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            {tags.map(tag => (
              <button key={tag} onClick={() => setActivePortfolio(tag)}
                style={{ padding: "8px 20px", borderRadius: 50, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                  background: activePortfolio === tag ? `linear-gradient(135deg, ${C.dark}, ${C.mid})` : C.white,
                  color: activePortfolio === tag ? C.white : C.mid,
                  border: activePortfolio === tag ? "none" : `1.5px solid ${C.light}60` }}>
                {tag}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {filtered.map(p => (
              <div key={p.title} style={{ background: C.white, borderRadius: 20, overflow: "hidden", boxShadow: `0 4px 20px ${C.mid}10`, border: `1px solid ${C.light}30`, transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${C.mid}25`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${C.mid}10`; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                onClick={() => scrollTo("Contact")}>
                <div style={{ background: `linear-gradient(135deg, ${C.light}30, ${C.mid}20)`, height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>
                  {p.emoji}
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 1 }}>{p.tag}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, margin: "6px 0 10px" }}>{p.title}</h3>
                  <span style={{ fontSize: 13, color: C.mid, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    View Project <ArrowRight style={{ width: 14, height: 14 }}/>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / PROCESS */}
      <section id="about" style={{ padding: "100px 24px", background: `linear-gradient(135deg, ${C.dark} 0%, ${C.mid} 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: 2 }}>Our Process</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.white, margin: "12px 0 14px" }}>How We Work</h2>
            <p style={{ fontSize: 16, color: `${C.cream}CC`, maxWidth: 480, margin: "0 auto" }}>A simple, collaborative process that puts you at the centre of every decision.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, marginBottom: 70 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} style={{ background: `${C.white}10`, border: `1px solid ${C.white}15`, borderRadius: 20, padding: "32px 24px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.light, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <span style={{ fontWeight: 900, color: C.dark, fontSize: 18 }}>{i+1}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: `${C.cream}BB`, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", background: `${C.white}10`, borderRadius: 24, padding: "40px", border: `1px solid ${C.white}15` }}>
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 14 }}>Why Choose Mocha Studio?</h3>
              <p style={{ fontSize: 15, color: `${C.cream}CC`, lineHeight: 1.8, marginBottom: 20 }}>We're not just designers — we're space storytellers. Every project is a unique narrative built around you.</p>
              {["Free initial consultation", "Fixed pricing — no hidden costs", "Handpicked artisan furniture sourcing", "Full project management included"].map(pt => (
                <div key={pt} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <CheckCircle style={{ width: 18, height: 18, color: C.light, flexShrink: 0 }}/>
                  <span style={{ fontSize: 14, color: `${C.cream}DD` }}>{pt}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["150+","Projects"],["8+","Years"],["98%","Happy"],["15+","Awards"]].map(([num, label]) => (
                <div key={label} style={{ background: `${C.white}10`, borderRadius: 14, padding: "24px 18px", textAlign: "center", border: `1px solid ${C.white}15` }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: C.light }}>{num}</div>
                  <div style={{ fontSize: 13, color: `${C.cream}AA`, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px 24px", background: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Client Stories</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0" }}>Spaces They Love</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: C.cream, borderRadius: 20, padding: "36px 28px", border: `1px solid ${C.light}40`, transition: "all 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${C.mid}15`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} style={{ width: 15, height: 15, fill: C.light, color: C.light }}/>)}
                </div>
                <p style={{ fontSize: 15, color: "#5D4037", lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: C.white, fontWeight: 700 }}>{t.name[0]}</span>
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
      <section id="contact" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: 2 }}>Let's Talk</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: C.dark, margin: "12px 0 16px" }}>Book Your Free Consultation</h2>
            <p style={{ fontSize: 16, color: "#8D6E63", maxWidth: 480, margin: "0 auto" }}>Tell us about your space. We'll get back with a tailored proposal within 24 hours.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>
            <div>
              {[
                [<Phone style={{ width: 20, height: 20 }}/>, "Phone", "+91 80987 65432"],
                [<Mail style={{ width: 20, height: 20 }}/>, "Email", "hello@mochastudio.in"],
                [<MapPin style={{ width: 20, height: 20 }}/>, "Studio", "45 Design Street, HSR Layout, Bengaluru 560102"],
              ].map(([icon, label, val]) => (
                <div key={String(label)} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.mid}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.mid, flexShrink: 0 }}>
                    {icon as React.ReactNode}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#8D6E63", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{String(label)}</div>
                    <div style={{ fontSize: 15, color: C.dark, fontWeight: 600, marginTop: 4 }}>{String(val)}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, borderRadius: 16, padding: "28px", marginTop: 8, color: C.cream }}>
                <h4 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>Studio Visit Hours</h4>
                <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7 }}>Mon – Fri: 10 AM – 7 PM<br/>Saturday: 11 AM – 5 PM<br/>Sunday: By appointment only</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ background: C.white, borderRadius: 24, padding: "44px", border: `1px solid ${C.light}40`, boxShadow: `0 8px 40px ${C.mid}10` }}>
              {submitted && (
                <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle style={{ width: 18, height: 18, color: "#4CAF50" }}/>
                  <span style={{ color: "#2E7D32", fontWeight: 600, fontSize: 14 }}>Request received! We'll call you within 24 hours.</span>
                </div>
              )}
              <h3 style={{ fontWeight: 800, color: C.dark, marginBottom: 24, fontSize: 20 }}>Tell Us About Your Project</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Full Name","name","text","Your full name"],["Phone","phone","tel","+91 00000 00000"]].map(([label, field, type, ph]) => (
                  <div key={field} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label} <span style={{ color: C.mid }}>*</span></label>
                    <input required type={type} placeholder={ph} value={(form as any)[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, boxSizing: "border-box", transition: "all 0.2s" }}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Email <span style={{ color: C.mid }}>*</span></label>
                <input required type="email" placeholder="your@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, boxSizing: "border-box", transition: "all 0.2s" }}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Service Needed</label>
                  <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, transition: "all 0.2s" }}>
                    <option value="">Select service</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Budget Range</label>
                  <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, transition: "all 0.2s" }}>
                    <option value="">Select budget</option>
                    {["Under ₹5L","₹5L – ₹10L","₹10L – ₹25L","₹25L+"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 6 }}>Tell Us About Your Space <span style={{ color: C.mid }}>*</span></label>
                <textarea required placeholder="BHK type, current condition, what you love & hate about it, inspiration styles..." value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${C.light}60`, fontSize: 14, color: C.text, background: C.cream, resize: "vertical", boxSizing: "border-box", transition: "all 0.2s" }}/>
              </div>
              <button type="submit"
                style={{ width: "100%", padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700,
                  background: `linear-gradient(135deg, ${C.dark}, ${C.mid})`, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 6px 24px ${C.mid}40` }}>
                Book Free Consultation <ArrowRight style={{ width: 18, height: 18 }}/>
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
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.mid, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontWeight: 900, color: C.cream }}>M</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: 18 }}>Mocha Studio</span>
              </div>
              <p style={{ fontSize: 14, color: `${C.cream}90`, lineHeight: 1.8 }}>Award-winning interior design studio crafting warm, timeless spaces since 2016.</p>
            </div>
            {[
              ["Navigation", NAV],
              ["Services", SERVICES.map(s => s.title)],
              ["Contact", ["+91 80987 65432","hello@mochastudio.in","HSR Layout, Bengaluru"]],
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
            © 2026 Mocha Studio Interior Design. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
