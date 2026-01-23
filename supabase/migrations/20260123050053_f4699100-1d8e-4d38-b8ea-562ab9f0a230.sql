-- Add icon_url column for custom uploaded icons
ALTER TABLE public.services
ADD COLUMN icon_url TEXT DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN public.services.icon_url IS 'URL for custom uploaded icon image. If set, takes precedence over the Lucide icon name.';