const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

// Match <h1, <h2, <h3, <p, <span with classes
const tagMatches = [...html.matchAll(/<(h[1-6]|p)[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/gi)];

tagMatches.slice(0, 25).forEach(m => {
  const tag = m[1];
  const classes = m[2].split(/\s+/).filter(c => c.startsWith('framer-'));
  const text = m[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Find style in css
  let cssMatch = '';
  for (const c of classes) {
    const r = new RegExp(`\\.${c}[^{]*\\{([^}]+)\\}`, 'g');
    let sm;
    while ((sm = r.exec(css)) !== null) {
      if (sm[1].includes('font-size') || sm[1].includes('color') || sm[1].includes('--framer')) {
        cssMatch += ' ' + sm[1].trim();
      }
    }
  }
  
  console.log(`\n<${tag}> "${text.slice(0, 60)}"`);
  console.log('CSS:', cssMatch || 'none');
});
