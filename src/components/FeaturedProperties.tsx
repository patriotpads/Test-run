import React from 'react';
import { Button } from "@/components/ui/button";
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';

const FeaturedProperties: React.FC = () => {
  const { data: properties, isLoading, error } = useProperties();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional vacation rentals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !properties) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-4">Featured Properties</h2>
          <p className="text-gray-600">Unable to load properties at this time.</p>
        </div>
      </section>
    );
  }

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional vacation rentals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/listings">
            <Button size="lg" variant="outline">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
