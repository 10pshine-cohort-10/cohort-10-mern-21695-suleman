const fs = require('fs');
const main = fs.readFileSync('d:/NotesFlow/.audit/main_component.js', 'utf8');

// Search for imports at the top
const imports = main.slice(0, 1500);
console.log('Top imports:');
console.log(imports);

// Search for `d =` or `import ... d`
const dMatches = [...main.matchAll(/import\s*\{[^}]*\bd\b[^}]*\}\s*from\s*["'`]([^"'`]+)["'`]/g)];
console.log('d import:', dMatches.map(m => m[0]));
