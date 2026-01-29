import { Header } from "@/components/layout/Header";
import GlassmorphismTrustHero from "@/components/ui/glassmorphism-trust-hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Index = () => {
  useScrollToSection();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="home">
          <GlassmorphismTrustHero />
        </section>
        <section id="services">
          <ServicesSection limit={4} showSeeMore />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
