import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { motion } from "framer-motion";
import { Users, Target, Eye, Heart, Info, Linkedin, Twitter, Mail, Loader2 } from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  display_order: number;
}

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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  
  useScrollToSection();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
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
        <section id="team" className="py-16 relative">
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

        {/* Team Section */}
        <section className="py-16 bg-accent/30 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Our <span className="text-primary">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The talented people behind YessBangal who make the magic happen every day.
              </p>
            </motion.div>

            {isLoadingTeam ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : teamMembers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No team members to display.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all group">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                          <AvatarImage src={member.image_url || undefined} alt={member.name} />
                          <AvatarFallback className="text-xl font-semibold bg-primary/20 text-primary">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                        <div className="flex items-center gap-3">
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.twitter_url && (
                            <a
                              href={member.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                              aria-label={`${member.name}'s Twitter`}
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
