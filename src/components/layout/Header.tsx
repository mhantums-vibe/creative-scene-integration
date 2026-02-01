import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

// Main visible nav items
const mainNavItems = [{
  name: "Home",
  href: "/",
  sectionId: "home"
}, {
  name: "Services",
  href: "/services",
  sectionId: "services"
}, {
  name: "About",
  href: "/about",
  sectionId: "about"
}, {
  name: "Careers",
  href: "/careers"
}];

// Secondary items (in dropdown menu)
const moreNavItems = [{
  name: "Portfolio",
  href: "/portfolio"
}, {
  name: "Testimonials",
  href: "/testimonials",
  sectionId: "testimonials"
}, {
  name: "Contact",
  href: "/contact"
}];

// All nav items for mobile menu
const allNavItems = [...mainNavItems, ...moreNavItems];
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    isAdmin
  } = useAdmin();
  const {
    settings
  } = useSiteSettings();
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll position for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Handle navigation with smooth scroll support
  const handleNavClick = (e: React.MouseEvent, item: typeof mainNavItems[0]) => {
    const isOnHomepage = location.pathname === "/";

    // If on homepage and item has a section ID, smooth scroll instead of navigate
    if (isOnHomepage && item.sectionId) {
      e.preventDefault();
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
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
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "glass-nav-scrolled shadow-lg" : "glass-nav")}>
      <div className="container mx-auto px-4">
        <div className={cn("flex items-center justify-between transition-all duration-300", isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20")}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={e => handleNavClick(e, mainNavItems[0])}>
            <motion.div className="flex items-center gap-2" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5
          }}>
              {settings.logo_url ? <img src={settings.logo_url} alt="Logo" className="w-15 h-12 rounded-lg object-contain" /> : <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">{settings.site_name.charAt(0)}</span>
                </div>}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item, index) => <motion.div key={item.name} initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <Link to={item.href} onClick={e => handleNavClick(e, item)} className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors relative group inline-block">
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                </Link>
              </motion.div>)}
            
            {/* More Dropdown */}
            <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: mainNavItems.length * 0.1
          }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 outline-none">
                    More
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur-xl rounded-xl border border-white/10 z-50 min-w-[160px]" align="end">
                  {moreNavItems.map(item => <DropdownMenuItem asChild key={item.name} className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 rounded-lg transition-colors">
                      <Link to={item.href} onClick={e => handleNavClick(e, item)} className="w-full">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>)}
                  {isAdmin && <>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 rounded-lg transition-colors">
                        <Link to="/admin" className="w-full text-primary">
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    </>}
                  <DropdownMenuSeparator className="bg-white/10" />
                  {user ? (
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 rounded-lg transition-colors">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 rounded-lg transition-colors">
                      <Link to="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </nav>

          {/* Desktop CTA */}
          <motion.div className="hidden lg:flex items-center gap-3" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            {user ? (
              <Button variant="hero" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button variant="hero" size="sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden backdrop-blur-lg bg-black/60 border-t border-white/10">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {allNavItems.map(item => <Link key={item.name} to={item.href} className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={e => {
              handleNavClick(e, item);
              setIsMenuOpen(false);
            }}>
                    {item.name}
                  </Link>)}
                {isAdmin && <Link to="/admin" className="px-4 py-3 text-primary hover:text-primary/80 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                  {user ? (
                    <>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                      </Button>
                      <Button variant="heroOutline" className="w-full" onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                      </Button>
                      <Button variant="heroOutline" className="w-full" asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}