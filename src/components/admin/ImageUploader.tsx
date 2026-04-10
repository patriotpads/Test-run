import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAdminAuth();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      console.log('Starting image upload:', file.name);
      
      // Check if user is authenticated
      if (!isAuthenticated || !user) {
        console.error('Authentication error during upload: No admin user found.');
        toast({
          title: 'Authentication Required',
          description: 'You must be logged in to upload images.',
          variant: 'destructive',
        });
        throw new Error('You must be logged in to upload images');
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading to path:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', data.publicUrl);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    console.log('Files selected:', files.length);

    if (images.length + files.length > maxImages) {
      toast({
        title: 'Too many images',
        description: `You can only upload up to ${maxImages} images.`,
        variant: 'destructive',
      });
      return;
    }

    const uploadPromises = Array.from(files).map(uploadImage);
    const uploadedUrls = await Promise.all(uploadPromises);
    const validUrls = uploadedUrls.filter(url => url !== null) as string[];
    
    if (validUrls.length > 0) {
      onChange([...images, ...validUrls]);
      toast({
        title: 'Upload successful',
        description: `${validUrls.length} image(s) uploaded successfully.`,
      });
    }

    // Reset input
    event.target.value = '';
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];
    const newImages = images.filter((_, i) => i !== index);

    if (!imageToRemove) return;

    // Extract the file path from the Supabase public URL
    // Supabase public URL format: https://[project_id].supabase.co/storage/v1/object/public/[bucket_name]/[file_path]
    const pathSegments = imageToRemove.split('/');
    const bucketNameIndex = pathSegments.indexOf('public') + 1;
    const filePath = pathSegments.slice(bucketNameIndex).join('/');

    console.log('Attempting to delete image from Supabase:', filePath);

    try {
      const { error } = await supabase.storage.from('property-images').remove([filePath]);

      if (error) {
        console.error('Error deleting image from Supabase:', error.message);
        toast({
          title: 'Deletion failed',
          description: `Failed to delete image: ${error.message}`,
          variant: 'destructive',
        });
        // If deletion fails, we might still want to remove it from the UI
        // or inform the user about the discrepancy.
      } else {
        console.log('Image successfully deleted from Supabase:', filePath);
        toast({
          title: 'Image deleted',
          description: 'Image successfully removed from storage.',
        });
      }
    } catch (err) {
      console.error('Unexpected error during image deletion:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during image deletion.',
        variant: 'destructive',
      });
    }
    
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Property image ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading || !isAuthenticated}
            />
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vacation-blue"></div>
            ) : (
              <>
                <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Add Image</span>
              </>
            )}
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500">
        {images.length}/{maxImages} images uploaded
      </p>
    </div>
  );
}
