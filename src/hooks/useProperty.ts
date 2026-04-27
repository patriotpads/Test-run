
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getPropertyById } from '@/data/properties';
import { generateSlug } from '@/utils/slug';

export function useProperty(slugOrId: string | undefined) {
  return useQuery({
    queryKey: ['property', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return null;
      
      // Check if the parameter looks like a UUID (for backward compatibility)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slugOrId);
      
      const getFallbackProperty = () => {
        const numericId = parseInt(slugOrId);
        let localProperty;
        
        if (!isNaN(numericId)) {
          localProperty = getPropertyById(numericId);
        } else {
          const hash = slugOrId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const mappedId = (hash % 20) + 1;
          localProperty = getPropertyById(mappedId);
          console.log(`Mapped ${isUuid ? 'UUID' : 'slug'} ${slugOrId} to local property ID ${mappedId}`);
        }
        
        if (!localProperty) return null;
        
        return {
          id: localProperty.id,
          slug: generateSlug(localProperty.title), // Generate slug for local data
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
          // Create timeout promise
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Supabase timeout')), 5000)
          );
          
          // Fetch by slug from database (primary method)
          const query = supabase
            .from('properties')
            .select('id, title, slug, location_city, location_state, location_country, price_per_night, bedrooms, bathrooms, max_guests, images, featured, details, property_highlights, status, property_amenities(amenities(id, name, icon, category))')
            .eq('slug', slugOrId)
            .maybeSingle();
          const { data, error } = await Promise.race([
            query,
            timeoutPromise
          ]) as any;
          
          return { data, error };
        };

        const { data, error } = await fetchWithTimeout();

        if (error) throw error;
        if (!data) {
          throw new Error('Property not found in database');
        }

        const propertySlug = generateSlug(data.title);
        
        return {
          id: data.id,
          slug: propertySlug,
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
    enabled: !!slugOrId,
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
