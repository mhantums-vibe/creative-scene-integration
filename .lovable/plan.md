
## Remove Contact Section from Homepage

Remove the contact cards and form from the homepage and make the Contact navigation button go directly to the dedicated Contact page.

---

### Changes

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Remove the ContactSection import and the contact section wrapper |
| `src/components/layout/Header.tsx` | Remove `sectionId` from Contact nav item so it links directly to `/contact` |

---

### Technical Details

**1. Update `src/pages/Index.tsx`:**

Remove line 6 (ContactSection import) and lines 29-31 (the contact section):

```tsx
// Remove this import:
import { ContactSection } from "@/components/sections/ContactSection";

// Remove this section:
<section id="contact">
  <ContactSection />
</section>
```

**2. Update `src/components/layout/Header.tsx`:**

Remove the `sectionId` property from the Contact item in `moreNavItems` (lines 39-42):

```tsx
// Before
{
  name: "Contact",
  href: "/contact",
  sectionId: "contact"  // Remove this line
}

// After
{
  name: "Contact",
  href: "/contact"
}
```

This ensures the `handleNavClick` function won't try to smooth-scroll or use hash navigation - it will simply navigate directly to `/contact`.

---

### Result

- Homepage will no longer show the contact cards and form
- Clicking "Contact" in the navigation (both desktop dropdown and mobile menu) will navigate directly to the `/contact` page
- Footer contact link already points to `/contact` and remains unchanged
