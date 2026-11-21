const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

// Look for transition variables
const transitionDefs = js.match(/(?:const|let|var)\s+[a-zA-Z0-9_]+\s*=\s*\{[^}]*(?:damping|stiffness|duration|ease|type:[^}]+)[^}]*\}/g);
console.log('=== TRANSITION DEFINITIONS ===');
console.log(transitionDefs);

// Let's inspect the sections in the component
// Framer components usually have a structure of motion.divs with ids or testids or data-framer-name
const framerNames = [...new Set(js.match(/data-framer-name="[^"]+"/g))];
console.log('\n=== FRAMER NAMES ===');
console.log(framerNames);

// Let's find keyframe animations or marquee animations
const marquees = js.match(/(?:@keyframes|translateX|translateY|rotate)[^;{]+/g);
console.log('\n=== KEYFRAME OR TRANSFORM PATTERNS ===');
console.log(marquees ? marquees.slice(0, 20) : 'none');

// Let's inspect any style tags or CSS rules in framer_page.html for animations
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const keyframes = [...html.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([\s\S]*?)\}/g)].map(m => `${m[1]}: ${m[2].trim()}`);
console.log('\n=== KEYFRAMES IN HTML ===');
keyframes.forEach(k => console.log(k));
