import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  technologies: string[] | null;
  slug: string;
}
interface PortfolioSectionProps {
  limit?: number;
  showSeeMore?: boolean;
  title?: string;
  subtitle?: string;
  category?: string;
}
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};
export function PortfolioSection({
  limit,
  showSeeMore = false,
  title = "Our Projects",
  subtitle = "See examples of our work",
  category
}: PortfolioSectionProps) {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      let query = supabase.from("portfolio_items").select("id, title, description, image_url, category, technologies, slug").eq("is_active", true);
      if (category) {
        query = query.eq("category", category);
      }
      const {
        data
      } = await query.order("display_order", {
        ascending: true
      });
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, [category]);
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  if (!loading && projects.length === 0) {
    return null;
  }
  return <section className="py-24 bg-gradient-to-b from-muted/40 to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text-primary">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div> : <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }}>
            {displayedProjects.map(project => <motion.div key={project.id} variants={itemVariants}>
                <Link to={`/portfolio/${project.slug}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No image</span>
                        </div>}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <Eye className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {project.category && <Badge variant="secondary" className="mb-3">
                          {project.category}
                        </Badge>}
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {project.description && <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>}

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map(tech => <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                              {tech}
                            </span>)}
                          {project.technologies.length > 4 && <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                              +{project.technologies.length - 4}
                            </span>}
                        </div>}
                    </div>
                  </Card>
                </Link>
              </motion.div>)}
          </motion.div>}

        {/* See More Button */}
        {showSeeMore && projects.length > (limit || 0) && <motion.div className="text-center mt-12" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }}>
            <Link to="/portfolio">
              <Button size="lg" className="group">
                See All Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>}
      </div>
    </section>;
}