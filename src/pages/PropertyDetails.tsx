import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { getPropertyById } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Calendar, Users, Home } from 'lucide-react';
import { useProperty } from '@/hooks/useProperty';
import BookNowDropdown from "@/components/BookNowDropdown";
import { PropertyMetaTags } from '@/components/MetaTags';
import { SocialShare } from '@/components/SocialShare';
import { supabase } from '@/integrations/supabase/client';
import { generateSlug } from '@/utils/slug';

const PropertyDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: property, isLoading, error } = useProperty(slug);

  // Handle UUID redirection
  useEffect(() => {
    if (error && error instanceof Error && error.message === 'UUID_REDIRECT_NEEDED') {
      // Try to find the property by UUID and redirect to its slug
      const redirectByUuid = async () => {
        try {
          const { data: propertyData } = await supabase
            .from('properties')
            .select('slug')
            .eq('id', slug)
            .single();
          
          if (propertyData?.slug) {
            navigate(`/property/${propertyData.slug}`, { replace: true });
          } else {
            // If no slug found, it might be a local property
            const numericId = parseInt(slug);
            if (!isNaN(numericId)) {
              const localProperty = getPropertyById(numericId);
              if (localProperty) {
                const generatedSlug = generateSlug(localProperty.title);
                navigate(`/property/${generatedSlug}`, { replace: true });
              }
            }
          }
        } catch (err) {
          console.error('Failed to redirect UUID:', err);
        }
      };
      
      redirectByUuid();
    }
  }, [error, slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-16 flex-grow flex flex-col items-center justify-center">
          <h1 className="heading-lg mb-4">Loading property details...</h1>
        </div>
        <Footer />
      </div>
    );
  }
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto py-16 flex-grow flex flex-col items-center justify-center">
          <h1 className="heading-lg mb-4">Property Not Available</h1>
          <p className="mb-6">This property is currently unavailable or may have been removed.</p>
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              If you're seeing this message for a property that should exist, 
              our database may be temporarily unavailable.
            </p>
            <p className="text-sm text-muted-foreground">
              Please try again later or browse our available properties below.
            </p>
          </div>
          <Button onClick={() => navigate('/listings')}>Browse All Properties</Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <PropertyMetaTags property={property} />
      <Navbar />
      <main className="flex-grow">
        {/* Property Header */}
        <div className="container-custom pt-8">
          <div className="mb-6">
            <h1 className="heading-lg mb-2">{property.title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-vacation-orange text-vacation-orange mr-1" />
                  <span>{property.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({property.reviewCount} reviews)</span>
                </div>
                <span className="text-muted-foreground">-</span>
                <span>{property.location.city}, {property.location.state}</span>
                {property.featured && (
                  <>
                    <span className="text-muted-foreground">-</span>
                    <Badge variant="secondary">Featured</Badge>
                  </>
                )}
              </div>
              <SocialShare property={property} />
            </div>
          </div>
          
          {/* Property Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {property.images.map((image: string, index: number) => (
              <div key={index} className={`aspect-[4/3] overflow-hidden rounded-lg ${index === 0 ? 'md:col-span-2' : ''}`}>
                <img 
                  src={image} 
                  alt={`${property.title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Details */}
        <div className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between pb-4 mb-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold">
                    Entire place hosted by PatriotPads
                  </h2>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{property.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bedrooms • {property.bathrooms} bathrooms</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="prose max-w-none">
                    <p className="text-base leading-relaxed mb-6">
                      {property.description}
                    </p>
                    <h3 className="text-lg font-medium mb-2">Property highlights</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Free cancellation up to 48 hours before check-in</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        <span>Highly rated for location</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="pt-4">
                  <h3 className="text-lg font-medium mb-4">What this place offers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.amenities.map((amenity: any, index: number) => (
                      <div key={index} className="flex items-center py-2">
                        <span>{amenity?.name || ''}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <BookingForm price={property.price} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
