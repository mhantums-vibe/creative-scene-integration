
## Add Team Members Management to Admin Panel

Create a new admin page to manage team member information displayed on the About page, following the existing admin panel patterns.

---

### Current State

- The `team_members` table exists with fields: name, role, bio, image_url, linkedin_url, twitter_url, email, display_order, is_active
- RLS policies already allow admins to perform CRUD operations
- The About page displays team members but currently uses hardcoded data
- No admin interface exists to manage team members

---

### Implementation Plan

| File | Action | Description |
|------|--------|-------------|
| `src/pages/admin/Team.tsx` | Create | New admin page for team member CRUD |
| `src/components/admin/AdminSidebar.tsx` | Update | Add "Team" navigation item |
| `src/App.tsx` | Update | Add route for `/admin/team` |
| `src/pages/About.tsx` | Update | Fetch team members from database instead of hardcoded data |

---

### 1. Create Team Admin Page

New file `src/pages/admin/Team.tsx` following the same patterns as Jobs.tsx and Portfolio.tsx:

**Features:**
- Table view showing all team members with avatar, name, role, social links, and status
- Create/Edit dialog with form fields:
  - Name (required)
  - Role (required)
  - Bio (textarea)
  - Profile Image (using ImageUpload component)
  - LinkedIn URL
  - Twitter URL
  - Email
  - Display Order
  - Is Active toggle
- Delete confirmation dialog
- Toggle active status directly from table
- Image upload to `site_assets` storage bucket

**Form Layout:**
```text
+----------------------------------+
| Name*            | Role*         |
+----------------------------------+
| Bio (textarea)                   |
+----------------------------------+
| Profile Image [ImageUpload]      |
+----------------------------------+
| LinkedIn URL     | Twitter URL   |
+----------------------------------+
| Email            | Display Order |
+----------------------------------+
| [x] Active                       |
+----------------------------------+
|           [Cancel] [Save]        |
+----------------------------------+
```

---

### 2. Update Admin Sidebar Navigation

Add new navigation item between "Portfolio" and "Job Postings":

```tsx
{ title: "Team", url: "/admin/team", icon: Users }
```

---

### 3. Add Route in App.tsx

Add the team route inside the admin layout:

```tsx
<Route path="team" element={<AdminTeam />} />
```

---

### 4. Update About Page

Replace hardcoded `teamMembers` array with dynamic data from Supabase:

```tsx
const [teamMembers, setTeamMembers] = useState([]);

useEffect(() => {
  const fetchTeam = async () => {
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("display_order");
    setTeamMembers(data || []);
  };
  fetchTeam();
}, []);
```

---

### Technical Details

**Team Admin Page Structure:**

1. **Interface Definition:**
```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  email: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}
```

2. **Image Upload Handler:**
```typescript
const handleImageUpload = async (file: File): Promise<string> => {
  const filePath = `team/${crypto.randomUUID()}.${file.name.split(".").pop()}`;
  await supabase.storage.from("site_assets").upload(filePath, file);
  return supabase.storage.from("site_assets").getPublicUrl(filePath).data.publicUrl;
};
```

3. **Table Columns:**
   - Avatar thumbnail
   - Name + Role
   - Social Links (icons linking to profiles)
   - Status badge
   - Actions (Edit, Toggle, Delete)

---

### Expected Result

- Admins can add, edit, and remove team members from the admin panel
- Changes reflect immediately on the About page
- Profile images upload to Supabase storage
- Display order controls the sequence on the public site
- Inactive members are hidden from the public About page
