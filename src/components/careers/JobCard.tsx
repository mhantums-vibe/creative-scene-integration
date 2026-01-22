import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  onApply: () => void;
}

export function JobCard({ job, index, onApply }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    "Full-time": "bg-green-500/10 text-green-500 border-green-500/20",
    "Part-time": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Contract": "bg-orange-500/10 text-orange-500 border-orange-500/20",
    "Internship": "bg-purple-500/10 text-purple-500 border-purple-500/20"
  };

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
            <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
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
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">About the Role</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-semibold mb-2">Responsibilities</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {job.responsibilities}
                </div>
              </div>

              {/* Apply Button */}
              <Button onClick={onApply} className="w-full">
                Apply for this Position
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
