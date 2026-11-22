const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('=== TITLE ===\n', titleMatch ? titleMatch[1] : 'No title');

const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
console.log('=== DESC ===\n', descMatch ? descMatch[1] : 'No desc');

// Extract all images
const images = [...new Set([...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"\s)]+/g)].map(m => m[0]))];
console.log(`\n=== IMAGES (${images.length}) ===`);
images.forEach(img => console.log(img));

// Extract scripts
const scripts = [...new Set([...html.matchAll(/https:\/\/framerusercontent\.com\/sites\/[^"\s)]+\.mjs/g)].map(m => m[0]))];
console.log(`\n=== SCRIPTS (${scripts.length}) ===`);
scripts.forEach(s => console.log(s));

// Extract all text content from SSR HTML
// Let's strip tags and see what sections exist
const textContent = html
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

console.log(`\n=== UNIQUE TEXT BLOCKS (${textContent.length}) ===`);
fs.writeFileSync('d:/NotesFlow/extracted_text.txt', textContent.join('\n'), 'utf8');
console.log('Wrote text blocks to d:/NotesFlow/extracted_text.txt');
