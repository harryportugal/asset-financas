const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
const lines = content.split('\n');

console.log('=== Occurrences of window.inner in App.tsx ===');
lines.forEach((line, index) => {
  if (line.includes('window.inner')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
