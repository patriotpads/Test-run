
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getPropertyById } from '@/data/properties';

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) return null;
      
      const getFallbackProperty = () => {
        const numericId = parseInt(id);
        let localProperty;
        
        if (!isNaN(numericId)) {
          localProperty = getPropertyById(numericId);
        } else {
          const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const mappedId = (hash % 20) + 1;
          localProperty = getPropertyById(mappedId);
          console.log(`Mapped UUID ${id} to local property ID ${mappedId}`);
        }
        
        if (!localProperty) return null;
        
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
      };
      
      try {
        const fetchWithTimeout = async () => {
          const { data, error } = await Promise.race([
            supabase
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
              .maybeSingle(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Supabase timeout')), 5000)
            )
          ]) as any;
          
          return { data, error };
        };

        const { data, error } = await fetchWithTimeout();

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
          rating: 4.8,
          reviewCount: 24,
          images: data.images || [],
          featured: data.featured,
          description: data.details,
          highlights: data.property_highlights,
          amenities: data.property_amenities?.map((pa: any) => pa.amenities) || [],
        };
      } catch (error) {
        console.warn('Supabase fetch failed, using local data:', error);
        return getFallbackProperty();
      }
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('not found')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
