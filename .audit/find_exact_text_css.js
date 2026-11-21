const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

function findCssForText(str) {
  const idx = html.indexOf(str);
  if (idx === -1) return 'String not found';
  const snippet = html.substring(Math.max(0, idx - 400), idx + str.length + 100);
  const classMatches = [...snippet.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
  const classes = [...new Set(classMatches.flatMap(c => c.split(/\s+/)).filter(c => c.startsWith('framer-')))];
  
  const rules = [];
  classes.forEach(cls => {
    const r = new RegExp(`\\.${cls}\\b[^{]*\\{([^}]+)\\}`, 'g');
    let sm;
    while ((sm = r.exec(css)) !== null) {
      if (sm[1].includes('--framer-font-size') || sm[1].includes('font-size') || sm[1].includes('--framer-text-color') || sm[1].includes('color')) {
        rules.push(`${cls}: ${sm[1].trim()}`);
      }
    }
  });
  return { snippet, classes, rules };
}

console.log('=== HERO HEADLINE ===');
const hero = findCssForText('Your thoughts.');
console.log(hero.rules);

console.log('\n=== HERO SUBTITLE ===');
const sub = findCssForText('A calm, intelligent space');
console.log(sub.rules);

console.log('\n=== HERO LABEL ===');
const label = findCssForText('YOUR PERSONAL DIGITAL NOTEBOOK');
console.log(label.rules);

console.log('\n=== ORGANIZE HEADLINE ===');
const org = findCssForText('From scattered ideas');
console.log(org.rules);

console.log('\n=== CTA HEADLINE ===');
const cta = findCssForText('Make space for your next idea.');
console.log(cta.rules);
