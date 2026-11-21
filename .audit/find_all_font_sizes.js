const fs = require('fs');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

const matches = [...css.matchAll(/([a-zA-Z0-9_.-]+)\s*\{[^}]*font-size:\s*([^;]+)[^}]*\}/g)];
console.log('Rules with font-size:', matches.length);
matches.forEach(m => {
  console.log(`${m[1]} -> font-size: ${m[2].trim()}`);
});
