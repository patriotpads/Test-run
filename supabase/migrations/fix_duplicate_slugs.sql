-- Migration to fix duplicate slugs in the properties table
-- This script identifies properties with duplicate slugs and regenerates unique slugs

-- First, let's identify which slugs are duplicated
WITH duplicate_slugs AS (
  SELECT 
    slug,
    COUNT(*) as count,
    ARRAY_AGG(id ORDER BY created_at) as property_ids,
    ARRAY_AGG(title ORDER BY created_at) as titles
  FROM properties
  WHERE slug IS NOT NULL AND slug != ''
  GROUP BY slug
  HAVING COUNT(*) > 1
)
SELECT 
  slug,
  count,
  property_ids,
  titles
FROM duplicate_slugs;

-- To fix duplicates manually, you would:
-- 1. For each duplicate slug group, keep the first property's slug
-- 2. For the remaining properties, regenerate their slugs using the new logic
-- 
-- Example SQL to update a specific property (replace IDs as needed):
-- UPDATE properties 
-- SET slug = 'desert-oasis-abc123' 
-- WHERE id = 'your-property-id-here';

-- Or use the TypeScript script: scripts/fix-duplicate-slugs.ts
-- Run it with: bun run scripts/fix-duplicate-slugs.ts
