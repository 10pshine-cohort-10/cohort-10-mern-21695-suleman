const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

// Parse classes from HTML
// In Framer: <div class="framer-xxxx framer-yyyy" data-framer-name="Hero Section">
const classMap = {};
const regex = /class="([^"]+)"[^>]*data-framer-name="([^"]+)"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const classes = m[1].split(/\s+/).filter(c => c.startsWith('framer-'));
  const name = m[2];
  classMap[name] = classes;
}

// For each class, find CSS rules in extracted_styles.css
const results = {};
for (const [name, classes] of Object.entries(classMap)) {
  const stylesForContainer = [];
  for (const cls of classes) {
    const r = new RegExp(`\\.${cls}\\b[^{]*\\{([^}]+)\\}`, 'g');
    let sm;
    while ((sm = r.exec(css)) !== null) {
      stylesForContainer.push(sm[1].trim());
    }
  }
  results[name] = stylesForContainer;
}

fs.writeFileSync('d:/NotesFlow/container_styles_map.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved container styles map with', Object.keys(results).length, 'entries');

// Let's print out key containers styles
const keyContainers = ['Navbar', 'Hero Headline', 'Primary CTA', 'Main Note', 'App Shell', 'Feature Card — Instant capture', 'Final CTA Button'];
keyContainers.forEach(kc => {
  console.log(`\n=== STYLES FOR [${kc}] ===`);
  console.log(results[kc] ? results[kc].join('\n') : 'not found');
});
