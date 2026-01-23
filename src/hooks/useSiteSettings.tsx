import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

interface SiteSettings {
  site_name: string;
  site_tagline: string;
  logo_url: string | null;
  banner_url: string | null;
  hero_banner_url: string | null;
}

const defaultSettings: SiteSettings = {
  site_name: "YessBangal",
  site_tagline: "Innovative IT Solutions",
  logo_url: null,
  banner_url: null,
  hero_banner_url: null,
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) {
        logger.error("Error fetching site settings", error);
        return;
      }

      const settingsMap = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string | null>);

      setSettings({
        site_name: settingsMap.site_name || defaultSettings.site_name,
        site_tagline: settingsMap.site_tagline || defaultSettings.site_tagline,
        logo_url: settingsMap.logo_url || null,
        banner_url: settingsMap.banner_url || null,
        hero_banner_url: settingsMap.hero_banner_url || null,
      });
    } catch (err) {
      logger.error("Error in fetchSettings", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, isLoading, refetch: fetchSettings };
}
