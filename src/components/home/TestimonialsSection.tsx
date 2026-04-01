import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    initials: "PS",
    rating: 5,
    text: "KejShots captured our wedding day so beautifully. Every photo tells a story and brings back all the emotions. Truly magical work!",
  },
  {
    name: "Rahul Mehta",
    role: "Business Owner",
    initials: "RM",
    rating: 5,
    text: "The product photography transformed our online store. Sales increased 40% after updating our product images. Highly professional team!",
  },
  {
    name: "Ananya Reddy",
    role: "Model",
    initials: "AR",
    rating: 5,
    text: "My portfolio shoot was incredible. The team made me feel comfortable and the results exceeded my expectations. Best in the business!",
  },
  {
    name: "Vikram Patel",
    role: "Event Manager",
    initials: "VP",
    rating: 5,
    text: "We've hired KejShots for multiple corporate events. Consistently reliable, creative, and their turnaround time is unmatched.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Mother",
    initials: "SK",
    rating: 5,
    text: "Our baby's first birthday shoot was so special. The photographers were patient and captured the most adorable candid moments.",
  },
  {
    name: "Arjun Desai",
    role: "Groom",
    initials: "AD",
    rating: 5,
    text: "From pre-wedding to the reception, KejShots was with us every step. The cinematic video still makes us cry happy tears.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24" style={{ background: '#fff7f7' }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge
            variant="outline"
            className="px-4 py-1.5 font-semibold"
            style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', background: '#fff1f1' }}
          >
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
            What Our Clients <span className="italic" style={{ color: '#ef4444' }}>Say</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Real stories from real people who trusted us with their most important moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Card
              key={t.name}
              className="bg-white border border-gray-100 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.25)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(239,68,68,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8" style={{ color: 'rgba(239,68,68,0.25)' }} />
                <p className="text-gray-600 leading-relaxed italic">"{t.text}"</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{ fill: '#ef4444', color: '#ef4444' }} />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10" style={{ border: '2px solid rgba(239,68,68,0.2)' }}>
                    <AvatarFallback
                      className="font-semibold text-sm"
                      style={{ background: '#fff1f1', color: '#ef4444' }}
                    >
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
