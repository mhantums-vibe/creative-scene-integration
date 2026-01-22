'use client'

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen hero-section overflow-hidden pt-16 lg:pt-20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(145 63% 42%)"
      />
      
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-5rem)] gap-8 lg:gap-0">
          {/* Left content */}
          <motion.div
            className="flex-1 relative z-10 flex flex-col justify-center py-12 lg:py-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 w-fit"
            >
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
              <Button variant="hero" size="xl" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "150+", label: "Happy Clients" },
                { value: "8+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - 3D Scene */}
          <motion.div
            className="flex-1 relative h-[400px] lg:h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
