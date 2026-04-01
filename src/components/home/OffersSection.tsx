import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Video, Users, Building2, Heart, Sparkles, ArrowRight, X, CalendarDays, Phone, User, MessageSquare, CheckCircle } from "lucide-react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const offers = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Capture every tender moment of your special day with our cinematic approach to wedding coverage.",
    price: "From ₹25,000",
    badge: "Most Popular",
    features: ["Full-day coverage", "500+ edited photos", "Online gallery", "2 photographers"],
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional event documentation for conferences, product launches, and corporate celebrations.",
    price: "From ₹15,000",
    features: ["Event coverage", "300+ photos", "Same-day previews", "Commercial license"],
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    description: "Individual, family, or group portraits that reveal personality and create lasting memories.",
    price: "From ₹5,000",
    features: ["1-hour session", "50+ edited photos", "Outfit changes", "Indoor/Outdoor"],
  },
  {
    icon: Video,
    title: "Videography",
    description: "High-quality video production for events, brand stories, and creative projects.",
    price: "From ₹35,000",
    badge: "Premium",
    features: ["4K recording", "Cinematic edit", "Drone footage", "Highlight reel"],
  },
  {
    icon: Camera,
    title: "Product Photography",
    description: "Elevate your brand with stunning product imagery for e-commerce and marketing.",
    price: "From ₹8,000",
    features: ["Studio setup", "White background", "Lifestyle shots", "Quick turnaround"],
  },
  {
    icon: Sparkles,
    title: "Pre-Wedding Shoot",
    description: "Romantic, creative sessions at stunning locations to celebrate your love story.",
    price: "From ₹18,000",
    features: ["Location shoot", "100+ photos", "Themed concepts", "Outfit consultation"],
  },
];

/* ─── Book Now Modal ─────────────────────────────────────────────── */
interface BookingModalProps {
  service: string;
  price: string;
  onClose: () => void;
}

const BookingModal = ({ service, price, onClose }: BookingModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        service,
        price,
        name: form.name,
        phone: form.phone,
        date: form.date,
        message: form.message,
        userId: user?.uid || null,
        userEmail: user?.email || null,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (err: any) {
      toast({ title: "Booking failed", description: err?.message || "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    /* Backdrop */
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "white", borderRadius: 20, width: "100%", maxWidth: 480,
        boxShadow: "0 32px 80px rgba(239,68,68,0.18)",
        border: "1.5px solid rgba(239,68,68,0.15)",
        animation: "modalPop 0.25s cubic-bezier(.4,1.4,.6,1) forwards",
        overflow: "hidden",
      }}>
        <style>{`
          @keyframes modalPop {
            from { opacity:0; transform: scale(0.92) translateY(20px); }
            to   { opacity:1; transform: scale(1)    translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          padding: "24px 28px 20px",
          position: "relative",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          >
            <X size={16} />
          </button>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4 }}>
            BOOK NOW
          </div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif" }}>
            {service}
          </div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4 }}>{price}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 24px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <CheckCircle size={32} color="#22c55e" />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Playfair Display, serif", color: "#0a0a0a", marginBottom: 8 }}>
                Booking Request Sent!
              </div>
              <div style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Thank you, <strong>{form.name}</strong>! We'll reach out to you at <strong>{form.phone}</strong> within 24 hours to confirm your booking.
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "#ef4444", color: "white", border: "none", borderRadius: 10,
                  padding: "10px 28px", fontWeight: 600, cursor: "pointer", fontSize: 14,
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={13} color="#ef4444" /> Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={form.name} onChange={set("name")} placeholder="Eg: Priya Sharma"
                  style={{
                    border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px",
                    fontSize: 14, outline: "none", transition: "border-color 0.2s",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#ef4444")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              {/* Phone */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={13} color="#ef4444" /> Phone Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" type="tel"
                  style={{
                    border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px",
                    fontSize: 14, outline: "none", transition: "border-color 0.2s",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#ef4444")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              {/* Date */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 6 }}>
                  <CalendarDays size={13} color="#ef4444" /> Preferred Date <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  value={form.date} onChange={set("date")} type="date"
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px",
                    fontSize: 14, outline: "none", transition: "border-color 0.2s",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#ef4444")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              {/* Message */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "flex", alignItems: "center", gap: 6 }}>
                  <MessageSquare size={13} color="#ef4444" /> Additional Notes <span style={{ color: "#999", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  value={form.message} onChange={set("message")}
                  placeholder="Any specific requirements, location preferences, or questions..."
                  rows={3}
                  style={{
                    border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 14px",
                    fontSize: 14, outline: "none", resize: "vertical", transition: "border-color 0.2s",
                    fontFamily: "DM Sans, sans-serif", lineHeight: 1.5,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#ef4444")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "#fca5a5" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "white", border: "none", borderRadius: 10,
                  padding: "12px 0", fontWeight: 700, fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 6px 20px rgba(239,68,68,0.35)",
                  transition: "all 0.2s", fontFamily: "DM Sans, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget.style.boxShadow = "0 10px 28px rgba(239,68,68,0.5)"); }}
                onMouseLeave={e => { if (!loading) (e.currentTarget.style.boxShadow = "0 6px 20px rgba(239,68,68,0.35)"); }}
              >
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge
            variant="outline"
            className="px-4 py-1.5 font-semibold"
            style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.3)", background: "#fff1f1" }}
          >
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
            What We <span className="italic" style={{ color: "#ef4444" }}>Offer</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            From intimate portraits to grand celebrations, we bring expertise and passion to every shoot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card
                key={offer.title}
                className="group relative overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(239,68,68,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#f3f4f6";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Red shimmer on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, #ef4444, transparent)" }}
                />

                {offer.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge style={{ background: "#ef4444", color: "white" }} className="font-semibold">
                      {offer.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "#fff1f1" }}
                  >
                    <Icon className="h-6 w-6" style={{ color: "#ef4444" }} />
                  </div>
                  <CardTitle className="text-xl font-display text-gray-900">{offer.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-500">{offer.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "#ef4444" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-display font-bold" style={{ color: "#ef4444" }}>
                      {offer.price}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 font-semibold group/btn hover:bg-red-50"
                      style={{ color: "#ef4444" }}
                      onClick={() => setActiveBooking({ title: offer.title, price: offer.price })}
                    >
                      Book Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Booking modal */}
      {activeBooking && (
        <BookingModal
          service={activeBooking.title}
          price={activeBooking.price}
          onClose={() => setActiveBooking(null)}
        />
      )}
    </section>
  );
};

export default OffersSection;
