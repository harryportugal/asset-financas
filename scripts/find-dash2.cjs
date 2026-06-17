const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('dash2.webp')) {
        console.log(`Found reference in: ${fullPath}`);
        // print matching lines
        const lines = content.split('\n');
        lines.forEach((l, i) => {
          if (l.includes('dash2.webp')) {
            console.log(`  Line ${i+1}: ${l.trim()}`);
          }
        });
      }
    }
  }
}

scanDir(path.join(process.cwd(), 'src'));
