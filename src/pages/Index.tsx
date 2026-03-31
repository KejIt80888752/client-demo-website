import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import OffersSection from "@/components/home/OffersSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <OffersSection />
      <GallerySection />
      <TestimonialsSection />
      <Footer />
    </Layout>
  );
};

export default Index;
