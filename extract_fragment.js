const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

const idx = shared.indexOf('fragment');
console.log('Index of fragment:', idx);
const fragmentSnippet = shared.substring(idx - 100, idx + 2000);
console.log(fragmentSnippet);

fs.writeFileSync('d:/NotesFlow/.audit/fragment_shader_found.txt', fragmentSnippet, 'utf8');
