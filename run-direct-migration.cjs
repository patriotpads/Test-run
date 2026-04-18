// Direct database migration using Supabase client
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tnkxdpkvhvmnrbomjsij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3hkcGt2aHZtbnJib21qc2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg4NDA1NiwiZXhwIjoyMDY1NDYwMDU2fQ.wnvXVZxBtWirsiTGgkQRv63MowGphbIulfykqOmTiiw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running database migration...');
  
  try {
    // First, let's test the connection by checking if the table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('properties')
      .select('count')
      .limit(1);
    
    if (tableError) {
      console.log('Table check failed:', tableError.message);
      return;
    }
    
    console.log('Connected to database successfully');
    
    // Try to add the column using a simple approach
    console.log('Attempting to add slug column...');
    
    // Since we can't easily run raw SQL via REST API, let's provide manual instructions
    console.log('\n=== MANUAL MIGRATION REQUIRED ===');
    console.log('Please run the following SQL in your Supabase dashboard SQL Editor:');
    console.log('https://supabase.com/dashboard/project/tnkxdpkvhvmnrbomjsij/sql');
    console.log('\nSQL to run:');
    console.log('ALTER TABLE properties ADD COLUMN slug TEXT;');
    console.log('CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL;');
    console.log('COMMENT ON COLUMN properties.slug IS \'SEO-friendly URL slug generated from property title\';');
    
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

runMigration();
