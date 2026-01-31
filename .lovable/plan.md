

## Add Backdrop Blur Effect to Hero Banner

Apply a frosted glass backdrop blur effect to the hero section's banner image, matching the style used on service cards.

---

### Current vs Proposed

| Element | Current | Proposed |
|---------|---------|----------|
| Banner image | `opacity-30` | Full opacity with blur overlay |
| Gradient overlay | `bg-gradient-to-b from-background/80...` | Keep gradient |
| Blur layer | None | Add `backdrop-blur-md bg-black/10` |

---

### Visual Comparison

```text
CURRENT:                           WITH BACKDROP BLUR:
┌─────────────────────────┐        ┌─────────────────────────┐
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│        │░░░░░░░░░░░░░░░░░░░░░░░░░│
│▒▒ Innovative IT        ▒│        │░░ Innovative IT        ░│
│▒▒ Solutions for        ▒│ ← 30%  │░░ Solutions for        ░│ ← Blurred
│▒▒ Your Business        ▒│  opacity│░░ Your Business        ░│   frosted
│▒▒                      ▒│        │░░                      ░│   glass
│▒▒ [Stats]              ▒│        │░░ [Stats]              ░│
└─────────────────────────┘        └─────────────────────────┘
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/HeroSection.tsx` | Add backdrop blur overlay layer, adjust image opacity |

---

### Technical Details

**Update the hero banner background (lines 41-44):**

```tsx
// Before
{settings.hero_banner_url && (
  <div className="absolute inset-0 z-0">
    <img 
      src={settings.hero_banner_url} 
      alt="Hero Banner" 
      className="w-full h-full object-cover opacity-30" 
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
  </div>
)}

// After
{settings.hero_banner_url && (
  <div className="absolute inset-0 z-0">
    <img 
      src={settings.hero_banner_url} 
      alt="Hero Banner" 
      className="w-full h-full object-cover" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
    <div className="absolute inset-0 backdrop-blur-md bg-black/10" />
  </div>
)}
```

---

### Key Changes

1. **Remove `opacity-30`** from the image - the blur effect will handle visibility
2. **Change gradient direction** from `to-b` to `to-t` to match service cards style
3. **Update gradient colors** to use `from-black/80 via-black/50 to-black/30` for consistency
4. **Add blur overlay** with `backdrop-blur-md bg-black/10` for the frosted glass effect

---

### Result

- Hero banner matches the frosted glass aesthetic of service cards
- Background image is visible but blurred for better text readability
- Consistent visual language across the site
- Maintains the iPhone-style glass design system

