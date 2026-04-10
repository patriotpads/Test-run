
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { properties } from '@/data/properties';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
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
          .eq('status', 'active')
          .order('display_order', { ascending: true });

        if (error) throw error;
        
        return data.map(property => ({
          id: property.id,
          title: property.title,
          location: {
            city: property.location_city,
            state: property.location_state,
            country: property.location_country,
          },
          price: property.price_per_night,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          maxGuests: property.max_guests,
          rating: 4.8, // Default rating for now
          reviewCount: 24, // Default review count for now
          images: property.images || [],
          featured: property.featured,
          details: property.details,
          highlights: property.property_highlights,
          amenities: property.property_amenities?.map((pa: any) => pa.amenities) || [],
        }));
      } catch (error) {
        // Fallback to local static data
        console.warn('Supabase fetch failed, using local data:', error);
        
        return properties.map(property => ({
          id: property.id.toString(),
          title: property.title,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          maxGuests: property.maxGuests,
          rating: property.rating,
          reviewCount: property.reviewCount,
          images: property.images,
          featured: property.featured,
          details: property.description,
          highlights: [],
          amenities: property.amenities.map((amenity, index) => ({
            id: index,
            name: amenity,
            icon: '',
            category: 'general'
          })),
        }));
      }
    },
  });
}
