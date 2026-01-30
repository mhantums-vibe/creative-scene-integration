

## Show Demo Projects on Services Page

This plan adds a "Demo Projects" section to the Services page that displays all active portfolio items, allowing visitors to see examples of your work.

---

### What You'll Get

- A new "Demo Projects" section on the `/services` page below the services grid
- Displays all active portfolio items with images, titles, descriptions, and technologies
- Links to individual project detail pages
- Clean, consistent design matching the rest of the site

---

### Implementation Approach

| Step | Description |
|------|-------------|
| 1 | Create a reusable `PortfolioGrid` component that fetches and displays portfolio items |
| 2 | Add the component to the Services page after the ServicesSection |
| 3 | Style it consistently with the existing Portfolio page design |

---

### Technical Details

**New Component: `src/components/sections/PortfolioSection.tsx`**

A reusable portfolio display component that:
- Fetches active portfolio items from Supabase
- Displays them in a responsive 3-column grid
- Shows project image, title, description, category badge, and technologies
- Links each card to `/portfolio/{slug}` for details
- Includes optional `limit` prop to control how many projects to show
- Includes optional `showSeeMore` prop to add a "See All Projects" button

**File Modifications:**

| File | Changes |
|------|---------|
| `src/components/sections/PortfolioSection.tsx` | New file - reusable portfolio grid component |
| `src/pages/Services.tsx` | Import and add `PortfolioSection` after `ServicesSection` |

---

### Component Structure

```text
Services Page
+-----------------------------+
|  Hero Banner               |
+-----------------------------+
|  ServicesSection (existing) |
+-----------------------------+
|  PortfolioSection (new)     |
|  - Section header           |
|  - 3-column project grid    |
|  - "See All Projects" button|
+-----------------------------+
|  Footer                     |
+-----------------------------+
```

---

### Key Code Snippets

**PortfolioSection Component (new):**
```tsx
interface PortfolioSectionProps {
  limit?: number;
  showSeeMore?: boolean;
  title?: string;
  subtitle?: string;
}

export function PortfolioSection({ 
  limit, 
  showSeeMore = false,
  title = "Our Projects",
  subtitle = "See examples of our work"
}: PortfolioSectionProps) {
  // Fetch portfolio_items from Supabase
  // Render in 3-column grid with animations
  // Optionally show "See All Projects" button
}
```

**Services Page Update:**
```tsx
import { PortfolioSection } from "@/components/sections/PortfolioSection";

// After ServicesSection
<PortfolioSection 
  limit={6} 
  showSeeMore={true}
  title="Demo Projects"
  subtitle="Explore our recent work and see what we can do for you"
/>
```

---

### Notes

- No database changes required - uses existing `portfolio_items` table
- The section will show a friendly message if no projects exist yet
- Projects are ordered by `display_order` for admin control
- The component is reusable and can be added to other pages (like homepage) if desired

