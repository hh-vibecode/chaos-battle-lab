# Drive a headless Edge page through the DevTools protocol (no node/playwright needed).
# Usage:  powershell -File tools/win/cdp.ps1 -steps steps.txt -outDir <dir> [-port 9455] [-launch]
# Steps file, one command per line ('#' = comment). Every JS command must be ONE line:
#   eval <js>              evaluate (promises awaited), print result
#   evalsave <name> <js>   js must return a 'data:image/png;base64,...' string -> saved as <outDir>\<name>.png
#   shot <name>            screenshot of the page -> <outDir>\<name>.png
#   wait <seconds>         sleep
#   reload                 reload bypassing HTTP cache + service worker, wait until the game finished booting
# Dialogs (alert/confirm) are auto-accepted and printed.
# WARNING: port 9333 is often taken by ANOTHER session's Edge. -launch refuses a busy port; never drive a browser you did not start.
param([string]$steps,[string]$outDir,[int]$port=9455,[switch]$launch,[string]$url='http://127.0.0.1:8765/',[string]$profileDir=(Join-Path $env:TEMP 'cbl-edge-profile'))
$ErrorActionPreference='Stop'
New-Item -ItemType Directory -Force $outDir | Out-Null
if($launch){
  $busy=$true; try{ Invoke-RestMethod "http://127.0.0.1:$port/json/version" -TimeoutSec 2 | Out-Null }catch{ $busy=$false }
  if($busy){ throw "port $port already in use by another browser - pick another port" }
  New-Item -ItemType Directory -Force $profileDir | Out-Null
  Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless=new","--remote-debugging-port=$port","--user-data-dir=$profileDir","--window-size=1280,1000","--autoplay-policy=no-user-gesture-required","--no-first-run","--mute-audio","--disable-background-timer-throttling","--disable-renderer-backgrounding","--disable-backgrounding-occluded-windows",$url | Out-Null
  Start-Sleep -Seconds 4
}
$tabs=Invoke-RestMethod "http://127.0.0.1:$port/json"
$tab=$tabs | Where-Object { $_.type -eq 'page' -and $_.url -like "$url*" } | Select-Object -First 1
if(-not $tab){ throw "no page with url $url on port $port" }
$ws=New-Object System.Net.WebSockets.ClientWebSocket
$ws.Options.KeepAliveInterval=[TimeSpan]::FromSeconds(30)
$ws.ConnectAsync([Uri]$tab.webSocketDebuggerUrl,[Threading.CancellationToken]::None).Wait()
$script:id=0
function Recv(){ $buf=New-Object byte[] 1048576; $ms=New-Object IO.MemoryStream
  do{ $seg=New-Object ArraySegment[byte] (,$buf); $r=$ws.ReceiveAsync($seg,[Threading.CancellationToken]::None).Result; $ms.Write($buf,0,$r.Count) } while(-not $r.EndOfMessage)
  [Text.Encoding]::UTF8.GetString($ms.ToArray()) }
function Send($method,$params){ $script:id++; $msg=@{id=$script:id;method=$method;params=$params} | ConvertTo-Json -Depth 10 -Compress
  $b=[Text.Encoding]::UTF8.GetBytes($msg); $ws.SendAsync((New-Object ArraySegment[byte] (,$b)),'Text',$true,[Threading.CancellationToken]::None).Wait(); return $script:id }
function Cdp($method,$params){ $my=Send $method $params
  while($true){ $t=Recv
    if($t -like '*"method":"Page.javascriptDialogOpening"*'){ $d=$t | ConvertFrom-Json; Write-Host "DIALOG[$($d.params.type)]: $($d.params.message)"; [void](Send 'Page.handleJavaScriptDialog' @{accept=$true}); continue }
    if($t -match ('"id":'+$my+'[,}]')){ return ($t | ConvertFrom-Json) } } }
function Ev($js){ $r=Cdp 'Runtime.evaluate' @{expression=$js;awaitPromise=$true;returnByValue=$true;timeout=120000}
  if($r.result.exceptionDetails){ $x=($r.result.exceptionDetails | ConvertTo-Json -Depth 5 -Compress); "EXC: " + $x.Substring(0,[Math]::Min(600,$x.Length)) } else { $r.result.result.value } }
[void](Cdp 'Page.enable' @{})
foreach($line in Get-Content $steps){
  if(-not $line.Trim() -or $line.StartsWith('#')){ continue }
  $cmd,$rest=$line.Split(' ',2)
  switch($cmd){
    'eval' { "> " + $rest.Substring(0,[Math]::Min(80,$rest.Length)); Ev $rest }
    'evalsave' { $nm,$js=$rest.Split(' ',2); $v=Ev $js; if($v -like 'data:image/png;base64,*'){ [IO.File]::WriteAllBytes((Join-Path $outDir "$nm.png"),[Convert]::FromBase64String($v.Substring(22))); "saved $nm" } else { "evalsave fail: $v" } }
    'reload' { [void](Cdp 'Network.enable' @{}); [void](Cdp 'Network.setBypassServiceWorker' @{bypass=$true}); [void](Cdp 'Network.setCacheDisabled' @{cacheDisabled=$true}); [void](Cdp 'Page.reload' @{ignoreCache=$true})
      for($k=0;$k -lt 150;$k++){ Start-Sleep 2; $v=Ev "(typeof roster!=='undefined' && typeof goToBattle==='function' && !document.getElementById('bootScreen')) ? 'ready' : 'wait'"; if($v -eq 'ready'){ break } }; "reloaded $v" }
    'wait' { Start-Sleep -Milliseconds ([int]([double]$rest*1000)) }
    'shot' { $r=Cdp 'Page.captureScreenshot' @{format='png'}; [IO.File]::WriteAllBytes((Join-Path $outDir "$rest.png"),[Convert]::FromBase64String($r.result.data)); "shot $rest" }
    default { "unknown command: $cmd" }
  }
}
$ws.Dispose()
