# Deploy Production (Frontend + Backend) to SEOHost (multiserwis.tech & panel.multiserwis.tech)
[CmdletBinding()]
param(
  [string]$KeyPath = "$HOME\.ssh\id_rsa_seohost",
  [string]$ServerHost = "h108.seohost.pl",
  [int]$ServerPort = 57185,
  [string]$ServerUser = "srv127364",
  [string]$FrontendRemoteDir = "/home/srv127364/domains/multiserwis.tech/public_html",
  [string]$BackendDomainDir = "/home/srv127364/domains/panel.multiserwis.tech"
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot

if ($env:SEOHOST_SSH_KEY -and (Test-Path $env:SEOHOST_SSH_KEY)) {
  $KeyPath = $env:SEOHOST_SSH_KEY
} elseif (-not (Test-Path $KeyPath)) {
  $altKey = "D:\Projekty\_MOJE\.ssh\id_rsa_seohost"
  if (Test-Path $altKey) {
    $KeyPath = $altKey
  } else {
    Write-Error "Nie znaleziono klucza SSH w $KeyPath"
    exit 1
  }
}

Push-Location $projectRoot
try {
  Write-Host "==> [1/6] Eksport aktualnych snapshotow z lokalnego backendu..." -ForegroundColor Cyan
  & node scripts/run-backend-php.mjs artisan preview:export-snapshots

  Write-Host "==> [2/6] Pakowanie backendu Laravel..." -ForegroundColor Cyan
  $backendDir = Join-Path $projectRoot 'backend'
  $backendArchive = Join-Path $projectRoot 'backend_production.tar.gz'
  if (Test-Path $backendArchive) {
    Remove-Item -Force $backendArchive
  }

  & tar -czf $backendArchive `
    --exclude=".env" `
    --exclude="vendor" `
    --exclude="node_modules" `
    --exclude=".phpunit.result.cache" `
    --exclude="storage/logs/*.log" `
    --exclude="storage/framework/cache/data/*" `
    --exclude="storage/framework/sessions/*" `
    --exclude="storage/framework/views/*" `
    -C $backendDir .
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad pakowania archiwum backendu."
    exit 1
  }

  Write-Host "==> [3/6] Wysylanie i instalacja backendu na panel.multiserwis.tech..." -ForegroundColor Cyan
  & scp -P $ServerPort -i $KeyPath -o StrictHostKeyChecking=accept-new $backendArchive "${ServerUser}@${ServerHost}:${BackendDomainDir}/backend_production.tar.gz"
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad przesylania archiwum backendu przez SCP."
    exit 1
  }

  $remoteBackendScript = @"
set -e
mkdir -p '${BackendDomainDir}/backend'
mkdir -p '${BackendDomainDir}/backups'

if [ -f '${BackendDomainDir}/backend/database/database.sqlite' ]; then
  cp -f '${BackendDomainDir}/backend/database/database.sqlite' "${BackendDomainDir}/backups/database.sqlite.bak.`$(date +%Y%m%d_%H%M%S)"
  cp -f '${BackendDomainDir}/backend/database/database.sqlite' '${BackendDomainDir}/database.sqlite.keep'
fi

cd '${BackendDomainDir}/backend'
tar -xzf '${BackendDomainDir}/backend_production.tar.gz'
rm -f '${BackendDomainDir}/backend_production.tar.gz'

if [ -f '${BackendDomainDir}/database.sqlite.keep' ]; then
  mv -f '${BackendDomainDir}/database.sqlite.keep' '${BackendDomainDir}/backend/database/database.sqlite'
fi

mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache database

composer install --no-dev --optimize-autoloader --no-interaction

rm -rf '${BackendDomainDir}/public_html/css' '${BackendDomainDir}/public_html/js' '${BackendDomainDir}/public_html/fonts'
cp -r public/css '${BackendDomainDir}/public_html/css' 2>/dev/null || true
cp -r public/js '${BackendDomainDir}/public_html/js' 2>/dev/null || true
cp -r public/fonts '${BackendDomainDir}/public_html/fonts' 2>/dev/null || true
ln -sfn ../backend/storage/app/public '${BackendDomainDir}/public_html/storage'

if [ -f .env ]; then
  php artisan migrate --force
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
fi
"@
  $remoteBackendScript = $remoteBackendScript -replace "`r`n", "`n"
  $remoteB64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($remoteBackendScript))
  & ssh -p $ServerPort -i $KeyPath -o StrictHostKeyChecking=accept-new "${ServerUser}@${ServerHost}" "echo '$remoteB64' | base64 -d | bash"
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad zdalnej instalacji backendu na serwerze."
    exit 1
  }

  Write-Host "==> [4/6] Budowanie produkcyjnego frontendu Astro (multiserwis.tech)..." -ForegroundColor Cyan
  & node scripts/run-astro-build.mjs production
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad budowania frontendu Astro."
    exit 1
  }

  $distDir = Join-Path $projectRoot 'dist'
  $frontendArchive = Join-Path $projectRoot 'dist_production.tar.gz'
  if (Test-Path $frontendArchive) {
    Remove-Item -Force $frontendArchive
  }

  Write-Host "==> [5/6] Pakowanie i wysylanie frontendu na multiserwis.tech..." -ForegroundColor Cyan
  & tar -czf $frontendArchive -C $distDir .
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad pakowania archiwum frontendu."
    exit 1
  }

  & scp -P $ServerPort -i $KeyPath -o StrictHostKeyChecking=accept-new $frontendArchive "${ServerUser}@${ServerHost}:${FrontendRemoteDir}/dist_production.tar.gz"
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad przesylania archiwum frontendu przez SCP."
    exit 1
  }

  Write-Host "==> [6/6] Rozpakowywanie frontendu na serwerze..." -ForegroundColor Cyan
  $remoteFrontendScript = "cd '$FrontendRemoteDir' && tar -xzf dist_production.tar.gz && rm -f dist_production.tar.gz"
  & ssh -p $ServerPort -i $KeyPath -o StrictHostKeyChecking=accept-new "${ServerUser}@${ServerHost}" $remoteFrontendScript
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Blad zdalnego rozpakowywania frontendu."
    exit 1
  }

  Write-Host "Wdrozenie produkcyjne zakonczone sukcesem!" -ForegroundColor Green
  Write-Host "Frontend: https://multiserwis.tech" -ForegroundColor Yellow
  Write-Host "Panel CMS: https://panel.multiserwis.tech/admin" -ForegroundColor Yellow
} finally {
  foreach ($tmp in @('backend_production.tar.gz', 'dist_production.tar.gz')) {
    $p = Join-Path $projectRoot $tmp
    if (Test-Path $p) {
      Remove-Item -Force $p
    }
  }
  Pop-Location
}
