

## Apply Consistent Banner Style to Contact and Testimonials Pages

Update the Contact and Testimonials pages to use the same centered banner design with pill badges, matching the Services, Portfolio, and About pages.

---

### Current vs Proposed

| Element | Current Style | Proposed Style |
|---------|--------------|----------------|
| Layout | Left-aligned | Centered (`mx-auto text-center`) |
| Background | `from-primary/20 via-background to-background` | `bg-accent` with `from-primary/20 via-transparent to-transparent` |
| Padding | `py-16 lg:py-24` | `pt-32 pb-20` |
| Breadcrumb | Present | Removed |
| Pill badge | None | Added with icon |

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Contact.tsx` | Update hero to centered style with `Mail` icon pill badge |
| `src/pages/Testimonials.tsx` | Update hero to centered style with `MessageSquareQuote` icon pill badge |

---

### Technical Details

**Contact Page (`src/pages/Contact.tsx`):**

1. Add `Mail` icon import from lucide-react
2. Remove breadcrumb imports and component
3. Update section to:
```tsx
<section className="pt-32 pb-20 bg-accent relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
  <div className="container relative z-10">
    <motion.div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
        <Mail className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary font-medium">Get In Touch</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Contact <span className="text-primary">Us</span>
      </h1>
      <p className="text-lg text-white/70 leading-relaxed">
        Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </motion.div>
  </div>
</section>
```

**Testimonials Page (`src/pages/Testimonials.tsx`):**

1. Add `MessageSquareQuote` icon import from lucide-react
2. Remove breadcrumb imports and component
3. Update section to:
```tsx
<section className="pt-32 pb-20 bg-accent relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
  <div className="container relative z-10">
    <motion.div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
        <MessageSquareQuote className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary font-medium">Client Reviews</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Client <span className="text-primary">Testimonials</span>
      </h1>
      <p className="text-lg text-white/70 leading-relaxed">
        Don't just take our word for it. See what our clients have to say about working with us and the results we've delivered.
      </p>
    </motion.div>
  </div>
</section>
```

---

### Pill Badge Icons Summary

| Page | Icon | Badge Text |
|------|------|------------|
| Services | `Settings` | What We Offer |
| Portfolio | `Briefcase` | Our Work |
| About | `Info` | Who We Are |
| Contact | `Mail` | Get In Touch |
| Testimonials | `MessageSquareQuote` | Client Reviews |

---

### Result

- All inner pages will have consistent centered banner design
- Dark `bg-accent` background with gradient overlay
- Pill badges with relevant icons for each page
- Unified visual hierarchy across the site

