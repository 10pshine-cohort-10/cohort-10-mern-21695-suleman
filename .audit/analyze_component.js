const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

console.log('Component JS length:', js.length);

// Extract colors
const colors = [...new Set(js.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/g))];
console.log('=== COLORS FOUND (' + colors.length + ') ===');
console.log(colors.slice(0, 30));

// Extract font families and imports
const fontUrls = [...new Set(js.match(/https:\/\/[^"'\s)]+(?:font|\.woff2|\.ttf)[^"'\s)]*/gi))];
console.log('\n=== FONT URLS ===');
console.log(fontUrls);

// Look for animation configs (variants, transitions, spring, etc.)
const transitions = [...new Set(js.match(/transition:\s*\{[^}]+\}/g))];
console.log('\n=== TRANSITIONS (' + transitions.length + ') ===');
transitions.slice(0, 15).forEach(t => console.log(t));

// Look for Framer Motion variant names and keyframe definitions
const variants = [...new Set(js.match(/(?:initial|animate|whileHover|whileTap|exit|variants):\s*(?:\{[^}]+\}|"[^"]+"|[a-zA-Z0-9_]+)/g))];
console.log('\n=== MOTION PROPS (' + variants.length + ') ===');
variants.slice(0, 20).forEach(v => console.log(v));

// Check SVGs
const svgs = [...js.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log('\n=== SVGs COUNT ===', svgs.length);

// Check CSS classes or inline styles
const cssRules = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');
const bgColors = [...new Set(cssRules.match(/background(?:-color)?:\s*[^;]+/gi))];
console.log('\n=== CSS BACKGROUNDS ===');
console.log(bgColors.slice(0, 20));

const fontFamilies = [...new Set(cssRules.match(/font-family:\s*[^;]+/gi))];
console.log('\n=== CSS FONT FAMILIES ===');
console.log(fontFamilies);
