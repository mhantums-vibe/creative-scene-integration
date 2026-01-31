

## Add Stronger Top Gradient Overlay to Hero Banner

Increase the black gradient overlay at the top of the hero section to provide better contrast behind the text content.

---

### Current vs Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Vertical gradient | `from-black/80 via-black/50 to-black/30` (dark bottom, light top) | `from-black/80 via-black/50 to-black/60` (darker at top) |
| Top area | 30% black opacity | 60% black opacity |

---

### Visual Comparison

```text
CURRENT:                              PROPOSED:
┌─────────────────────────┐           ┌─────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░│ ← 30%     │███████████████████████│ ← 60%
│░░░░░░░░░░░░░░░░░░░░░░░░░│           │██████████████████████░│
│░░ Text Content    ░░░░░░│           │█████ Text Content █████│
│░░                 ░░░░░░│           │████                ████│
│████████████████████████│ ← 80%     │████████████████████████│ ← 80%
└─────────────────────────┘           └─────────────────────────┘
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/HeroSection.tsx` | Increase top gradient opacity from 30% to 60% |

---

### Technical Details

**Update line 59:**

```tsx
// Before
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

// After
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
```

The change:
- `to-black/30` → `to-black/60` - Doubles the darkness at the top of the hero section

---

### Result

- Top of hero section will have stronger black overlay (60% vs 30%)
- Better text readability for headline and tagline at the top
- Bottom remains dark (80%) for stats visibility
- Combined with the left-side gradient for optimal text contrast

