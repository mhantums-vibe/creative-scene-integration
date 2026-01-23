import { motion } from "framer-motion";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    responsibilities: string;
    salary_range: string | null;
  };
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-500/10 text-green-500 border-green-500/20",
    "Part-time": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Contract": "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "Internship": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Remote": "bg-teal-500/10 text-teal-500 border-teal-500/20",
  };

  const jobSlug = job.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/careers/${jobSlug}`} className="block">
        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {job.department}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", typeColors[job.type] || "")}
                >
                  {job.type}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {job.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                {job.salary_range && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary_range}
                  </span>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="group-hover:bg-primary/10">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
