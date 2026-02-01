import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Scroll to top when navigating to any page without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
}

export function getNavHref(currentPath: string, targetPath: string, sectionId?: string): string {
  // If we're on the homepage and the target is a homepage section, use anchor
  if (currentPath === "/" && sectionId) {
    return `#${sectionId}`;
  }
  
  // If target has a section ID, navigate to homepage with hash
  if (sectionId) {
    return `/#${sectionId}`;
  }
  
  // Otherwise, just use the path
  return targetPath;
}
