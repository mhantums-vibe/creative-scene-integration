import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // Common statuses
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  
  // Job application statuses
  reviewing: "bg-orange-100 text-orange-800 border-orange-200",
  interviewed: "bg-indigo-100 text-indigo-800 border-indigo-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  hired: "bg-green-100 text-green-800 border-green-200",
  
  // User roles
  admin: "bg-purple-100 text-purple-800 border-purple-200",
  manager: "bg-blue-100 text-blue-800 border-blue-200",
  staff: "bg-cyan-100 text-cyan-800 border-cyan-200",
  customer: "bg-gray-100 text-gray-800 border-gray-200",
  
  // Active/Inactive
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "_");
  const style = statusStyles[normalizedStatus] || "bg-gray-100 text-gray-800 border-gray-200";
  
  return (
    <Badge
      variant="outline"
      className={cn("capitalize border", style, className)}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
