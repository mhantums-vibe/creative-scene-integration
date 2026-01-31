import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Eye, Github, Loader2, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  is_featured: boolean;
}

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
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("portfolio_items")
        .select("id, title, slug, description, category, image_url, technologies, live_url, github_url, is_featured")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (data) {
        setProjects(data);
        const uniqueCategories = ["All", ...new Set(data.map(p => p.category).filter(Boolean) as string[])];
        setCategories(uniqueCategories);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

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
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Our Work</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
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
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No projects available yet. Check back soon!</p>
              </div>
            ) : (
              <>
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
                      <Link to={`/portfolio/${project.slug}`}>
                        <Card className="group overflow-hidden bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                          {/* Project Image */}
                          <div className="relative aspect-video overflow-hidden">
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <span className="text-muted-foreground">No image</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                              <Button size="icon" variant="heroOutline" className="rounded-full" aria-label="View project">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {project.github_url && (
                                <Button 
                                  size="icon" 
                                  variant="heroOutline" 
                                  className="rounded-full" 
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label="View source code">
                                    <Github className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="p-6">
                            {project.category && (
                              <Badge variant="secondary" className="mb-3">
                                {project.category}
                              </Badge>
                            )}
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            {project.description && (
                              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                {project.description}
                              </p>
                            )}
                            
                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                                    +{project.technologies.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
