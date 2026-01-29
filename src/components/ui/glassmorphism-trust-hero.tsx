import React from "react";
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Star,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu
} from "lucide-react";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

export default function GlassmorphismTrustHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Scoped Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Background Image with Gradient Mask */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* --- LEFT COLUMN --- */}
          <div className="flex flex-col items-start">
            
            {/* Badge */}
            <div className="animate-fade-in mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-primary">
                    Award-Winning Design
                  </span>
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in delay-100 mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Crafting Digital
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Experiences
              </span>
              That Matter
            </h1>

            {/* Description */}
            <p className="animate-fade-in delay-200 mb-8 max-w-lg text-lg text-muted-foreground">
              We design interfaces that combine beauty with functionality,
              creating seamless experiences that users love and businesses thrive on.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in delay-300 flex flex-wrap gap-4">
              <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                View Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background/50 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10">
                <Play className="h-4 w-4 fill-current" />
                Watch Showreel
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="animate-fade-in delay-400 flex flex-col gap-6">
            
            {/* Stats Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
              {/* Card Glow Effect */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                    <Target className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">150+</p>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Client Satisfaction</span>
                    <span className="font-semibold text-primary">98%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: "98%" }}
                    />
                  </div>
                </div>

                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <StatItem value="8+" label="Years" />
                  <StatItem value="50+" label="Team" />
                  <StatItem value="24/7" label="Support" />
                </div>

                {/* Tag Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    ACTIVE
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    <Crown className="h-3 w-3" />
                    PREMIUM
                  </span>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="animate-fade-in delay-500 overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-4 backdrop-blur-xl">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trusted by Industry Leaders
              </p>
              
              <div className="relative overflow-hidden">
                <div className="animate-marquee flex w-max items-center gap-8">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex shrink-0 items-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground"
                    >
                      <client.icon className="h-5 w-5" />
                      <span className="whitespace-nowrap text-sm font-medium">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
