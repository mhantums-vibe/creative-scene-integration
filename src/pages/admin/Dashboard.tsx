import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { StatsCard } from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";
import {
  Users,
  FileText,
  Calendar,
  Package,
  Briefcase,
  Loader2,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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

interface ChartData {
  date: string;
  bookings: number;
  orders: number;
  users: number;
}

interface StatusDistribution {
  name: string;
  value: number;
  color: string;
}

const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#22c55e",
  cancelled: "#ef4444",
  completed: "#3b82f6",
  in_progress: "#8b5cf6",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    pendingApplications: 0,
    todayBookings: 0,
    pendingOrders: 0,
    activeJobs: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [bookingStatusData, setBookingStatusData] = useState<StatusDistribution[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<StatusDistribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const thirtyDaysAgo = subDays(new Date(), 30);

        const [
          usersResult,
          applicationsResult,
          bookingsResult,
          ordersResult,
          jobsResult,
          recentAppsResult,
          recentBookingsResult,
          allBookingsResult,
          allOrdersResult,
          allUsersResult,
        ] = await Promise.all([
          supabase.from("profiles").select("id", { count: "exact", head: true }),
          supabase.from("job_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("bookings").select("id", { count: "exact", head: true }).eq("booking_date", today),
          supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("job_postings").select("id", { count: "exact", head: true }).eq("is_active", true),
          supabase.from("job_applications").select("id, full_name, status, created_at").order("created_at", { ascending: false }).limit(3),
          supabase.from("bookings").select("id, service_name, status, created_at").order("created_at", { ascending: false }).limit(3),
          supabase.from("bookings").select("created_at, status").gte("created_at", thirtyDaysAgo.toISOString()),
          supabase.from("orders").select("created_at, status").gte("created_at", thirtyDaysAgo.toISOString()),
          supabase.from("profiles").select("created_at").gte("created_at", thirtyDaysAgo.toISOString()),
        ]);

        setStats({
          totalUsers: usersResult.count || 0,
          pendingApplications: applicationsResult.count || 0,
          todayBookings: bookingsResult.count || 0,
          pendingOrders: ordersResult.count || 0,
          activeJobs: jobsResult.count || 0,
        });

        // Process chart data for the last 30 days
        const days = eachDayOfInterval({
          start: thirtyDaysAgo,
          end: new Date(),
        });

        const bookings = allBookingsResult.data || [];
        const orders = allOrdersResult.data || [];
        const users = allUsersResult.data || [];

        const processedChartData = days.map((day) => {
          const dayStart = startOfDay(day);
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const dayBookings = bookings.filter((b) => {
            const date = new Date(b.created_at);
            return date >= dayStart && date < dayEnd;
          }).length;

          const dayOrders = orders.filter((o) => {
            const date = new Date(o.created_at);
            return date >= dayStart && date < dayEnd;
          }).length;

          const dayUsers = users.filter((u) => {
            const date = new Date(u.created_at);
            return date >= dayStart && date < dayEnd;
          }).length;

          return {
            date: format(day, "MMM d"),
            bookings: dayBookings,
            orders: dayOrders,
            users: dayUsers,
          };
        });

        setChartData(processedChartData);

        // Process booking status distribution
        const bookingStatusCounts: Record<string, number> = {};
        bookings.forEach((b) => {
          bookingStatusCounts[b.status] = (bookingStatusCounts[b.status] || 0) + 1;
        });

        setBookingStatusData(
          Object.entries(bookingStatusCounts).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1).replace("_", " "),
            value,
            color: STATUS_COLORS[name] || "#6b7280",
          }))
        );

        // Process order status distribution
        const orderStatusCounts: Record<string, number> = {};
        orders.forEach((o) => {
          orderStatusCounts[o.status] = (orderStatusCounts[o.status] || 0) + 1;
        });

        setOrderStatusData(
          Object.entries(orderStatusCounts).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1).replace("_", " "),
            value,
            color: STATUS_COLORS[name] || "#6b7280",
          }))
        );

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
        logger.error("Error fetching stats", error);
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

      {/* Booking & Order Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Activity Trends (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  name="Bookings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#bookingsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Growth Chart */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="users"
                    name="New Users"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Charts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Booking Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {bookingStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No booking data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Order Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {orderStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="value" name="Orders" radius={[0, 4, 4, 0]}>
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No order data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
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
