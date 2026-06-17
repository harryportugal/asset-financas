import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function inspect(file) {
  const filePath = path.join(__dirname, '..', 'public', 'logos-carrossel', file);
  const image = sharp(filePath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  console.log(`Inspecting ${file} (${width}x${height}):`);
  
  // Find top-most, bottom-most, left-most, right-most pixels with alpha > 10
  let topMost = null, bottomMost = null, leftMost = null, rightMost = null;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const a = data[idx+3];
      
      if (a > 10) {
        if (topMost === null || y < topMost.y) topMost = { x, y, r, g, b, a };
        if (bottomMost === null || y > bottomMost.y) bottomMost = { x, y, r, g, b, a };
        if (leftMost === null || x < leftMost.x) leftMost = { x, y, r, g, b, a };
        if (rightMost === null || x > rightMost.x) rightMost = { x, y, r, g, b, a };
      }
    }
  }
  
  console.log('Top most:', topMost);
  console.log('Bottom most:', bottomMost);
  console.log('Left most:', leftMost);
  console.log('Right most:', rightMost);
}

inspect('img-20260616-wa0041.png').catch(console.error);
