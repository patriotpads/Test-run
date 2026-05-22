/**
 * Migration script to fix duplicate slugs in the properties table
 * This script will:
 * 1. Find all properties with duplicate slugs
 * 2. Regenerate unique slugs for duplicates using the new slug generation logic
 * 3. Update the database with the new slugs
 */

import { supabase } from '../src/integrations/supabase/client';

/**
 * Generate a slug from a title (same logic as slug.ts)
 */
function generateSlug(title: string): string {
  if (!title) return '';
  
  const words = title.trim().split(/\s+/).filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  let slug = words
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  if (slug.length === 0) {
    slug = words[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 10);
  }
  
  if (slug.length > 100) {
    slug = slug.substring(0, 100).replace(/-[^-]*$/, '');
  }
  
  return slug;
}

/**
 * Generate a random string for uniqueness
 */
function generateRandomString(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a unique slug avoiding existing slugs
 */
function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  
  if (existingSlugs.includes(slug)) {
    let attempts = 0;
    while (existingSlugs.includes(slug) && attempts < 100) {
      const randomSuffix = generateRandomString(6);
      slug = `${baseSlug}-${randomSuffix}`;
      attempts++;
    }
    
    if (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${Date.now()}`;
    }
  }
  
  return slug;
}

async function fixDuplicateSlugs() {
  console.log('Starting duplicate slug fix...');
  
  // Fetch all properties
  const { data: properties, error: fetchError } = await supabase
    .from('properties')
    .select('id, title, slug');
  
  if (fetchError) {
    console.error('Error fetching properties:', fetchError);
    process.exit(1);
  }
  
  console.log(`Found ${properties?.length || 0} properties`);
  
  if (!properties || properties.length === 0) {
    console.log('No properties found');
    return;
  }
  
  // Group properties by slug to find duplicates
  const slugGroups: Record<string, any[]> = {};
  properties.forEach(property => {
    const slug = property.slug || '';
    if (!slugGroups[slug]) {
      slugGroups[slug] = [];
    }
    slugGroups[slug].push(property);
  });
  
  // Find duplicate slugs
  const duplicateSlugs = Object.entries(slugGroups)
    .filter(([slug, props]) => props.length > 1)
    .map(([slug, props]) => ({ slug, properties: props }));
  
  console.log(`Found ${duplicateSlugs.length} duplicate slug groups`);
  
  if (duplicateSlugs.length === 0) {
    console.log('No duplicate slugs found. All good!');
    return;
  }
  
  // Fix each duplicate
  for (const { slug, properties: duplicateProps } of duplicateSlugs) {
    console.log(`\nFixing duplicate slug: "${slug}" (${duplicateProps.length} properties)`);
    
    // Keep the first property's slug as-is, regenerate for the rest
    const [keepProperty, ...propertiesToFix] = duplicateProps;
    
    console.log(`  Keeping: ${keepProperty.title} (ID: ${keepProperty.id}) with slug "${slug}"`);
    
    for (const property of propertiesToFix) {
      const baseSlug = generateSlug(property.title);
      const existingSlugs = Object.keys(slugGroups);
      const newSlug = generateUniqueSlug(baseSlug, existingSlugs);
      
      console.log(`  Updating: ${property.title} (ID: ${property.id}) from "${slug}" to "${newSlug}"`);
      
      const { error: updateError } = await supabase
        .from('properties')
        .update({ slug: newSlug })
        .eq('id', property.id);
      
      if (updateError) {
        console.error(`    ERROR: Failed to update property ${property.id}:`, updateError);
      } else {
        console.log(`    SUCCESS: Updated property ${property.id}`);
        
        // Update the slugGroups to reflect the change
        delete slugGroups[slug];
        slugGroups[newSlug] = [property];
      }
    }
  }
  
  console.log('\n✅ Duplicate slug fix complete!');
}

fixDuplicateSlugs().catch(console.error);
