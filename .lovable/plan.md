

## Fix Resume Viewing in Admin Panel

### Problem Identified
The resume download fails because of a mismatch between how files are stored and retrieved:

| Component | Current Behavior | Expected Behavior |
|-----------|-----------------|-------------------|
| `JobApplicationForm` | Stores full public URL in `resume_url` | Should store only file path |
| `AdminApplications` | Passes full URL to `createSignedUrl()` | Needs just the file path |

**Example of current stored value:**
```
https://zcimdsqvruzzorsdxxzs.supabase.co/storage/v1/object/public/resumes/1769738247403-u9omyg.pdf
```

**What `createSignedUrl()` expects:**
```
1769738247403-u9omyg.pdf
```

---

### Solution

#### Option A: Fix the Admin Panel (Recommended)
Extract the file path from the stored URL before calling `createSignedUrl()`. This approach:
- Works with existing data in the database
- No migration needed for existing applications
- Handles both formats (path-only or full URL)

#### Option B: Fix the Application Form
Store only the file path instead of the full URL. This approach:
- Requires updating existing records in the database
- Cleaner long-term but needs data migration

**I recommend Option A** since it's backward-compatible and doesn't require data migration.

---

### Implementation (Option A)

**File: `src/pages/admin/Applications.tsx`**

Update the `getSignedUrl` function to extract the file path from either a full URL or just a path:

```tsx
const getSignedUrl = async (resumeUrl: string): Promise<string | null> => {
  // Extract file path from URL if it's a full URL
  let resumePath = resumeUrl;
  
  // Check if it's a full URL and extract just the filename
  if (resumeUrl.includes('/storage/v1/object/')) {
    // Extract path after bucket name
    const match = resumeUrl.match(/\/resumes\/(.+)$/);
    if (match) {
      resumePath = match[1];
    }
  }
  
  // Check if we already have a cached signed URL
  if (signedUrls[resumePath]) {
    return signedUrls[resumePath];
  }
  
  try {
    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(resumePath, 3600);
    
    if (error) {
      logger.error("Error creating signed URL", error);
      toast.error("Failed to access resume");
      return null;
    }
    
    setSignedUrls(prev => ({ ...prev, [resumePath]: data.signedUrl }));
    return data.signedUrl;
  } catch (error) {
    logger.error("Error getting signed URL", error);
    return null;
  }
};
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/admin/Applications.tsx` | Update `getSignedUrl` to extract file path from full URL |

---

### Result
- Resume download button will work correctly for admins
- Existing application data remains compatible
- Private bucket security is maintained - only admins can access resumes via signed URLs

