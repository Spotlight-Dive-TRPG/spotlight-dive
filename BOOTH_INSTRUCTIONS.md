Booth 配布パッケージ作成手順

1. ZIP作成（推奨: PowerShell を使用）
   - ワークスペースで次を実行:

```powershell
.\make_release_zip.ps1
```

  - 成功すると `deepseek_release_YYYYMMDD.zip` が作成されます。

2. Booth アップロード内容（ZIPに含める推奨ファイル）
  - `deepseek_html_20260402_5ceeb0.html`（PC用）
  - `deepseek_html_smartphone_export.html`（スマホ表示を強制する版）
  - `README.md`（使用方法）
  - `LICENSE`（ライセンス表記）
  - `deepseek_export/sheet.png`（任意のサンプル画像）やPDF（任意）
  - `export.js`（Node用エクスポートスクリプト、任意）

3. Booth 商品ページ設定
  - 商品タイトル・説明・サンプル画像を設定
  - ZIPを『ダウンロード販売』としてアップロード
  - 商品説明に公開デモURL（例: GitHub Pages / Netlify）を記載すると購入者が動作確認しやすいです

4. 注意点
  - HTML内で外部CDN（例: html2canvas）を使用する場合、CDN読み込み失敗時のためにライブラリを同梱することを推奨します。
  - 商用利用や二次配布の可否は `LICENSE` と別途表示してください。
  - Boothの規約や著作権に違反しないことを確認してください。

質問があれば、パッケージ内容の確認やサンプルPDFの高解像度化を代行します。