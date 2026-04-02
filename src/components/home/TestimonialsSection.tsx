import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma",   role: "Bride",          initials: "PS", rating: 5, text: "KejShots captured our wedding day so beautifully. Every photo tells a story and brings back all the emotions. Truly magical work!" },
  { name: "Rahul Mehta",    role: "Business Owner", initials: "RM", rating: 5, text: "The product photography transformed our online store. Sales increased 40% after updating our product images. Highly professional team!" },
  { name: "Ananya Reddy",   role: "Model",          initials: "AR", rating: 5, text: "My portfolio shoot was incredible. The team made me feel comfortable and the results exceeded my expectations. Best in the business!" },
  { name: "Vikram Patel",   role: "Event Manager",  initials: "VP", rating: 5, text: "We've hired KejShots for multiple corporate events. Consistently reliable, creative, and their turnaround time is unmatched." },
  { name: "Sneha Kulkarni", role: "Mother",         initials: "SK", rating: 5, text: "Our baby's first birthday shoot was so special. The photographers were patient and captured the most adorable candid moments." },
  { name: "Arjun Desai",    role: "Groom",          initials: "AD", rating: 5, text: "From pre-wedding to the reception, KejShots was with us every step. The cinematic video still makes us cry happy tears." },
];

const TestimonialsSection = () => (
  <section style={{ padding: "96px 0", background: "#070707" }}>
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <Badge variant="outline" style={{ color: "#f87171", borderColor: "rgba(220,30,30,0.3)", background: "rgba(220,30,30,0.08)", padding: "6px 16px", fontWeight: 600 }}>
          Testimonials
        </Badge>
        <h2 className="text-4xl md:text-5xl font-display font-bold" style={{ color: "#ebebeb" }}>
          What Our Clients <span className="italic" style={{ color: "#ef4444" }}>Say</span>
        </h2>
        <p className="text-lg" style={{ color: "#7a7a7a" }}>
          Real stories from real people who trusted us with their most important moments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={t.name}
            style={{
              background: "#0f0f0f",
              border: "1px solid #1a1a1a",
              borderRadius: 16,
              padding: 24,
              transition: "border-color 0.2s, box-shadow 0.2s",
              animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,30,30,0.3)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(220,30,30,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Quote style={{ width: 28, height: 28, color: "rgba(220,30,30,0.22)", marginBottom: 12 }} />
            <p style={{ color: "#9e9e9e", lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>"{t.text}"</p>
            <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} style={{ width: 14, height: 14, fill: "#ef4444", color: "#ef4444" }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(220,30,30,0.12)", border: "2px solid rgba(220,30,30,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13, color: "#f87171",
              }}>
                {t.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#ebebeb" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#7a7a7a" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
