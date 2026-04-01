import {Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import logo2 from "@/assets/logo2.png";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8" style={{ background: '#1a0404', color: 'white' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center group">
                <img
                  src={logo2}
                  className="h-20 w-25 "
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Professional photography and videography services. Crafting visual stories that last a lifetime since 2012.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#ef4444';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-white">Quick Links</h4>
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
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-white">Services</h4>
            <ul className="space-y-2.5">
              {["Wedding Photography", "Corporate Events", "Portrait Sessions", "Product Shoots", "Videography", "Pre-Wedding"].map(
                (service) => (
                  <li key={service}>
                    <span
                      className="text-sm cursor-pointer transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                    >
                      {service}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#ef4444' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  42, MG Road, Bengaluru, Karnataka 560001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" style={{ color: '#ef4444' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" style={{ color: '#ef4444' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>hello@kejshots.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} KejShots Photography. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(item => (
              <span
                key={item}
                className="cursor-pointer transition-colors duration-200"
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)')}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
