import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Video, Users, Building2, Heart, Sparkles, ArrowRight } from "lucide-react";

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

const OffersSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30 font-medium">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            What We <span className="text-primary italic">Offer</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From intimate portraits to grand celebrations, we bring expertise and passion to every shoot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card
                key={offer.title}
                className="group relative overflow-hidden border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {offer.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground font-semibold">{offer.badge}</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-display">{offer.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{offer.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-display font-bold text-primary">{offer.price}</span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary group/btn">
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
    </section>
  );
};

export default OffersSection;
