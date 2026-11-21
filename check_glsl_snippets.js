const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

const regex = /.{0,60}(?:void\s+main|gl_FragColor|createShader|uniform\s+float).{0,60}/g;
let m;
let count = 0;
while ((m = regex.exec(shared)) !== null && count < 10) {
  console.log(`[${count++}]:`, m[0]);
}

// Let's also check what is `gS5v8kYo8SbvNhA5aeykmQP8bKE.png`
const main = fs.readFileSync('d:/NotesFlow/.audit/main_component.js', 'utf8');
const imgMatch = [...main.matchAll(/.{0,100}gS5v8kYo8SbvNhA5aeykmQP8bKE.{0,100}/g)].map(m => m[0]);
console.log('\n=== IMAGE SNIPPET ===');
imgMatch.forEach(i => console.log(i));
