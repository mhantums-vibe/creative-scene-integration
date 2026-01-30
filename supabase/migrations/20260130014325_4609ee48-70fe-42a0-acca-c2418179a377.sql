-- Insert contact information settings into site_settings table
INSERT INTO public.site_settings (key, value) VALUES
  ('contact_phone_1', '+88 019 162 11111'),
  ('contact_phone_2', '+880 1XXX-XXXXXX'),
  ('contact_email_1', 'yessbangla.bd@gmail.com'),
  ('contact_email_2', 'support@yessbangal.com'),
  ('contact_address_line_1', '11/A, Main Road # 3, Plot # 10'),
  ('contact_address_line_2', 'Mirpur, Dhaka – 1216'),
  ('business_hours_1', 'Sat - Thu: 9AM - 6PM'),
  ('business_hours_2', 'Friday: Closed')
ON CONFLICT (key) DO NOTHING;