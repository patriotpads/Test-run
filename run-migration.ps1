# Database migration script for adding slug column
$headers = @{
  "apikey" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3hkcGt2aHZtbnJib21qc2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg4NDA1NiwiZXhwIjoyMDY1NDYwMDU2fQ.wnvXVZxBtWirsiTGgkQRv63MowGphbIulfykqOmTiiw"
  "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRua3hkcGt2aHZtbnJib21qc2lqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTg4NDA1NiwiZXhwIjoyMDY1NDYwMDU2fQ.wnvXVZxBtWirsiTGgkQRv63MowGphbIulfykqOmTiiw"
  "Content-Type" = "application/json"
}

$sql = "ALTER TABLE properties ADD COLUMN slug TEXT; CREATE UNIQUE INDEX properties_slug_idx ON properties(slug) WHERE slug IS NOT NULL; COMMENT ON COLUMN properties.slug IS 'SEO-friendly URL slug generated from property title';"

$body = @{
  "sql" = $sql
} | ConvertTo-Json

Write-Host "Running database migration..."
try {
  $response = Invoke-WebRequest -Uri "https://tnkxdpkvhvmnrbomjsij.supabase.co/rest/v1/rpc/execute_sql" -Method POST -Headers $headers -Body $body
  Write-Host "Migration completed successfully!"
  Write-Host "Response: $($response.Content)"
} catch {
  Write-Host "Migration failed: $($_.Exception.Message)"
  Write-Host "Response: $($_.Exception.Response.GetResponseStream().StreamReader.ReadToEnd())"
}
