
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_amenities (
            amenity_id,
            amenities (
              id,
              name,
              icon,
              category
            )
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        location: {
          city: data.location_city,
          state: data.location_state,
          country: data.location_country,
        },
        price: data.price_per_night,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        maxGuests: data.max_guests,
        rating: 4.8, // Default/fake rating for now
        reviewCount: 24, // Default/fake review count for now
        images: data.images || [],
        featured: data.featured,
        description: data.details,
        highlights: data.property_highlights,
        amenities: data.property_amenities?.map((pa: any) => pa.amenities) || [],
      };
    },
    enabled: !!id,
  });
}
