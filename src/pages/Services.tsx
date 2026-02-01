import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Services = () => {
  useScrollToSection();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="pt-24 pb-16 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Settings className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">What We Offer</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Comprehensive IT Solutions
                <br />
                <span className="text-primary">for Every Need</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                We offer a wide range of digital services to help your business thrive in the modern digital landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesSection hideHeader />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
