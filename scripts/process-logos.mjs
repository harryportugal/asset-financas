/**
 * process-logos.mjs
 * 
 * Removes the background from logo images and converts them to dark gray PNGs.
 * Uses Sharp (already in the project) for image processing.
 * 
 * Strategy:
 * 1. Read each image
 * 2. Detect the dominant background color (from corner pixels)
 * 3. Remove pixels similar to the background (make transparent)
 * 4. Recolor remaining pixels to dark gray (#4b5563)
 * 5. Save as PNG with transparency
 */

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
  
  const img = sharp(srcPath);
  const { width, height } = await img.metadata();

  // Get raw RGBA pixel data
  const raw = await img
    .ensureAlpha()
    .raw()
    .toBuffer();

  const data = new Uint8Array(raw);
  const stride = width * 4;

  // --- Sample corners to detect background color ---
  const samplePixel = (x, y) => {
    const i = y * stride + x * 4;
    return { r: data[i], g: data[i+1], b: data[i+2], a: data[i+3] };
  };

  const corners = [
    samplePixel(0, 0),
    samplePixel(width - 1, 0),
    samplePixel(0, height - 1),
    samplePixel(width - 1, height - 1),
  ];

  // Use top-left corner as bg reference (most reliable)
  const bg = corners[0];
  
  console.log(`  BG color: rgb(${bg.r}, ${bg.g}, ${bg.b})`);

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

  await sharp(output, {
    raw: { width, height, channels: 4 }
  })
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

  console.log(`Found ${images.length} images\n`);

  const results = [];

  for (const file of images) {
    const srcPath = path.join(INPUT_DIR, file);
    const cleanName = path.basename(file, path.extname(file))
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const dstPath = path.join(OUTPUT_DIR, `${cleanName}.png`);

    try {
      await processImage(srcPath, dstPath, file);
      results.push({ name: cleanName, src: `/logos-carrossel/${cleanName}.png` });
    } catch (err) {
      console.error(`  ✗ FAILED: ${file}: ${err.message}\n`);
    }
  }

  console.log('\n=== DONE ===\n');
  console.log('Copy this into partner-logos.tsx:\n');
  console.log('const partnerItems = [');
  for (const r of results) {
    console.log(`  { name: "${r.name}", src: "${r.src}" },`);
  }
  console.log('];');
}

main().catch(console.error);
