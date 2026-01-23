import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import * as Icons from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  icon_url: string | null;
  features: string[];
  display_order: number;
  slug: string | null;
}

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

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className="w-7 h-7 text-primary" /> : null;
};

const ServiceIcon = ({ service }: { service: Service }) => {
  if (service.icon_url) {
    return (
      <img 
        src={service.icon_url} 
        alt={service.title}
        className="w-7 h-7 object-contain"
      />
    );
  }
  return <DynamicIcon name={service.icon} />;
};

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("id, title, description, icon, icon_url, features, display_order, slug")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const getServiceSlug = (service: Service) => {
    return service.slug || service.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
  };
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-muted/20 to-muted/40">
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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="group h-full p-6 lg:p-8 card-hover glass-card-light transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <ServiceIcon service={service} />
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
                <Link to={`/services/${getServiceSlug(service)}`}>
                  <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
