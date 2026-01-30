

## Compact the Edit Service Dialog

This plan reduces the vertical space in the Edit Service dialog to make it more compact and easier to work with.

---

### Changes Overview

| Element | Current | Compact |
|---------|---------|---------|
| Form spacing | `space-y-4` | `space-y-3` |
| Field label spacing | `space-y-2` | `space-y-1` |
| Description rows | 3 rows | 2 rows |
| ImageUpload height | `h-48` (preview), `p-8` (dropzone) | `h-32` (preview), `p-4` (dropzone) |
| ImageUpload icon | `h-8 w-8` | `h-5 w-5` |
| Tabs content margin | `mt-3` | `mt-2` |
| DialogContent | `max-w-lg` | `max-w-md` |

---

### Visual Comparison

```text
BEFORE (Current):                    AFTER (Compact):
┌────────────────────────┐           ┌──────────────────┐
│ Edit Service           │           │ Edit Service     │
│                        │           │                  │
│ Title                  │           │ Title            │
│ [                    ] │           │ [              ] │
│                        │           │ Description      │
│ Description            │           │ [    2 rows    ] │
│ [                    ] │           │ Icon [Preset|Custom]
│ [    3 rows          ] │           │ [Globe ▼      ]  │
│ [                    ] │           │                  │
│                        │           │ Background Image │
│ Icon                   │           │ ┌──────────────┐ │
│ ┌────────┬───────────┐ │           │ │  p-4 drop   │ │
│ │ Preset │ Custom    │ │           │ └──────────────┘ │
│ └────────┴───────────┘ │           │ Order [1] Active☑│
│ [Globe (Web) ▼      ]  │           │ Features [     ] │
│                        │           │   [Cancel][Save] │
│ Background Image       │           └──────────────────┘
│ ┌────────────────────┐ │
│ │   p-8 dropzone     │ │
│ │                    │ │
│ └────────────────────┘ │
│                        │
│ Display Order          │
│ [1                   ] │
│                        │
│ Features               │
│ [Custom, SEO, Mobile ] │
│                        │
│ ☑ Active              │
│                        │
│        [Cancel][Update]│
└────────────────────────┘
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/admin/Services.tsx` | Reduce spacing, description rows, dialog width |
| `src/components/admin/ImageUpload.tsx` | Smaller preview height, compact dropzone |

---

### Technical Details

**1. Services.tsx Changes:**
- Line 392: `max-w-lg` → `max-w-md`
- Line 398: `space-y-4` → `space-y-3`
- Lines 399, 412, 426, 478, 491, 508: `space-y-2` → `space-y-1`
- Line 421: `rows={3}` → `rows={2}`
- Lines 442, 464: `mt-3` → `mt-2`

**2. ImageUpload.tsx Changes:**
- Line 63: `h-48` → `h-32`
- Line 77: `p-8` → `p-4`
- Lines 101, 106: `h-8 w-8` → `h-5 w-5`

---

### Result

- Dialog is ~30% more compact vertically
- All fields remain visible without scrolling
- Maintains readability and usability
- Consistent compact styling throughout

