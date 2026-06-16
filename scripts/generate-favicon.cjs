const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/logo asset.png');
const faviconPath = path.join(__dirname, '../public/favicon.svg');

sharp(logoPath)
  .extract({ left: 8, top: 8, width: 151, height: 181 })
  .negate({ alpha: false })
  .resize(200, 240)
  .toBuffer()
  .then(buffer => {
    const base64 = buffer.toString('base64');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="256" cy="256" r="256" fill="#080c16" />
  <image href="data:image/png;base64,${base64}" x="156" y="136" width="200" height="240" />
</svg>`;
    fs.writeFileSync(faviconPath, svg);
    console.log('Favicon SVG successfully created!');
  })
  .catch(err => {
    console.error('Error generating favicon:', err);
    process.exit(1);
  });
