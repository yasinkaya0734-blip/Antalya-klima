param(
  [string]$Destination = (Join-Path $PSScriptRoot '..\backups')
)

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$archivePath = Join-Path $Destination "antalyaklimaservisi_$timestamp.zip"
$excluded = @('node_modules', '.next', '.git', '.vercel', 'backups', 'qa-output')

New-Item -ItemType Directory -Path $Destination -Force | Out-Null
$items = Get-ChildItem -LiteralPath $projectRoot -Force |
  Where-Object { $excluded -notcontains $_.Name -and $_.Name -notlike '.env*' -and $_.Name -notlike '*token.local*' }

Compress-Archive -LiteralPath $items.FullName -DestinationPath $archivePath -CompressionLevel Optimal -Force
$archive = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
  if ($archive.Entries.Count -eq 0) { throw "Backup archive is empty: $archivePath" }
}
finally {
  $archive.Dispose()
}
Write-Output "Backup created: $archivePath"
