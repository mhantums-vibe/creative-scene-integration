-- Add length constraints to bookings table
ALTER TABLE public.bookings
  ADD CONSTRAINT check_bookings_service_name_length 
    CHECK (char_length(service_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT check_bookings_notes_length 
    CHECK (notes IS NULL OR char_length(notes) <= 1000),
  ADD CONSTRAINT check_bookings_description_length
    CHECK (description IS NULL OR char_length(description) <= 2000);

-- Add length constraints to orders table
ALTER TABLE public.orders
  ADD CONSTRAINT check_orders_service_name_length 
    CHECK (char_length(service_name) BETWEEN 1 AND 200),
  ADD CONSTRAINT check_orders_description_length 
    CHECK (description IS NULL OR char_length(description) <= 2000);

-- Add length constraints to profiles table
ALTER TABLE public.profiles
  ADD CONSTRAINT check_profiles_full_name_length 
    CHECK (full_name IS NULL OR char_length(full_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT check_profiles_phone_length 
    CHECK (phone IS NULL OR char_length(phone) BETWEEN 5 AND 30),
  ADD CONSTRAINT check_profiles_address_length
    CHECK (address IS NULL OR char_length(address) <= 500);

-- Add length constraints to services table (admin-only but good practice)
ALTER TABLE public.services
  ADD CONSTRAINT check_services_title_length 
    CHECK (char_length(title) BETWEEN 1 AND 200),
  ADD CONSTRAINT check_services_description_length 
    CHECK (char_length(description) BETWEEN 1 AND 5000);