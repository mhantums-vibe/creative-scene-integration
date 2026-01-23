import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ExternalLink, Github, Calendar, Building2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  full_description: string | null;
  category: string | null;
  image_url: string | null;
  gallery_images: string[];
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  client_name: string | null;
  completion_date: string | null;
}

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      const { data: projectData } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (projectData) {
        const galleryImages = typeof projectData.gallery_images === 'string'
          ? JSON.parse(projectData.gallery_images)
          : (projectData.gallery_images || []);
        
        setProject({
          ...projectData,
          gallery_images: galleryImages,
        });

        // Fetch related projects
        const { data: relatedData } = await supabase
          .from("portfolio_items")
          .select("id, title, slug, description, category, image_url, technologies")
          .eq("is_active", true)
          .eq("category", projectData.category)
          .neq("id", projectData.id)
          .limit(3);

        if (relatedData) {
          setRelatedProjects(relatedData.map(p => ({
            ...p,
            gallery_images: [],
            full_description: null,
            live_url: null,
            github_url: null,
            client_name: null,
            completion_date: null,
          })));
        }
      }

      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/portfolio">Portfolio</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {project.category && (
                  <Badge variant="secondary" className="mb-4">
                    {project.category}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {project.client_name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {project.client_name}
                    </div>
                  )}
                  {project.completion_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(project.completion_date), "MMMM yyyy")}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.live_url && (
                    <Button asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm py-2 px-4">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Full Description */}
        {project.full_description && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"
              >
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.full_description}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {project.gallery_images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      to={`/portfolio/${relatedProject.slug}`}
                      className="group block"
                    >
                      <div className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                        {relatedProject.image_url ? (
                          <img
                            src={relatedProject.image_url}
                            alt={relatedProject.title}
                            className="w-full aspect-video object-cover"
                          />
                        ) : (
                          <div className="aspect-video bg-muted" />
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {relatedProject.title}
                          </h3>
                          {relatedProject.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {relatedProject.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Want Something Similar?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your project goals with the same level of quality and attention to detail.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
