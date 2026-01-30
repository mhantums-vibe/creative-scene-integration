

## Fix: Make Edit Service Dialog Scrollable

The Cancel/Update buttons are hidden because the dialog content is taller than the screen when an image is uploaded. The fix is to make the dialog content scrollable.

---

### The Problem

From your screenshot, I can see:
- The dialog has a large background image preview
- The Display Order and Features fields are visible
- But the Cancel/Update buttons at the bottom are cut off

---

### The Solution

Add a scrollable container with a maximum height to the form, keeping the footer buttons always visible.

---

### Changes

| File | Change |
|------|--------|
| `src/pages/admin/Services.tsx` | Wrap form content in a scrollable container with `max-h-[60vh] overflow-y-auto` |

---

### Technical Details

```tsx
// Before (line 398)
<form onSubmit={handleSubmit} className="space-y-3">
  {/* all form fields + DialogFooter inside */}
</form>

// After
<form onSubmit={handleSubmit} className="flex flex-col">
  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
    {/* form fields only */}
  </div>
  <DialogFooter className="mt-4 pt-4 border-t">
    {/* Cancel and Update buttons - always visible */}
  </DialogFooter>
</form>
```

---

### Result

- Form fields scroll when content is tall
- Cancel and Update buttons are **always visible** at the bottom
- Works on all screen sizes

