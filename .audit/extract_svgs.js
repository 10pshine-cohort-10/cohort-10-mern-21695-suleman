const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

const svgs = [...html.matchAll(/<svg[\s\S]*?<\/svg>/gi)].map(m => m[0]);
console.log('Total SVGs in HTML:', svgs.length);
svgs.forEach((svg, idx) => {
  console.log(`\n--- SVG #${idx + 1} ---`);
  console.log(svg.slice(0, 400));
});

fs.writeFileSync('d:/NotesFlow/all_svgs.json', JSON.stringify(svgs, null, 2), 'utf8');
