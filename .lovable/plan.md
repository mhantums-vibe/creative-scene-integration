
## Move Section Header to Services Page Hero Banner

Move the "Comprehensive IT Solutions for Every Need" header content from the `ServicesSection` component into the Services page hero banner. This creates a cleaner layout by consolidating the header into the hero and removing redundancy.

---

### Current Issue

The Services page currently shows:
1. **Hero Banner**: "Our Services" with basic description
2. **ServicesSection**: "Comprehensive IT Solutions for Every Need" header + services grid

This creates visual redundancy with two separate headers.

---

### Solution

| File | Change |
|------|--------|
| `src/pages/Services.tsx` | Update hero banner to use the "Comprehensive IT Solutions for Every Need" content |
| `src/components/sections/ServicesSection.tsx` | Add prop to hide header when used on dedicated page |

---

### Technical Details

**1. Update Services.tsx hero banner (lines 28-34):**

Replace the current hero content:
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
  Comprehensive IT Solutions
  <br />
  <span className="text-primary">for Every Need</span>
</h1>
<p className="text-lg text-white/70 leading-relaxed">
  We offer a wide range of digital services to help your business thrive in the modern digital landscape.
</p>
```

**2. Update ServicesSection.tsx:**

Add a `hideHeader` prop to the component interface:
```tsx
interface ServicesSectionProps {
  limit?: number;
  showSeeMore?: boolean;
  hideHeader?: boolean;
}
```

Conditionally render the header section based on this prop:
```tsx
{!hideHeader && (
  <motion.div className="text-center max-w-3xl mx-auto mb-16">
    {/* ... header content ... */}
  </motion.div>
)}
```

**3. Update Services.tsx to pass the prop:**
```tsx
<ServicesSection hideHeader />
```

---

### Result

- Services page shows consolidated hero with "Comprehensive IT Solutions for Every Need"
- Homepage continues to show the full section with its own header
- No duplicate headers on the Services page
- Consistent with other inner page patterns (Careers, Portfolio, etc.)
