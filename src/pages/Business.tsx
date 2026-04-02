import Layout from "@/components/Layout";
import Footer from "@/components/home/Footer";
import { useState } from "react";
import { CheckCircle, ArrowRight, Camera, Clock, Shield, Zap, Award, Users, X, User, Mail, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const packages = [
  { name: "Starter",      price: "₹5,000",  description: "Perfect for individual portraits and small shoots",  features: ["1-hour session", "1 location", "50 edited photos", "Online gallery", "5-day delivery"] },
  { name: "Professional", price: "₹25,000", description: "Ideal for weddings and large events", popular: true,  features: ["Full-day coverage", "Multiple locations", "500+ edited photos", "Highlight video", "3-day delivery", "2 photographers", "Drone coverage"] },
  { name: "Enterprise",   price: "Custom",   description: "Tailored solutions for businesses and brands",        features: ["Unlimited sessions", "Dedicated team", "Commercial license", "Brand guidelines adherence", "Same-day previews", "Priority support", "Monthly retainer"] },
];

const whyUs = [
  { icon: Camera, title: "Premium Equipment",  desc: "Sony Alpha & Canon R series with professional lenses" },
  { icon: Clock,  title: "Fast Turnaround",    desc: "Get your photos within 3-5 business days" },
  { icon: Shield, title: "Fully Insured",      desc: "Complete coverage for events and equipment" },
  { icon: Zap,    title: "Creative Vision",    desc: "Award-winning artistic approach to every shoot" },
  { icon: Award,  title: "Certified Pros",     desc: "Trained and certified professional photographers" },
  { icon: Users,  title: "Dedicated Support",  desc: "Personal project manager for every booking" },
];

/* ─── Get Started Modal ──────────────────────────────────────────── */
const GetStartedModal = ({ defaultPackage = "", onClose }: { defaultPackage?: string; onClose: () => void }) => {
  const { user }  = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: user?.email || "", company: "", package: defaultPackage, message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast({ title: "Please fill all required fields", variant: "destructive" }); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, "inquiries"), { ...form, userId: user?.uid || null, status: "new", createdAt: serverTimestamp() });
      setSuccess(true);
    } catch (err: any) { toast({ title: "Submission failed", description: err?.message, variant: "destructive" }); }
    setLoading(false);
  };

  const inp: React.CSSProperties = { border: "1px solid #292929", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "DM Sans, sans-serif", background: "#1c1c1c", color: "#ebebeb" };
  const focus = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "hsl(0,84%,52%)");
  const blur  = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "#292929");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.80)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#0f0f0f", border: "1px solid #292929", borderRadius: 20, width: "100%", maxWidth: 500, boxShadow: "0 32px 80px rgba(0,0,0,0.9)", animation: "modalPop 0.25s cubic-bezier(.4,1.4,.6,1) forwards", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        <style>{`@keyframes modalPop { from{opacity:0;transform:scale(0.92) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a0404 0%, #2d0808 100%)", borderBottom: "1px solid #3b0a0a", padding: "24px 24px 20px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9e9e9e" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          ><X size={14} /></button>
          <div style={{ display: "inline-block", background: "rgba(220,30,30,0.2)", color: "#f87171", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>BUSINESS SOLUTIONS</div>
          <div style={{ color: "#ebebeb", fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>Let's Get Started</div>
          <div style={{ color: "#7a7a7a", fontSize: 13, marginTop: 5, lineHeight: 1.5 }}>Tell us about your project and we'll craft the perfect solution.</div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(220,30,30,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <CheckCircle2 size={28} color="#ef4444" />
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, fontFamily: "Playfair Display, serif", color: "#ebebeb", marginBottom: 8 }}>Inquiry Received!</div>
              <div style={{ color: "#7a7a7a", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                Thank you, <strong style={{ color: "#ebebeb" }}>{form.name}</strong>! Our team will reach out to <strong style={{ color: "#ebebeb" }}>{form.email}</strong> within 24 hours.
              </div>
              <button onClick={onClose} style={{ background: "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))", color: "white", border: "none", borderRadius: 10, padding: "9px 24px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><User size={11} color="#ef4444" /> Name <span style={{ color: "#ef4444" }}>*</span></label>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" style={inp} onFocus={focus} onBlur={blur} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><Mail size={11} color="#ef4444" /> Email <span style={{ color: "#ef4444" }}>*</span></label>
                  <input value={form.email} onChange={set("email")} placeholder="you@company.com" type="email" style={inp} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><Building2 size={11} color="#ef4444" /> Company <span style={{ color: "#7a7a7a", fontWeight: 400 }}>(optional)</span></label>
                <input value={form.company} onChange={set("company")} placeholder="Company or brand name" style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e" }}>Interested Package</label>
                <select value={form.package} onChange={set("package")} style={{ ...inp, appearance: "none", cursor: "pointer", colorScheme: "dark" }} onFocus={focus} onBlur={blur}>
                  <option value="">Select a package...</option>
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price}</option>)}
                  <option value="Custom">Custom / Not sure yet</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><MessageSquare size={11} color="#ef4444" /> Project Details <span style={{ color: "#7a7a7a", fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.message} onChange={set("message")} placeholder="Event type, dates, locations, requirements..." rows={4} style={{ ...inp, resize: "vertical", lineHeight: 1.55 }} onFocus={focus} onBlur={blur} />
              </div>
              <button type="submit" disabled={loading}
                style={{ background: loading ? "#7a1a1a" : "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))", color: "white", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 20px -4px rgba(220,30,30,0.45)", fontFamily: "DM Sans, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
                {loading ? "Sending..." : <><ArrowRight size={15} /> Send Inquiry</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Business Page ──────────────────────────────────────────────── */
const Business = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const openModal = (pkg = "") => { setSelectedPackage(pkg); setShowModal(true); };

  return (
    <Layout>
      {/* Hero */}
      <section style={{ padding: "96px 0", background: "#000", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <div style={{ position: "absolute", top: 80, left: 80, width: 288, height: 288, background: "radial-gradient(circle, #ef4444, transparent)", borderRadius: "50%", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: 80, right: 80, width: 384, height: 384, background: "radial-gradient(circle, #ef4444, transparent)", borderRadius: "50%", filter: "blur(60px)" }} />
        </div>
        <div className="container mx-auto px-4 text-center" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-block", background: "rgba(220,30,30,0.08)", color: "#f87171", border: "1px solid rgba(220,30,30,0.25)", padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 20 }}>Business Solutions</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{ color: "#ebebeb" }}>
            Photography That Grows<br />Your <span className="italic" style={{ color: "#ef4444" }}>Business</span>
          </h1>
          <p style={{ color: "#7a7a7a", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
            From startups to established brands, we provide visual content that elevates your presence and drives results.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "96px 0", background: "#050505" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16" style={{ color: "#ebebeb" }}>
            Why Choose <span className="italic" style={{ color: "#ef4444" }}>KejShots</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 16, padding: 24, display: "flex", alignItems: "flex-start", gap: 16, transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(220,30,30,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(220,30,30,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 22, height: 22, color: "#ef4444" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 17, color: "#ebebeb", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#7a7a7a" }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "96px 0", background: "#000" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span style={{ display: "inline-block", background: "rgba(220,30,30,0.08)", color: "#f87171", border: "1px solid rgba(220,30,30,0.25)", padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>Pricing</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold" style={{ color: "#ebebeb" }}>
              Simple, Transparent <span className="italic" style={{ color: "#ef4444" }}>Pricing</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map(pkg => (
              <div key={pkg.name}
                style={{ background: "#0f0f0f", border: pkg.popular ? "2px solid #ef4444" : "1px solid #1a1a1a", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(220,30,30,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                {pkg.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #ef4444, #dc2626)" }} />}
                <div className="text-center" style={{ paddingBottom: 20 }}>
                  {pkg.popular && <span style={{ background: "#ef4444", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999, display: "inline-block", marginBottom: 12 }}>Most Popular</span>}
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#ebebeb" }}>{pkg.name}</div>
                  <div style={{ fontSize: 13, color: "#7a7a7a", marginTop: 4 }}>{pkg.description}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 36, fontWeight: 700, color: "#ef4444", marginTop: 16 }}>{pkg.price}</div>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#9e9e9e" }}>
                      <CheckCircle style={{ width: 14, height: 14, color: "#ef4444", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(pkg.name)}
                  style={{ width: "100%", background: pkg.popular ? "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))" : "transparent", border: pkg.popular ? "none" : "1px solid #292929", borderRadius: 10, padding: "11px 0", color: pkg.popular ? "white" : "#9e9e9e", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.15s", boxShadow: pkg.popular ? "0 4px 20px -4px rgba(220,30,30,0.45)" : "none" }}
                  onMouseEnter={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.borderColor = "#ef4444"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; } }}
                  onMouseLeave={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.borderColor = "#292929"; (e.currentTarget as HTMLElement).style.color = "#9e9e9e"; } }}
                >
                  Get Started <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 0", background: "#050505" }}>
        <div className="container mx-auto px-4">
          <div style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", borderRadius: 20, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 384, height: 384, background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(40px)", transform: "translate(30%, -30%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: "white" }}>Ready to Elevate Your Visual Story?</h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, maxWidth: 480, margin: "0 auto 32px" }}>
                Let's discuss your project and create something extraordinary together.
              </p>
              <button
                onClick={() => openModal()}
                style={{ background: "white", color: "#ef4444", border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {showModal && <GetStartedModal defaultPackage={selectedPackage} onClose={() => setShowModal(false)} />}
    </Layout>
  );
};

export default Business;
