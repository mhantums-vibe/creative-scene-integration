

## Show Category-wise Demo Projects on Service Detail Pages

This plan adds a "Related Projects" section to individual service detail/booking pages, showing portfolio items filtered by category that matches the service.

---

### What You'll Get

- A "Related Projects" section on each service detail page (e.g., `/services/website-development`)
- Projects filtered to show only those relevant to that specific service
- Smart category mapping to handle differences between service names and portfolio categories
- Falls back to showing all projects if no category matches

---

### Current Data Analysis

| Service Name | Portfolio Category | Mapping |
|--------------|-------------------|---------|
| Website Development | Web Development | Match |
| App Development | Mobile App | Match |
| Graphic Design | UI/UX Design, Branding | Match |
| Video Editing | (none yet) | Show all |
| Hosting & Domain | (none yet) | Show all |
| IT Security | (none yet) | Show all |
| AI Automation | (none yet) | Show all |

---

### Implementation Approach

| Step | Description |
|------|-------------|
| 1 | Add `category` prop to `PortfolioSection` component for filtering |
| 2 | Create category mapping function to match services to portfolio categories |
| 3 | Add `PortfolioSection` to `ServiceDetail.tsx` before the booking form |
| 4 | Pass the mapped category based on the current service title |

---

### Technical Details

**File Modifications:**

| File | Changes |
|------|---------|
| `src/components/sections/PortfolioSection.tsx` | Add optional `category` prop for filtering projects |
| `src/pages/services/ServiceDetail.tsx` | Import and add PortfolioSection with category filtering |

---

### Updated Component Interface

```tsx
interface PortfolioSectionProps {
  limit?: number;
  showSeeMore?: boolean;
  title?: string;
  subtitle?: string;
  category?: string;  // NEW: Filter by category
}
```

---

### Category Mapping Logic

```tsx
const getCategoryForService = (serviceTitle: string): string | undefined => {
  const mapping: Record<string, string> = {
    "Website Development": "Web Development",
    "App Development": "Mobile App",
    "Graphic Design": "Branding",
    "UI/UX Design": "UI/UX Design",
  };
  return mapping[serviceTitle];
};
```

---

### Page Structure After Changes

```text
Service Detail Page
+-----------------------------+
|  Hero Section               |
+-----------------------------+
|  Features                   |
+-----------------------------+
|  Extended Description       |
+-----------------------------+
|  Sub-Services               |
+-----------------------------+
|  Process Steps              |
+-----------------------------+
|  Related Projects (NEW)     |  <-- Filtered by category
+-----------------------------+
|  Booking Form               |
+-----------------------------+
|  Footer                     |
+-----------------------------+
```

---

### Key Code Snippets

**ServiceDetail.tsx usage:**
```tsx
import { PortfolioSection } from "@/components/sections/PortfolioSection";

// Before the booking form section
<PortfolioSection
  category={getCategoryForService(service.title)}
  limit={3}
  showSeeMore={true}
  title={`${service.title} Projects`}
  subtitle={`See examples of our ${service.title.toLowerCase()} work`}
/>
```

---

### Notes

- If a service has no matching projects, the section will be hidden
- The "See All Projects" button links to the full portfolio page
- Category matching is case-insensitive for flexibility
- Services without matching categories will show no projects (section hidden)

