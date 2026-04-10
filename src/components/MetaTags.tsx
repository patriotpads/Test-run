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
    if (!property) return;

    const title = `${property.title} - PatriotPads`;
    const description = property.description;
    const image = property.images[0];

    // Update document title
    document.title = title;

    // Update or create meta tags
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
    updateMetaTag('og:type', 'website');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Cleanup function
    return () => {
      document.title = 'PatriotPads';
    };
  }, [property]);

  return null;
};
