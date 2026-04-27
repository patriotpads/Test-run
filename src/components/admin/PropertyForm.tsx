import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from './ImageUploader';
import { AmenitiesSelector } from './AmenitiesSelector';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { generateSlug, generateUniqueSlug } from '@/utils/slug';

interface PropertyFormProps {
  property?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function PropertyForm({ property, onClose, onSuccess }: PropertyFormProps) {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAdminAuth();
  const [formData, setFormData] = useState({
    title: '',
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    details: '',
    property_highlights: '',
    price_per_night: '',
    location_city: '',
    location_state: '',
    featured: false,
    status: 'active',
    images: [] as string[],
    amenities: [] as string[],
  });

  useEffect(() => {
    if (property) {
      console.log('Loading property for edit:', property);
      setFormData({
        title: property.title || '',
        max_guests: property.max_guests || 1,
        bedrooms: property.bedrooms || 1,
        bathrooms: property.bathrooms || 1,
        details: property.details || '',
        property_highlights: property.property_highlights || '',
        price_per_night: property.price_per_night?.toString() || '',
        location_city: property.location_city || '',
        location_state: property.location_state || '',
        featured: property.featured || false,
        status: property.status || 'active',
        images: property.images || [],
        amenities: property.property_amenities?.map((pa: any) => pa.amenities?.id || pa.amenity_id) || [],
      });
    }
  }, [property]);

  const { data: amenities } = useQuery({
    queryKey: ['amenities'],
    queryFn: async () => {
      console.log('Fetching amenities...');
      const { data, error } = await supabase
        .from('amenities')
        .select('id, name, icon, category')
        .order('category', { ascending: true });

      if (error) {
        console.error('Amenities fetch error:', error);
        throw error;
      }
      console.log('Amenities fetched:', data);
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Starting property save mutation with data:', data);
      
      if (!isAuthenticated || !user) {
        throw new Error('No authenticated user found. Please log in and try again.');
      }

      console.log('User authenticated:', user.id);

      // Generate slug for new properties
      let slug = property?.slug; // Keep existing slug for updates
      if (!property) {
        // Generate slug for new property
        const baseSlug = generateSlug(data.title);
        
        // Get existing slugs to ensure uniqueness
        const { data: existingProperties } = await supabase
          .from('properties')
          .select('slug')
          .not('slug', 'is', null);
        
        const existingSlugs = existingProperties?.map(p => p.slug).filter(Boolean) || [];
        slug = generateUniqueSlug(baseSlug, existingSlugs, 'new');
        
        console.log(`Generated slug: ${slug} for title: ${data.title}`);
      }

      const propertyData = {
        title: data.title,
        slug: slug,
        max_guests: data.max_guests,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        details: data.details,
        property_highlights: data.property_highlights,
        price_per_night: parseFloat(data.price_per_night),
        location_city: data.location_city,
        location_state: data.location_state,
        featured: data.featured,
        status: data.status,
        images: data.images,
        user_id: user.id,
      };

      console.log('Property data to save:', propertyData);

      let propertyId = property?.id;

      if (property) {
        console.log('Updating existing property:', property.id);
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', property.id);
        
        if (error) {
          console.error('Property update error:', error);
          throw new Error(`Failed to update property: ${error.message}`);
        }
        console.log('Property updated successfully');
      } else {
        console.log('Creating new property');
        const { data: newProperty, error } = await supabase
          .from('properties')
          .insert(propertyData)
          .select()
          .single();
          
        if (error) {
          console.error('Property creation error:', error);
          throw new Error(`Failed to create property: ${error.message}`);
        }
        
        console.log('New property created:', newProperty);
        propertyId = newProperty.id;
      }

      // Update amenities
      console.log('Updating amenities for property:', propertyId);
      const { error: deleteError } = await supabase
        .from('property_amenities')
        .delete()
        .eq('property_id', propertyId);
        
      if (deleteError) {
        console.error('Error deleting old amenities:', deleteError);
        // Don't throw here, continue with insertion
      }

      if (data.amenities.length > 0) {
        const amenityInserts = data.amenities.map((amenityId: string) => ({
          property_id: propertyId,
          amenity_id: amenityId,
        }));

        console.log('Inserting amenities:', amenityInserts);
        const { error: amenityError } = await supabase
          .from('property_amenities')
          .insert(amenityInserts);

        if (amenityError) {
          console.error('Amenity insertion error:', amenityError);
          throw new Error(`Failed to update amenities: ${amenityError.message}`);
        }
        console.log('Amenities updated successfully');
      }

      return propertyId;
    },
    onSuccess: () => {
      console.log('Property save successful');
      toast({
        title: property ? 'Property updated' : 'Property created',
        description: `Property has been ${property ? 'updated' : 'created'} successfully.`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      console.error('Property save error:', error);
      toast({
        title: 'Error',
        description: error.message || `Failed to ${property ? 'update' : 'create'} property.`,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!isAuthenticated || !user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to create properties.',
        variant: 'destructive',
      });
      return;
    }
    
    // Basic validation
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Property title is required.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.price_per_night || parseFloat(formData.price_per_night) <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Valid price per night is required.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.location_city.trim() || !formData.location_state) {
      toast({
        title: 'Validation Error',
        description: 'City and state are required.',
        variant: 'destructive',
      });
      return;
    }

    saveMutation.mutate(formData);
  };

  const handleChange = (field: string, value: any) => {
    console.log(`Field ${field} changed to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Don't render the form until we've checked authentication
  if (!isAuthenticated || !user) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center space-y-4">
            <p>Please log in to create or edit properties.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
              <Button onClick={() => window.location.href = '/admin/login'}>
                Go to Login
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {property ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Main Heading *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="max_guests">Max Guests *</Label>
                  <Input
                    id="max_guests"
                    type="number"
                    min="1"
                    value={formData.max_guests}
                    onChange={(e) => handleChange('max_guests', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location_city">City *</Label>
                  <Input
                    id="location_city"
                    value={formData.location_city}
                    onChange={(e) => handleChange('location_city', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location_state">State *</Label>
                  <Select
                    value={formData.location_state}
                    onValueChange={(value) => handleChange('location_state', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Florida">Florida</SelectItem>
                      <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="price_per_night">Price per Night (USD) *</Label>
                <Input
                  id="price_per_night"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price_per_night}
                  onChange={(e) => handleChange('price_per_night', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Property</Label>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Property Images (up to 40)</Label>
                <ImageUploader
                  images={formData.images}
                  onChange={(images) => handleChange('images', images)}
                  maxImages={40}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="details">Details (up to 1500 characters)</Label>
            <Textarea
              id="details"
              value={formData.details}
              onChange={(e) => handleChange('details', e.target.value)}
              maxLength={1500}
              rows={4}
              placeholder="Describe your property in detail..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.details.length}/1500 characters
            </p>
          </div>

          <div>
            <Label htmlFor="property_highlights">Property Highlights</Label>
            <Textarea
              id="property_highlights"
              value={formData.property_highlights}
              onChange={(e) => handleChange('property_highlights', e.target.value)}
              rows={3}
              placeholder="Key highlights and unique features..."
            />
          </div>

          <div>
            <Label>Amenities</Label>
            <AmenitiesSelector
              amenities={amenities || []}
              selectedAmenities={formData.amenities}
              onChange={(amenities) => handleChange('amenities', amenities)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saveMutation.isPending || !isAuthenticated || !user}>
              {saveMutation.isPending ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
