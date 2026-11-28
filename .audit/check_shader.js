const html = require('fs').readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const match = html.match(/data-framer-name="Hero Gradient Shader"[\s\S]*?<\/div>/);
console.log('Hero Gradient Shader snippet:', match ? match[0] : 'not found');
