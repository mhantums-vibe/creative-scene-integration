

## Compact Portfolio Project Cards

This plan updates the project cards in the PortfolioSection to use a more compact design, matching the existing pattern used for Service and Testimonial cards.

---

### What You'll Get

- Reduced card padding for higher information density
- Smaller image aspect ratio
- Truncated descriptions with line-clamp
- Limited technology tags (max 3 with +N indicator)
- Consistent compact styling matching other cards in the site

---

### Current vs. Compact Design

| Element | Current | Compact |
|---------|---------|---------|
| Image aspect ratio | `aspect-video` (16:9) | `aspect-[4/3]` (shorter) |
| Content padding | `p-5` | `p-4` |
| Title size | `text-lg` | `text-base` |
| Description | `line-clamp-2` | `line-clamp-2` (keep) |
| Tech tags shown | 4 | 3 |
| Tag size | `text-xs` | `text-[10px]` |
| Category badge | Normal | Smaller |

---

### Technical Details

**File to Modify:**

| File | Changes |
|------|---------|
| `src/components/sections/PortfolioSection.tsx` | Reduce padding, shrink image ratio, limit tech tags, smaller typography |

---

### Visual Comparison

```text
CURRENT CARD                    COMPACT CARD
+------------------+            +------------------+
|                  |            |   [Image 4:3]    |
|  [Image 16:9]    |            |                  |
|                  |            +------------------+
+------------------+            | Title            |
|  Title           |            | Description...   |
|                  |            | [tag][tag][+2]   |
|  Description     |            +------------------+
|  text here...    |
|                  |
| [tag][tag][tag]  |
| [tag]            |
+------------------+
```

---

### Key Code Changes

**Image section:**
```tsx
// Change from aspect-video to aspect-[4/3]
<div className="relative aspect-[4/3] overflow-hidden">
```

**Content padding:**
```tsx
// Change from p-5 to p-4
<div className="p-4">
```

**Title styling:**
```tsx
// Change from text-lg to text-base
<h3 className="text-base font-bold ...">
```

**Technology tags:**
```tsx
// Show max 3 instead of 4, smaller text
{project.technologies.slice(0, 3).map((tech) => (
  <span className="px-1.5 py-0.5 ... text-[10px] ...">
    {tech}
  </span>
))}
{project.technologies.length > 3 && (
  <span className="... text-[10px] ...">
    +{project.technologies.length - 3}
  </span>
)}
```

**Category badge:**
```tsx
<Badge className="absolute top-2 left-2 text-[10px] px-2 py-0.5 ...">
```

---

### Notes

- Follows existing compact card pattern from Services and Testimonials
- Maintains all functionality (links, hover effects, animations)
- Cards will fit better in grids with more items visible
- Description remains at 2 lines for readability

