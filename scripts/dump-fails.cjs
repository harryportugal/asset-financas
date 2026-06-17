const fs = require('fs');
const path = require('path');

function dumpFails(filepath) {
  console.log(`\n=== DUMPING FAILS FOR: ${filepath} ===`);
  const html = fs.readFileSync(filepath, 'utf8');
  
  // Split by class="lh-audit
  const parts = html.split('class="lh-audit');
  
  let count = 0;
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    // Check if it contains lh-audit--fail
    const classAttrMatch = part.match(/^([^"]*)"/);
    const classAttr = classAttrMatch ? classAttrMatch[1] : '';
    
    if (classAttr.includes('lh-audit--fail') && !classAttr.includes('lh-audit--pass')) {
      count++;
      console.log(`\n--- FAIL AUDIT #${count} ---`);
      console.log(`Classes: lh-audit${classAttr}`);
      // Print first 800 chars of this part to see structure
      console.log(part.slice(0, 1000));
    }
  }
}

dumpFails(path.join(process.cwd(), 'public', 'mobile_report.html'));
