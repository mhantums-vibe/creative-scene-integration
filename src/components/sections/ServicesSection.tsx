import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Server, 
  Palette, 
  Video, 
  Shield,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, responsive websites built with modern technologies for optimal performance and user experience.",
    features: ["Custom Design", "SEO Optimized", "Mobile First"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    features: ["iOS & Android", "Cross-Platform", "UI/UX Focus"],
  },
  {
    icon: Server,
    title: "Hosting & Domain",
    description: "Reliable hosting solutions and domain management with 99.9% uptime guarantee and 24/7 support.",
    features: ["99.9% Uptime", "SSL Included", "24/7 Support"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Creative visual solutions including logos, branding, marketing materials, and digital assets.",
    features: ["Brand Identity", "Print Design", "Digital Assets"],
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video production and editing services for marketing, social media, and corporate needs.",
    features: ["Motion Graphics", "Color Grading", "Sound Design"],
  },
  {
    icon: Shield,
    title: "IT Security",
    description: "Comprehensive security solutions to protect your digital assets and ensure business continuity.",
    features: ["Threat Analysis", "Data Protection", "Compliance"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive IT Solutions
            <br />
            <span className="gradient-text-primary">for Every Need</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a wide range of digital services to help your business thrive 
            in the modern digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="group h-full p-6 lg:p-8 card-hover bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
