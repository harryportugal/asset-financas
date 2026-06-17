const fs = require('fs');
const path = require('path');

function analyzeFile(filepath) {
  console.log(`\nAnalyzing: ${filepath}`);
  const html = fs.readFileSync(filepath, 'utf8');
  
  const countOccurrences = (str, pattern) => (str.match(new RegExp(pattern, 'g')) || []).length;
  
  console.log(`File length: ${html.length} chars`);
  console.log(`lh-audit count: ${countOccurrences(html, 'lh-audit')}`);
  console.log(`lh-audit--fail count: ${countOccurrences(html, 'lh-audit--fail')}`);
  console.log(`lh-audit--warning count: ${countOccurrences(html, 'lh-audit--warning')}`);
  console.log(`lh-audit--pass count: ${countOccurrences(html, 'lh-audit--pass')}`);
  console.log(`lh-audit--informative count: ${countOccurrences(html, 'lh-audit--informative')}`);
  
  const parts = html.split('class="lh-audit');
  const interestingAudits = [];
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    // Check classes in the class attribute
    const classAttrMatch = part.match(/^([^"]*)"/);
    const classAttr = classAttrMatch ? classAttrMatch[1] : '';
    
    const isFail = classAttr.includes('lh-audit--fail') && !classAttr.includes('lh-audit--pass');
    const isWarning = classAttr.includes('lh-audit--warning');
    const isInformative = classAttr.includes('lh-audit--informative');
    const isPass = classAttr.includes('lh-audit--pass');
    
    let status = 'UNKNOWN';
    if (isFail) status = 'FAIL';
    else if (isWarning) status = 'WARNING';
    else if (isInformative) status = 'INFO';
    else if (isPass) status = 'PASS';
    
    // Extract title
    const titleMatch = part.match(/class="[^"]*lh-audit__title[^"]*"[^>]*>([^<]+)</) || 
                       part.match(/lh-audit__title[^>]*>([^<]+)</);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown Title';
    
    // Extract display text if any
    const displayMatch = part.match(/class="[^"]*lh-audit__display-text[^"]*"[^>]*>([^<]+)</) ||
                         part.match(/lh-audit__display-text[^>]*>([^<]+)</);
    const display = displayMatch ? displayMatch[1].trim() : '';
    
    // Extract explanation
    const expMatch = part.match(/class="[^"]*lh-audit__explanation[^"]*"[^>]*>([^<]+)</) ||
                     part.match(/lh-audit__explanation[^>]*>([^<]+)</);
    const explanation = expMatch ? expMatch[1].trim() : '';
    
    if (isFail || isWarning) {
      interestingAudits.push({
        title,
        display,
        explanation,
        status,
        classes: classAttr
      });
    }
  }
  
  console.log(`Extracted ${interestingAudits.length} failed/warning audits:`);
  interestingAudits.forEach(a => {
    console.log(`- [${a.status}] Title: ${a.title} ${a.display ? `(${a.display})` : ''}`);
    if (a.explanation) console.log(`    Explanation: ${a.explanation.slice(0, 150)}...`);
  });
}

analyzeFile(path.join(process.cwd(), 'public', 'desktop_report.html'));
analyzeFile(path.join(process.cwd(), 'public', 'mobile_report.html'));
