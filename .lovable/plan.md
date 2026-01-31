

## Add Left-Side Black Gradient Overlay to Hero Banner

Add a horizontal gradient overlay from left to right on the hero banner to enhance text readability on the left side where the content is displayed.

---

### Current vs Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Gradient overlay | `bg-gradient-to-t from-black/80 via-black/50 to-black/30` (bottom to top) | Keep existing + add left-to-right gradient |
| Left side | Same opacity as rest of banner | Darker for better text contrast |
| Right side (3D scene) | Same opacity | Lighter to show more of the background |

---

### Visual Comparison

```text
CURRENT (vertical gradient only):     WITH LEFT GRADIENT:
┌─────────────────────────┐           ┌─────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Light   │████░░░░░░░░░░░░░░░░░░░░░│ ← Dark left
│░░ Text Content    ░░░░░░│           │███░ Text Content  ░░░░░░│    fading
│░░                 ░░░░░░│           │██░                ░░░░░░│    to
│░░ [Buttons]       ░░░░░░│           │█░░ [Buttons]      ░░░░░░│    right
│░░                 ░░░░░░│           │░░░                ░░░░░░│
│████████████████████████│ ← Dark     │████████████████████████│ ← Dark bottom
└─────────────────────────┘           └─────────────────────────┘
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/HeroSection.tsx` | Add horizontal gradient overlay from left to right |

---

### Technical Details

**Add a new gradient overlay (after line 60):**

```tsx
{/* Existing vertical gradient */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

{/* NEW: Left-side horizontal gradient */}
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

{/* Existing blur overlay */}
<div 
  className="absolute inset-0 transition-all duration-300 ease-out"
  style={{ ... }}
/>
```

The classes:
- `bg-gradient-to-r` - Gradient direction from left to right
- `from-black/70` - Dark black on the left (70% opacity)
- `via-black/40` - Medium fade in the middle
- `to-transparent` - Fully transparent on the right side

---

### Result

- Left side (where text content is) has a stronger dark overlay
- Right side (3D scene area) remains more visible
- Better text readability without completely obscuring the background
- Maintains the layered gradient effect (vertical + horizontal)

