
## Fix Scroll Lag/Stuttering Performance Issues

Address multiple performance bottlenecks causing choppy scrolling across the site. The lag is caused by heavy GPU effects (backdrop-blur), 3D rendering, and scroll-triggered calculations.

---

### Root Causes Identified

| Issue | Location | Impact |
|-------|----------|--------|
| Spline 3D WebGL scene | HeroSection | Very High - continuous GPU rendering |
| Dynamic scroll blur calculation | HeroSection | High - runs on every scroll event |
| Excessive backdrop-blur effects | Glass cards, Header, Hero overlay | High - GPU intensive CSS |
| Multiple whileInView animations | All sections | Medium - simultaneous DOM updates |
| Staggered animation children | Services, Portfolio, Testimonials | Medium - many simultaneous tweens |

---

### Optimization Strategy

**Priority 1: Hero Section Scroll Blur**

Remove or debounce the dynamic blur effect that recalculates on every scroll:

```tsx
// Current (problematic):
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);  // Triggers re-render on every scroll
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
}, []);

// Solution: Use CSS or remove dynamic blur entirely
```

**Priority 2: Reduce Backdrop Blur Usage**

Replace heavy `backdrop-blur-2xl` (40px) with lighter alternatives:

| Current | Optimized |
|---------|-----------|
| `backdrop-blur-2xl` | `backdrop-blur-sm` or `backdrop-blur-md` |
| Multiple layered blurs | Single blur layer |
| Dynamic blur calculation | Static blur value |

**Priority 3: Pause Spline During Scroll (Optional)**

Add scroll detection to pause/reduce 3D animation when not in viewport or during active scrolling.

**Priority 4: Optimize Framer Motion Animations**

- Add `layout={false}` to motion elements that don't need layout animations
- Reduce stagger timing
- Use simpler easing functions

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/HeroSection.tsx` | Remove dynamic scroll blur, use static overlay |
| `src/index.css` | Reduce glass-card-light blur intensity |
| `src/components/layout/Header.tsx` | Reduce nav blur intensity |
| `src/components/sections/ServicesSection.tsx` | Remove nested backdrop-blur on cards |
| `src/components/sections/AboutSection.tsx` | Simplify decorative blur elements |

---

### Technical Implementation

**1. HeroSection.tsx - Remove scroll-based blur:**

Remove the scroll tracking effect and use a static overlay:
```tsx
// Remove useState and useEffect for scrollY
// Replace dynamic backdrop-filter with static gradient overlay
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
```

**2. index.css - Optimize glass-card-light:**

```css
.glass-card-light {
  @apply backdrop-blur-md border border-white/40;  /* Changed from backdrop-blur-2xl */
  background: hsl(0 0% 100% / 0.25);
  /* Simplified shadow, removed heavy effects */
  box-shadow: 0 4px 24px hsl(0 0% 0% / 0.06);
}
```

**3. Header.tsx - Reduce navigation blur:**

```css
.glass-nav {
  @apply backdrop-blur-md border-b border-white/15;  /* Changed from backdrop-blur-2xl */
}
.glass-nav-scrolled {
  @apply backdrop-blur-lg;  /* Changed from backdrop-blur-2xl */
}
```

**4. ServicesSection.tsx - Remove nested blur:**

Remove the extra `backdrop-blur-md` inside service cards with background images:
```tsx
// Remove this redundant blur layer:
<div className="absolute inset-0 backdrop-blur-md bg-black/10" />
```

---

### Expected Results

- Smoother scrolling on all devices
- Reduced GPU usage (less battery drain on mobile)
- Maintained visual appeal with optimized glass effects
- Faster paint times during scroll
