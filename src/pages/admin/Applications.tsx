import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface JobApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  resume_url: string;
  portfolio_url: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
  job_posting_id: string;
  job_postings?: {
    title: string;
  };
}

const statusOptions = ["pending", "reviewing", "interviewed", "rejected", "hired"];

export default function AdminApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  // Get signed URL for a resume (admins only via RLS policy)
  const getSignedUrl = async (resumePath: string): Promise<string | null> => {
    // Check if we already have a cached signed URL
    if (signedUrls[resumePath]) {
      return signedUrls[resumePath];
    }
    
    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(resumePath, 3600); // 1 hour expiry
      
      if (error) {
        console.error("Error creating signed URL:", error);
        toast.error("Failed to access resume");
        return null;
      }
      
      // Cache the signed URL
      setSignedUrls(prev => ({ ...prev, [resumePath]: data.signedUrl }));
      return data.signedUrl;
    } catch (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }
  };

  const handleDownloadResume = async (resumePath: string) => {
    const url = await getSignedUrl(resumePath);
    if (url) {
      window.open(url, "_blank");
    }
  };
  const fetchApplications = async () => {
    try {
      let query = supabase
        .from("job_applications")
        .select(`
          *,
          job_postings (title)
        `)
        .order("created_at", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;
      toast.success("Status updated");
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const viewDetails = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Applications</h1>
          <p className="text-muted-foreground">Review and manage applications</p>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{app.job_postings?.title || "Unknown"}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{app.email}</p>
                        <p className="text-muted-foreground">{app.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={app.status}
                        onValueChange={(value) => handleStatusChange(app.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <StatusBadge status={app.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status} className="capitalize">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{format(new Date(app.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDownloadResume(app.resume_url)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-foreground">{selectedApplication.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Position</label>
                  <p className="text-foreground">{selectedApplication.job_postings?.title || "Unknown"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={selectedApplication.status} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Applied On</label>
                  <p className="text-foreground">
                    {format(new Date(selectedApplication.created_at), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
              
              {selectedApplication.portfolio_url && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Portfolio</label>
                  <a
                    href={selectedApplication.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block"
                  >
                    {selectedApplication.portfolio_url}
                  </a>
                </div>
              )}

              {selectedApplication.cover_letter && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cover Letter</label>
                  <p className="text-foreground mt-1 whitespace-pre-wrap">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleDownloadResume(selectedApplication.resume_url)}>
                  <Download className="h-4 w-4 mr-2" /> Download Resume
                </Button>
                <Select
                  value={selectedApplication.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedApplication.id, value);
                    setSelectedApplication({ ...selectedApplication, status: value });
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
