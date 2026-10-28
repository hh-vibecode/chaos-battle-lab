# Windows launcher for the cross-platform Node tools (this machine has no node; VS Code ships one).
# Usage:  powershell -NoProfile -File tools/node.ps1 <script.js | --check file.js> [args...]
# On macOS just run:  node <script.js> [args...]
# Waits ONLY for the node process (a browser it launches detached keeps running).
$real=Get-Command node -ErrorAction SilentlyContinue
$exe=$null
if($real){ $exe=$real.Source } else {
  $cands=@("D:\Microsoft VS Code\Code.exe","$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe","C:\Program Files\Microsoft VS Code\Code.exe")
  $exe=$cands | Where-Object { Test-Path $_ } | Select-Object -First 1
  if(-not $exe){ Write-Error 'No node.exe and no VS Code Code.exe found'; exit 9 } }
$q=($args | ForEach-Object { if($_ -match '[\s"]'){ '"' + ($_ -replace '"','\"') + '"' } else { $_ } }) -join ' '
$si=New-Object System.Diagnostics.ProcessStartInfo $exe,$q
$si.UseShellExecute=$false; $si.RedirectStandardOutput=$true; $si.RedirectStandardError=$true; $si.CreateNoWindow=$true
$si.StandardOutputEncoding=[Text.Encoding]::UTF8; $si.StandardErrorEncoding=[Text.Encoding]::UTF8
if(-not $real){ $si.EnvironmentVariables['ELECTRON_RUN_AS_NODE']='1' }
$p=[Diagnostics.Process]::Start($si)
$to=$p.StandardOutput.ReadToEndAsync(); $te=$p.StandardError.ReadToEndAsync()
$p.WaitForExit()
[void]$to.Wait(3000); [void]$te.Wait(3000)
if($to.IsCompleted){ $to.Result.TrimEnd() }
if($te.IsCompleted -and $te.Result.Trim()){ [Console]::Error.WriteLine($te.Result.TrimEnd()) }
exit $p.ExitCode
