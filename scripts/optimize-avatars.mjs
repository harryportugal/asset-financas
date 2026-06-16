import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/portu/OneDrive/Documentos/asset finanças/public';

const avatars = [
  'avatar-1.png',
  'avatar-2.png',
  'avatar-3.png',
  'avatar-4.png'
];

async function optimizeAvatar(fileName) {
  const inputPath = path.join(publicDir, fileName);
  const baseName = fileName.split('.')[0]; // e.g. avatar-1
  const outputPath = path.join(publicDir, `${baseName}.webp`);

  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${inputPath}`);
    return;
  }

  const originalSize = fs.statSync(inputPath).size;
  
  // Resize to 128x128 to be super crisp on retina screens while keeping file sizes extremely small
  await sharp(inputPath)
    .resize(128, 128, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: 85 })
    .toFile(outputPath);

  const optimizedSize = fs.statSync(outputPath).size;
  const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

  console.log(`Optimized avatar: ${fileName} -> ${baseName}.webp`);
  console.log(`  Size: ${(originalSize / 1024).toFixed(1)} KB -> ${(optimizedSize / 1024).toFixed(1)} KB (-${reduction}%)`);

  // Delete original PNG to avoid bloated repo
  fs.unlinkSync(inputPath);
  console.log(`  Deleted original file: ${fileName}`);
}

async function run() {
  console.log('Starting avatar optimization...');
  for (const file of avatars) {
    await optimizeAvatar(file);
  }
  console.log('Finished!');
}

run().catch(err => {
  console.error(err);
});
