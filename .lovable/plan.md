
## Fix Services Cards Visibility

### Problem
The services cards are blending into the section background because:
- **Cards**: Use `glass-card-light` with a semi-transparent white background (`hsl(0 0% 100% / 0.25)`)
- **Section**: Uses a light gradient background (`bg-gradient-to-b from-muted/20 to-muted/40`)
- **Result**: Low contrast between cards and background makes them nearly invisible

---

### Solution
Change the services section to use a **dark background** so the light glass cards stand out clearly. This creates proper contrast and makes the glass effect pop.

---

### Visual Comparison

**Before:**
```text
+--------------------------------------------------+
|  Light grey section background (muted/20-40)     |
|  +------------+  +------------+  +------------+  |
|  | Card       |  | Card       |  | Card       |  |
|  | (white 25%)|  | (white 25%)|  | (white 25%)|  |
|  +------------+  +------------+  +------------+  |
|                                                  |
|  Cards blend into light background - LOW CONTRAST|
+--------------------------------------------------+
```

**After:**
```text
+--------------------------------------------------+
|  Dark section background (accent gradient)       |
|  +------------+  +------------+  +------------+  |
|  | Card       |  | Card       |  | Card       |  |
|  | (white 25%)|  | (white 25%)|  | (white 25%)|  |
|  +------------+  +------------+  +------------+  |
|                                                  |
|  Cards pop against dark background - HIGH CONTRAST|
+--------------------------------------------------+
```

---

### Changes Required

#### File: `src/components/sections/ServicesSection.tsx`

**1. Change section background** (line 84):
- From: `bg-gradient-to-b from-muted/20 to-muted/40`
- To: `bg-gradient-to-b from-accent via-accent/95 to-accent/90`

**2. Update section header text colors** (lines 94-105):
- Tag badge: Keep `bg-primary/10 text-primary` (works on dark)
- Main heading: `text-foreground` → `text-white`
- Subheading span: Keep `gradient-text-primary` (already has glow)
- Description: `text-muted-foreground` → `text-white/70`

**3. Update card text colors for contrast** (lines 134-135):
- Title: `text-foreground` → `text-white`
- Description: `text-muted-foreground` → `text-white/70`

**4. Update feature tags** (lines 140-142):
- From: `bg-muted text-muted-foreground`
- To: `bg-white/10 text-white/80`

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/ServicesSection.tsx` | Change to dark background, update text colors for contrast |

---

### Result
- Dark background creates strong contrast with light glass cards
- Glass frosted effect becomes clearly visible
- Maintains the iPhone-style aesthetic while improving readability
- Consistent with the dark hero section design language
