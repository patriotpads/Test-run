import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container-custom py-16">
        <h1 className="heading-lg text-vacation-navy mb-6">
          Welcome to PatriotPads.com, Premium Vacation Rentals with Heartfelt Hospitality and Special Offers for Our Nation's Heroes
        </h1>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          At PatriotPads, we believe everyone deserves a place to unwind, reconnect, and create lasting memories. 
          That's why we've built a trusted platform offering premium vacation rentals across the country from tranquil cabins nestled in nature to stunning beachfront escapes and spacious family getaways. Whether you're traveling solo, as a couple, or with a group, we make it easy to find the perfect home-away-from-home for your next trip.
        </p>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          While our rentals are open to everyone, we're proud to honor our heroes by offering exclusive discounts to military veterans, first responders, and seniors. It's our way of giving back to those who have given so much to their communities and country.
        </p>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          Each stay with PatriotPads combines unmatched comfort, thoughtful amenities, and genuine hospitality. Our properties are carefully vetted for quality and managed with care, so you can book with confidence and focus on what matters most—relaxation, adventure, and peace of mind.
        </p>
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          Explore our growing collection of properties, take advantage of our special offers, and experience the difference that gratitude-driven travel makes. Your perfect getaway starts here.
        </p>
        <div className="mt-8 text-lg">
          For bookings and inquiries, please email us at <a href="mailto:christina@esellogic.com" className="text-blue-600 underline">christina@esellogic.com</a>.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 