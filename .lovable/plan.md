
## Fix Careers Page Scroll Position

When clicking "Careers" in the navigation, the page opens at the bottom (showing the footer) instead of at the top. This happens because the `Careers.tsx` page is missing the `useScrollToSection` hook that handles scroll-to-top behavior.

---

### Root Cause

The `useScrollToSection` hook is only used in `Index.tsx`. Other pages like Careers, Services, Portfolio, About, Testimonials, and Contact don't call this hook, so they don't trigger the scroll-to-top behavior when navigated to.

---

### Solution

Add the `useScrollToSection` hook to all public-facing pages that need scroll-to-top functionality.

---

### Files to Update

| File | Change |
|------|--------|
| `src/pages/Careers.tsx` | Import and call `useScrollToSection()` |
| `src/pages/Services.tsx` | Import and call `useScrollToSection()` |
| `src/pages/Portfolio.tsx` | Import and call `useScrollToSection()` |
| `src/pages/About.tsx` | Import and call `useScrollToSection()` |
| `src/pages/Testimonials.tsx` | Import and call `useScrollToSection()` |
| `src/pages/Contact.tsx` | Import and call `useScrollToSection()` |

---

### Technical Details

Each page will add this import and hook call:

```tsx
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function PageName() {
  useScrollToSection(); // Add this line at the top of the component
  
  // ... rest of component
}
```

---

### Result

- Clicking "Careers" (or any nav link) will show the page starting from the top
- Hash-based navigation (like `/about#team`) will still scroll to the specific section
- Consistent scroll behavior across all pages
