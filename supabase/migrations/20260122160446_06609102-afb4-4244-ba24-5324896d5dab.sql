-- Make the resumes bucket private
UPDATE storage.buckets SET public = false WHERE id = 'resumes';

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view resumes" ON storage.objects;

-- Create secure policies: Only authenticated users can upload resumes
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resumes');

-- Only admins can view/download resumes
CREATE POLICY "Admins can view resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete resumes if needed
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role));