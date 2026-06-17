import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function inspect(file) {
  const filePath = path.join(__dirname, '..', 'public', 'logos carrossel', file);
  const image = sharp(filePath);
  const { width, height } = await image.metadata();
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  console.log(`Raw ${file} (${width}x${height}):`);
  
  // Sample pixels at x=0, y=0, x=width-1, y=height-1
  const getP = (x, y) => {
    const i = (y * width + x) * 4;
    return `(${data[i]}, ${data[i+1]}, ${data[i+2]})`;
  };

  console.log('Top-Left (0,0):', getP(0, 0));
  console.log('Top-Right (w-1,0):', getP(width - 1, 0));
  console.log('Bottom-Left (0,h-1):', getP(0, height - 1));
  console.log('Bottom-Right (w-1,h-1):', getP(width - 1, height - 1));
  console.log('Center:', getP(Math.floor(width/2), Math.floor(height/2)));
  
  // Print first 5 pixels of the top row
  let topRow = [];
  for (let x = 0; x < Math.min(10, width); x++) {
    topRow.push(getP(x, 0));
  }
  console.log('Top row first 10 pixels:', topRow.join(', '));
}

inspect('IMG-20260616-WA0032(1).jpg').catch(console.error);
