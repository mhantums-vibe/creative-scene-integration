-- Insert social media link settings into site_settings table
INSERT INTO public.site_settings (key, value) VALUES
  ('social_facebook', ''),
  ('social_twitter', ''),
  ('social_instagram', ''),
  ('social_linkedin', ''),
  ('social_youtube', '')
ON CONFLICT (key) DO NOTHING;