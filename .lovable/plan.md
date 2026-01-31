

## Fix "Learn More About Us" and "Meet Our Team" Buttons

The buttons in the About section are currently non-functional because they lack navigation logic.

---

### Root Cause

| Button | Current State | Problem |
|--------|---------------|---------|
| Learn More About Us | `<Button variant="default" size="lg">` | No onClick or Link - does nothing |
| Meet Our Team | `<Button variant="outline" size="lg">` | No onClick or Link - does nothing |

---

### Solution

Convert both buttons to navigation links using React Router's `Link` component with `asChild` prop on Button:

| Button | Destination |
|--------|-------------|
| Learn More About Us | `/about` - navigates to the About page |
| Meet Our Team | `/about#team` - navigates to About page, scrolls to Team section |

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/AboutSection.tsx` | Import Link from react-router-dom, wrap buttons with Link component |
| `src/pages/About.tsx` | Add `id="team"` to the Team values card section for anchor navigation |

---

### Technical Details

**Update `src/components/sections/AboutSection.tsx`:**

```tsx
// Add import at top
import { Link } from "react-router-dom";

// Update buttons (lines 120-127)
<div className="flex flex-col sm:flex-row gap-4">
  <Button variant="default" size="lg" asChild>
    <Link to="/about">Learn More About Us</Link>
  </Button>
  <Button variant="outline" size="lg" asChild>
    <Link to="/about#team">Meet Our Team</Link>
  </Button>
</div>
```

**Update `src/pages/About.tsx`:**

Add an `id="team"` to the Values/Team section for scroll targeting:

```tsx
// Update the Values section (around line 65)
<section id="team" className="py-20 relative">
```

---

### How It Works

```text
Homepage (AboutSection)
        │
        ├── [Learn More About Us] ──► /about (full About page)
        │
        └── [Meet Our Team] ──► /about#team (About page, scrolls to team section)
```

---

### Result

- "Learn More About Us" button navigates to the dedicated About page
- "Meet Our Team" button navigates to About page and scrolls to the team/values section
- Both buttons work correctly from the homepage and any other page using AboutSection

