const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

// Let's print out the clean HTML text hierarchy
// We will look for elements with data-framer-name or semantic classes
const cheerio = null; // We can parse with regex or simple tree walker

// Let's write an inspector that looks for major containers
const containerRegex = /<div class="framer-[^"]*"[^>]*data-framer-name="([^"]*)"/g;
let cm;
const containers = [];
while ((cm = containerRegex.exec(html)) !== null) {
  containers.push(cm[1]);
}
console.log('Containers with names:', [...new Set(containers)]);

// Let's look for all links (hrefs)
const links = [...html.matchAll(/href="([^"]*)"/g)].map(m => m[1]);
console.log('\n=== LINKS ===', [...new Set(links)]);

// Let's inspect the sections in order
// We can find headings (h1, h2, h3, h4, etc.)
const headings = [...html.matchAll(/<(h[1-6]|p|span|div)[^>]*class="[^"]*framer-text[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => m[2].replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 0);
console.log('\n=== HEADINGS / TEXT SAMPLE (first 40) ===');
console.log(headings.slice(0, 40));
