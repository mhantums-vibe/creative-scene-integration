import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { format } from "date-fns";
import {
  Users,
  FileText,
  Calendar,
  Package,
  Briefcase,
  Loader2,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  pendingApplications: number;
  todayBookings: number;
  pendingOrders: number;
  activeJobs: number;
}

interface RecentActivity {
  id: string;
  type: "application" | "booking" | "order";
  title: string;
  status: string;
  date: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    pendingApplications: 0,
    todayBookings: 0,
    pendingOrders: 0,
    activeJobs: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date().toISOString().split("T")[0];

        const [
          usersResult,
          applicationsResult,
          bookingsResult,
          ordersResult,
          jobsResult,
          recentAppsResult,
          recentBookingsResult,
        ] = await Promise.all([
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", today),
          supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("job_postings").select("id", { count: "exact", head: true }).eq("is_active", true),
          supabase.from("job_applications").select("id, full_name, status, created_at").order("created_at", { ascending: false }).limit(3),
          supabase.from("bookings").select("id, service_name, status, created_at").order("created_at", { ascending: false }).limit(3),
        ]);

        setStats({
          totalUsers: usersResult.count || 0,
          pendingApplications: applicationsResult.count || 0,
          todayBookings: bookingsResult.count || 0,
          pendingOrders: ordersResult.count || 0,
          activeJobs: jobsResult.count || 0,
        });

        const activities: RecentActivity[] = [
          ...(recentAppsResult.data || []).map((app) => ({
            id: app.id,
            type: "application" as const,
            title: `Application from ${app.full_name}`,
            status: app.status,
            date: app.created_at,
          })),
          ...(recentBookingsResult.data || []).map((booking) => ({
            id: booking.id,
            type: "booking" as const,
            title: `Booking for ${booking.service_name}`,
            status: booking.status,
            date: booking.created_at,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        setRecentActivity(activities);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard title="Total Users" value={stats.totalUsers} icon={Users} />
        <StatsCard title="Pending Applications" value={stats.pendingApplications} icon={FileText} />
        <StatsCard title="Today's Bookings" value={stats.todayBookings} icon={Calendar} />
        <StatsCard title="Pending Orders" value={stats.pendingOrders} icon={Package} />
        <StatsCard title="Active Jobs" value={stats.activeJobs} icon={Briefcase} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.type === "application" ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : activity.type === "booking" ? (
                        <Calendar className="h-5 w-5 text-primary" />
                      ) : (
                        <Package className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(activity.date), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={activity.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
