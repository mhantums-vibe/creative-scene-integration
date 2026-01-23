import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Nav items with both page routes and homepage section IDs
const navItems = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "Services", href: "/services", sectionId: "services" },
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials", sectionId: "testimonials" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();
  const { settings } = useSiteSettings();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Handle navigation with smooth scroll support
  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    const isOnHomepage = location.pathname === "/";
    
    // If on homepage and item has a section ID, smooth scroll instead of navigate
    if (isOnHomepage && item.sectionId) {
      e.preventDefault();
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    
    // If not on homepage but item has a section ID, navigate to homepage with hash
    if (!isOnHomepage && item.sectionId && item.name !== "Home") {
      e.preventDefault();
      navigate(`/#${item.sectionId}`);
      return;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={(e) => handleNavClick(e, navItems[0])}
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="w-15 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">{settings.site_name.charAt(0)}</span>
                </div>
              )}
              <span className="text-xl font-bold text-white">{settings.site_name}</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors relative group inline-block"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                </Link>
              </motion.div>
            ))}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors relative group inline-block"
                >
                  Admin
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {user ? (
              <>
                <Button variant="heroOutline" size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="hero" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="heroOutline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden backdrop-blur-2xl bg-black/50 border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-3 text-primary hover:text-primary/80 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                  {user ? (
                    <>
                      <Button variant="heroOutline" className="w-full" asChild>
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                      </Button>
                      <Button variant="hero" className="w-full" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="heroOutline" className="w-full" asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
