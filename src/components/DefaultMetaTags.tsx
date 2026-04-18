import React, { useEffect } from 'react';

interface DefaultMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export const DefaultMetaTags: React.FC<DefaultMetaTagsProps> = ({ 
  title = 'PatriotPads - Perfect Getaways',
  description = 'Find your perfect vacation rental with PatriotPads. Premium properties in California, Florida, and Oklahoma.',
  image,
  type = 'website'
}) => {
  useEffect(() => {
    // Check if window.location is available (build-time safety)
    if (typeof window === 'undefined') return;
    
    const url = window.location.href;
    const dynamicImage = image || `${window.location.origin}/logo.png`;

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

    // Essential meta tags
    updateMetaTag('description', description);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', dynamicImage);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', 'PatriotPads - Vacation Rentals');
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'PatriotPads');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', dynamicImage);
    updateMetaTag('twitter:image:alt', 'PatriotPads - Vacation Rentals');
    updateMetaTag('twitter:site', '@PatriotPads');
    
    // Additional meta tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'PatriotPads');

  }, [title, description, image, type]);

  return null;
};
