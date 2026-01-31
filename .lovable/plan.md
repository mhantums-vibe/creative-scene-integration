
## Add Backdrop Blur Effect to Service Card Content

Apply a frosted glass backdrop blur effect to the text content area, overlaying the background image for better readability and a modern glass aesthetic.

---

### Current vs Proposed

| Element | Current | With Blur Effect |
|---------|---------|------------------|
| Content container | `relative z-10` (no blur) | `relative z-10` + inner blurred container |
| Background overlay | `bg-gradient-to-t from-black/80...` | Same gradient overlay |
| Text container | No blur behind text | `backdrop-blur-md bg-black/20` frosted glass |

---

### Visual Comparison

```text
CURRENT:                          WITH BACKDROP BLUR:
┌─────────────────┐               ┌─────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Image       │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Image
│▓▓ 🌐           ▓│               │▓┌─────────────┐▓│
│▓▓              ▓│ ← Text on     │▓│░░ 🌐       ░│▓│ ← Frosted
│▓▓ Website Dev  ▓│    gradient   │▓│░░          ░│▓│    glass
│▓▓ Description  ▓│    only       │▓│░░ Website  ░│▓│    behind
│▓▓ [tags]       ▓│               │▓│░░ Desc...  ░│▓│    text
│▓▓ Learn More → ▓│               │▓│░░ [tags]   ░│▓│
└─────────────────┘               │▓│░░ Learn →  ░│▓│
                                  │▓└─────────────┘▓│
                                  └─────────────────┘
```

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/ServicesSection.tsx` | Add `backdrop-blur-md rounded-lg p-3 -m-3` to content container when `hasBackground` is true |

---

### Technical Details

**Update the content container (line 139):**

```tsx
// Before
<div className="relative z-10">

// After
<div className={`relative z-10 ${hasBackground ? 'backdrop-blur-md rounded-lg p-3 -m-3' : ''}`}>
```

The classes:
- `backdrop-blur-md` - Applies the frosted glass blur effect
- `rounded-lg` - Rounded corners matching the card style
- `p-3 -m-3` - Negative margin + padding to expand the blur area without affecting layout

---

### Result

- Text content sits on a frosted glass panel
- Background image is visible but blurred behind text
- Matches the iPhone-style glass aesthetic used elsewhere in the app
- Improves text readability over busy background images
