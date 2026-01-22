-- Fix 1: Strengthen has_role function to validate user_id matches auth.uid()
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (_user_id = auth.uid() OR current_user = 'postgres')
  )
$$;

-- Fix 2: Add database constraints for job_applications table
ALTER TABLE public.job_applications
  ADD CONSTRAINT check_name_length CHECK (char_length(full_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT check_email_length CHECK (char_length(email) BETWEEN 5 AND 255),
  ADD CONSTRAINT check_phone_length CHECK (char_length(phone) BETWEEN 10 AND 20),
  ADD CONSTRAINT check_cover_letter_length CHECK (cover_letter IS NULL OR char_length(cover_letter) <= 2000),
  ADD CONSTRAINT check_portfolio_url_length CHECK (portfolio_url IS NULL OR char_length(portfolio_url) <= 500);

-- Fix 3: Replace permissive policy with one that has validation constraints
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;

CREATE POLICY "Anyone can submit job applications with validation"
ON public.job_applications
FOR INSERT
WITH CHECK (
  char_length(email) BETWEEN 5 AND 255 AND
  char_length(full_name) BETWEEN 2 AND 100 AND
  char_length(phone) BETWEEN 10 AND 20
);