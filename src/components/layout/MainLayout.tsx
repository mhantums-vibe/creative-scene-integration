import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSidebar } from "./MainSidebar";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { settings } = useSiteSettings();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header bar with trigger */}
          <header className="sticky top-0 z-40 h-14 border-b border-border/50 flex items-center px-4 gap-4 bg-background/80 backdrop-blur-xl">
            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {settings.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className="w-8 h-8 rounded-lg object-cover lg:hidden" 
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center lg:hidden">
                  <span className="text-primary-foreground font-bold text-sm">
                    {settings.site_name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-semibold text-foreground lg:hidden">
                {settings.site_name}
              </span>
            </motion.div>
          </header>
          
          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
