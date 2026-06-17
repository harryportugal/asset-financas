import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.join(__dirname, '..', 'public', 'logos-carrossel');

async function trimImage(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Get raw RGBA pixels
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  let minX = width, minY = height, maxX = 0, maxY = 0;
  let hasVisiblePixels = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3]; // Alpha channel

      if (alpha > 10) { // threshold for visibility
        hasVisiblePixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasVisiblePixels) {
    console.log(`No visible pixels found in ${path.basename(filePath)}`);
    return;
  }

  // Add a small padding (e.g. 5px) around the bounding box, constrained to image bounds
  const padding = 5;
  const cropLeft = Math.max(0, minX - padding);
  const cropTop = Math.max(0, minY - padding);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + 1 + padding * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + 1 + padding * 2);

  console.log(`Trimming ${path.basename(filePath)}: left=${cropLeft}, top=${cropTop}, width=${cropWidth}, height=${cropHeight}`);

  // Create temporary buffer to avoid reading/writing collision
  const trimmedBuffer = await sharp(filePath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .toBuffer();

  await sharp(trimmedBuffer).toFile(filePath);
}

async function main() {
  const files = await readdir(LOGOS_DIR);
  for (const file of files) {
    if (file.endsWith('.png')) {
      await trimImage(path.join(LOGOS_DIR, file));
    }
  }
  console.log('All logos trimmed!');
}

main().catch(console.error);
