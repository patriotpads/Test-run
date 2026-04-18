# SEO-Friendly Slugs Implementation Guide

This guide walks you through implementing SEO-friendly slugs for your property URLs, replacing UUIDs with readable URLs like `/property/modern-cabin` instead of `/property/94d5...`.

## Overview

The implementation includes:
- Database schema changes (slug column)
- Automatic slug generation for new properties
- Migration script for existing properties
- Frontend routing updates
- UUID-to-slug redirection for backward compatibility

## Implementation Steps

### 1. Database Migration

Run the SQL migration to add the slug column:

```sql
-- Run this in your Supabase SQL editor
ALTER TABLE properties ADD COLUMN slug TEXT;

CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL;

COMMENT ON COLUMN properties.slug IS 'SEO-friendly URL slug generated from property title';
```

### 2. Migrate Existing Data

Run the migration script to populate slugs for existing properties:

```bash
# Set environment variables
export VITE_SUPABASE_URL="your-supabase-url"
export VITE_SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run the migration script
npx tsx scripts/migrate-slugs.ts
```

**Note**: You need a service role key for admin operations. Get this from your Supabase dashboard.

### 3. Frontend Updates

The frontend code has been updated to:
- Use slugs in URLs instead of UUIDs
- Generate slugs automatically for new properties
- Redirect old UUID links to new slug URLs

### 4. URL Examples

**Before:**
- `/property/94d5b7d0-1234-5678-9abc-def123456789`

**After:**
- `/property/luxury-beach`
- `/property/mountain-cabin`
- `/property/lakefront-cottage`

## Files Modified

### New Files Created:
- `src/utils/slug.ts` - Slug generation utilities
- `scripts/migrate-slugs.ts` - Migration script for existing data
- `supabase/migrations/add_slug_column.sql` - Database migration

### Files Updated:
- `src/App.tsx` - Updated routing from `/property/:id` to `/property/:slug`
- `src/pages/PropertyDetails.tsx` - Updated to use slug parameter and handle UUID redirection
- `src/hooks/useProperty.ts` - Updated to fetch by slug with UUID fallback
- `src/components/admin/PropertyForm.tsx` - Added automatic slug generation for new properties

## Slug Generation Logic

The slug generation follows these rules:
1. Takes the first two words of the property title
2. Converts to lowercase and replaces spaces with hyphens
3. Removes special characters
4. Ensures uniqueness by appending numbers if needed
5. Falls back to first word only if needed

**Examples:**
- "Luxury Beach House" -> `luxury-beach`
- "Mountain Cabin Retreat" -> `mountain-cabin`
- "Modern Downtown Loft" -> `modern-downtown`

## Backward Compatibility

The system maintains backward compatibility:
- Old UUID links automatically redirect to new slug URLs
- No broken links for existing bookmarks or shared URLs
- Graceful fallback for properties without slugs

## Testing the Implementation

1. **Test New Properties**: Create a new property and verify the slug is generated
2. **Test Migration**: Run the migration script and check existing properties have slugs
3. **Test URLs**: Access properties using both old UUID and new slug URLs
4. **Test Redirection**: Verify old UUID links redirect to new slug URLs

## Troubleshooting

### TypeScript Errors
After running the database migration, you may see TypeScript errors about the `slug` column not existing. These will resolve once the migration is applied to your database.

### Migration Script Issues
- Ensure you have the correct Supabase URL and service role key
- The script requires admin permissions to modify the database
- Check the console output for any errors during migration

### Slug Conflicts
The system automatically handles slug conflicts by appending numbers:
- First property: `modern-cabin`
- Second property: `modern-cabin-1`
- Third property: `modern-cabin-2`

## Next Steps

1. Apply the database migration
2. Run the migration script
3. Test the implementation thoroughly
4. Deploy to production
5. Monitor for any issues with URL handling

## Benefits

- **SEO Friendly**: Search engines can better understand your URLs
- **User Friendly**: Users can read and understand URLs
- **Shareable**: URLs are more memorable and shareable
- **Backward Compatible**: No broken links during transition
