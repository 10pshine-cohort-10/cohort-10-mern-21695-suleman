const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

// Let's find sections or main structural blocks
// In Framer, sections have IDs or anchors: about, features, how-it-works
console.log('--- ANCHORS / SECTIONS ---');
const anchors = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('IDs:', anchors);

// Let's inspect the main component JS to see the transition constants
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

// Find where transitions like h, _, v, b, S, C, w, T, E, D, O, k, A are defined
const transitionRegex = /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+(?:damping|stiffness|duration|ease|type)[^}]+)\}/g;
let tm;
while ((tm = transitionRegex.exec(js)) !== null) {
  console.log(`Transition ${tm[1]}: { ${tm[2].trim()} }`);
}

// Also check for object definitions with delay, duration, etc.
const objRegex = /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+delay[^}]+)\}/g;
while ((tm = objRegex.exec(js)) !== null) {
  console.log(`DelayObj ${tm[1]}: { ${tm[2].trim()} }`);
}
