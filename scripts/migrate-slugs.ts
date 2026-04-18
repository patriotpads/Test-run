/**
 * One-time migration script to generate slugs for existing properties
 * Run this script after adding the slug column to populate existing data
 */

import { createClient } from '@supabase/supabase-js';
import { generateSlug, generateUniqueSlug } from '../src/utils/slug';

// Initialize Supabase client with provided credentials
const supabaseUrl = 'https://tnkxdpkvhvmnrbomjsij.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3hkcGt2aHZtbnJib21qc2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg4NDA1NiwiZXhwIjoyMDY1NDYwMDU2fQ.wnvXVZxBtWirsiTGgkQRv63MowGphbIulfykqOmTiiw';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateSlugs() {
  console.log('Starting slug migration...');
  
  try {
    // Fetch all properties without slugs
    const { data: properties, error } = await supabase
      .from('properties')
      .select('id, title')
      .is('slug', null);
    
    if (error) {
      console.error('Error fetching properties:', error);
      return;
    }
    
    if (!properties || properties.length === 0) {
      console.log('No properties found without slugs. Migration complete!');
      return;
    }
    
    console.log(`Found ${properties.length} properties to migrate`);
    
    // Get all existing slugs to avoid conflicts
    const { data: existingSlugs } = await supabase
      .from('properties')
      .select('slug')
      .not('slug', 'is', null);
    
    const slugList = existingSlugs?.map(p => p.slug).filter(Boolean) || [];
    
    // Generate and update slugs for each property
    for (const property of properties) {
      const baseSlug = generateSlug(property.title);
      const uniqueSlug = generateUniqueSlug(baseSlug, slugList, property.id);
      
      // Update the property with the new slug
      const { error: updateError } = await supabase
        .from('properties')
        .update({ slug: uniqueSlug })
        .eq('id', property.id);
      
      if (updateError) {
        console.error(`Error updating property ${property.id}:`, updateError);
      } else {
        console.log(`Generated slug "${uniqueSlug}" for property "${property.title}" (ID: ${property.id})`);
        slugList.push(uniqueSlug); // Add to list to avoid conflicts in subsequent iterations
      }
    }
    
    console.log('Slug migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migrateSlugs();
