# JS syntax check with the Node bundled in VS Code (machine has no node). Exit 0 = OK.
param([string[]]$files=@((Join-Path $PSScriptRoot '..\..\js\game.js')))
$env:ELECTRON_RUN_AS_NODE='1'; $bad=0
foreach($f in $files){ $err=Join-Path $env:TEMP 'cbl-syntax-err.txt'
  $p=Start-Process -FilePath "D:\Microsoft VS Code\Code.exe" -ArgumentList '--check',('"'+(Resolve-Path $f).Path+'"') -NoNewWindow -Wait -PassThru -RedirectStandardError $err
  if($p.ExitCode -ne 0){ $bad++; "FAIL $f"; Get-Content $err | Select-Object -First 8 } else { "OK   $f" } }
exit $bad
