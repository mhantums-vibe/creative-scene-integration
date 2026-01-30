

## Add Contact Information Management to Admin Panel

### Overview
Enable administrators to manage contact details (phone numbers, email addresses, address, and business hours) from the admin settings panel. These values are currently hardcoded and will be moved to the database.

---

### Current State

**Hardcoded in `ContactSection.tsx` (lines 10-31):**
```tsx
const contactInfo = [
  { icon: Phone, title: "Phone", details: ["+880 1XXX-XXXXXX", "+880 1XXX-XXXXXX"] },
  { icon: Mail, title: "Email", details: ["info@yessbangal.com", "support@yessbangal.com"] },
  { icon: MapPin, title: "Address", details: ["123 Tech Street, Dhaka", "Bangladesh"] },
  { icon: Clock, title: "Business Hours", details: ["Sat - Thu: 9AM - 6PM", "Friday: Closed"] },
];
```

**Hardcoded in `Footer.tsx` (lines 112-122):**
```tsx
<Mail /> yessbangla.bd@gmail.com
<Phone /> +88 019 162 11111
<MapPin /> 11/A, Main Road # 3, Plot # 10, Mirpur, Dhaka – 1216
```

---

### Solution

#### 1. Database: Add New Settings Keys
Insert new rows into the `site_settings` table for contact information:

| Key | Default Value |
|-----|---------------|
| `contact_phone_1` | `+88 019 162 11111` |
| `contact_phone_2` | `+880 1XXX-XXXXXX` |
| `contact_email_1` | `yessbangla.bd@gmail.com` |
| `contact_email_2` | `support@yessbangal.com` |
| `contact_address_line_1` | `11/A, Main Road # 3, Plot # 10` |
| `contact_address_line_2` | `Mirpur, Dhaka – 1216` |
| `business_hours_1` | `Sat - Thu: 9AM - 6PM` |
| `business_hours_2` | `Friday: Closed` |

---

#### 2. Update `useSiteSettings` Hook
Add new fields to the interface and fetch logic:

```tsx
interface SiteSettings {
  // Existing fields...
  contact_phone_1: string;
  contact_phone_2: string;
  contact_email_1: string;
  contact_email_2: string;
  contact_address_line_1: string;
  contact_address_line_2: string;
  business_hours_1: string;
  business_hours_2: string;
}
```

---

#### 3. Update Admin Settings Page
Add a new "Contact Information" card with input fields:

```text
+--------------------------------------------------+
|  Contact Information                              |
|  ------------------------------------------------ |
|  Phone 1:    [+88 019 162 11111              ]   |
|  Phone 2:    [+880 1XXX-XXXXXX               ]   |
|  Email 1:    [yessbangla.bd@gmail.com        ]   |
|  Email 2:    [support@yessbangal.com         ]   |
|  Address 1:  [11/A, Main Road # 3, Plot # 10 ]   |
|  Address 2:  [Mirpur, Dhaka – 1216           ]   |
|  Hours 1:    [Sat - Thu: 9AM - 6PM           ]   |
|  Hours 2:    [Friday: Closed                 ]   |
+--------------------------------------------------+
```

---

#### 4. Update ContactSection Component
Replace hardcoded array with dynamic data from `useSiteSettings`:

```tsx
const { settings } = useSiteSettings();

const contactInfo = [
  { icon: Phone, title: "Phone", details: [settings.contact_phone_1, settings.contact_phone_2] },
  { icon: Mail, title: "Email", details: [settings.contact_email_1, settings.contact_email_2] },
  { icon: MapPin, title: "Address", details: [settings.contact_address_line_1, settings.contact_address_line_2] },
  { icon: Clock, title: "Business Hours", details: [settings.business_hours_1, settings.business_hours_2] },
];
```

---

#### 5. Update Footer Component
Replace hardcoded contact info with settings:

```tsx
const { settings } = useSiteSettings();

<Mail /> {settings.contact_email_1}
<Phone /> {settings.contact_phone_1}
<MapPin /> {settings.contact_address_line_1}, {settings.contact_address_line_2}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useSiteSettings.tsx` | Add contact fields to interface and defaults |
| `src/pages/admin/Settings.tsx` | Add Contact Information card with 8 input fields |
| `src/components/sections/ContactSection.tsx` | Use `useSiteSettings` hook instead of hardcoded array |
| `src/components/layout/Footer.tsx` | Use `useSiteSettings` hook for contact details |

### Database Migration
Insert 8 new key-value rows into the `site_settings` table with default contact information.

---

### Result
- Administrators can edit phone numbers, emails, address, and business hours from the Settings page
- Changes automatically reflect on the Contact section and Footer
- No code changes needed for future contact info updates

