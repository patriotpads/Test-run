-- Run this in Supabase SQL Editor to regenerate all property slugs
-- This will fix duplicate slugs and ensure all properties have unique slugs

-- First, let's see the current state
SELECT 
  id,
  title,
  slug,
  created_at
FROM properties
ORDER BY created_at DESC
LIMIT 20;

-- Update all properties to have unique slugs based on their titles
-- This uses a subquery to generate slugs and handle collisions

WITH numbered_properties AS (
  SELECT 
    id,
    title,
    slug,
    ROW_NUMBER() OVER (PARTITION BY 
      LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'))
    ORDER BY created_at) as row_num
  FROM properties
  WHERE title IS NOT NULL
),
updated_slugs AS (
  SELECT 
    id,
    title,
    CASE 
      WHEN row_num = 1 THEN
        -- First occurrence: use the slug as-is (or generate from title if null)
        COALESCE(
          slug,
          LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
        )
      ELSE
        -- Subsequent occurrences: append random suffix
        LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g')) || 
        '-' || 
        substr(md5(random()::text), 1, 6)
    END as new_slug
  FROM numbered_properties
)
UPDATE properties p
SET slug = u.new_slug
FROM updated_slugs u
WHERE p.id = u.id;

-- Verify the changes
SELECT 
  id,
  title,
  slug,
  created_at
FROM properties
ORDER BY created_at DESC
LIMIT 20;

-- Check for any remaining duplicates
SELECT 
  slug,
  COUNT(*) as count,
  ARRAY_AGG(title ORDER BY created_at) as titles
FROM properties
WHERE slug IS NOT NULL
GROUP BY slug
HAVING COUNT(*) > 1;
