// Direct database migration using Supabase client
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tnkxdpkvhvmnrbomjsij.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3hkcGt2aHZtbnJib21qc2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg4NDA1NiwiZXhwIjoyMDY1NDYwMDU2fQ.wnvXVZxBtWirsiTGgkQRv63MowGphbIulfykqOmTiiw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running database migration...');
  
  try {
    // Try to execute SQL directly
    const { data, error } = await supabase
      .rpc('exec', { sql: 'ALTER TABLE properties ADD COLUMN slug TEXT; CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL;' });
    
    if (error) {
      console.log('RPC method failed, trying direct SQL...');
      
      // Alternative: Try using the raw SQL endpoint
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          query: 'ALTER TABLE properties ADD COLUMN slug TEXT;'
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Migration completed successfully!');
    } else {
      console.log('Migration completed successfully!');
      console.log('Response:', data);
    }
  } catch (error) {
    console.error('Migration failed:', error.message);
    console.log('\nNote: You may need to run the SQL manually in the Supabase dashboard:');
    console.log('ALTER TABLE properties ADD COLUMN slug TEXT;');
    console.log('CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL;');
  }
}

runMigration();
