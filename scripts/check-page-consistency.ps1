$pagesDir = Join-Path (Get-Location) 'src/pages'
$requiredPatterns = @(
  '<Navbar client:load />',
  '<Footer />'
)

$exclude = @(
  'index.astro'
)

$files = Get-ChildItem -Path $pagesDir -Filter *.astro
$failed = @()

foreach ($file in $files) {
  if ($exclude -contains $file.Name) {
    continue
  }

  $content = Get-Content -Path $file.FullName -Raw
  $missing = @()

  foreach ($pattern in $requiredPatterns) {
    if ($content -notmatch [regex]::Escape($pattern)) {
      $missing += $pattern
    }
  }

  if ($missing.Count -gt 0) {
    $failed += [PSCustomObject]@{
      file = $file.Name
      missing = ($missing -join ', ')
    }
  }
}

if ($failed.Count -gt 0) {
  Write-Output 'Niespójność stron wykryta:'
  foreach ($item in $failed) {
    Write-Output "- $($item.file): brak $($item.missing)"
  }
  exit 1
}

Write-Output 'UI page consistency check passed.'
exit 0
