const fs = require('fs');
const size = fs.statSync('d:/NotesFlow/frontend/src/assets/hero-bg.png').size;
console.log('Downloaded hero-bg.png size:', size);
