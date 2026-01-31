

## Fix Category Filter Visibility on Portfolio Page

The category filter buttons are not visible properly because they use the `heroOutline` variant which has `text-white` styling - designed for dark backgrounds but placed on the default page background.

---

### Root Cause

| Element | Current Styling | Problem |
|---------|-----------------|---------|
| Active filter button | `variant="hero"` | Works fine (green bg with white text) |
| Inactive filter buttons | `variant="heroOutline"` | Uses `text-white`, `border-white/20`, `bg-white/5` - invisible on light backgrounds |

---

### Solution

Update the category filter buttons to use proper variants that work on the page background:

| State | Current | New |
|-------|---------|-----|
| Active | `variant="hero"` | `variant="default"` (primary color) |
| Inactive | `variant="heroOutline"` | `variant="outline"` (border with primary text) |

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Portfolio.tsx` | Change button variants from `hero`/`heroOutline` to `default`/`outline` for category filters |

---

### Technical Details

**Update `src/pages/Portfolio.tsx` (lines 117-124):**

```tsx
// Before
<Button
  key={category}
  variant={activeCategory === category ? "hero" : "heroOutline"}
  size="sm"
  onClick={() => setActiveCategory(category)}
>
  {category}
</Button>

// After
<Button
  key={category}
  variant={activeCategory === category ? "default" : "outline"}
  size="sm"
  onClick={() => setActiveCategory(category)}
>
  {category}
</Button>
```

---

### Visual Result

```text
Before (heroOutline - invisible on light bg):
┌─────────────────────────────────────────┐
│   [All] [Web App] [Mobile] [Design]     │  <- White text on light bg = invisible
└─────────────────────────────────────────┘

After (outline - visible on any bg):
┌─────────────────────────────────────────┐
│   [All] [Web App] [Mobile] [Design]     │  <- Primary text with border = visible
└─────────────────────────────────────────┘
```

---

### Result

- Category filter buttons will be clearly visible on the page background
- Active button shows solid primary color
- Inactive buttons show primary-colored border and text
- Consistent with theme colors for proper contrast in both light and dark modes

