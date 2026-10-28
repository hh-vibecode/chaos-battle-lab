# Stop ONLY the test Edge started by cdp.ps1 (matched by its profile dir). Never touches other sessions' browsers.
param([string]$profileDir=(Join-Path $env:TEMP 'cbl-edge-profile'))
$leaf=Split-Path $profileDir -Leaf
$p=Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like "*$leaf*" }
$p | ForEach-Object { try{ Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop }catch{} }
"stopped $(@($p).Count) test Edge processes"
