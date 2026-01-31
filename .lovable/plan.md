

## Apply Full Card Backdrop Blur Effect

Move the backdrop blur from the inner content container to the entire card, creating a full frosted glass effect over the background image.

---

### Current vs Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Card | No blur styling for background images | Add `backdrop-blur-md` overlay layer |
| Content container | `backdrop-blur-md bg-black/20 rounded-lg p-3 -m-3` | Remove blur, keep only `relative z-10` |
| Blur coverage | Just behind text content | Entire card area |

---

### Visual Comparison

```text
CURRENT (content blur only):       PROPOSED (full card blur):
┌─────────────────┐                ┌─────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Sharp image  │░░░░░░░░░░░░░░░░░│ ← Full blur
│▓┌─────────────┐▓│                │░░ 🌐           ░│
│▓│░░ 🌐       ░│▓│ ← Blur only    │░░              ░│
│▓│░░          ░│▓│    behind      │░░ Website Dev  ░│
│▓│░░ Website  ░│▓│    content     │░░ Description  ░│
│▓│░░ Desc...  ░│▓│                │░░ [tags]       ░│
│▓│░░ [tags]   ░│▓│                │░░ Learn More → ░│
│▓│░░ Learn →  ░│▓│                └─────────────────┘
│▓└─────────────┘▓│
└─────────────────┘
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/ServicesSection.tsx` | Add full-card blur overlay, remove content-only blur |

---

### Technical Details

**1. Add blur overlay after the gradient (line 134-135):**
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
{/* Add this new blur layer */}
<div className="absolute inset-0 backdrop-blur-md bg-black/10" />
```

**2. Simplify content container (line 139):**
```tsx
// Before
<div className={`relative z-10 ${hasBackground ? 'backdrop-blur-md bg-black/20 rounded-lg p-3 -m-3' : ''}`}>

// After
<div className="relative z-10">
```

---

### Result

- Entire card has a frosted glass effect over the background image
- Consistent blur across the full card area
- Cleaner implementation without nested blur containers
- Matches iPhone-style glass aesthetic

