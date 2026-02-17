$root = Get-Location
$dist = Join-Path $root 'dist'
$outputPath = Join-Path $root 'PERFORMANCE_BASELINE.md'

if (-not (Test-Path $dist)) {
  Write-Error "Brak folderu dist. Najpierw uruchom: npm.cmd run build"
  exit 1
}

$rows = @()
Get-ChildItem -Path $dist -Recurse -Filter index.html | ForEach-Object {
  $htmlPath = $_.FullName
  $relPage = $htmlPath.Substring($dist.Length).Replace('\', '/')
  if ($relPage -eq '/index.html') {
    $route = '/'
  }
  else {
    $route = '/' + ($relPage -replace '/index.html$', '').TrimStart('/')
  }

  $content = Get-Content -Path $htmlPath -Raw
  $matches = [regex]::Matches($content, '/_astro/[^"'']+\.js')
  $jsFiles = @()
  foreach ($m in $matches) { $jsFiles += $m.Value }
  $jsFiles = $jsFiles | Sort-Object -Unique

  $totalBytes = 0
  foreach ($js in $jsFiles) {
    $local = Join-Path $dist ($js.TrimStart('/').Replace('/', '\\'))
    if (Test-Path $local) {
      $totalBytes += (Get-Item $local).Length
    }
  }

  $rows += [PSCustomObject]@{
    route = $route
    jsCount = $jsFiles.Count
    totalKB = [math]::Round($totalBytes / 1kb, 2)
  }
}

$chunks = Get-ChildItem -Path (Join-Path $dist '_astro') -Filter *.js |
  Sort-Object Length -Descending |
  Select-Object -First 8 |
  ForEach-Object {
    [PSCustomObject]@{
      chunk = $_.Name
      sizeKB = [math]::Round($_.Length / 1kb, 2)
    }
  }

$date = Get-Date -Format 'yyyy-MM-dd'

$md = @()
$md += '# Performance Baseline (Agent Mode)'
$md += ''
$md += "Data pomiaru: $date"
$md += 'Srodowisko: build produkcyjny Astro (`npm.cmd run build`)'
$md += ''
$md += '## JS payload per route (dist)'
$md += ''
$md += '| Route | JS files | Total JS (KB) |'
$md += '|---|---:|---:|'
foreach ($row in ($rows | Sort-Object route)) {
  $totalKbInvariant = $row.totalKB.ToString('0.00', [System.Globalization.CultureInfo]::InvariantCulture)
  $md += ('| `{0}` | {1} | {2} |' -f $row.route, $row.jsCount, $totalKbInvariant)
}
$md += ''
$md += '## Najwieksze chunki JS'
$md += ''
$md += '| Chunk | Size (KB) |'
$md += '|---|---:|'
foreach ($chunk in $chunks) {
  $sizeKbInvariant = $chunk.sizeKB.ToString('0.00', [System.Globalization.CultureInfo]::InvariantCulture)
  $md += ('| `{0}` | {1} |' -f $chunk.chunk, $sizeKbInvariant)
}
$md += ''
$md += '## Notatka'
$md += ''
$md += 'Plik wygenerowany automatycznie przez `scripts/perf-baseline.ps1`.'

Set-Content -Path $outputPath -Value ($md -join [Environment]::NewLine) -Encoding UTF8
Write-Output "Wygenerowano $outputPath"
exit 0
