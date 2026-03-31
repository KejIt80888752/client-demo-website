import Layout from "@/components/Layout";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Camera, Clock, Shield, Zap, Award, Users } from "lucide-react";

const packages = [
  {
    name: "Starter",
    price: "₹5,000",
    description: "Perfect for individual portraits and small shoots",
    features: [
      "1-hour session",
      "1 location",
      "50 edited photos",
      "Online gallery",
      "5-day delivery",
    ],
  },
  {
    name: "Professional",
    price: "₹25,000",
    popular: true,
    description: "Ideal for weddings and large events",
    features: [
      "Full-day coverage",
      "Multiple locations",
      "500+ edited photos",
      "Highlight video",
      "3-day delivery",
      "2 photographers",
      "Drone coverage",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for businesses and brands",
    features: [
      "Unlimited sessions",
      "Dedicated team",
      "Commercial license",
      "Brand guidelines adherence",
      "Same-day previews",
      "Priority support",
      "Monthly retainer",
    ],
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

const Business = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30 mb-6">
            Business Solutions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Photography That Grows
            <br />
            Your <span className="text-primary italic">Business</span>
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
              <Card
                key={pkg.name}
                className={`relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${
                  pkg.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                )}
                <CardHeader className="text-center pb-2">
                  {pkg.popular && (
                    <Badge className="bg-primary text-primary-foreground w-fit mx-auto mb-2">Most Popular</Badge>
                  )}
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
                  <Button
                    className={`w-full gap-2 group ${pkg.popular ? "" : "variant-outline"}`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Elevate Your Visual Story?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                Let's discuss your project and create something extraordinary together.
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-10 text-base font-semibold">
                Contact Us Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default Business;
