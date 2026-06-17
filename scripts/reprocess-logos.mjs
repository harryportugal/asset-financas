import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_DIR  = path.join(__dirname, '..', 'public', 'logos carrossel');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'logos-carrossel');

const GRAY_R = 75, GRAY_G = 85, GRAY_B = 99; // Tailwind gray-600
const BG_THRESHOLD = 50; // color distance tolerance for background detection
const ALPHA_THRESHOLD = 10; // ignore nearly transparent pixels

async function processImage(srcPath, dstPath, name) {
  console.log(`Processing: ${name}`);
  
  // 1. Load metadata to calculate a safe edge crop border
  const imgMetadata = await sharp(srcPath).metadata();
  const origWidth = imgMetadata.width;
  const origHeight = imgMetadata.height;
  
  // Crop a safe border (5% of the smallest dimension, max 20px) to remove any solid border/noise
  const border = Math.min(20, Math.floor(Math.min(origWidth, origHeight) * 0.05));
  const cropLeft = border;
  const cropTop = border;
  const cropWidth = origWidth - 2 * border;
  const cropHeight = origHeight - 2 * border;
  
  console.log(`  Initial border crop: border=${border} (${cropWidth}x${cropHeight})`);

  // Crop the border and load raw RGBA pixel data
  const raw = await sharp(srcPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const data = new Uint8Array(raw);
  const stride = cropWidth * 4;

  // --- Sample corners to detect background color ---
  const samplePixel = (x, y) => {
    const i = y * stride + x * 4;
    return { r: data[i], g: data[i+1], b: data[i+2], a: data[i+3] };
  };

  const corners = [
    samplePixel(0, 0),
    samplePixel(cropWidth - 1, 0),
    samplePixel(0, cropHeight - 1),
    samplePixel(cropWidth - 1, cropHeight - 1),
  ];

  // Use top-left corner as bg reference
  const bg = corners[0];
  console.log(`  BG color detected: rgb(${bg.r}, ${bg.g}, ${bg.b})`);

  // --- Process each pixel ---
  const output = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];

    // Color distance from background
    const dist = Math.sqrt(
      Math.pow(r - bg.r, 2) +
      Math.pow(g - bg.g, 2) +
      Math.pow(b - bg.b, 2)
    );

    if (dist < BG_THRESHOLD || a < ALPHA_THRESHOLD) {
      // Background pixel — make transparent
      output[i]   = 0;
      output[i+1] = 0;
      output[i+2] = 0;
      output[i+3] = 0;
    } else {
      // Logo pixel — recolor to gray-600, with luminance shading
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const factor = 0.4 + lum * 0.6;
      output[i]   = Math.round(GRAY_R * factor);
      output[i+1] = Math.round(GRAY_G * factor);
      output[i+2] = Math.round(GRAY_B * factor);
      output[i+3] = a;
    }
  }

  // --- Trim/Crop the transparent borders of the processed buffer ---
  let minX = cropWidth, minY = cropHeight, maxX = 0, maxY = 0;
  let hasVisiblePixels = false;

  for (let y = 0; y < cropHeight; y++) {
    for (let x = 0; x < cropWidth; x++) {
      const idx = (y * cropWidth + x) * 4;
      const alpha = output[idx + 3];

      if (alpha > 10) {
        hasVisiblePixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasVisiblePixels) {
    console.log(`  ✗ No visible pixels found after background removal for ${name}`);
    return;
  }

  const padding = 5;
  const trimLeft = Math.max(0, minX - padding);
  const trimTop = Math.max(0, minY - padding);
  const trimWidth = Math.min(cropWidth - trimLeft, (maxX - minX) + 1 + padding * 2);
  const trimHeight = Math.min(cropHeight - trimTop, (maxY - minY) + 1 + padding * 2);

  console.log(`  Trimmed bounding box: left=${trimLeft}, top=${trimTop}, width=${trimWidth}, height=${trimHeight}`);

  // Save the cropped buffer to the destination
  await sharp(output, {
    raw: { width: cropWidth, height: cropHeight, channels: 4 }
  })
  .extract({ left: trimLeft, top: trimTop, width: trimWidth, height: trimHeight })
  .png()
  .toFile(dstPath);

  console.log(`  ✓ Saved: ${path.basename(dstPath)}\n`);
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await readdir(INPUT_DIR);
  const supported = ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];
  const images = files.filter(f => supported.includes(path.extname(f).toLowerCase()));

  console.log(`Found ${images.length} images to reprocess\n`);

  for (const file of images) {
    const srcPath = path.join(INPUT_DIR, file);
    const cleanName = path.basename(file, path.extname(file))
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const dstPath = path.join(OUTPUT_DIR, `${cleanName}.png`);

    try {
      await processImage(srcPath, dstPath, file);
    } catch (err) {
      console.error(`  ✗ FAILED: ${file}: ${err.message}\n`);
    }
  }

  console.log('\n=== REPROCESSING DONE ===\n');
}

main().catch(console.error);
