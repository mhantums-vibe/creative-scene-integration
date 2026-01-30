import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface SiteSettings {
  site_name: string;
  site_tagline: string;
  logo_url: string | null;
  banner_url: string | null;
  hero_banner_url: string | null;
  contact_phone_1: string;
  contact_phone_2: string;
  contact_email_1: string;
  contact_email_2: string;
  contact_address_line_1: string;
  contact_address_line_2: string;
  business_hours_1: string;
  business_hours_2: string;
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: "",
    site_tagline: "",
    logo_url: null,
    banner_url: null,
    hero_banner_url: null,
    contact_phone_1: "",
    contact_phone_2: "",
    contact_email_1: "",
    contact_email_2: "",
    contact_address_line_1: "",
    contact_address_line_2: "",
    business_hours_1: "",
    business_hours_2: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      const settingsMap = (data || []).reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string | null>);

      setSettings({
        site_name: settingsMap.site_name || "YessBangal",
        site_tagline: settingsMap.site_tagline || "Innovative IT Solutions",
        logo_url: settingsMap.logo_url || null,
        banner_url: settingsMap.banner_url || null,
        hero_banner_url: settingsMap.hero_banner_url || null,
        contact_phone_1: settingsMap.contact_phone_1 || "+88 019 162 11111",
        contact_phone_2: settingsMap.contact_phone_2 || "+880 1XXX-XXXXXX",
        contact_email_1: settingsMap.contact_email_1 || "yessbangla.bd@gmail.com",
        contact_email_2: settingsMap.contact_email_2 || "support@yessbangal.com",
        contact_address_line_1: settingsMap.contact_address_line_1 || "11/A, Main Road # 3, Plot # 10",
        contact_address_line_2: settingsMap.contact_address_line_2 || "Mirpur, Dhaka – 1216",
        business_hours_1: settingsMap.business_hours_1 || "Sat - Thu: 9AM - 6PM",
        business_hours_2: settingsMap.business_hours_2 || "Friday: Closed",
      });
    } catch (error) {
      logger.error("Error fetching settings", error);
      toast.error("Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site_assets")
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("site_assets")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const updates = [
        { key: "site_name", value: settings.site_name },
        { key: "site_tagline", value: settings.site_tagline },
        { key: "logo_url", value: settings.logo_url },
        { key: "banner_url", value: settings.banner_url },
        { key: "hero_banner_url", value: settings.hero_banner_url },
        { key: "contact_phone_1", value: settings.contact_phone_1 },
        { key: "contact_phone_2", value: settings.contact_phone_2 },
        { key: "contact_email_1", value: settings.contact_email_1 },
        { key: "contact_email_2", value: settings.contact_email_2 },
        { key: "contact_address_line_1", value: settings.contact_address_line_1 },
        { key: "contact_address_line_2", value: settings.contact_address_line_2 },
        { key: "business_hours_1", value: settings.business_hours_1 },
        { key: "business_hours_2", value: settings.business_hours_2 },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: update.value, updated_by: user?.id })
          .eq("key", update.key);

        if (error) {
          // If update fails, try insert
          const { error: insertError } = await supabase
            .from("site_settings")
            .insert({ key: update.key, value: update.value, updated_by: user?.id });

          if (insertError) throw insertError;
        }
      }

      toast.success("Settings saved successfully");
    } catch (error) {
      logger.error("Error saving settings", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground">Manage your website branding and content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                placeholder="Enter site name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_tagline">Tagline</Label>
              <Input
                id="site_tagline"
                value={settings.site_tagline}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                placeholder="Enter tagline"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              label="Logo"
              value={settings.logo_url}
              onChange={(url) => setSettings({ ...settings, logo_url: url })}
              onUpload={uploadImage}
            />
            <ImageUpload
              label="Hero Banner"
              value={settings.hero_banner_url}
              onChange={(url) => setSettings({ ...settings, hero_banner_url: url })}
              onUpload={uploadImage}
            />
            <ImageUpload
              label="About Banner"
              value={settings.banner_url}
              onChange={(url) => setSettings({ ...settings, banner_url: url })}
              onUpload={uploadImage}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_phone_1">Phone Number 1</Label>
              <Input
                id="contact_phone_1"
                value={settings.contact_phone_1}
                onChange={(e) => setSettings({ ...settings, contact_phone_1: e.target.value })}
                placeholder="+88 019 162 11111"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone_2">Phone Number 2</Label>
              <Input
                id="contact_phone_2"
                value={settings.contact_phone_2}
                onChange={(e) => setSettings({ ...settings, contact_phone_2: e.target.value })}
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_email_1">Email Address 1</Label>
              <Input
                id="contact_email_1"
                type="email"
                value={settings.contact_email_1}
                onChange={(e) => setSettings({ ...settings, contact_email_1: e.target.value })}
                placeholder="yessbangla.bd@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email_2">Email Address 2</Label>
              <Input
                id="contact_email_2"
                type="email"
                value={settings.contact_email_2}
                onChange={(e) => setSettings({ ...settings, contact_email_2: e.target.value })}
                placeholder="support@yessbangal.com"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_address_line_1">Address Line 1</Label>
              <Input
                id="contact_address_line_1"
                value={settings.contact_address_line_1}
                onChange={(e) => setSettings({ ...settings, contact_address_line_1: e.target.value })}
                placeholder="11/A, Main Road # 3, Plot # 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_address_line_2">Address Line 2</Label>
              <Input
                id="contact_address_line_2"
                value={settings.contact_address_line_2}
                onChange={(e) => setSettings({ ...settings, contact_address_line_2: e.target.value })}
                placeholder="Mirpur, Dhaka – 1216"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="business_hours_1">Business Hours 1</Label>
              <Input
                id="business_hours_1"
                value={settings.business_hours_1}
                onChange={(e) => setSettings({ ...settings, business_hours_1: e.target.value })}
                placeholder="Sat - Thu: 9AM - 6PM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_hours_2">Business Hours 2</Label>
              <Input
                id="business_hours_2"
                value={settings.business_hours_2}
                onChange={(e) => setSettings({ ...settings, business_hours_2: e.target.value })}
                placeholder="Friday: Closed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg bg-accent border border-border">
            <div className="flex items-center gap-3 mb-4">
              {settings.logo_url ? (
                <img
                  src={settings.logo_url}
                  alt="Logo"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">
                    {settings.site_name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-bold text-foreground text-lg">{settings.site_name}</h3>
                <p className="text-muted-foreground text-sm">{settings.site_tagline}</p>
              </div>
            </div>
            {settings.banner_url && (
              <img
                src={settings.banner_url}
                alt="Banner"
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
