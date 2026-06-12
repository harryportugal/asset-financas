import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const URL = 'http://localhost:5174';
const OUT_DIR = path.resolve('card-previews');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

const page = await browser.newPage();

console.log('Abrindo o site...');
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

// Aguarda o bento grid renderizar
await page.waitForSelector('section', { timeout: 10000 });

// Scroll até a seção do bento (fora do hero)
await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  // A seção bento é a que fica fora do scroll sticky
  if (sections.length > 0) {
    sections[0].scrollIntoView({ behavior: 'instant', block: 'start' });
  }
});

await new Promise(r => setTimeout(r, 800)); // aguarda render

// Seleciona os cards dentro do grid do bento
// O grid tem 4 cards filhos diretos
const cards = await page.$$('section > div > div > div');

if (cards.length === 0) {
  console.error('Nenhum card encontrado. Verifique se o dev server está rodando em', URL);
  await browser.close();
  process.exit(1);
}

const names = ['card-a-solucoes', 'card-b-ecossistema', 'card-c-plataforma', 'card-d-baas'];

console.log(`Encontrados ${cards.length} cards. Capturando...`);

for (let i = 0; i < Math.min(cards.length, 4); i++) {
  const card = cards[i];
  const box = await card.boundingBox();

  if (!box) {
    console.warn(`Card ${i + 1}: bounding box não encontrado, pulando.`);
    continue;
  }

  const filename = path.join(OUT_DIR, `${names[i] || `card-${i + 1}`}.png`);

  await page.screenshot({
    path: filename,
    clip: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    },
    // deviceScaleFactor 2 = imagem @2x, resultado nítido
  });

  console.log(`✓ ${path.basename(filename)}  (${Math.round(box.width)}×${Math.round(box.height)}px)`);
}

await browser.close();
console.log(`\nImagens salvas em: ${OUT_DIR}`);
