# remplacer-nom.ps1
# Remplace "Léon Corazón" par "Lionel Irakoze" dans tout le dossier.
# Utilisation : .\remplacer-nom.ps1 -DryRun   (simulation, ne modifie rien)
#               .\remplacer-nom.ps1           (applique les changements)
param([switch]$DryRun)

$root = (Get-Location).Path
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ext  = @("*.html", "*.css", "*.js", "*.json", "*.md", "*.txt", "*.xml", "*.svg")

# [motif, remplacement] : l'ordre compte
# \u00c9 = É   \u00e9 = é   \u00d3 = Ó   \u00f3 = ó
$rules = @(
  @('L\u00c9ON\s+CORAZ\u00d3N',          'LIONEL IRAKOZE'),   # LÉON CORAZÓN (majuscules)
  @('(?i)L[\u00e9e]on\s+Coraz[\u00f3o]n', 'Lionel Irakoze'),   # Léon Corazón, Leon Corazon...
  @('L\u00c9ON(?=\s*<span)',             'LIONEL'),           # logo : LÉON<span>.</span>
  @('(Bonjour|Hello|Salut)\s+L[\u00e9e]on', '$1 Lionel')      # messages WhatsApp
)

$files = Get-ChildItem -Path $root -Recurse -File -Include $ext |
  Where-Object { $_.FullName -notmatch '[\\/](\.git|node_modules)[\\/]' }

$total = 0
foreach ($f in $files) {
  $text = [System.IO.File]::ReadAllText($f.FullName)
  $new  = $text
  $n    = 0
  foreach ($r in $rules) {
    $n  += [regex]::Matches($new, $r[0]).Count
    $new = [regex]::Replace($new, $r[0], $r[1])
  }
  if ($n -gt 0) {
    $total += $n
    Write-Host ("{0,-22} {1} remplacement(s)" -f $f.Name, $n)
    if (-not $DryRun) { [System.IO.File]::WriteAllText($f.FullName, $new, $utf8) }
  }
}

if ($DryRun) { Write-Host "`nSIMULATION : $total remplacement(s) prevus, rien n'a ete modifie." -ForegroundColor Yellow }
else         { Write-Host "`nTermine : $total remplacement(s) effectues." -ForegroundColor Green }

# Contrôle : cherche ce qui reste de l'ancien nom
Write-Host "`nIl reste ces lignes avec l'ancien nom (a verifier a la main) :"
$left = $files | Select-String -Pattern 'L[\u00e9e]on|Coraz[\u00f3o]n' -Encoding UTF8
if ($left) { $left | ForEach-Object { "{0}:{1}  {2}" -f $_.Filename, $_.LineNumber, $_.Line.Trim() } }
else       { Write-Host "Rien. Tout est propre." }