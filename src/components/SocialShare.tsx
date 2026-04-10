import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  property?: {
    title: string;
    description: string;
    location: {
      city: string;
      state: string;
    };
  };
}

export const SocialShare: React.FC<SocialShareProps> = ({ property }) => {
  const [copied, setCopied] = useState(false);
  
  if (!property) return null;

  const url = window.location.href;
  const title = property.title;
  const description = property.description;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} - ${description}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className={`transition-all duration-300 ${copied ? 'bg-green-50 border-green-200 text-green-700' : ''}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Link Copied!
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
};
