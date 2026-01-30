

## Redirect to Home Page After Login Instead of Dashboard

This plan changes the post-login behavior to show the home page first instead of the dashboard.

---

### What Will Change

| Scenario | Current Behavior | New Behavior |
|----------|------------------|--------------|
| After successful login | Redirect to `/dashboard` | Redirect to `/` (home) |
| Already logged in, visiting `/login` | Redirect to `/dashboard` | Redirect to `/` (home) |

---

### Files to Modify

| File | Line | Change |
|------|------|--------|
| `src/components/auth/AuthForm.tsx` | 76 | Change `navigate("/dashboard")` to `navigate("/")` |
| `src/pages/Login.tsx` | 17 | Change `<Navigate to="/dashboard" ...>` to `<Navigate to="/" ...>` |

---

### Technical Details

**1. AuthForm.tsx - Change login success redirect:**
```tsx
// Before
navigate("/dashboard");

// After  
navigate("/");
```

**2. Login.tsx - Change already-authenticated redirect:**
```tsx
// Before
return <Navigate to="/dashboard" replace />;

// After
return <Navigate to="/" replace />;
```

---

### User Experience After Change

1. User visits `/login` page
2. User enters credentials and clicks "Sign In"
3. On success → User is taken to the **home page** (not dashboard)
4. User can access dashboard anytime via the "Dashboard" button in the header

---

### Notes

- Dashboard remains accessible via the "Dashboard" button in the navigation header
- This is a simple 2-line change affecting only the redirect destinations
- No changes to authentication logic or session handling

