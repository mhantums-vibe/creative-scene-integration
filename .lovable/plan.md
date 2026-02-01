
## Scale Container Width to 1200px for All Pages

Change the global container max-width from 1400px to 1200px for a more focused, text-friendly layout across all pages.

---

### Current State

The Tailwind configuration sets the container max-width to 1400px:

```typescript
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1400px",
  },
},
```

All pages use the `container` class which inherits this setting.

---

### Solution

Update a single file - the Tailwind config - to change the container width globally.

| File | Change |
|------|--------|
| `tailwind.config.ts` | Change container max-width from `1400px` to `1200px` |

---

### Technical Details

Update the container screens configuration in `tailwind.config.ts`:

```typescript
container: {
  center: true,
  padding: "2rem",
  screens: {
    "2xl": "1200px",  // Changed from 1400px
  },
},
```

---

### Affected Areas

This change automatically applies to all components and pages using the `container` class:

- Header navigation
- Footer
- Hero sections
- Services section
- About section
- Portfolio grid
- Contact section
- All inner pages (Careers, Testimonials, etc.)

---

### Result

- All page content will have a max-width of 1200px
- Content remains centered with 2rem padding on smaller screens
- Creates a more focused, readable layout especially for text-heavy sections
- Consistent width across all pages
