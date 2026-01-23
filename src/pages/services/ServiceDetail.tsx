import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InlineBookingForm } from "@/components/booking/InlineBookingForm";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  extended_description: string | null;
  icon: string;
  icon_url: string | null;
  features: string[];
  process_steps: { title: string; description: string }[];
  slug: string | null;
}

interface SubService {
  id: string;
  title: string;
  description: string | null;
  icon: string;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;

      // Try to find by slug first, then by title match
      let { data: serviceData } = await supabase
        .from("services")
        .select("id, title, description, extended_description, icon, icon_url, features, process_steps, slug")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      // If not found by slug, try matching by generated slug from title
      if (!serviceData) {
        const { data: allServices } = await supabase
          .from("services")
          .select("id, title, description, extended_description, icon, icon_url, features, process_steps, slug")
          .eq("is_active", true);

        serviceData = allServices?.find(
          (s) => s.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and") === slug
        ) || null;
      }

      if (serviceData) {
        // Parse process_steps if it's a string
        const processSteps = typeof serviceData.process_steps === 'string' 
          ? JSON.parse(serviceData.process_steps) 
          : (serviceData.process_steps || []);
        
        setService({
          ...serviceData,
          process_steps: processSteps,
        });

        // Fetch sub-services
        const { data: subServicesData } = await supabase
          .from("sub_services")
          .select("id, title, description, icon")
          .eq("service_id", serviceData.id)
          .eq("is_active", true)
          .order("display_order");

        setSubServices(subServicesData || []);
      }

      setLoading(false);
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/services">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{service.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {service.icon_url ? (
                    <img src={service.icon_url} alt={service.title} className="w-8 h-8" />
                  ) : (
                    <DynamicIcon name={service.icon} className="w-8 h-8 text-primary" />
                  )}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Extended Description */}
        {service.extended_description && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
              >
                <h2 className="text-2xl font-bold mb-6">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {service.extended_description}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Sub-Services */}
        {subServices.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Our {service.title} Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {subServices.map((subService) => (
                    <Card key={subService.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <DynamicIcon name={subService.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{subService.title}</h3>
                      {subService.description && (
                        <p className="text-muted-foreground text-sm">{subService.description}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Process Steps */}
        {service.process_steps && service.process_steps.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Our Process</h2>
                <div className="space-y-6">
                  {service.process_steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Booking Form */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-2 text-center">Ready to Get Started?</h2>
              <p className="text-muted-foreground text-center mb-8">
                Book a free consultation to discuss your {service.title.toLowerCase()} needs.
              </p>
              <InlineBookingForm serviceTitle={service.title} />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
