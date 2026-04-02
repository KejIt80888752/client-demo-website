import { useState } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/home/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const categories = ["All", "Wedding", "Portrait", "Corporate", "Product", "Nature"];

const images = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", cat: "Wedding",   title: "Golden Hour Wedding"   },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", cat: "Wedding",   title: "Ceremony Moments"      },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", cat: "Wedding",   title: "First Dance"           },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", cat: "Portrait",  title: "Natural Light Portrait" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", cat: "Portrait",  title: "Studio Session"        },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", cat: "Portrait",  title: "Creative Headshot"     },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", cat: "Corporate", title: "Conference Coverage"    },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", cat: "Corporate", title: "Team Building Event"    },
  { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80", cat: "Product",   title: "Minimal Product Shot"  },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", cat: "Product",   title: "Lifestyle Product"     },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", cat: "Nature",    title: "Morning Mist"          },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", cat: "Nature",    title: "Forest Canopy"         },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const filtered = activeCategory === "All" ? images : images.filter(img => img.cat === activeCategory);

  return (
    <Layout>
      <section style={{ padding: "96px 0", background: "#000", minHeight: "100vh" }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <Badge variant="outline" style={{ color: "#f87171", borderColor: "rgba(220,30,30,0.3)", background: "rgba(220,30,30,0.08)", padding: "6px 16px", fontWeight: 600 }}>
              Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold" style={{ color: "#ebebeb" }}>
              Our <span className="italic" style={{ color: "#ef4444" }}>Portfolio</span>
            </h1>
            <p className="text-lg" style={{ color: "#7a7a7a" }}>
              Browse through our extensive collection of professional photography work.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  background: activeCategory === cat ? "linear-gradient(135deg, hsl(0,84%,52%), hsl(0,78%,38%))" : "transparent",
                  border: activeCategory === cat ? "none" : "1px solid #292929",
                  color: activeCategory === cat ? "white" : "#7a7a7a",
                  boxShadow: activeCategory === cat ? "0 4px 16px -2px rgba(220,30,30,0.4)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
                style={{ border: "1px solid #1a1a1a", animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(220,30,30,0.15) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span style={{ background: "#ef4444", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{img.cat}</span>
                  <p style={{ color: "white", fontSize: 13, fontWeight: 500, marginTop: 4 }}>{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
          {selectedImage && (
            <div className="relative">
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-xl"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.90), transparent)" }}>
                <span style={{ background: "#ef4444", color: "white", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>{selectedImage.cat}</span>
                <h3 style={{ color: "white", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 20, marginTop: 8 }}>{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </Layout>
  );
};

export default Gallery;
