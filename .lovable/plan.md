

## Compact Navigation Bar

### Overview
Reduce the size and spacing of the navigation bar for a sleeker, more streamlined appearance while maintaining all functionality and the existing glassmorphism aesthetic.

---

### Current vs. Compact Design

| Element | Current | Compact |
|---------|---------|---------|
| Header height (default) | `h-16 lg:h-20` | `h-14 lg:h-16` |
| Header height (scrolled) | `h-14 lg:h-16` | `h-12 lg:h-14` |
| Container padding | `px-4` | `px-3 lg:px-4` |
| Logo image | `w-15 h-12` | `w-12 h-10` |
| Logo fallback | `w-10 h-10` | `w-8 h-8` |
| Site name text | `text-xl` | `text-lg` |
| Nav link padding | `px-4 py-2` | `px-3 py-1.5` |
| Nav link text | `text-sm` | `text-xs` |
| More button | `px-4 py-2 text-sm` | `px-3 py-1.5 text-xs` |
| CTA button gap | `gap-3` | `gap-2` |
| CTA button size | `size="sm"` | Custom `size="xs"` |
| Mobile menu button | `p-2` + `size={24}` | `p-1.5` + `size={20}` |
| Mobile nav padding | `py-4` | `py-3` |
| Mobile link padding | `px-4 py-3` | `px-3 py-2.5` |

---

### Visual Comparison

**Before (current):**
```text
+------------------------------------------------------------------+
|  [Logo]  SiteName     Home  Services  About  Careers  More  |  Login  Get Started  |
+------------------------------------------------------------------+
      h-20 (desktop) / h-16 (mobile) - spacious padding
```

**After (compact):**
```text
+----------------------------------------------------------+
| [Logo] SiteName   Home Services About Careers More | Login Get Started |
+----------------------------------------------------------+
      h-16 (desktop) / h-14 (mobile) - tighter padding
```

---

### Changes Required

#### File 1: `src/components/layout/Header.tsx`

**1. Reduce header heights:**
- Default: `h-16 lg:h-20` → `h-14 lg:h-16`
- Scrolled: `h-14 lg:h-16` → `h-12 lg:h-14`

**2. Compact logo section:**
- Image: `w-15 h-12` → `w-12 h-10`
- Fallback container: `w-10 h-10` → `w-8 h-8`
- Fallback text: `text-xl` → `text-lg`
- Site name: `text-xl` → `text-lg`
- Logo gap: `gap-2` → `gap-1.5`

**3. Compact navigation links:**
- Padding: `px-4 py-2` → `px-3 py-1.5`
- Font size: `text-sm` → `text-xs`
- Underline: `h-0.5` → `h-[1.5px]`

**4. Compact More dropdown:**
- Trigger padding: `px-4 py-2` → `px-3 py-1.5`
- Trigger font: `text-sm` → `text-xs`
- Icon: `h-4 w-4` → `h-3.5 w-3.5`
- Content min-width: `min-w-[160px]` → `min-w-[140px]`

**5. Compact CTA section:**
- Gap: `gap-3` → `gap-2`
- Button icons: `h-4 w-4` → `h-3.5 w-3.5`

**6. Compact mobile menu:**
- Button padding: `p-2` → `p-1.5`
- Icon size: `size={24}` → `size={20}`
- Container padding: `py-4` → `py-3`
- Link padding: `px-4 py-3` → `px-3 py-2.5`
- Gap: `gap-2` → `gap-1.5`
- Border margin: `mt-4 pt-4` → `mt-3 pt-3`

---

#### File 2: `src/components/ui/button.tsx`

**Add extra-small size variant:**
```typescript
size: {
  // ... existing sizes
  xs: "h-7 rounded-md px-3 text-xs",
}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Reduce heights, padding, font sizes, icon sizes |
| `src/components/ui/button.tsx` | Add `xs` size variant for compact CTA buttons |

---

### Preserved Features

- Glassmorphism effect (glass-nav, glass-nav-scrolled)
- Scroll-triggered height transition
- Smooth scroll navigation
- Dropdown menu functionality
- Authentication-aware buttons
- Mobile menu with slide animation
- Admin link visibility for admins

