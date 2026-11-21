const fs = require('fs');
const main = fs.readFileSync('d:/NotesFlow/.audit/main_component.js', 'utf8');

// Find where variable `d` is defined
const dMatch = main.match(/(?:const|let|var)\s+d\s*=\s*\{[\s\S]*?\};/);
if (dMatch) {
  console.log('d definition length:', dMatch[0].length);
  fs.writeFileSync('d:/NotesFlow/.audit/d_definition.js', dMatch[0], 'utf8');
  console.log('Saved d_definition.js');
} else {
  // Let's search for `fragment:` or `vertex:`
  const fMatch = main.match(/fragment:\s*`[\s\S]*?`/);
  console.log('Fragment match:', fMatch ? fMatch[0].slice(0, 300) : 'not found');
}
