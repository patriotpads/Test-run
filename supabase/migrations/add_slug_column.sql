-- Add slug column to properties table
ALTER TABLE properties ADD COLUMN slug TEXT;

-- Create unique index on slug to ensure uniqueness
CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL;

-- Add comment to describe the slug column
COMMENT ON COLUMN properties.slug IS 'SEO-friendly URL slug generated from property title';
