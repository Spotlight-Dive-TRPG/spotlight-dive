# Spotlight Dive - エクスポート手順

このリポジトリには `deepseek_html_20260402_5ceeb0.html`（キャラクターシート）が含まれています。
以下の手順でローカル環境からPNG / PDFを生成できます。

## 準備 (Node.js がインストールされていること)

1. ターミナルを開く（作業ディレクトリはこのプロジェクトのルート、例: `C:\Users\admin\Documents\Vscode`）
2. 依存をインストール:

```bash
npm install
```

## 使い方

- 既定のPNG出力（`deepseek_export/sheet.png`）を作る:

```bash
npm run export:png
```

- PDF出力（`deepseek_export/sheet.pdf`）を作る:

```bash
node export.js --pdf
```

- ファイルや出力名を指定する例:

```bash
node export.js --input=./deepseek_html_20260402_5ceeb0.html --output=./deepseek_export/my-sheet --png
node export.js --input=./deepseek_html_20260402_5ceeb0.html --output=./deepseek_export/my-sheet --pdf
```

- スマホ表示を強制して出力する場合:

```bash
node export.js --smartphone --png
```

## 更新と再出力
- `deepseek_html_20260402_5ceeb0.html` を編集したら、上記コマンドを再実行してください。

## Booth での販売向け注意
- 画像サイズ・解像度は `export.js` の `deviceScaleFactor` と `setViewport` を調整して変更できます。
- 透過背景が不要な場合はPNGの `omitBackground` を `false` にしています。
- 高解像度版を用意したい場合は `deviceScaleFactor` を大きくしてください（出力ファイルが大きくなります）。

問題があれば、どの形式（PNG/PDF/解像度/スマホ/PC表示）を優先したいか教えてください。

## GitHub Pages に自動デプロイする
このリポジトリを GitHub に push すると、`main` ブランチへの push をトリガーにして自動で `public/` に相当するファイルを GitHub Pages にデプロイするワークフローを追加済みです。

手順:

1. GitHub にリポジトリを作成（例: `spotlight-dive-sheet`）
2. ローカルで以下を実行して push:

```bash
git init
git add .
git commit -m "Initial upload for Pages and release"
git branch -M main
git remote add origin https://github.com/<あなた>/<リポ名>.git
git push -u origin main
```

3. push 後、Actions のデプロイが成功すると Pages の公開 URL が Settings → Pages で確認できます。

注: ワークフローはリポジトリに push するだけで動きます（追加のシークレットは不要）。公開ブランチや挙動を変えたい場合はお知らせください。