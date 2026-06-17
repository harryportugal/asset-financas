const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeReport(url, prefix) {
  console.log(`\nNavigating to: ${url}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 3000 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log('Waiting for gauge metrics to appear...');
    await page.waitForSelector('.lh-gauge__wrapper', { timeout: 30000 });
    
    console.log('Scrolling down slowly to load all audits...');
    for (let i = 0; i < 15; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Save raw HTML of the lighthouse container
    const htmlContent = await page.evaluate(() => {
      // Find the main lighthouse container
      const container = document.querySelector('.lh-container') || document.body;
      return container.innerHTML;
    });
    
    fs.writeFileSync(path.join(process.cwd(), 'public', `${prefix}_report.html`), htmlContent);
    console.log(`Saved HTML report to public/${prefix}_report.html`);
    
    // Extract all audits text
    const audits = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('.lh-audit'));
      return nodes.map(n => {
        const titleEl = n.querySelector('.lh-audit__title');
        const scoreEl = n.querySelector('.lh-audit__score-value');
        const displayEl = n.querySelector('.lh-audit__display-text');
        
        let score = 'passed';
        if (n.classList.contains('lh-audit--failed')) score = 'failed';
        else if (n.classList.contains('lh-audit--warn')) score = 'warning';
        
        return {
          id: n.id,
          title: titleEl ? titleEl.textContent.trim() : '',
          display: displayEl ? displayEl.textContent.trim() : '',
          score,
          classes: n.className
        };
      }).filter(a => a.title);
    });
    
    console.log(`Total audits scraped: ${audits.length}`);
    const failedAudits = audits.filter(a => a.score === 'failed' || a.score === 'warning');
    console.log(`Failed/Warning audits (${failedAudits.length}):`);
    failedAudits.forEach(a => {
      console.log(`- [${a.score.toUpperCase()}] ID: ${a.id} | Title: ${a.title}`);
    });

  } catch (err) {
    console.error('Error during scraping:', err);
  } finally {
    await browser.close();
  }
}

async function run() {
  const desktopUrl = 'https://pagespeed.web.dev/analysis/https-asset-financas-vercel-app/x2yke6xogc?form_factor=desktop';
  const mobileUrl = 'https://pagespeed.web.dev/analysis/https-asset-financas-vercel-app/x2yke6xogc?form_factor=mobile';
  
  console.log('=== SCRAPING DESKTOP ===');
  await scrapeReport(desktopUrl, 'desktop');
  
  console.log('\n\n=== SCRAPING MOBILE ===');
  await scrapeReport(mobileUrl, 'mobile');
}

run();
