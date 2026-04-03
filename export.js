const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function main() {
  const argv = process.argv.slice(2);
  const inputArg = argv.find(a => a.startsWith('--input='));
  const outputArg = argv.find(a => a.startsWith('--output='));
  const pngFlag = argv.includes('--png') || argv.includes('--image') || argv.includes('--screenshot');
  const pdfFlag = argv.includes('--pdf');
  const smartphone = argv.includes('--smartphone');

  const input = inputArg ? inputArg.split('=')[1] : path.resolve(__dirname, 'deepseek_html_20260402_5ceeb0.html');
  if (!fs.existsSync(input)) {
    console.error('入力ファイルが見つかりません:', input);
    process.exit(2);
  }

  const defaultOut = path.resolve(path.dirname(input), 'deepseek_export');
  if (!fs.existsSync(defaultOut)) fs.mkdirSync(defaultOut, { recursive: true });

  const outBase = outputArg ? path.resolve(outputArg.split('=')[1]) : path.join(defaultOut, 'sheet');
  const outPng = outBase + '.png';
  const outPdf = outBase + '.pdf';

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    // 高解像度出力
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    const uri = 'file://' + input.split(path.sep).join('/');
    await page.goto(uri, { waitUntil: 'networkidle2' });

    // スマホ表示指定がある場合はスマホ幅を適用
    if (smartphone) {
      await page.setViewport({ width: 420, height: 960, deviceScaleFactor: 2 });
      // スマホ表示クラスを強制
      await page.evaluate(() => document.getElementById('sheet-container')?.classList.add('smartphone-mode'));
    } else {
      // PC表示を明示
      await page.evaluate(() => document.getElementById('sheet-container')?.classList.remove('smartphone-mode'));
    }

    // JSが初期化する時間を少し確保
    await page.waitForTimeout(300);

    const el = await page.$('#sheet-container');
    if (!el) {
      console.error('シート要素が見つかりません (#sheet-container)');
      process.exit(3);
    }

    // 要素サイズに合わせてキャプチャ
    const box = await el.boundingBox();
    if (!box) {
      console.error('要素のサイズが取得できませんでした');
      process.exit(4);
    }

    // 少し余白をつける
    const padding = 8;
    const clip = {
      x: Math.max(0, box.x - padding),
      y: Math.max(0, box.y - padding),
      width: Math.min(page.viewport().width * 4, box.width + padding * 2),
      height: Math.min(30000, box.height + padding * 2)
    };

    if (pngFlag || (!pngFlag && !pdfFlag)) {
      await el.screenshot({ path: outPng, clip, omitBackground: false, type: 'png' });
      console.log('PNG saved:', outPng);
    }

    if (pdfFlag) {
      // PDFはページ全体か要素のみをPDF化する
      // 要素のみをPDF化するため、要素の高さを基準に用紙サイズを計算
      const mmPerPx = 0.264583; // px -> mm approximation
      const pdfWidthMm = Math.round((clip.width) * mmPerPx);
      const pdfHeightMm = Math.round((clip.height) * mmPerPx);
      await page.pdf({ path: outPdf, printBackground: true, width: `${pdfWidthMm}mm`, height: `${pdfHeightMm}mm`, preferCSSPageSize: false });
      console.log('PDF saved:', outPdf);
    }

  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
