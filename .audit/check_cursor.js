const html = require('fs').readFileSync('d:/NotesFlow/framer_page.html', 'utf8');
const cursorMatch = html.match(/data-framer-name="Cursor Icon"[\s\S]*?<\/div>/);
console.log('Cursor Icon snippet:');
console.log(cursorMatch ? cursorMatch[0] : 'not found');
