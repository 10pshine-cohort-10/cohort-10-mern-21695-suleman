const fs = require('fs');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

const textProps = [...css.matchAll(/(?:font-size|font-weight|line-height|letter-spacing|color):\s*[^;]+;/g)].map(m => m[0]);
console.log('Unique text declarations:');
console.log([...new Set(textProps)].slice(0, 40));

// Find specific heading sizes
const headings = [...css.matchAll(/\.framer-text[^{]*\{([^}]+)\}/g)].map(m => m[1]);
console.log('\nSample text rules:');
headings.slice(0, 15).forEach(h => console.log(h.trim()));
