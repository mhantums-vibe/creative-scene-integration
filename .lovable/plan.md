

## Remove Duplicate Header from ContactSection

The ContactSection component has a section header (pill badge, title, and description) that duplicates the banner already present in the Contact page. This creates redundant content when viewing the Contact page.

---

### Current Issue

The Contact page now shows two headers:
1. **Page Banner** (in Contact.tsx): "Get In Touch" pill → "Contact Us" title
2. **Section Header** (in ContactSection.tsx): "Get in Touch" pill → "Let's Start Your Next Project" title

This is redundant and should be cleaned up.

---

### Changes

| File | Change |
|------|--------|
| `src/components/sections/ContactSection.tsx` | Remove the section header (lines 69-89) |

---

### Technical Details

**Remove the section header block (lines 69-89):**

```tsx
// DELETE this entire block:
{/* Section Header */}
<motion.div
  className="text-center max-w-3xl mx-auto mb-16"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
    Get in Touch
  </span>
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
    Let's Start Your
    <br />
    <span className="gradient-text-primary">Next Project</span>
  </h2>
  <p className="text-lg text-muted-foreground">
    Have a project in mind? We'd love to hear from you. 
    Send us a message and we'll respond as soon as possible.
  </p>
</motion.div>
```

**Adjust section padding:**

Change the section padding from `py-24` to `py-16` since the page banner now provides adequate top spacing:

```tsx
// Before
<section id="contact" className="py-24 bg-background">

// After
<section id="contact" className="py-16 bg-background">
```

---

### Result

- Contact page will have a single, clean header in the banner
- ContactSection will only contain the contact info cards and form
- No duplicate "Get in Touch" content
- Better visual flow from banner to content

