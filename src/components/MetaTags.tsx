import React, { useEffect } from 'react';

interface PropertyMetaTagsProps {
  property?: {
    title: string;
    description: string;
    location: {
      city: string;
      state: string;
    };
    images: string[];
    price: number;
  };
}

export const PropertyMetaTags: React.FC<PropertyMetaTagsProps> = ({ property }) => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=630&fit=crop&crop=center';
    
    const title = property ? `${property.title} - PatriotPads - Premium Vacation Rentals` : 'PatriotPads - Perfect Getaways - Premium Vacation Rentals in California, Florida, and Oklahoma';
    const description = property ? `${property.description} Experience luxury and comfort with PatriotPads premium vacation rentals. Book your perfect getaway today!` : 'Find your perfect vacation rental with PatriotPads. Premium properties in California, Florida, and Oklahoma. Experience luxury and comfort with our handpicked vacation rentals.';
    
    const getSocialImage = (imageUrl: string) => {
      if (imageUrl.includes('unsplash.com')) {
        return imageUrl.replace(/w=\d+/, 'w=1200&h=630&fit=crop');
      }
      // Ensure HTTPS for all image URLs
      if (imageUrl.startsWith('http://')) {
        return imageUrl.replace('http://', 'https://');
      }
      return imageUrl;
    };
    
    const image = property && property.images[0] ? getSocialImage(property.images[0]) : defaultImage;
    const url = window.location.href;

    document.title = title;

    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) || 
                document.querySelector(`meta[property="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', property?.title || 'PatriotPads Property');
    updateMetaTag('og:url', url);
    updateMetaTag('canonical', url);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:site_name', 'PatriotPads');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', property?.title || 'PatriotPads Property');
    updateMetaTag('twitter:site', '@PatriotPads');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'PatriotPads');

    return () => {
      document.title = 'PatriotPads';
    };
  }, [property]);

  return null;
};
