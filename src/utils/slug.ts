/**
 * Utility functions for generating and handling slugs
 */

/**
 * Convert a string to a URL-friendly slug
 * Takes first two words, converts to lowercase, replaces spaces with hyphens
 * Removes special characters and ensures uniqueness
 */
export function generateSlug(title: string): string {
  if (!title) return '';
  
  // Take first two words of the title
  const words = title.trim().split(/\s+/).filter(word => word.length > 0);
  const firstTwoWords = words.slice(0, 2);
  
  if (firstTwoWords.length === 0) return '';
  
  // Convert to lowercase and replace spaces with hyphens
  let slug = firstTwoWords
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  // Ensure slug is not empty after cleaning
  if (slug.length === 0) {
    // Fallback: use first word only
    slug = words[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 10);
  }
  
  return slug;
}

/**
 * Generate a short random string for slug uniqueness
 */
function generateRandomString(length: number = 4): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a unique slug by appending random string or property ID if needed
 * This would be used when checking against existing slugs in the database
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[], propertyId?: string | number): string {
  let slug = baseSlug;
  
  if (existingSlugs.includes(slug)) {
    // Prefer using property ID if available, otherwise use random string
    if (propertyId !== undefined && propertyId !== null) {
      slug = `${baseSlug}-${propertyId}`;
    } else {
      slug = `${baseSlug}-${generateRandomString(4)}`;
    }
    
    // If still conflicts (very unlikely), try random string
    if (existingSlugs.includes(slug)) {
      let attempts = 0;
      while (existingSlugs.includes(slug) && attempts < 10) {
        slug = `${baseSlug}-${generateRandomString(6)}`;
        attempts++;
      }
    }
  }
  
  return slug;
}

/**
 * Validate if a string is a valid slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0;
}

/**
 * Convert a slug back to a readable format (for display purposes)
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
