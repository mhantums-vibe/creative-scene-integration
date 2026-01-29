
## Fix "Learn More" Button Hover Color and Padding

### Problem
The "Learn More" button in the services section has these issues:
1. **Hover color conflict**: The `ghost` variant applies `hover:bg-accent` (dark grey background) which clashes with the intended transparent/link-style behavior
2. **Padding override issues**: The button has `p-0` but is fighting against the variant's default padding expectations

### Current Code (Line 156 in ServicesSection.tsx)
```tsx
<Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80 text-sm">
```

### Solution
Change the button to use the `link` variant instead of `ghost`, which is better suited for this use case - it's designed for text-only buttons with hover underline instead of background color change.

### Changes

#### File: `src/components/sections/ServicesSection.tsx`

**Line 156** - Update button styling:

| Current | Fixed |
|---------|-------|
| `variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80 text-sm"` | `variant="link" className="group/btn p-0 h-auto text-sm hover:no-underline"` |

The `link` variant already includes:
- `text-primary` - green text color
- `underline-offset-4 hover:underline` - subtle hover effect
- No background color change on hover

Adding `hover:no-underline` keeps it clean while relying on the arrow animation for feedback.

### Result
- Clean hover state without dark background appearing
- Maintains the primary green color
- Arrow animation still provides visual feedback on hover
- Proper padding with `p-0 h-auto` for compact link-style appearance
