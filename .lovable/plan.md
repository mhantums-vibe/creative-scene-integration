
## Fix Favicon Flickering on Page Refresh

The favicon shows "Y" briefly before switching to the main favicon because the browser defaults to loading `/public/favicon.ico` which contains an old "Y" icon, and there's no explicit favicon link in `index.html`.

---

### Root Cause

| Issue | Current State |
|-------|--------------|
| No favicon link tag | `index.html` has no `<link rel="icon">` tag |
| Default fallback | Browser loads `/favicon.ico` (contains "Y" icon) |
| No favicon setting | `site_settings` table has no `favicon_url` entry |

---

### Solution

Replace the old `/public/favicon.ico` with the YessBangla logo and add an explicit favicon link in `index.html`. This ensures the correct favicon loads immediately without any flicker.

---

### Changes

| File | Change |
|------|--------|
| `index.html` | Add explicit `<link rel="icon">` tag pointing to the favicon |
| `public/favicon.ico` | Replace with the YessBangla logo favicon |

---

### Technical Details

**1. Update `index.html` to add explicit favicon link:**

Add the following inside the `<head>` section (after line 5):

```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```

**2. Download and add the YessBangla logo as favicon:**

The current logo is stored at:
`https://zcimdsqvruzzorsdxxzs.supabase.co/storage/v1/object/public/site_assets/1769144181132.png`

We need to:
- Download this image and save it as `public/favicon.png`
- Optionally keep a `.ico` version for older browser compatibility

**3. Also update the page title and meta tags:**

While fixing the favicon, we should also update the title from "Lovable App" to "YessBangla":

```html
<title>YessBangla - Innovative IT Solutions</title>
<meta name="description" content="YessBangla - Innovative IT Solutions for your business" />
<meta property="og:title" content="YessBangla - Innovative IT Solutions" />
<meta property="og:description" content="YessBangla - Innovative IT Solutions for your business" />
```

---

### Alternative Approach

If you prefer to keep the favicon dynamic (fetched from database), we could create a React component that updates the favicon on mount. However, this would still cause a brief flicker on initial load. The static approach above is the recommended solution for zero flicker.

---

### Result

- Favicon will load correctly on first paint without flickering
- The "Y" icon will no longer appear
- Page title will show "YessBangla" instead of "Lovable App"
- Apple touch icon will also use the correct logo
