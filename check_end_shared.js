const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

const lastLines = shared.slice(-2000);
console.log('End of shared-lib.js:');
console.log(lastLines);
