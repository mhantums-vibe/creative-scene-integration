-- Add background_image column to services table
ALTER TABLE services 
ADD COLUMN background_image TEXT DEFAULT NULL;