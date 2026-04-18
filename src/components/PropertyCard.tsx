import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateSlug } from '@/utils/slug';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: {
      city: string;
      state: string;
      country?: string;
    };
    price: number;
    bedrooms: number;
    bathrooms: number;
    rating: number;
    reviewCount: number;
    images: string[];
    featured?: boolean;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, title, location, price, bedrooms, bathrooms, rating, reviewCount, images, featured } = property;
  
  // Generate slug for SEO-friendly URLs
  const slug = generateSlug(title);
  
  return (
    <Link to={`/property/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <div className="aspect-[4/3] relative">
          <img 
            src={images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format'} 
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <Badge className="absolute top-2 right-2 bg-vacation-orange">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-vacation-orange text-vacation-orange" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-2">
            {location.city}, {location.state}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{bedrooms} beds</span>
            <span>•</span>
            <span>{bathrooms} baths</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-lg">${price}</span>
              <span className="text-muted-foreground text-sm"> / Night</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
