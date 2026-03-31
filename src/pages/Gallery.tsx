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
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", cat: "Wedding", title: "Golden Hour Wedding" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", cat: "Wedding", title: "Ceremony Moments" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", cat: "Wedding", title: "First Dance" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", cat: "Portrait", title: "Natural Light Portrait" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", cat: "Portrait", title: "Studio Session" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", cat: "Portrait", title: "Creative Headshot" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", cat: "Corporate", title: "Conference Coverage" },
  { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", cat: "Corporate", title: "Team Building Event" },
  { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80", cat: "Product", title: "Minimal Product Shot" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", cat: "Product", title: "Lifestyle Product" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", cat: "Nature", title: "Morning Mist" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", cat: "Nature", title: "Forest Canopy" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  const filtered = activeCategory === "All" ? images : images.filter((img) => img.cat === activeCategory);

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30">Gallery</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Our <span className="text-primary italic">Portfolio</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse through our extensive collection of professional photography work.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-6",
                  activeCategory === cat && "shadow-lg"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">{img.cat}</Badge>
                  <p className="text-primary-foreground text-sm font-medium mt-1">{img.title}</p>
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
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-xl">
                <Badge className="bg-primary text-primary-foreground">{selectedImage.cat}</Badge>
                <h3 className="text-primary-foreground font-display font-semibold text-xl mt-2">
                  {selectedImage.title}
                </h3>
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
