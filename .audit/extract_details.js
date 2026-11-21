const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

// Let's search for text strings and their surrounding JSX / properties
// Let's find sections or component names
const matches = [];
const regex = /(?:children|text|value):\s*["'`]([^"'`]{3,100})["'`]/g;
let m;
while ((m = regex.exec(js)) !== null) {
  matches.push(m[1]);
}
console.log('Sample text properties:', matches.slice(0, 40));

// Let's find all framer component element IDs and classNames
const classNames = [...new Set(js.match(/framer-[a-zA-Z0-9]+/g))];
console.log('\nTotal Framer classes:', classNames.length);

// Let's extract motion animations, like variant objects
const motionBlocks = [...js.matchAll(/variants:\{([\s\S]*?)\}(?=,|\))/g)].map(m => m[0]);
console.log('\nVariants found count:', motionBlocks.length);
motionBlocks.slice(0, 5).forEach(b => console.log('--- VARIANT ---\n', b.slice(0, 300)));

// Let's check animations on scroll or appear
const appearAnims = [...js.matchAll(/animate:\{([\s\S]*?)\}/g)].map(m => m[0]);
console.log('\nAnimate props:', appearAnims.slice(0, 10));

fs.writeFileSync('d:/NotesFlow/component_snippets.txt', 
  matches.join('\n') + '\n\n=== MOTION BLOCKS ===\n' + motionBlocks.join('\n\n'), 
  'utf8');
