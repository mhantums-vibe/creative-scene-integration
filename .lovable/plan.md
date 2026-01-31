
## Fix About Page Card Text Visibility

The card texts and headers on the About page are invisible because they use hardcoded `text-white` colors that don't work in light mode.

---

### Root Cause

| Element | Current Class | Problem |
|---------|---------------|---------|
| Card title (h3) | `text-white` | White text on white background in light mode = invisible |
| Card description (p) | `text-white/70` | Semi-transparent white on white = invisible |
| Section heading | `text-white` | Same issue |
| Section subheading | `text-white/70` | Same issue |

The Values section on the About page has no dark background, so it inherits `bg-background` which is white in light mode. The text colors need to use theme-aware classes.

---

### Solution

Replace hardcoded `text-white` classes with theme-aware text classes:

| Current | Replace With | Reason |
|---------|--------------|--------|
| `text-white` | `text-foreground` | Uses theme-aware foreground color |
| `text-white/70` | `text-muted-foreground` | Uses theme-aware muted text |

---

### Changes

| File | Change |
|------|--------|
| `src/pages/About.tsx` | Update text colors in the Values section to use theme-aware classes |

---

### Technical Details

**Update `src/pages/About.tsx` (lines 74-96):**

```tsx
// Section header (line 74)
<h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
  Our Core <span className="text-primary">Values</span>
</h2>

// Section description (line 77)
<p className="text-muted-foreground max-w-2xl mx-auto">
  The principles that guide our work and define who we are as a company.
</p>

// Card title (line 95)
<h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>

// Card description (line 96)
<p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
```

Also update the Card background for better visibility:

```tsx
// Line 91 - Add solid background instead of transparent
<Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-all">
```

---

### Before vs After

| Element | Before (Invisible in Light Mode) | After (Theme-Aware) |
|---------|----------------------------------|---------------------|
| "Our Core Values" | `text-white` | `text-foreground` |
| Section subtitle | `text-white/70` | `text-muted-foreground` |
| "Mission", "Vision", etc. | `text-white` | `text-foreground` |
| Card descriptions | `text-white/70` | `text-muted-foreground` |
| Card background | `bg-card/50` (transparent) | `bg-card` (solid) |

---

### Result

- Card titles (Mission, Vision, Values, Team) will be visible in both light and dark modes
- Card descriptions will have proper contrast in all themes
- Section headers will adapt to the current theme
- Cards will have solid backgrounds for better text readability
