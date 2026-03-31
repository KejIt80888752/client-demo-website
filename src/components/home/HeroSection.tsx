import { Button } from "@/components/ui/button";
import { Camera, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1600&q=80"
          alt="KejShots photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Photography Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-primary-foreground">
            Every Frame
            <br />
            Tells a{" "}
            <span className="text-primary italic">Story</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
            At KejShots, we don't just take photos — we craft visual narratives that
            capture the emotion, beauty, and authenticity of your most cherished moments.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/business">
              <Button size="lg" className="h-14 px-8 text-base font-semibold gap-2 group">
                Explore Services
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Play className="h-5 w-5" />
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-4">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "12+", label: "Years Experience" },
              { value: "98%", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
