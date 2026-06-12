import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/portu/OneDrive/Documentos/asset finanças/public';
const bentoDir = path.join(publicDir, 'cards bento');

// Images to optimize
const testimonials = [
  'LHF5pnTEGiDqPokWO5u1DEp2l0.png',
  'IGOxPIDHI4tPrADWVh1HrKM99RQ.png',
  'Mjb5QC7cBmKTRevvIPeGBCVzHHM.png',
  'owRvmfck3MmE9RTAPlzhICFlFg.png'
];

const bentoCards = [
  '1780313376294.png',
  'card b.jpg',
  'card-c-plataforma.png',
  'card-d-baas.png'
];

const ctaImages = [
  'celular cta.png',
  'asset_card_mockup.png'
];

async function optimizeImage(folder, fileName, isTestimonial = false) {
  const inputPath = path.join(folder, fileName);
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  const outputPath = path.join(folder, `${baseName}.webp`);

  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${inputPath}`);
    return;
  }

  // Good quality as requested: 90 for testimonials, 85 for others
  const quality = isTestimonial ? 90 : 85;

  const originalSize = fs.statSync(inputPath).size;
  
  await sharp(inputPath)
    .webp({ quality, lossless: false })
    .toFile(outputPath);

  const optimizedSize = fs.statSync(outputPath).size;
  const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

  console.log(`Optimized: ${fileName} -> ${baseName}.webp`);
  console.log(`  Size: ${(originalSize / 1024).toFixed(1)} KB -> ${(optimizedSize / 1024).toFixed(1)} KB (-${reduction}%)`);
}

async function run() {
  console.log('Starting image optimization to WebP...');
  
  console.log('\n--- Testimonials (High Quality) ---');
  for (const file of testimonials) {
    await optimizeImage(publicDir, file, true);
  }

  console.log('\n--- Bento Cards ---');
  for (const file of bentoCards) {
    await optimizeImage(bentoDir, file, false);
  }

  console.log('\n--- CTA / Others ---');
  for (const file of ctaImages) {
    await optimizeImage(publicDir, file, false);
  }

  console.log('\nOptimization complete!');
}

run().catch(err => {
  console.error('Error running optimization:', err);
});
