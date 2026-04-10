import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-vacation-navy py-20 md:py-28 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format')",
        }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl">
          <h2 className="heading-xl text-white mb-4 animate-fade-in">
            Welcome to PatriotPads
          </h2>
    
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
          <h2>
          Premium Vacation Rentals for Veterans, First Responders & Seniors.
          </h2>
          <br></br>
            Enjoy exclusive discounts on cottages, estates, ranches, waterside retreats, and family-friendly stays designed to honor those who serve and inspire.
            <br /><br />
            Book now for unmatched comfort, heartfelt hospitality, and a retreat that truly feels like home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link to="/listings">
              <Button size="lg" className="bg-vacation-blue hover:bg-vacation-blue/90">
                View Properties
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
