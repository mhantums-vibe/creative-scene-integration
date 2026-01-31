

## Remove Portfolio Section from Services Page

Remove the Demo Projects/Portfolio section from the main Services page to keep the page focused on services only.

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Services.tsx` | Remove PortfolioSection import and component usage |

---

### Technical Details

**1. Remove the import (line 4):**
```tsx
// Delete this line
import { PortfolioSection } from "@/components/sections/PortfolioSection";
```

**2. Remove the component usage (lines 52-58):**
```tsx
// Delete these lines
{/* Demo Projects */}
<PortfolioSection
  limit={6}
  showSeeMore={true}
  title="Demo Projects"
  subtitle="Explore our recent work and see what we can do for you"
/>
```

---

### Result

- Services page will only display the services grid
- Cleaner, more focused page layout
- Portfolio/Demo Projects section removed entirely

