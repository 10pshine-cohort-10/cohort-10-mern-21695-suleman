const fs = require('fs');
const main = fs.readFileSync('d:/NotesFlow/.audit/main_component.js', 'utf8');

const idx = main.indexOf('gS5v8kYo8SbvNhA5aeykmQP8bKE');
console.log('Index:', idx);
const snippet = main.substring(Math.max(0, idx - 1000), Math.min(main.length, idx + 1500));
console.log('=== SNIPPET ===');
console.log(snippet);

fs.writeFileSync('d:/NotesFlow/.audit/shader_object.txt', snippet, 'utf8');
