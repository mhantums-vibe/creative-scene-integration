

## Implement Careers-Style Banner on Services Page

Update the Services page hero banner to match the Careers page design with centered content, a pill badge, and improved visual styling.

---

### Reference Analysis (from Careers page screenshot)

The Careers hero banner features:
- Dark `bg-accent` background with gradient overlay
- Centered content layout (not left-aligned)
- Pill badge with icon and text at the top
- Large heading with white text and primary (green) accent
- Subtitle paragraph in muted white

---

### Current vs Proposed

| Element | Current Services | Proposed (Careers-style) |
|---------|-----------------|-------------------------|
| Layout | Left-aligned | Centered |
| Background | `from-primary/20 via-background to-background bg-ring` | `bg-accent` with `from-primary/20 via-transparent to-transparent` |
| Pill badge | None | "Our Services" pill with icon |
| Heading color | `text-accent-foreground` | `text-white` |
| Padding | `py-16 lg:py-24` | `pt-32 pb-20` |
| Breadcrumb | Keep but style differently | Remove (not present in Careers) |

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Services.tsx` | Update hero section styling to match Careers page design |

---

### Technical Details

**1. Update section styling (line 14):**
```tsx
// Before
<section className="relative py-16 lg:py-24 overflow-hidden">

// After
<section className="pt-32 pb-20 bg-accent relative overflow-hidden">
```

**2. Update gradient overlay (line 15):**
```tsx
// Before
<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background bg-ring" />

// After
<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
```

**3. Add icon import and pill badge:**
```tsx
import { Settings } from "lucide-react";

// Add before h1
<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
  <Settings className="w-4 h-4 text-primary" />
  <span className="text-sm text-primary font-medium">What We Offer</span>
</div>
```

**4. Update content container to be centered (line 31-35):**
```tsx
// Before
<motion.div className="max-w-3xl" ...>

// After
<motion.div className="max-w-3xl mx-auto text-center" ...>
```

**5. Update heading styling (line 37-38):**
```tsx
// Before
<h1 className="text-4xl lg:text-5xl font-bold mb-6 text-accent-foreground">

// After
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
```

**6. Update paragraph styling (line 40):**
```tsx
// Before
<p className="text-lg leading-relaxed text-muted-foreground font-normal">

// After
<p className="text-lg text-white/70 leading-relaxed">
```

**7. Remove breadcrumb section** (or move to a less prominent position if desired)

---

### Result

- Services page banner matches the Careers page design pattern
- Centered layout with dark accent background
- Pill badge with icon for visual consistency
- White text with green accent for better readability
- Consistent styling across the site's inner pages

