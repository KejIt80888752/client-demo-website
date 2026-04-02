import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Users, Building2, Heart, Sparkles, ArrowRight, X, CalendarDays, Phone, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const offers = [
  { icon: Heart,     title: "Wedding Photography", description: "Capture every tender moment of your special day with our cinematic approach to wedding coverage.", price: "From ₹25,000", badge: "Most Popular", features: ["Full-day coverage", "500+ edited photos", "Online gallery", "2 photographers"] },
  { icon: Building2, title: "Corporate Events",     description: "Professional event documentation for conferences, product launches, and corporate celebrations.",  price: "From ₹15,000", features: ["Event coverage", "300+ photos", "Same-day previews", "Commercial license"] },
  { icon: Users,     title: "Portrait Sessions",    description: "Individual, family, or group portraits that reveal personality and create lasting memories.",          price: "From ₹5,000",  features: ["1-hour session", "50+ edited photos", "Outfit changes", "Indoor/Outdoor"] },
  { icon: Video,     title: "Videography",          description: "High-quality video production for events, brand stories, and creative projects.",                      price: "From ₹35,000", badge: "Premium", features: ["4K recording", "Cinematic edit", "Drone footage", "Highlight reel"] },
  { icon: Camera,    title: "Product Photography",  description: "Elevate your brand with stunning product imagery for e-commerce and marketing.",                       price: "From ₹8,000",  features: ["Studio setup", "White background", "Lifestyle shots", "Quick turnaround"] },
  { icon: Sparkles,  title: "Pre-Wedding Shoot",    description: "Romantic, creative sessions at stunning locations to celebrate your love story.",                      price: "From ₹18,000", features: ["Location shoot", "100+ photos", "Themed concepts", "Outfit consultation"] },
];

/* ─── Book Now Modal ─────────────────────────────────────────────── */
const BookingModal = ({ service, price, onClose }: { service: string; price: string; onClose: () => void }) => {
  const { user }  = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) { toast({ title: "Please fill all required fields", variant: "destructive" }); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), { service, price, ...form, userId: user?.uid || null, userEmail: user?.email || null, status: "pending", createdAt: serverTimestamp() });
      setSuccess(true);
    } catch (err: any) { toast({ title: "Booking failed", description: err?.message, variant: "destructive" }); }
    setLoading(false);
  };

  const inp: React.CSSProperties = { border: "1px solid #292929", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "DM Sans, sans-serif", background: "#1c1c1c", color: "#ebebeb" };
  const focus = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "hsl(0,84%,52%)");
  const blur  = (e: React.FocusEvent<any>) => (e.currentTarget.style.borderColor = "#292929");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#0f0f0f", border: "1px solid #292929", borderRadius: 20, width: "100%", maxWidth: 460, boxShadow: "0 32px 80px rgba(0,0,0,0.9)", animation: "modalPop 0.25s cubic-bezier(.4,1.4,.6,1) forwards", overflow: "hidden" }}>
        <style>{`@keyframes modalPop { from { opacity:0; transform:scale(0.92) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))", padding: "22px 24px 18px", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          ><X size={14} /></button>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>BOOK NOW</div>
          <div style={{ color: "white", fontSize: 19, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>{service}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 3 }}>{price}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <CheckCircle2 size={28} color="#22c55e" />
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, fontFamily: "Playfair Display, serif", color: "#ebebeb", marginBottom: 8 }}>Booking Request Sent!</div>
              <div style={{ color: "#7a7a7a", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                Thank you, <strong style={{ color: "#ebebeb" }}>{form.name}</strong>! We'll reach out to <strong style={{ color: "#ebebeb" }}>{form.phone}</strong> within 24 hours.
              </div>
              <button onClick={onClose} style={{ background: "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))", color: "white", border: "none", borderRadius: 10, padding: "9px 24px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><User size={11} color="#ef4444" /> Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input value={form.name} onChange={set("name")} placeholder="Eg: Priya Sharma" style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><Phone size={11} color="#ef4444" /> Phone Number <span style={{ color: "#ef4444" }}>*</span></label>
                <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" type="tel" style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><CalendarDays size={11} color="#ef4444" /> Preferred Date <span style={{ color: "#ef4444" }}>*</span></label>
                <input value={form.date} onChange={set("date")} type="date" min={new Date().toISOString().split("T")[0]} style={{ ...inp, colorScheme: "dark" }} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9e9e9e", display: "flex", alignItems: "center", gap: 5 }}><MessageSquare size={11} color="#ef4444" /> Notes <span style={{ color: "#7a7a7a", fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.message} onChange={set("message")} placeholder="Any specific requirements..." rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.5 }} onFocus={focus} onBlur={blur} />
              </div>
              <button type="submit" disabled={loading}
                style={{ background: loading ? "#7a1a1a" : "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))", color: "white", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 20px -4px rgba(220,30,30,0.45)", fontFamily: "DM Sans, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 2 }}>
                {loading ? "Sending..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Offers Section ─────────────────────────────────────────────── */
const OffersSection = () => {
  const [activeBooking, setActiveBooking] = useState<{ title: string; price: string } | null>(null);

  return (
    <section style={{ padding: "96px 0", background: "#050505" }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" style={{ color: "#f87171", borderColor: "rgba(220,30,30,0.3)", background: "rgba(220,30,30,0.08)", padding: "6px 16px", fontWeight: 600 }}>
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold" style={{ color: "#ebebeb" }}>
            What We <span className="italic" style={{ color: "#ef4444" }}>Offer</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "#7a7a7a" }}>
            From intimate portraits to grand celebrations, we bring expertise and passion to every shoot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.title}
                className="group relative overflow-hidden"
                style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 16, padding: 24, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s", animationDelay: `${index * 100}ms` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,30,30,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(220,30,30,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {/* Red shimmer top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, #ef4444, transparent)" }} />

                {offer.badge && (
                  <div style={{ position: "absolute", top: 16, right: 16 }}>
                    <span style={{ background: "#ef4444", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{offer.badge}</span>
                  </div>
                )}

                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(220,30,30,0.10)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon style={{ width: 22, height: 22, color: "#ef4444" }} />
                </div>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: "#ebebeb", marginBottom: 6 }}>{offer.title}</div>
                <div style={{ fontSize: 13, color: "#7a7a7a", lineHeight: 1.6, marginBottom: 16 }}>{offer.description}</div>

                <ul style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
                  {offer.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#9e9e9e" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 20, fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#ef4444" }}>{offer.price}</span>
                  <button
                    onClick={() => setActiveBooking({ title: offer.title, price: offer.price })}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, background: "transparent", border: "1px solid rgba(220,30,30,0.3)", color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(220,30,30,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "#ef4444"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,30,30,0.3)"; }}
                  >
                    Book Now <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeBooking && <BookingModal service={activeBooking.title} price={activeBooking.price} onClose={() => setActiveBooking(null)} />}
    </section>
  );
};

export default OffersSection;
