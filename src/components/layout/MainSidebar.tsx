import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  Info,
  Briefcase,
  MessageSquare,
  Mail,
  Users,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const navItems = [
  { title: "Home", href: "#home", icon: Home, isAnchor: true },
  { title: "Services", href: "#services", icon: Layers, isAnchor: true },
  { title: "About", href: "#about", icon: Info, isAnchor: true },
  { title: "Testimonials", href: "#testimonials", icon: MessageSquare, isAnchor: true },
  { title: "Contact", href: "#contact", icon: Mail, isAnchor: true },
  { title: "Careers", href: "/careers", icon: Briefcase, isAnchor: false },
];

export function MainSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAnchorClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/50 bg-background/95 backdrop-blur-xl"
    >
      <SidebarHeader className="border-b border-border/50 p-4">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {settings.logo_url ? (
            <img 
              src={settings.logo_url} 
              alt="Logo" 
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-primary/20" 
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-primary-foreground font-bold text-lg">
                {settings.site_name.charAt(0)}
              </span>
            </div>
          )}
          {!collapsed && (
            <motion.span 
              className="font-semibold text-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {settings.site_name}
            </motion.span>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70 text-xs uppercase tracking-wider px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/15 data-[active=true]:text-primary"
                    >
                      {item.isAnchor ? (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleAnchorClick(item.href);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5"
                        >
                          <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          {!collapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2.5"
                        >
                          <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          {!collapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-muted-foreground/70 text-xs uppercase tracking-wider px-2">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Dashboard"
                      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5">
                        <LayoutDashboard className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        {!collapsed && <span className="font-medium">Dashboard</span>}
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {isAdmin && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        tooltip="Admin Panel"
                        className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-accent/50 hover:text-accent-foreground"
                      >
                        <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5">
                          <Shield className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-amber-500" />
                          {!collapsed && <span className="font-medium text-amber-500">Admin Panel</span>}
                          <span className="absolute inset-y-0 left-0 w-0.5 bg-amber-500 scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </>
              ) : (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Login"
                      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <Link to="/login" className="flex items-center gap-3 px-3 py-2.5">
                        <LogIn className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        {!collapsed && <span className="font-medium">Login</span>}
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip="Sign Up"
                      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    >
                      <Link to="/signup" className="flex items-center gap-3 px-3 py-2.5">
                        <UserPlus className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        {!collapsed && <span className="font-medium">Get Started</span>}
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-primary scale-y-0 transition-transform duration-300 group-hover:scale-y-100 rounded-r-full" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter className="border-t border-border/50 p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-lg"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Sign Out</span>}
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
