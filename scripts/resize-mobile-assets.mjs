import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

async function resizeImage(filename, targetWidth) {
  const filePath = path.join(publicDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const ext = path.extname(filename);
  const baseName = path.basename(filename, ext);
  const optFilename = `${baseName.replace(/\s+/g, '-')}-opt.webp`;
  const outputPath = path.join(publicDir, optFilename);
  
  const metadata = await sharp(filePath).metadata();
  console.log(`\nProcessing ${filename}:`);
  console.log(`  Original: ${metadata.width}x${metadata.height} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
  
  // Resize keeping aspect ratio
  await sharp(filePath)
    .resize({ width: targetWidth })
    .webp({ quality: 85 })
    .toFile(outputPath);
  
  const newSize = fs.statSync(outputPath).size;
  const newMeta = await sharp(outputPath).metadata();
  
  console.log(`  Saved optimized to: ${optFilename}`);
  console.log(`  Resized: ${newMeta.width}x${newMeta.height} (${(newSize / 1024).toFixed(1)} KB)`);
}

async function run() {
  // Resize hero mobile to 960px width
  await resizeImage('hero mobile.webp', 960);
  
  // Resize dash2 to 1200px width
  await resizeImage('dash2.webp', 1200);
  
  console.log('\nFinished resizing assets!');
}

run().catch(console.error);
