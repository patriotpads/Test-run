
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DefaultMetaTags } from '@/components/DefaultMetaTags';

const Index = () => {
  const destinations = [
    {
      name: "California",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      description: "From the beaches of Malibu to the mountains of Big Bear"
    },
    {
      name: "Florida",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
      description: "Sunshine state with beautiful beaches and vibrant cities"
    },
    {
      name: "Oklahoma",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop",
      description: "Experience the charm of the heartland"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DefaultMetaTags />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
        
        {/* Destinations */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="heading-md mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground">Explore our variety of vacation spots</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="heading-sm text-white">{destination.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground mb-4">{destination.description}</p>
                    <Link to="/listings">
                      <Button variant="outline" className="w-full">Explore</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-vacation-blue text-white">
          <div className="container-custom text-center">
            <h2 className="heading-md mb-4">Ready for Your Next Vacation?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Whether you're looking for a beachfront property, mountain retreat, or city getaway,
              we have the perfect vacation rental for you.
            </p>
            <Link to="/listings">
              <Button size="lg" className="bg-white text-vacation-blue hover:bg-white/90">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
