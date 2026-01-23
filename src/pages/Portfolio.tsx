import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const categories = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "Branding"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    category: "Web Development",
    image: "/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    description: "Patient management and telemedicine application for healthcare providers.",
    category: "Mobile Apps",
    image: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Corporate Brand Identity",
    description: "Complete brand identity design including logo, guidelines, and marketing materials.",
    category: "Branding",
    image: "/placeholder.svg",
    technologies: ["Figma", "Illustrator", "Photoshop"],
    liveUrl: "#",
  },
  {
    id: 4,
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization and reporting features.",
    category: "UI/UX Design",
    image: "/placeholder.svg",
    technologies: ["Figma", "React", "D3.js", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Restaurant Booking System",
    description: "Online reservation and menu management system for restaurants.",
    category: "Web Development",
    image: "/placeholder.svg",
    technologies: ["Next.js", "PostgreSQL", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    description: "Mobile app for tracking workouts, nutrition, and health metrics.",
    category: "Mobile Apps",
    image: "/placeholder.svg",
    technologies: ["Flutter", "Firebase", "Dart"],
    liveUrl: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-white/70 hover:text-white">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/50" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary">Portfolio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our <span className="text-primary">Portfolio</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                Explore our latest projects and see how we've helped businesses transform their digital presence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "hero" : "heroOutline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="group overflow-hidden bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all duration-300">
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Button size="icon" variant="heroOutline" className="rounded-full" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live site">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                        {project.githubUrl && (
                          <Button size="icon" variant="heroOutline" className="rounded-full" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View source code">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
