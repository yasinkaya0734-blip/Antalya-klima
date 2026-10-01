param(
  [string]$Destination = (Join-Path $PSScriptRoot '..\backups')
)

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$archivePath = Join-Path $Destination "antalyaklimaservisi_$timestamp.zip"
$excluded = @('node_modules', '.next', '.git', '.vercel', 'backups')

New-Item -ItemType Directory -Path $Destination -Force | Out-Null
$items = Get-ChildItem -LiteralPath $projectRoot -Force |
  Where-Object { $excluded -notcontains $_.Name }

Compress-Archive -LiteralPath $items.FullName -DestinationPath $archivePath -CompressionLevel Optimal -Force
Write-Output "Backup created: $archivePath"
