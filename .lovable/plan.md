

## Fix: Display Background Images in Service Cards

The uploaded background images are stored correctly in the database, but the `ServicesSection` component isn't fetching or displaying them.

---

### Root Cause

| Component | Issue |
|-----------|-------|
| Database | Background images are stored correctly (URLs exist) |
| ServicesSection query | Missing `background_image` field in SELECT |
| Service interface | Missing `background_image` property |
| Card rendering | Not displaying the background image |

---

### Evidence from Database

```
Website Development: https://zcimdsqvruzzorsdxxzs.supabase.co/.../db32c112-....png
App Development:     https://zcimdsqvruzzorsdxxzs.supabase.co/.../87ae3c15-....png
```

---

### Changes Required

| File | Change |
|------|--------|
| `src/components/sections/ServicesSection.tsx` | Add `background_image` to interface, query, and render it on cards |

---

### Technical Details

**1. Update the Service interface (line 10-19):**
```tsx
interface Service {
  // ... existing fields
  background_image: string | null;  // ADD this field
}
```

**2. Update the Supabase query (line 65):**
```tsx
.select("id, title, description, icon, icon_url, background_image, features, display_order, slug")
```

**3. Update the Card rendering (around line 122):**
```tsx
<Card 
  className="group h-full p-4 lg:p-5 card-hover glass-card-light backdrop-blur-md transition-all duration-300 relative overflow-hidden"
>
  {/* Background Image */}
  {service.background_image && (
    <div className="absolute inset-0">
      <img 
        src={service.background_image} 
        alt="" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
    </div>
  )}
  
  {/* Content with z-10 to appear above background */}
  <div className="relative z-10 backdrop-blur-lg">
    {/* existing icon, title, description, features, CTA */}
  </div>
</Card>
```

**4. Adjust text colors for cards with background:**
```tsx
// Title
<h3 className="text-lg font-bold mb-2">

// Description  
<p className="mb-3 leading-relaxed text-sm line-clamp-2">
```

---

### Visual Result

```text
BEFORE:                          AFTER (with bg image):
┌─────────────────┐              ┌─────────────────┐
│ 🌐              │              │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Image
│                 │              │▓▓ 🌐           ▓│
│ Website Dev     │              │▓▓              ▓│
│ Description...  │              │▓▓ Website Dev  ▓│ ← White text
│                 │              │▓▓ Description  ▓│
│ [tags]          │              │▓▓ [tags]       ▓│
│ Learn More →    │              │▓▓ Learn More → ▓│
└─────────────────┘              └─────────────────┘
```

---

### Also: Remove console.log

Line 74 has a debug `console.log(services)` that should be removed.

