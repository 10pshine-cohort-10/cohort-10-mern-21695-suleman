const fs = require('fs');
const frag = fs.readFileSync('d:/NotesFlow/.audit/shader_frag_2.glsl', 'utf8');

console.log('Frag shader lines:', frag.split('\n').length);
console.log('Sample uniforms:\n', frag.split('\n').slice(0, 30).join('\n'));
