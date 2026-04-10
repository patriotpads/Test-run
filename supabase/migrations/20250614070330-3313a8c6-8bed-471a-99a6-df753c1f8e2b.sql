
-- Create amenities table for checklist options
CREATE TABLE public.amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert common amenities
INSERT INTO public.amenities (name, icon, category) VALUES
('WiFi', 'wifi', 'connectivity'),
('Air Conditioning', 'snowflake', 'comfort'),
('Heating', 'thermometer', 'comfort'),
('Kitchen', 'chef-hat', 'kitchen'),
('Dishwasher', 'utensils', 'kitchen'),
('Washer', 'washing-machine', 'laundry'),
('Dryer', 'wind', 'laundry'),
('TV', 'tv', 'entertainment'),
('Pool', 'waves', 'outdoor'),
('Hot Tub', 'bath', 'outdoor'),
('Parking', 'car', 'parking'),
('Gym', 'dumbbell', 'amenities'),
('Pet Friendly', 'heart', 'policies'),
('Smoking Allowed', 'cigarette', 'policies'),
('Wheelchair Accessible', 'accessibility', 'accessibility'),
('Balcony', 'home', 'outdoor'),
('Fireplace', 'flame', 'comfort'),
('BBQ Grill', 'grill', 'outdoor'),
('Beach Access', 'umbrella', 'location'),
('Mountain View', 'mountain', 'location');

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  max_guests INTEGER NOT NULL DEFAULT 1,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  details TEXT CHECK (char_length(details) <= 1500),
  property_highlights TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  location_country TEXT DEFAULT 'United States',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property amenities junction table
CREATE TABLE public.property_amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES public.amenities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(property_id, amenity_id)
);

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
CREATE POLICY "Users can view all properties" 
  ON public.properties 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create properties" 
  ON public.properties 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
  ON public.properties 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
  ON public.properties 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for property amenities
CREATE POLICY "Users can view all property amenities" 
  ON public.property_amenities 
  FOR SELECT 
  USING (true);

CREATE POLICY "Property owners can manage amenities" 
  ON public.property_amenities 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.properties 
    WHERE id = property_id AND user_id = auth.uid()
  ));

-- RLS Policies for amenities (read-only for all)
CREATE POLICY "Everyone can view amenities" 
  ON public.amenities 
  FOR SELECT 
  USING (true);

-- Storage policies for property images
CREATE POLICY "Public can view property images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'property-images' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their property images" 
  ON storage.objects 
  FOR UPDATE 
  USING (
    bucket_id = 'property-images' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete their property images" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'property-images' AND 
    auth.role() = 'authenticated'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at 
  BEFORE UPDATE ON public.properties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
