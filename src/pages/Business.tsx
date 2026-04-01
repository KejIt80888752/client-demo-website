import Layout from "@/components/Layout";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Camera, Clock, Shield, Zap, Award, Users, X, User, Mail, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const packages = [
  {
    name: "Starter",
    price: "₹5,000",
    description: "Perfect for individual portraits and small shoots",
    features: ["1-hour session", "1 location", "50 edited photos", "Online gallery", "5-day delivery"],
  },
  {
    name: "Professional",
    price: "₹25,000",
    popular: true,
    description: "Ideal for weddings and large events",
    features: ["Full-day coverage", "Multiple locations", "500+ edited photos", "Highlight video", "3-day delivery", "2 photographers", "Drone coverage"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for businesses and brands",
    features: ["Unlimited sessions", "Dedicated team", "Commercial license", "Brand guidelines adherence", "Same-day previews", "Priority support", "Monthly retainer"],
  },
];

const whyUs = [
  { icon: Camera, title: "Premium Equipment", desc: "Sony Alpha & Canon R series with professional lenses" },
  { icon: Clock, title: "Fast Turnaround", desc: "Get your photos within 3-5 business days" },
  { icon: Shield, title: "Fully Insured", desc: "Complete coverage for events and equipment" },
  { icon: Zap, title: "Creative Vision", desc: "Award-winning artistic approach to every shoot" },
  { icon: Award, title: "Certified Pros", desc: "Trained and certified professional photographers" },
  { icon: Users, title: "Dedicated Support", desc: "Personal project manager for every booking" },
];

/* ─── Get Started Modal ──────────────────────────────────────────── */
const GetStartedModal = ({ defaultPackage = "", onClose }: { defaultPackage?: string; onClose: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    company: "",
    package: defaultPackage,
    message: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        name: form.name,
        email: form.email,
        company: form.company,
        package: form.package,
        message: form.message,
        userId: user?.uid || null,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message || "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  const inp: React.CSSProperties = {
    border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px",
    fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s", fontFamily: "DM Sans, sans-serif", background: "white",
  };
  const focus = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "#ef4444");
  const blur  = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "#e5e7eb");

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "white", borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 32px 80px rgba(239,68,68,0.18)", border: "1.5px solid rgba(239,68,68,0.15)", animation: "modalPop 0.25s cubic-bezier(.4,1.4,.6,1) forwards", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        <style>{`@keyframes modalPop { from { opacity:0; transform:scale(0.92) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a0404 0%, #3b0a0a 100%)", padding: "28px 28px 22px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          ><X size={16} /></button>
          <div style={{ background: "rgba(239,68,68,0.25)", color: "#fca5a5", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", display: "inline-block", marginBottom: 10 }}>BUSINESS SOLUTIONS</div>
          <div style={{ color: "white", fontSize: 22, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>Let's Get Started</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>Tell us about your project and we'll craft the perfect visual solution.</div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 24px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff1f1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle2 size={32} color="#ef4444" />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif", color: "#0a0a0a", marginBottom: 8 }}>Inquiry Received!</div>
              <div style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Thank you, <strong>{form.name}</strong>! Our business team will reach out to <strong>{form.email}</strong> within 24 hours to discuss your project.
              </div>
              <button onClick={onClose} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: 10, padding: "10px 28px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 5 }}>
                    <User size={12} color="#ef4444" /> Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" style={inp} onFocus={focus} onBlur={blur} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 5 }}>
                    <Mail size={12} color="#ef4444" /> Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input value={form.email} onChange={set("email")} placeholder="you@company.com" type="email" style={inp} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 5 }}>
                  <Building2 size={12} color="#ef4444" /> Company / Brand <span style={{ color: "#999", fontWeight: 400 }}>(optional)</span>
                </label>
                <input value={form.company} onChange={set("company")} placeholder="Company name" style={inp} onFocus={focus} onBlur={blur} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Interested Package</label>
                <select value={form.package} onChange={set("package")} style={{ ...inp, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
                  <option value="">Select a package...</option>
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price}</option>)}
                  <option value="Custom">Custom / Not sure yet</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 5 }}>
                  <MessageSquare size={12} color="#ef4444" /> Project Details <span style={{ color: "#999", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea value={form.message} onChange={set("message")} placeholder="Event type, expected dates, locations, special requirements..." rows={4} style={{ ...inp, resize: "vertical", lineHeight: 1.55 }} onFocus={focus} onBlur={blur} />
              </div>

              <button type="submit" disabled={loading}
                style={{ background: loading ? "#fca5a5" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", color: "white", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 6px 20px rgba(239,68,68,0.35)", transition: "all 0.2s", fontFamily: "DM Sans, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}
                onMouseEnter={e => { if (!loading) (e.currentTarget.style.boxShadow = "0 10px 28px rgba(239,68,68,0.5)"); }}
                onMouseLeave={e => { if (!loading) (e.currentTarget.style.boxShadow = "0 6px 20px rgba(239,68,68,0.35)"); }}
              >
                {loading ? "Sending..." : "Send Inquiry"}
                {!loading && <ArrowRight size={16} />}
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
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30 mb-6">Business Solutions</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Photography That Grows<br />Your <span className="text-primary italic">Business</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From startups to established brands, we provide visual content that elevates your presence and drives results.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            Why Choose <span className="text-primary italic">KejShots</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-border/50 hover:border-primary/30 transition-all group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Simple, Transparent <span className="text-primary italic">Pricing</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${pkg.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"}`}>
                {pkg.popular && <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />}
                <CardHeader className="text-center pb-2">
                  {pkg.popular && <Badge className="bg-primary text-primary-foreground w-fit mx-auto mb-2">Most Popular</Badge>}
                  <CardTitle className="text-xl font-display">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="text-4xl font-display font-bold text-primary pt-4">{pkg.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full gap-2 group ${pkg.popular ? "" : "variant-outline"}`} variant={pkg.popular ? "default" : "outline"} onClick={() => openModal(pkg.name)}>
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground border-0 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Elevate Your Visual Story?</h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                Let's discuss your project and create something extraordinary together.
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-10 text-base font-semibold" onClick={() => openModal()}>
                Contact Us Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      {showModal && <GetStartedModal defaultPackage={selectedPackage} onClose={() => setShowModal(false)} />}
    </Layout>
  );
};

export default Business;
