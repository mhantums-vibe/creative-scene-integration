'use client';

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArrowRight, Play } from "lucide-react";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
const stats = [{
  value: 500,
  suffix: "+",
  label: "Projects Delivered"
}, {
  value: 150,
  suffix: "+",
  label: "Happy Clients"
}, {
  value: 8,
  suffix: "+",
  label: "Years Experience"
}];
export function HeroSection() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    settings
  } = useSiteSettings();
  const handleBookingClick = () => {
    if (!user) {
      navigate("/login");
    }
  };
  return <section id="home" className="relative min-h-screen hero-section overflow-hidden pt-16 lg:pt-20">
      {/* Hero Banner Background */}
      {settings.hero_banner_url && <div className="absolute inset-0 z-0">
          <img src={settings.hero_banner_url} alt="Hero Banner" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>}
      
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(145 63% 42%)" />
      
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-5rem)] gap-8 lg:gap-0">
          {/* Left content */}
          <motion.div className="flex-1 relative z-10 flex flex-col justify-center py-12 lg:py-0" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 w-fit mx-0 my-[15px]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Transforming Ideas into Digital Reality
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text-hero leading-tight mb-6">
              Innovative IT
              <br />
              <span className="gradient-text-primary">Solutions</span> for
              <br />
              Your Business
            </h1>

            <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              From stunning websites to powerful mobile apps, we deliver cutting-edge 
              digital solutions that drive growth and transform your business vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {user ? <BookingDialog>
                  <Button variant="hero" size="xl" className="group">
                    Book an Appointment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </BookingDialog> : <Button variant="hero" size="xl" className="group" onClick={handleBookingClick}>
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>}
              <Button variant="heroOutline" size="xl" className="group" onClick={() => document.getElementById('services')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                <Play className="w-5 h-5" />
                View Services
              </Button>
            </div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/40 my-[25px] py-[15px] shadow-xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              {stats.map(stat => <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-xs sm:text-sm mt-1 font-medium text-white">{stat.label}</div>
                </div>)}
            </motion.div>
          </motion.div>

          {/* Right content - 3D Scene */}
          <motion.div className="flex-1 relative h-[400px] lg:h-[600px] w-full" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1,
          delay: 0.4
        }}>
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>;
}