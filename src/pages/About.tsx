import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { motion } from "framer-motion";
import { Users, Target, Eye, Heart, Info, Linkedin, Twitter, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Rafiq Ahmed",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years in digital innovation. Passionate about transforming businesses through technology.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    initials: "RA",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fatima Khan",
    role: "Creative Director",
    bio: "Award-winning designer crafting memorable brand experiences. Believes in the power of visual storytelling.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    initials: "FK",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Arif Hassan",
    role: "Lead Developer",
    bio: "Full-stack expert specializing in scalable web applications. Advocates for clean code and best practices.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    initials: "AH",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Nadia Rahman",
    role: "Marketing Manager",
    bio: "Strategic marketer driving growth through data-driven campaigns. Expert in digital marketing and SEO.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    initials: "NR",
    linkedin: "#",
    twitter: "#",
  },
];

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

        {/* Team Section */}
        <section className="py-20 bg-accent/30 relative">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all group">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="text-xl font-semibold bg-primary/20 text-primary">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                      <div className="flex items-center gap-3">
                        <a
                          href={member.linkedin}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={member.twitter}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@yessbangal.com`}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
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
