import { motion } from "framer-motion";
import { CheckCircle2, Users, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";
const features = ["Expert team with 8+ years of experience", "Cutting-edge technology stack", "Agile development methodology", "Dedicated support and maintenance", "Transparent communication", "Competitive pricing"];
const stats = [{
  icon: Users,
  value: "50+",
  label: "Team Members"
}, {
  icon: Target,
  value: "99%",
  label: "Client Satisfaction"
}, {
  icon: Award,
  value: "25+",
  label: "Awards Won"
}];
export function AboutSection() {
  const {
    settings
  } = useSiteSettings();
  return <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image/Visual */}
          <motion.div className="relative" initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3]">
              {settings.banner_url ? <img src={settings.banner_url} alt="About Banner" className="absolute inset-0 w-full h-full object-cover rounded-md" /> : <>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl" />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-24 h-24 rounded-xl bg-primary/30 backdrop-blur-sm" />
                  <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-secondary/20 backdrop-blur-sm" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-2xl bg-accent/40 backdrop-blur-md flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">YB</span>
                  </div>
                </>}
              
              {/* Floating Stats Card */}
              <motion.div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-72 glass-card p-4 backdrop-blur-md shadow-lg opacity-95 rounded bg-white/0" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.4
            }}>
                <div className="flex items-center gap-4">
                  {stats.map((stat, index) => <div key={stat.label} className={`flex-1 ${index !== 0 ? "border-l border-border pl-4" : ""}`}>
                      <div className="text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>)}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About YessBangal
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              We Build Digital
              <br />
              <span className="gradient-text-secondary">Excellence</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Since our founding, YessBangal has been at the forefront of digital innovation. 
              We combine creativity with technical expertise to deliver solutions that not only 
              meet but exceed our clients' expectations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => <motion.div key={feature} className="flex items-center gap-3" initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }}>
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about#team">Meet Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}