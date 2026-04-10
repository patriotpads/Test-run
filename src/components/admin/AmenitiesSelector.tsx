
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import * as LucideIcons from 'lucide-react';

interface AmenitiesSelectorProps {
  amenities: any[];
  selectedAmenities: string[];
  onChange: (selectedAmenities: string[]) => void;
}

export function AmenitiesSelector({ amenities, selectedAmenities, onChange }: AmenitiesSelectorProps) {
  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedAmenities, amenityId]);
    } else {
      onChange(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const groupedAmenities = amenities.reduce((groups, amenity) => {
    const category = amenity.category || 'general';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(amenity);
    return groups;
  }, {});

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Home;
    return IconComponent;
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedAmenities).map(([category, categoryAmenities]: [string, any[]]) => (
        <div key={category}>
          <h4 className="font-medium text-sm text-gray-700 mb-3 capitalize">
            {category.replace('_', ' ')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryAmenities.map((amenity) => {
              const Icon = getIcon(amenity.icon);
              return (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={(checked) => 
                      handleAmenityChange(amenity.id, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={amenity.id} 
                    className="flex items-center space-x-2 text-sm cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{amenity.name}</span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
