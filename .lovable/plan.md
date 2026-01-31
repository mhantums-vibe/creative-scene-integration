

## Create Unsplash Studio-Style Left Gradient Overlay

Update the hero banner gradient to match the reference image style - a solid black area on the left that sharply transitions to reveal the content on the right.

---

### Reference Analysis

The Unsplash Studio hero has:
- **Solid black** (~95% opacity) covering the left 50-60% of the screen
- **Sharp transition** in the middle area
- **Fully visible images** on the right side
- Text sits on the completely dark portion for maximum readability

---

### Current vs Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Left-side gradient | `from-black/70 via-black/40 to-transparent` | `from-black/95 via-black/90 via-40% via-black/50 via-60% to-transparent` |
| Left coverage | Gradual fade from 70% | Solid black (95%) covering ~50% width, then fade |
| Vertical gradient | Keep as-is | Keep as-is for depth |

---

### Visual Comparison

```text
CURRENT:                              PROPOSED (Unsplash-style):
┌─────────────────────────┐           ┌─────────────────────────┐
│███░░░░░░░░░░░░░░░░░░░░░│           │█████████████░░░░░░░░░░░│
│██░░░░░░░░░░░░░░░░░░░░░░│           │█████████████░░░░░░░░░░░│
│█░ Text Content   ░░░░░░│           │████████ Text █████░░░░░│
│░░                ░░░░░░│           │████████ Content ██░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░│           │█████████████░░░░░░░░░░░│
└─────────────────────────┘           └─────────────────────────┘
 ← 70% fading to 0%                    ← 95% solid → sharp fade → 0%
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/HeroSection.tsx` | Replace left-side gradient with Unsplash Studio-style solid-to-transparent gradient |

---

### Technical Details

**Update line 62 - Replace the horizontal gradient:**

```tsx
// Before
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

// After - Unsplash Studio style with solid black on left
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.90)_40%,rgba(0,0,0,0.50)_60%,transparent_100%)]" />
```

This custom gradient creates:
- `0% - 40%`: Nearly solid black (95% → 90% opacity) - where text content sits
- `40% - 60%`: Sharp transition zone (90% → 50% opacity)
- `60% - 100%`: Fade to transparent - reveals right-side content (3D scene)

---

### Result

- Left side has solid black coverage like Unsplash Studio reference
- Text content sits on fully dark background for perfect readability
- Sharp transition creates the distinct split effect
- Right side (3D Spline scene) remains visible
- Maintains the vertical gradient for bottom-to-top depth

