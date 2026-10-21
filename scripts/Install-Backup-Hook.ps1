$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$git = 'C:/Program Files/Git/cmd/git.exe'

& $git -C $projectRoot config core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) { throw 'Could not enable the project backup hook.' }
Write-Output 'Automatic backup before Git pushes is enabled for this checkout.'
