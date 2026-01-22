import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: "",
    site_tagline: "",
    logo_url: null,
    banner_url: null,
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
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
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
      console.error("Error saving settings:", error);
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
              label="Banner Image"
              value={settings.banner_url}
              onChange={(url) => setSettings({ ...settings, banner_url: url })}
              onUpload={uploadImage}
            />
          </CardContent>
        </Card>
      </div>

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
