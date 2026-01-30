import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";

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
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  social_youtube: string;
}

const defaultSettings: SiteSettings = {
  site_name: "YessBangal",
  site_tagline: "Innovative IT Solutions",
  logo_url: null,
  banner_url: null,
  hero_banner_url: null,
  contact_phone_1: "+88 019 162 11111",
  contact_phone_2: "+880 1XXX-XXXXXX",
  contact_email_1: "yessbangla.bd@gmail.com",
  contact_email_2: "support@yessbangal.com",
  contact_address_line_1: "11/A, Main Road # 3, Plot # 10",
  contact_address_line_2: "Mirpur, Dhaka – 1216",
  business_hours_1: "Sat - Thu: 9AM - 6PM",
  business_hours_2: "Friday: Closed",
  social_facebook: "",
  social_twitter: "",
  social_instagram: "",
  social_linkedin: "",
  social_youtube: "",
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
        contact_phone_1: settingsMap.contact_phone_1 || defaultSettings.contact_phone_1,
        contact_phone_2: settingsMap.contact_phone_2 || defaultSettings.contact_phone_2,
        contact_email_1: settingsMap.contact_email_1 || defaultSettings.contact_email_1,
        contact_email_2: settingsMap.contact_email_2 || defaultSettings.contact_email_2,
        contact_address_line_1: settingsMap.contact_address_line_1 || defaultSettings.contact_address_line_1,
        contact_address_line_2: settingsMap.contact_address_line_2 || defaultSettings.contact_address_line_2,
        business_hours_1: settingsMap.business_hours_1 || defaultSettings.business_hours_1,
        business_hours_2: settingsMap.business_hours_2 || defaultSettings.business_hours_2,
        social_facebook: settingsMap.social_facebook || defaultSettings.social_facebook,
        social_twitter: settingsMap.social_twitter || defaultSettings.social_twitter,
        social_instagram: settingsMap.social_instagram || defaultSettings.social_instagram,
        social_linkedin: settingsMap.social_linkedin || defaultSettings.social_linkedin,
        social_youtube: settingsMap.social_youtube || defaultSettings.social_youtube,
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
