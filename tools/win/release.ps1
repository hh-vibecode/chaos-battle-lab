# Windows replacement for tools/release.py (machine has no python). Same steps:
#   bump GAME_VERSION build + time (Vietnam, UTC+7) in index.html, set ?v=<build> on css/js,
#   refresh assets-manifest.json (md5[:12] + size of every file under assets/), commit "Ver N: <msg>", push to main.
# Usage:
#   powershell -File tools/win/release.ps1 -msg "Short English description" -authorName "<name>" -authorEmail "<email>" [-files a,b,c] [-dryRun]
#   -files : stage ONLY these paths (plus index.html + assets-manifest.json). Omit = 'git add -A' like release.py.
#            Prefer -files when another session may be editing the repo at the same time.
#   -dryRun: compute and print, change nothing.
# The commit message goes through a temp file (git -F) so quotes / non-ASCII never break.
param([Parameter(Mandatory=$true)][string]$msg,[string]$authorName='',[string]$authorEmail='',[string[]]$files=@(),[switch]$dryRun,[switch]$noPush)
$ErrorActionPreference='Stop'
$repo=(Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$enc=New-Object System.Text.UTF8Encoding($false)
function G(){ $o=& git -C $repo @args 2>&1 | ForEach-Object { "$_" }; return $o }
G fetch -q origin | Out-Null
$behind=[int]((G rev-list --count HEAD..origin/main) | Select-Object -Last 1)
if($behind -gt 0){ throw "local main is $behind commit(s) behind origin/main - run: git pull --ff-only origin main" }
# --- version + ?v= ---
$ix=Join-Path $repo 'index.html'; $s=[IO.File]::ReadAllText($ix,$enc)
$m=[regex]::Match($s,'window\.GAME_VERSION=\{build:(\d+),at:"[^"]*"\}'); if(-not $m.Success){ throw 'GAME_VERSION not found in index.html' }
$n=[int]$m.Groups[1].Value+1; $now=[DateTime]::UtcNow.AddHours(7)
$at=$now.ToString('HH:mm')+' '+[char]0x00B7+' '+$now.ToString('dd/MM/yyyy')
$s=$s.Substring(0,$m.Index)+"window.GAME_VERSION={build:$n,at:`"$at`"}"+$s.Substring($m.Index+$m.Length)
$s=[regex]::Replace($s,'(\.(?:css|js))\?v=\d+',"`$1?v=$n")
# --- manifest: keep existing key order, refresh hashes, drop deleted files, append new files (sorted) ---
$mf=Join-Path $repo 'assets-manifest.json'; $old=[IO.File]::ReadAllText($mf,$enc)
$keys=[regex]::Matches($old,'"(assets/[^"]+)":\[') | ForEach-Object { $_.Groups[1].Value }
$all=Get-ChildItem (Join-Path $repo 'assets') -Recurse -File | Where-Object { -not $_.Name.StartsWith('.') } | ForEach-Object { 'assets/'+$_.FullName.Substring((Join-Path $repo 'assets').Length+1).Replace('\','/') }
$set=New-Object 'System.Collections.Generic.HashSet[string]'; $all | ForEach-Object { [void]$set.Add($_) }
$order=New-Object System.Collections.Generic.List[string]; $seen=New-Object 'System.Collections.Generic.HashSet[string]'
foreach($k in $keys){ if($set.Contains($k) -and $seen.Add($k)){ $order.Add($k) } }
$new=@($all | Where-Object { -not $seen.Contains($_) } | Sort-Object); foreach($k in $new){ $order.Add($k) }
$md5=[Security.Cryptography.MD5]::Create(); $sb=New-Object Text.StringBuilder; [void]$sb.Append('{"v":'+$n+',"files":{')
$first=$true; foreach($k in $order){ $b=[IO.File]::ReadAllBytes((Join-Path $repo $k)); $h=(-join ($md5.ComputeHash($b) | ForEach-Object { $_.ToString('x2') })).Substring(0,12)
  if(-not $first){ [void]$sb.Append(',') }; $first=$false; [void]$sb.Append('"'+$k+'":["'+$h+'",'+$b.Length+']') }
[void]$sb.Append('}}')
"Ver $($n-1) -> $n  at $at   (manifest: $($order.Count) files, new: $($new.Count), removed: $($keys.Count-($order.Count-$new.Count)))"
if($new.Count){ "new files: " + ($new -join ', ') }
if($dryRun){ "dry run - nothing written"; return }
[IO.File]::WriteAllText($ix,$s,$enc); [IO.File]::WriteAllText($mf,$sb.ToString(),$enc)
# --- stage, commit, push ---
if($files.Count){ G add -- index.html assets-manifest.json @files | Out-Null } else { G add -A | Out-Null }
G status --short
$mfile=Join-Path $env:TEMP "cbl-release-msg-$n.txt"
[IO.File]::WriteAllText($mfile,"Ver ${n}: $msg`n`nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`n",$enc)
$id=@(); if($authorName){ $id+=@('-c',"user.name=$authorName") }; if($authorEmail){ $id+=@('-c',"user.email=$authorEmail") }
& git -C $repo @id commit -q -F $mfile; if($LASTEXITCODE -ne 0){ throw 'git commit failed (no identity? pass -authorName/-authorEmail)' }
Remove-Item $mfile -ErrorAction SilentlyContinue
if(-not $noPush){ G push origin HEAD:main; if($LASTEXITCODE -ne 0){ throw 'git push failed' } }
G log --oneline -1
