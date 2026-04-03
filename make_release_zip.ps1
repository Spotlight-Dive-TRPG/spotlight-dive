# make_release_zip.ps1
# ワークスペース内の配布用ファイルをまとめてZIPにします
$timestamp = Get-Date -Format 'yyyyMMdd'
$releaseName = "deepseek_release_$timestamp.zip"
$files = @(
    'deepseek_html_20260402_5ceeb0.html',
    'deepseek_html_smartphone_export.html',
    'export.js',
    'README.md',
    'package.json',
    'LICENSE'
)
# assets フォルダがあれば含める
if (Test-Path "assets") { $files += 'assets\*' }
$existing = $files | Where-Object { Test-Path (Resolve-Path -LiteralPath $_ -ErrorAction SilentlyContinue) }
if (-not $existing) {
    Write-Error "圧縮対象のファイルが見つかりません。パスを確認してください。"
    exit 1
}
if (Test-Path $releaseName) { Remove-Item $releaseName -Force }
Compress-Archive -Path $existing -DestinationPath $releaseName -Force
Write-Output "作成しました: $releaseName"
