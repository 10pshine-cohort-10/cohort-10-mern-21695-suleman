const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

// Find all matches for `damping:` or `duration:` or `stiffness:`
const animSnippets = js.match(/.{0,100}(?:damping|stiffness|mass|duration|ease|type:\s*["']spring["']).{0,100}/g);
console.log('=== ANIMATION SNIPPETS ===');
if (animSnippets) {
  animSnippets.slice(0, 20).forEach(s => console.log('Snippet:', s));
} else {
  console.log('No spring snippets found');
}

// Let's also check for whileHover, whileTap, initial, animate definitions in main_component.js
const motionProps = js.match(/\{[^{}]*(?:whileHover|whileTap|initial|animate)[^{}]*\}/g);
console.log('\n=== MOTION PROPS SNIPPETS ===');
if (motionProps) {
  motionProps.slice(0, 20).forEach(s => console.log('Motion prop:', s));
}
