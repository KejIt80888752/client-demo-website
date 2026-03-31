import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", alt: "Wedding couple", category: "Wedding" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", alt: "Wedding ceremony", category: "Wedding" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", alt: "Portrait session", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80", alt: "Studio portrait", category: "Portrait" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", alt: "Corporate event", category: "Corporate" },
  { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80", alt: "Product shoot", category: "Product" },
];

const GallerySection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30 font-medium">
              Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Our Best <span className="text-primary italic">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              A curated selection of our finest captures across different genres and styles.
            </p>
          </div>
          <Link to="/gallery">
            <Button variant="outline" className="gap-2 group">
              View Full Gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl break-inside-avoid"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="bg-primary/90 text-primary-foreground">{img.category}</Badge>
                <p className="text-primary-foreground text-sm mt-1 font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
