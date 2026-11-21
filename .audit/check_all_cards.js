const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

const cardNames = [
  'Note â€” Machine Learning Revision',
  'Note â€” Project Ideas',
  'Note â€” Weekend Plans',
  'Note â€” Research Notes',
  'Note â€” Things to Remember',
  'Note â€” Daily Journal'
];

cardNames.forEach(cn => {
  const match = html.match(new RegExp(`<div[^>]*data-framer-name="([^"]*${cn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*)"[^>]*class="([^"]+)"`));
  if (match) {
    const fullName = match[1];
    const classes = match[2].split(/\s+/);
    console.log(`\nCard: ${fullName}`);
    classes.forEach(c => {
      const cr = new RegExp(`\\.${c}[^{]*\\{([^}]+)\\}`, 'g');
      let cm;
      while ((cm = cr.exec(css)) !== null) {
        console.log(`  .${c}: ${cm[1].trim()}`);
      }
    });
  }
});
