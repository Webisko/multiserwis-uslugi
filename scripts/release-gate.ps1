param(
  [string]$HostName = "127.0.0.1",
  [int]$Port = 4322,
  [string]$BasePath = "/multiserwis-uslugi"
)

$root = Get-Location
$baseUrl = "http://$HostName`:$Port$BasePath"
$previewProcess = $null

function Wait-ForPreview {
  param(
    [string]$Url,
    [int]$TimeoutSeconds = 30
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -TimeoutSec 3
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
        return $true
      }
    }
    catch {
      Start-Sleep -Milliseconds 500
    }
  }

  return $false
}

try {
  Write-Output "[1/3] verify (check + build)"
  & npm.cmd run verify
  if ($LASTEXITCODE -ne 0) {
    throw "verify failed"
  }

  Write-Output "[2/3] preview (temporary)"
  $previewProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run","preview","--","--host",$HostName,"--port",$Port -PassThru -WindowStyle Hidden

  if (-not (Wait-ForPreview -Url $baseUrl -TimeoutSeconds 30)) {
    throw "preview did not become ready at $baseUrl"
  }

  Write-Output "[3/3] smoke routes"
  & powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/smoke-routes.ps1" -BaseUrl $baseUrl
  if ($LASTEXITCODE -ne 0) {
    throw "smoke routes failed"
  }

  Write-Output "Release gate passed."
  exit 0
}
catch {
  Write-Error "Release gate failed: $($_.Exception.Message)"
  exit 1
}
finally {
  if ($previewProcess -and -not $previewProcess.HasExited) {
    Stop-Process -Id $previewProcess.Id -Force
    Write-Output "Stopped preview process PID=$($previewProcess.Id)"
  }
}
