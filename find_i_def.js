const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

const regex = /i\s*=\s*\{([\s\S]*?)\}/;
const m = shared.match(regex);
if (m) {
  console.log('Found i:', m[0].slice(0, 500));
  fs.writeFileSync('d:/NotesFlow/.audit/shader_params.txt', m[0], 'utf8');
} else {
  // Let's find all occurrences of `i=`
  const allI = [...shared.matchAll(/\bi\s*=\s*\{/g)];
  console.log('Occurrences of i = {:', allI.length);
}
