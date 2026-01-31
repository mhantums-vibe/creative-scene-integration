

## Compact Portfolio Project Cards with Better Text Visibility

Make the portfolio project cards more compact and ensure text is properly visible with an appropriate card background.

---

### Current Issues

| Problem | Current State |
|---------|---------------|
| Large padding | Content area uses `p-6` (24px) |
| Wide gap | Cards have `gap-8` (32px) spacing |
| Low contrast background | `bg-card/50` (50% opacity) makes text hard to read |
| Only 3 columns | Grid is `lg:grid-cols-3` |

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/PortfolioSection.tsx` | Compact padding, add solid card background, reduce gaps, 4-column grid |
| `src/pages/Portfolio.tsx` | Apply same compact styling to portfolio page cards |

---

### Technical Details

**1. Update `src/components/sections/PortfolioSection.tsx`:**

- Change grid from `lg:grid-cols-3 gap-8` to `lg:grid-cols-4 gap-6`
- Update Card class from `bg-card/50` to `bg-card` for solid background
- Reduce content padding from `p-6` to `p-4`
- Reduce title size from `text-xl` to `text-lg`
- Reduce badge margin from `mb-3` to `mb-2`
- Reduce description margin from `mb-4` to `mb-3`
- Use `text-foreground` instead of `text-white` for better theme support

**2. Update `src/pages/Portfolio.tsx`:**

- Same grid changes: `lg:grid-cols-4 gap-6`
- Same Card background: `bg-card` (solid)
- Same compact padding: `p-4`
- Same text color updates for visibility

---

### Visual Summary

```text
Before:                          After:
┌─────────┐ ┌─────────┐ ┌─────────┐    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│         │ │         │ │         │    │      │ │      │ │      │ │      │
│  Card   │ │  Card   │ │  Card   │    │ Card │ │ Card │ │ Card │ │ Card │
│  p-6    │ │  p-6    │ │  p-6    │    │ p-4  │ │ p-4  │ │ p-4  │ │ p-4  │
│  50%bg  │ │  50%bg  │ │  50%bg  │    │solid │ │solid │ │solid │ │solid │
└─────────┘ └─────────┘ └─────────┘    └──────┘ └──────┘ └──────┘ └──────┘
     gap-8       gap-8                    gap-6    gap-6    gap-6

3-column layout                   4-column compact layout
```

---

### Result

- Cards will be more compact with tighter spacing
- 4 cards per row on large screens (up from 3)
- Solid card background ensures text is always readable
- Consistent styling across homepage portfolio section and portfolio page
- Text uses theme-aware colors (`text-foreground`) for proper contrast

