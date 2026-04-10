
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';

const Listings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('');

  const { data: properties, isLoading, error } = useProperties();

  const filteredAndSortedProperties = React.useMemo(() => {
    if (!properties) return [];

    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === 'all' || property.location.state === locationFilter;
      return matchesSearch && matchesLocation;
    });

    if (priceSort) {
      filtered.sort((a, b) => {
        return priceSort === 'low-to-high' ? a.price - b.price : b.price - a.price;
      });
    }

    return filtered;
  }, [properties, searchTerm, locationFilter, priceSort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-white py-12 border-b">
          <div className="container-custom">
            <h1 className="heading-xl mb-4">Vacation Rentals</h1>
            <p className="text-gray-600">Find your perfect getaway from our collection of premium properties</p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white py-6 sticky top-20 z-10 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search properties or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                  <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12">
          <div className="container-custom">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Unable to load properties at this time.</p>
              </div>
            ) : filteredAndSortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No properties found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-gray-600">
                    Showing {filteredAndSortedProperties.length} properties
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAndSortedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Listings;
