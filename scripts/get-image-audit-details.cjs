const fs = require('fs');
const path = require('path');

function inspectAudit(filepath, auditId) {
  console.log(`\n=== INSPECTING ${auditId} FOR: ${filepath} ===`);
  const html = fs.readFileSync(filepath, 'utf8');
  
  // Find the element with id="auditId"
  const startIdx = html.indexOf(`id="${auditId}"`);
  if (startIdx === -1) {
    console.log(`Audit ${auditId} not found.`);
    return;
  }
  
  // Slice a good chunk after the id
  const slice = html.slice(startIdx, startIdx + 8000);
  
  // Let's print out the text or display text, and rows in the table
  const titleMatch = slice.match(/class="[^"]*lh-audit__title[^"]*"[^>]*>([^<]+)</);
  const displayMatch = slice.match(/class="[^"]*lh-audit__display-text[^"]*"[^>]*>([^<]+)</);
  
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : 'N/A'}`);
  console.log(`Display: ${displayMatch ? displayMatch[1].trim() : 'N/A'}`);
  
  // Find table rows
  const rowMatches = slice.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
  if (rowMatches) {
    console.log(`Found ${rowMatches.length} rows (including header):`);
    rowMatches.forEach((row, i) => {
      const cols = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) || [];
      const textCols = cols.map(c => c.replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' '));
      console.log(`  Row #${i}: ${textCols.join(' | ')}`);
    });
  } else {
    console.log('No table rows found.');
  }
}

inspectAudit(path.join(process.cwd(), 'public', 'mobile_report.html'), 'image-delivery-insight');
inspectAudit(path.join(process.cwd(), 'public', 'mobile_report.html'), 'render-blocking-insight');
inspectAudit(path.join(process.cwd(), 'public', 'mobile_report.html'), 'unused-javascript');
