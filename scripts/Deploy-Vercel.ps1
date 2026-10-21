param(
  [string]$TokenPath = 'C:/Users/HP/.codex/vercel-token.local.txt'
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$linkPath = Join-Path $projectRoot '.vercel/project.json'
$cli = 'C:/Users/HP/AppData/Roaming/npm/vercel.cmd'
$backupScript = Join-Path $PSScriptRoot 'Create-ProjectBackup.ps1'

if (-not (Test-Path -LiteralPath $linkPath)) { throw 'This checkout is not linked to a Vercel project.' }
if (-not (Test-Path -LiteralPath $TokenPath)) { throw 'The shared Vercel token file is missing.' }
$token = (Get-Content -LiteralPath $TokenPath -Raw).Trim()
if (-not $token -or $token -eq 'Token Buraya Gelecek') { throw 'Vercel authentication is not configured.' }
$project = Get-Content -LiteralPath $linkPath -Raw | ConvertFrom-Json

& powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File $backupScript
if ($LASTEXITCODE -ne 0) { throw 'Backup failed; production deployment stopped.' }

$hadPreviousToken = Test-Path Env:VERCEL_TOKEN
$previousToken = $env:VERCEL_TOKEN
$env:VERCEL_TOKEN = $token
try {
  & $cli --scope $project.orgId deploy --prod --yes $projectRoot
  if ($LASTEXITCODE -ne 0) { throw 'Vercel production deployment failed.' }

  $indexNowScript = Join-Path $PSScriptRoot 'notify-indexnow.mjs'
  & 'C:/Program Files/nodejs/node.exe' $indexNowScript
  if ($LASTEXITCODE -ne 0) { Write-Warning 'Deployment is ready, but IndexNow notification did not complete.' }
}
finally {
  if ($hadPreviousToken) { $env:VERCEL_TOKEN = $previousToken }
  else { Remove-Item Env:VERCEL_TOKEN -ErrorAction SilentlyContinue }
  Remove-Variable token -ErrorAction SilentlyContinue
}
