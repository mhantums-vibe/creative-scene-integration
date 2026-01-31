import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { motion } from "framer-motion";
import { Users, Target, Eye, Heart, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Mission",
    description: "To empower businesses with cutting-edge digital solutions that drive growth and success in the modern marketplace.",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "To be the leading digital agency in Bangladesh, recognized for innovation, quality, and exceptional client relationships.",
  },
  {
    icon: Heart,
    title: "Values",
    description: "Integrity, innovation, collaboration, and excellence guide everything we do for our clients and community.",
  },
  {
    icon: Users,
    title: "Team",
    description: "A passionate team of designers, developers, and strategists dedicated to bringing your vision to life.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Who We Are</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About <span className="text-primary">YessBangal</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                We're a passionate team dedicated to transforming businesses through innovative digital solutions. 
                Learn more about our journey, values, and the people behind our success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Values Section */}
        <section id="team" className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define who we are as a company.
            </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
