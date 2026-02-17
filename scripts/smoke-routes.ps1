param(
  [string]$BaseUrl = "http://127.0.0.1:4322/multiserwis-uslugi"
)

$routes = @(
  "",
  "/faq",
  "/kontakt",
  "/wynajem",
  "/udt",
  "/budownictwo",
  "/elektryka",
  "/relokacja",
  "/spawanie",
  "/o-firmie",
  "/realizacje",
  "/polityka-prywatnosci",
  "/regulamin"
)

$failed = @()

foreach ($route in $routes) {
  $url = "$BaseUrl$route"
  try {
    $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 15
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
      Write-Output "OK  $url"
    }
    else {
      Write-Output "ERR $url -> HTTP $($response.StatusCode)"
      $failed += $url
    }
  }
  catch {
    Write-Output "ERR $url -> $($_.Exception.Message)"
    $failed += $url
  }
}

if ($failed.Count -gt 0) {
  Write-Error "Smoke test failed for $($failed.Count) route(s). Upewnij się, że działa preview: npm.cmd run preview -- --host 127.0.0.1 --port 4322"
  exit 1
}

Write-Output "Smoke test passed for $($routes.Count) routes."
exit 0
