import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, MapPin, Clock, Briefcase, DollarSign, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { supabase } from "@/integrations/supabase/client";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_range: string | null;
}

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return;

      // Find job by slug (generated from title)
      const { data: allJobs } = await supabase
        .from("job_postings")
        .select("*")
        .eq("is_active", true);

      const jobData = allJobs?.find(
        (j) => j.title.toLowerCase().replace(/\s+/g, "-") === slug
      );

      setJob(jobData || null);
      setLoading(false);
    };

    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This position may have been filled or is no longer available.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            View All Openings
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-500/10 text-green-600 border-green-500/20",
    "Part-time": "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Contract: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    Internship: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    Remote: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
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
                    <Link to="/careers">Careers</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{job.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job.department}</Badge>
                <Badge className={typeColors[job.type] || ""}>{job.type}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {job.type}
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    {job.salary_range}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <div className="space-y-3">
                    {job.requirements.split('\n').filter(Boolean).map((req, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req.replace(/^[-•]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                  <div className="space-y-3">
                    {job.responsibilities.split('\n').filter(Boolean).map((resp, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{resp.replace(/^[-•]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24"
              >
                <JobApplicationForm jobId={job.id} jobTitle={job.title} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
