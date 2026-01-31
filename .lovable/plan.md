

## Fix Category Filter - Projects Not Showing After Click

When clicking category buttons, projects don't appear because of Framer Motion animation configuration issue.

---

### Root Cause

The projects grid uses `whileInView` with `viewport={{ once: true }}`:

```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}  // <- Only animates ONCE, ever
  className="grid..."
>
```

**Problem**: After the initial animation runs, subsequent state changes (category filter) don't trigger a re-animation. The new filtered items inherit the "hidden" state but never animate to "visible" because the container already ran its one-time animation.

---

### Solution

1. Replace `whileInView="visible"` with `animate="visible"` - this makes animation state-driven
2. Add a `key` prop based on `activeCategory` to force re-mount and re-animate when category changes
3. Keep `initial="hidden"` for the fade-in effect

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Portfolio.tsx` | Update motion.div to use animate instead of whileInView, add key prop |

---

### Technical Details

**Update `src/pages/Portfolio.tsx` (lines 129-134):**

```tsx
// Before
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
>

// After
<motion.div
  key={activeCategory}
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
>
```

---

### How The Fix Works

| Before | After |
|--------|-------|
| Animation runs once on page load | Animation runs on every category change |
| `whileInView` depends on scroll position | `animate` is state-driven |
| No re-mount on category change | `key={activeCategory}` forces re-mount |

---

### Result

- Projects will animate in when switching categories
- Each category change triggers a fresh fade-in animation
- Filtering will work correctly and visually show the filtered projects

