const fs = require('fs');
const path = require('path');

function getLighthouseScores(filepath) {
  console.log(`\n=== LIGHTHOUSE SCORES FOR: ${filepath} ===`);
  const html = fs.readFileSync(filepath, 'utf8');
  
  // In Pagespeed Insights page, the Lighthouse categories are rendered inside the Lighthouse container.
  // There is a section containing class="lh-scores-wrapper" or inside .lh-container.
  // Let's find all gauge wrapper occurrences.
  // A typical gauge wrapper in Lighthouse has class="lh-gauge__wrapper lh-gauge__wrapper--pass" or similar
  const parts = html.split('class="lh-gauge__wrapper');
  console.log(`Found ${parts.length - 1} gauge wrappers in split`);
  
  parts.slice(1).forEach((part, index) => {
    // Extract label
    const labelMatch = part.match(/class="[^"]*lh-gauge__label[^"]*"[^>]*>([^<]+)</) ||
                       part.match(/lh-gauge__label[^>]*>([^<]+)</);
    const label = labelMatch ? labelMatch[1].trim() : 'Unknown';
    
    // Extract score
    const scoreMatch = part.match(/class="[^"]*lh-gauge__percentage[^"]*"[^>]*>([^<]+)</) ||
                       part.match(/lh-gauge__percentage[^>]*>([^<]+)</);
    const score = scoreMatch ? scoreMatch[1].trim() : 'Unknown';
    
    console.log(`Gauge #${index + 1}: Label = ${label} | Score = ${score}`);
  });
}

getLighthouseScores(path.join(process.cwd(), 'public', 'desktop_report.html'));
getLighthouseScores(path.join(process.cwd(), 'public', 'mobile_report.html'));
