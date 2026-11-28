const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/augiA20Il.js', 'utf8');

console.log('JS length:', js.length);

// Extract color codes (#hex and rgb/rgba)
const colors = [...new Set(js.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/g))];
console.log('=== COLORS FOUND ===');
console.log(colors.filter(c => !c.includes('0, 0, 0, 0')));

// Extract font families
const fonts = [...new Set(js.match(/fontFamily:[^,;]+|"[^"]*(?:Sans|Serif|Mono|Inter|Cabinet|Plus Jakarta|Geist|SF Pro|Instrument|Epilogue)[^"]*"/gi))];
console.log('\n=== FONTS FOUND ===');
console.log(fonts);

// Extract CSS style blocks from framer_page.html
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
fs.writeFileSync('d:/NotesFlow/extracted_styles.css', styles, 'utf8');
console.log('\nExtracted CSS styles length:', styles.length);

// Search for motion/transition/animation properties in JS
const transitions = [...new Set(js.match(/transition:\s*\{[^}]+\}/g))];
console.log('\n=== SAMPLE TRANSITIONS ===');
console.log(transitions.slice(0, 10));

// Check for SVGs
const svgs = [...js.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log('\n=== SVGs COUNT IN JS ===', svgs.length);
