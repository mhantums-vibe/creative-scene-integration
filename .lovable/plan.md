
## Fix Demo Projects Visibility & Unify Portfolio Card Design

Address two issues on the Services page: hidden Demo Projects section and mismatched card styling between the Services page and Portfolio page.

---

### Issue Analysis

**Problem 1: Demo Projects Hidden**
The PortfolioSection component renders `null` when there are no projects loaded. The database has 6 active portfolio items, so the section should appear. This could be a rendering timing issue or visibility problem.

**Problem 2: Card Style Mismatch**
The Services page uses `PortfolioSection` with a different card design than the Portfolio page:

| Element | PortfolioSection | Portfolio Page |
|---------|-----------------|----------------|
| Background | Light green `bg-[#f4f8f1]` | Dark glass `bg-card/50` |
| Image ratio | 4:3 | 16:9 (video) |
| Grid | 4 columns | 3 columns |
| Padding | 4 units | 6 units |
| Badge | On image | Below image |
| Text color | `text-foreground` | `text-white` |
| Hover | ExternalLink icon | Eye + GitHub overlay |

---

### Solution

Unify the card design by updating `PortfolioSection` to match the Portfolio page styling. This ensures consistency across the site while maintaining the reusable component.

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/PortfolioSection.tsx` | Update card styling to match Portfolio page design |

---

### Technical Details

**1. Update card container class:**
```tsx
// Before
<Card className="group h-full overflow-hidden card-hover glass-card-light transition-all duration-300">

// After
<Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all duration-300">
```

**2. Update image aspect ratio:**
```tsx
// Before
<div className="relative aspect-[4/3] overflow-hidden">

// After
<div className="relative aspect-video overflow-hidden">
```

**3. Update badge positioning (move below image):**
```tsx
// Remove from image overlay
// Add inside content div after title instead
```

**4. Update content container styling:**
```tsx
// Before
<div className="p-4 bg-[#f4f8f1] shadow-md">

// After
<div className="p-6">
```

**5. Update text colors:**
```tsx
// Before
<h3 className="text-base font-bold text-foreground ...">
<p className="text-muted-foreground text-xs ...">

// After
<h3 className="text-xl font-semibold text-white ...">
<p className="text-white/70 text-sm ...">
```

**6. Update hover effects (add Eye icon overlay):**
```tsx
<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
    <ExternalLink className="w-5 h-5 text-primary-foreground" />
  </div>
</div>
```

**7. Update technology badge styling:**
```tsx
// Before
<span className="px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] ...">

// After
<span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
```

---

### Result

- Demo Projects section visible with correct data
- Consistent card design across Services and Portfolio pages
- Dark glass morphism style with white text
- 16:9 aspect ratio images
- Centered hover overlay effect
- Unified technology badge styling
