import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Package, Settings, LogOut, Clock, CheckCircle, XCircle, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { BookingsList } from "@/components/dashboard/BookingsList";

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

interface Order {
  id: string;
  service_name: string;
  description: string | null;
  status: string;
  total_amount: number | null;
  created_at: string;
}

interface Booking {
  id: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
      fetchBookings();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (data) {
      setOrders(data);
    }
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user?.id)
      .order("booking_date", { ascending: false });

    if (data) {
      setBookings(data);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
      })
      .eq("user_id", user?.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      fetchProfile();
    }
    setIsUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "in_progress":
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "in_progress":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Y</span>
              </div>
              <span className="text-xl font-bold">
                Yess<span className="text-primary">Bangal</span>
              </span>
            </a>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.full_name || "User"}!</h1>
          <p className="text-muted-foreground mb-8">Manage your profile and view your orders</p>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({ ...formData, full_name: e.target.value })
                        }
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Your address"
                      />
                    </div>

                    <Button type="submit" variant="hero" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Your Bookings
                    </CardTitle>
                    <CardDescription>
                      View and manage your appointment bookings
                    </CardDescription>
                  </div>
                  <BookingDialog onSuccess={fetchBookings}>
                    <Button variant="hero" size="sm">
                      New Booking
                    </Button>
                  </BookingDialog>
                </CardHeader>
                <CardContent>
                  <BookingsList 
                    bookings={bookings} 
                    emptyAction={
                      <BookingDialog onSuccess={fetchBookings}>
                        <Button variant="hero">
                          Book an Appointment
                        </Button>
                      </BookingDialog>
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order History
                  </CardTitle>
                  <CardDescription>
                    View all your service orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet
                      </p>
                      <Button variant="hero" onClick={() => navigate("/#services")}>
                        Browse Services
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <h4 className="font-medium">{order.service_name}</h4>
                              {order.description && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {order.description}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(order.created_at).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {order.total_amount && (
                              <span className="font-medium">
                                ৳{order.total_amount.toLocaleString()}
                              </span>
                            )}
                            <Badge
                              variant="outline"
                              className={getStatusColor(order.status)}
                            >
                              {order.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
