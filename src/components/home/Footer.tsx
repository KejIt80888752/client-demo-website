import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="h-7 w-7 text-primary" />
              <span className="text-xl font-display font-bold">KejShots</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional photography and videography services. Crafting visual stories that last a lifetime since 2012.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Business", path: "/business" },
                { label: "Gallery", path: "/gallery" },
                { label: "Profile", path: "/profile" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Services</h4>
            <ul className="space-y-2.5">
              {["Wedding Photography", "Corporate Events", "Portrait Sessions", "Product Shoots", "Videography", "Pre-Wedding"].map(
                (service) => (
                  <li key={service}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {service}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  42, MG Road, Bengaluru, Karnataka 560001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">hello@kejshots.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border/20" />

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KejShots Photography. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
