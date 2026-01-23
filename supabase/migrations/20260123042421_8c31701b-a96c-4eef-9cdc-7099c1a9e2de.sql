-- Create services table for dynamic homepage services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Globe',
  features TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can view active services
CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  USING (is_active = true);

-- Admins can view all services (including inactive)
CREATE POLICY "Admins can view all services"
  ON public.services FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert services
CREATE POLICY "Admins can insert services"
  ON public.services FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update services
CREATE POLICY "Admins can update services"
  ON public.services FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete services
CREATE POLICY "Admins can delete services"
  ON public.services FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed initial data with existing services
INSERT INTO public.services (title, description, icon, features, display_order) VALUES
('Website Development', 'Custom, responsive websites built with modern technologies for optimal performance and user experience.', 'Globe', ARRAY['Custom Design', 'SEO Optimized', 'Mobile First'], 1),
('App Development', 'Native and cross-platform mobile applications that deliver seamless experiences across all devices.', 'Smartphone', ARRAY['iOS & Android', 'Cross-Platform', 'UI/UX Focus'], 2),
('Hosting & Domain', 'Reliable hosting solutions and domain management with 99.9% uptime guarantee and 24/7 support.', 'Server', ARRAY['99.9% Uptime', 'SSL Included', '24/7 Support'], 3),
('Graphic Design', 'Creative visual solutions including logos, branding, marketing materials, and digital assets.', 'Palette', ARRAY['Brand Identity', 'Print Design', 'Digital Assets'], 4),
('Video Editing', 'Professional video production and editing services for marketing, social media, and corporate needs.', 'Video', ARRAY['Motion Graphics', 'Color Grading', 'Sound Design'], 5),
('IT Security', 'Comprehensive security solutions to protect your digital assets and ensure business continuity.', 'Shield', ARRAY['Threat Analysis', 'Data Protection', 'Compliance'], 6);