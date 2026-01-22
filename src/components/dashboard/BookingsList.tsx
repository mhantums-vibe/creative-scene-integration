import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  created_at: string;
}

interface BookingsListProps {
  bookings: Booking[];
  emptyAction?: React.ReactNode;
}

export function BookingsList({ bookings, emptyAction }: BookingsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "pending":
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-primary/10 text-primary border-primary/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
        <p className="text-muted-foreground mb-4">
          You haven't made any appointment bookings
        </p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              {getStatusIcon(booking.status)}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium truncate">{booking.service_name}</h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(booking.booking_date), "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {booking.booking_time}
                </span>
              </div>
              {booking.notes && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {booking.notes}
                </p>
              )}
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(booking.status)} shrink-0 capitalize`}
          >
            {booking.status}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
