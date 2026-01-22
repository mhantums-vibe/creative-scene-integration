-- Create site_settings table for dynamic site configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings (for displaying logo, site name, etc.)
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can insert site settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update site settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete site settings
CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'YessBangal'),
  ('site_tagline', 'Innovative IT Solutions'),
  ('logo_url', NULL),
  ('banner_url', NULL);

-- Admin RLS policies for bookings (view and update all)
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS policies for orders (view and update all)
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS policies for profiles (view all for user management)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS policies for user_roles (full management)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Admin RLS policies for job_postings (full management)
CREATE POLICY "Admins can insert job postings"
ON public.job_postings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update job postings"
ON public.job_postings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete job postings"
ON public.job_postings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all job postings"
ON public.job_postings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_assets storage bucket for logo and banner
INSERT INTO storage.buckets (id, name, public) VALUES ('site_assets', 'site_assets', true);

-- Storage policies for site_assets bucket
CREATE POLICY "Anyone can view site assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site_assets');

CREATE POLICY "Admins can upload site assets"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site_assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site assets"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site_assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site assets"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site_assets' AND public.has_role(auth.uid(), 'admin'));