# Static file server for local testing (Windows PowerShell 5.1, no node/python needed).
# Usage (run in background):  powershell -File tools/win/serve.ps1 [-port 8765]
param([string]$root=(Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path,[int]$port=8765)
$mime=@{'.html'='text/html';'.js'='text/javascript';'.css'='text/css';'.json'='application/json';'.webp'='image/webp';'.png'='image/png';'.jpg'='image/jpeg';'.gif'='image/gif';'.mp3'='audio/mpeg';'.wav'='audio/wav';'.svg'='image/svg+xml';'.woff2'='font/woff2';'.ttf'='font/ttf';'.ogg'='audio/ogg';'.mp4'='video/mp4'}
$l=New-Object System.Net.HttpListener; $l.Prefixes.Add("http://127.0.0.1:$port/"); $l.Start(); "listening http://127.0.0.1:$port/ root=$root"
while($l.IsListening){
  $c=$l.GetContext()
  try{
    $p=[Uri]::UnescapeDataString($c.Request.Url.AbsolutePath); if($p -eq '/'){ $p='/index.html' }
    $f=Join-Path $root ($p.TrimStart('/') -replace '/','\')
    if(Test-Path $f -PathType Leaf){ $b=[IO.File]::ReadAllBytes($f); $e=[IO.Path]::GetExtension($f).ToLower(); if($mime[$e]){ $c.Response.ContentType=$mime[$e] }
      $c.Response.ContentLength64=$b.Length; $c.Response.OutputStream.Write($b,0,$b.Length) }
    else { $c.Response.StatusCode=404 }
  }catch{} finally{ try{ $c.Response.OutputStream.Close() }catch{} }
}
