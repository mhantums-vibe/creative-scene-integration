import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Booking {
  id: string;
  user_id: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  description: string | null;
  created_at: string;
  profiles?: {
    full_name: string | null;
    phone: string | null;
  };
}

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    try {
      let query = supabase
        .from("bookings")
        .select("*")
        .order("booking_date", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      logger.error("Error fetching bookings", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterStatus]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;
      toast.success("Status updated");
      fetchBookings();
    } catch (error) {
      logger.error("Error updating status", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", selectedBooking.id);

      if (error) throw error;
      toast.success("Booking deleted");
      setIsDeleteDialogOpen(false);
      fetchBookings();
    } catch (error) {
      logger.error("Error deleting booking", error);
      toast.error("Failed to delete booking");
    }
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
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">Manage customer bookings</p>
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
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{booking.profiles?.full_name || "Unknown"}</p>
                        <p className="text-muted-foreground">{booking.profiles?.phone || "-"}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{booking.service_name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(new Date(booking.booking_date), "MMM d, yyyy")}</p>
                        <p className="text-muted-foreground">{booking.booking_time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <StatusBadge status={booking.status} />
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
                    <TableCell className="max-w-48 truncate">
                      {booking.notes || booking.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Booking"
        description={`Are you sure you want to delete this booking for "${selectedBooking?.service_name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
