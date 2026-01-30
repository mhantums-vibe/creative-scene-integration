

## Add Background Image Option to Service Cards

This plan adds the ability to upload and display background images for service cards, manageable from the admin panel.

---

### What You'll Get

- New "Background Image" upload field in the admin service form
- Service cards will display the uploaded image as a background with an overlay
- Cards without a background image will continue to use the current solid style
- Background images stored in Supabase storage (`site_assets` bucket)

---

### Visual Preview

```text
SERVICE CARD (With Background Image):
┌─────────────────────────────────┐
│  [Background Image]             │
│  ┌─────────────────────────┐    │
│  │ glassmorphism overlay   │    │
│  │                         │    │
│  │  🌐 Icon                │    │
│  │  Website Development    │    │
│  │  We create stunning...  │    │
│  │  [Custom] [SEO] [+2]    │    │
│  │  Learn More →           │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘

SERVICE CARD (No Background - Current Style):
┌─────────────────────────────────┐
│  Glass Card Background          │
│  🌐 Icon                        │
│  Website Development            │
│  We create stunning websites... │
│  [Custom] [SEO] [Mobile] [+2]   │
│  Learn More →                   │
└─────────────────────────────────┘
```

---

### Changes Required

| Area | Change |
|------|--------|
| **Database** | Add `background_image` column to `services` table |
| **Admin Panel** | Add background image upload field in service form |
| **Frontend** | Update service cards to display background image |

---

### Technical Details

**1. Database Migration:**
```sql
ALTER TABLE services 
ADD COLUMN background_image TEXT DEFAULT NULL;
```

**2. Admin Services Page Updates:**
- Add `background_image` to the Service interface
- Add `background_image: null` to initial form data
- Add ImageUpload component for background image in the form dialog
- Include `background_image` in the submit data
- Add upload handler for background images (stored in `service-backgrounds/` folder)

**3. ServicesSection Component Updates:**
- Add `background_image` to the Service interface
- Fetch `background_image` column in the query
- Conditionally render background image with dark overlay on cards
- Adjust text colors for better readability on image backgrounds

---

### Admin Form Layout (After Changes)

```text
┌──────────────────────────────────────┐
│ Edit Service                         │
├──────────────────────────────────────┤
│ Title: [Website Development      ]   │
│                                      │
│ Description:                         │
│ [We create stunning websites...  ]   │
│                                      │
│ Icon:                                │
│ ┌────────────┬────────────┐          │
│ │ Preset Icon│Custom Image│          │
│ └────────────┴────────────┘          │
│ [Globe ▼]                            │
│                                      │
│ Background Image (Optional):         │  ← NEW
│ ┌────────────────────────────┐       │
│ │  Drag and drop or click    │       │
│ │  to upload                 │       │
│ └────────────────────────────┘       │
│                                      │
│ Display Order: [1     ]              │
│ Features: [Custom, SEO, Mobile]      │
│ ☑ Active (visible on homepage)      │
│                                      │
│           [Cancel] [Update]          │
└──────────────────────────────────────┘
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/admin/Services.tsx` | Add background_image field to form and upload handler |
| `src/components/sections/ServicesSection.tsx` | Display background image on cards with overlay |

---

### Card Styling With Background Image

When a service has a background image:
- Image covers the entire card background
- Semi-transparent dark overlay for text readability
- White/light text colors
- Subtle blur effect on hover

---

### Summary

- Adds optional background image upload per service
- Non-breaking change: services without images keep current style
- Images stored securely in Supabase storage
- Admin can easily add/remove background images

