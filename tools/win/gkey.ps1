# Green-screen key for character frames drawn by ChatGPT (pure #00FF00-ish background).
# Cuts columns [x0,x1) of the source (one sheet may hold several poses side by side), removes green,
# de-spills green fringes, crops tight to the character and scales to height H (feet touch the bottom edge).
# Usage: powershell -File tools/win/gkey.ps1 -src in.png -out assets/img/<key>/NAME.png [-x0 0 -x1 887] [-H 420] [-grid]
#   -grid : draw a red y-ruler every 20px (preview only, never ship it).
# Prints the source bbox and output size. Visually check the result (Read the png) before using it.
param([Parameter(Mandatory=$true)][string]$src,[Parameter(Mandatory=$true)][string]$out,[int]$x0=0,[int]$x1=-1,[int]$H=420,[switch]$grid,[int]$keyHi=90,[int]$keyLo=25)
Add-Type -AssemblyName System.Drawing
$code=@"
using System; using System.Drawing; using System.Drawing.Imaging;
public static class GKey {
  public static Bitmap Key(Bitmap b,int x0,int x1,int hi,int lo,out Rectangle bb){
    int w=x1-x0,h=b.Height; Bitmap o=new Bitmap(w,h,PixelFormat.Format32bppArgb); int mnx=w,mny=h,mxx=-1,mxy=-1;
    for(int y=0;y<h;y++) for(int x=0;x<w;x++){ Color c=b.GetPixel(x0+x,y); int m=Math.Max(c.R,c.B), d=c.G-m;
      double a = d>=hi?0: d<=lo?1: 1-(d-lo)/(double)(hi-lo);
      int g=c.G; if(d>0) g=m+(int)(d*0.15);
      int al=(int)Math.Round(a*255); o.SetPixel(x,y,Color.FromArgb(al,c.R,Math.Min(255,g),c.B));
      if(al>40){ if(x<mnx)mnx=x; if(x>mxx)mxx=x; if(y<mny)mny=y; if(y>mxy)mxy=y; } }
    bb=new Rectangle(mnx,mny,mxx-mnx+1,mxy-mny+1); return o; }
}
"@
if(-not ([System.Management.Automation.PSTypeName]'GKey').Type){ Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing }
$b=New-Object System.Drawing.Bitmap (Resolve-Path $src).Path; if($x1 -lt 0){ $x1=$b.Width }
$bb=New-Object System.Drawing.Rectangle
$k=[GKey]::Key($b,$x0,$x1,$keyHi,$keyLo,[ref]$bb)
$sc=$H/$bb.Height; $W=[int][Math]::Round($bb.Width*$sc)
$o=New-Object System.Drawing.Bitmap $W,$H; $g=[System.Drawing.Graphics]::FromImage($o); $g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'
$g.DrawImage($k,(New-Object System.Drawing.Rectangle 0,0,$W,$H),$bb,'Pixel')
if($grid){ $pen=New-Object System.Drawing.Pen ([System.Drawing.Color]::Red),1; $font=New-Object System.Drawing.Font 'Arial',7
  for($yy=0;$yy -lt $H;$yy+=20){ $g.DrawLine($pen,0,$yy,8,$yy); $g.DrawString("$yy",$font,[System.Drawing.Brushes]::Red,9,$yy-5) } }
$g.Dispose(); $o.Save($out,[System.Drawing.Imaging.ImageFormat]::Png); $b.Dispose()
"bbox=$($bb.X),$($bb.Y),$($bb.Width)x$($bb.Height) -> ${W}x$H  $out"
