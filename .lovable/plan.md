
## Apply Custom Logo to Footer

### Overview
Replace the hardcoded "Y" placeholder in the Footer with your custom YessBangal logo image.

### Changes Required

**1. Copy Logo to Project**
Copy the uploaded logo image to the `src/assets` folder for proper bundling and optimization:
- Source: `user-uploads://WhatsApp_Image_2026-01-29_at_11.29.37_AM-removebg-preview.png`
- Destination: `src/assets/yessbangal-logo.png`

**2. Update Footer Component**
Modify `src/components/layout/Footer.tsx` to:
- Import the logo image
- Replace the fallback "Y" div with an `<img>` tag using the imported logo

### Code Changes

**File: `src/components/layout/Footer.tsx`**

Add import at top:
```tsx
import yessbangalLogo from "@/assets/yessbangal-logo.png";
```

Replace the logo div (lines 97-99):
```tsx
// Before
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
  <span className="text-primary-foreground font-bold text-xl">Y</span>
</div>

// After
<img 
  src={yessbangalLogo} 
  alt="YessBangal Logo" 
  className="w-10 h-10 rounded-lg object-contain"
/>
```

### Result
- Footer displays your custom YessBangal logo instead of the "Y" placeholder
- Logo is properly optimized through Vite's asset bundling
- Maintains consistent sizing with the rest of the footer layout
