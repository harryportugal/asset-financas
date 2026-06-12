import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const imgBuffer = fs.readFileSync(path.resolve('public/cards bento/card-c-plataforma.png'));
const dataUrl = `data:image/png;base64,${imgBuffer.toString('base64')}`;

console.log("Image read and converted to base64. Size:", imgBuffer.length, "bytes");

console.log("Launching Puppeteer...");
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
console.log("Browser launched. Opening page...");
const page = await browser.newPage();

await page.setContent(`
  <html>
    <body>
      <canvas id="canvas"></canvas>
      <script>
        window.getColor = async (src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.getElementById('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              
              const imgData = ctx.getImageData(0, 0, img.width, img.height);
              const data = imgData.data;
              const colors = {};
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                const a = data[i+3];
                // Check if color is VIBRANT blue: blue component > 100, and blue is higher than red and green
                if (a > 200 && b > 100 && b > r + 30 && b > g + 20) {
                  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                  colors[hex] = (colors[hex] || 0) + 1;
                }
              }
              resolve(colors);
            };
            img.src = src;
          });
        };
      </script>
    </body>
  </html>
`);

console.log("Page set. Evaluating color counts...");
const colors = await page.evaluate(async (src) => {
  return await window.getColor(src);
}, dataUrl);

console.log("Found vibrant blue-ish colors in mockup:");
const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);
console.log(JSON.stringify(sortedColors.slice(0, 20), null, 2));

await browser.close();
console.log("Done.");
