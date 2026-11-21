const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

const idx = html.indexOf('Note â\x80\x94 Machine Learning Revision') !== -1 ? 
  html.indexOf('Note â\x80\x94 Machine Learning Revision') : 
  html.indexOf('Machine Learning Revision');

// Let's find all occurrences of data-framer-name containing Machine Learning Revision
const matches = [...html.matchAll(/<div[^>]*data-framer-name="([^"]*Machine Learning Revision[^"]*)"[^>]*>/g)];
matches.forEach(m => {
  console.log('Match tag:', m[0]);
  const classMatch = m[0].match(/class="([^"]+)"/);
  if (classMatch) {
    const classes = classMatch[1].split(/\s+/);
    classes.forEach(c => {
      const cr = new RegExp(`\\.${c}[^{]*\\{([^}]+)\\}`, 'g');
      let cm;
      while ((cm = cr.exec(css)) !== null) {
        console.log(`  Rule .${c}: ${cm[1].trim()}`);
      }
    });
  }
});
