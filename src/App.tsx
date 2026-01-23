import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import Services from "./pages/Services";
import ServiceDetail from "./pages/services/ServiceDetail";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/portfolio/PortfolioDetail";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import JobDetail from "./pages/careers/JobDetail";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminJobs from "./pages/admin/Jobs";
import AdminApplications from "./pages/admin/Applications";
import AdminBookings from "./pages/admin/Bookings";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:slug" element={<JobDetail />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
