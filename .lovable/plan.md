

## Move Auth Buttons to More Dropdown

This plan reorganizes the authentication buttons to create a cleaner navigation bar by moving them into the "More" dropdown menu.

---

### What You'll Get

- Cleaner navigation bar without prominent auth buttons
- Login option inside the "More" dropdown when logged out
- Sign Out option inside the "More" dropdown when logged in
- Dashboard link remains visible in the main CTA area when logged in
- "Get Started" button remains visible as the main call-to-action

---

### Current vs. New Layout

| State | Current | New |
|-------|---------|-----|
| **Logged Out** | Login button + Get Started button in nav bar | Get Started button only, Login in More dropdown |
| **Logged In** | Dashboard button + Sign Out button in nav bar | Dashboard button only, Sign Out in More dropdown |

---

### Visual Comparison

```text
CURRENT (Logged Out):
[Home] [Services] [About] [Careers] [More ▼]    [Login] [Get Started]

NEW (Logged Out):
[Home] [Services] [About] [Careers] [More ▼]    [Get Started]
                                      └── Portfolio
                                      └── Testimonials
                                      └── Contact
                                      └── ─────────
                                      └── Login (NEW)

CURRENT (Logged In):
[Home] [Services] [About] [Careers] [More ▼]    [Dashboard] [Sign Out]

NEW (Logged In):
[Home] [Services] [About] [Careers] [More ▼]    [Dashboard]
                                      └── Portfolio
                                      └── Testimonials
                                      └── Contact
                                      └── Admin (if admin)
                                      └── ─────────
                                      └── Sign Out (NEW)
```

---

### Technical Details

**File to Modify:**

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Move Login/Sign Out to More dropdown, simplify CTA area |

---

### Key Changes

**1. Update More Dropdown (Desktop):**
```tsx
<DropdownMenuContent>
  {moreNavItems.map(item => (...))}
  
  {isAdmin && (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Admin</DropdownMenuItem>
    </>
  )}
  
  {/* NEW: Auth options in dropdown */}
  <DropdownMenuSeparator />
  {user ? (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem asChild>
      <Link to="/login">Login</Link>
    </DropdownMenuItem>
  )}
</DropdownMenuContent>
```

**2. Simplify Desktop CTA Area:**
```tsx
{/* Desktop CTA - Simplified */}
{user ? (
  <Button asChild>
    <Link to="/dashboard">Dashboard</Link>
  </Button>
) : (
  <Button asChild>
    <Link to="/signup">Get Started</Link>
  </Button>
)}
```

**3. Update Mobile Menu:**
- Keep Dashboard visible when logged in
- Move Sign Out after the separator
- Keep Get Started visible when logged out
- Move Login after the separator

---

### Summary of Changes

| Section | Logged Out | Logged In |
|---------|------------|-----------|
| Main CTA button | Get Started | Dashboard |
| More dropdown | + Login | + Sign Out |
| Mobile visible | Get Started | Dashboard |
| Mobile in list | + Login | + Sign Out |

---

### Notes

- Keeps the navigation clean and focused
- Important actions (Dashboard, Get Started) remain prominent
- Secondary actions (Login, Sign Out) are accessible but less prominent
- Admin link remains in dropdown for admin users
- Mobile menu follows the same pattern

