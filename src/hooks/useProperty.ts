
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getPropertyById } from '@/data/properties';

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        // Try to fetch from Supabase first
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
        if (!data) throw new Error('Property not found in database');

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
      } catch (error) {
        // Fallback to local static data
        console.warn('Supabase fetch failed, using local data:', error);
        
        // Try to parse as integer first, if that fails, we can't use local data
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          console.warn('Cannot map UUID to local numeric ID, local data unavailable');
          return null;
        }
        
        const localProperty = getPropertyById(numericId);
        
        if (!localProperty) return null;
        
        // Transform local data to match the expected format
        return {
          id: localProperty.id,
          title: localProperty.title,
          location: localProperty.location,
          price: localProperty.price,
          bedrooms: localProperty.bedrooms,
          bathrooms: localProperty.bathrooms,
          maxGuests: localProperty.maxGuests,
          rating: localProperty.rating,
          reviewCount: localProperty.reviewCount,
          images: localProperty.images,
          featured: localProperty.featured,
          description: localProperty.description,
          amenities: localProperty.amenities.map((amenity, index) => ({
            id: index,
            name: amenity,
            icon: '',
            category: 'general'
          })),
        };
      }
    },
    enabled: !!id,
  });
}
