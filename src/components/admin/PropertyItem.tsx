import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, GripVertical, MapPin, Users, Bed, Bath } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyItemProps {
  property: any;
  onEdit: (property: any) => void;
  onDelete: (property: any) => void;
  dragProps: any;
  dragHandleProps: any;
  ref: any;
  isDragging: boolean;
}

export const PropertyItem = React.forwardRef<HTMLDivElement, PropertyItemProps>(
  ({ property, onEdit, onDelete, dragProps, dragHandleProps, isDragging }, ref) => {
    const firstImage = property.images?.[0];

    return (
      <Card
        ref={ref}
        {...dragProps}
        className={cn(
          "transition-shadow hover:shadow-md",
          isDragging && "shadow-lg rotate-3"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>

            {firstImage && (
              <img
                src={firstImage}
                alt={property.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{property.title}</h3>
                {property.featured && (
                  <Badge variant="secondary" className="bg-vacation-orange text-white">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className={cn(
                  property.status === 'active' && 'border-green-200 text-green-800',
                  property.status === 'inactive' && 'border-red-200 text-red-800',
                  property.status === 'draft' && 'border-yellow-200 text-yellow-800'
                )}>
                  {property.status}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location_city}, {property.location_state}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {property.max_guests} guests
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-vacation-blue">
                  ${property.price_per_night}
                </span>
                <span className="text-gray-500">/ night</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(property)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(property)}
              className="flex items-center gap-2 ml-2"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PropertyItem.displayName = 'PropertyItem';
