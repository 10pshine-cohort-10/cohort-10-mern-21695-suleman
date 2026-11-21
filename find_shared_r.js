const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

// Search for export { ... as r } or `r = `
// in shared-lib: import { i as Ce, r as d } from "./shared-lib.BqaxuEnC.mjs"
// That means `d` is exported as `r`!
const exportMatch = shared.match(/export\s*\{[^}]*\b[a-zA-Z0-9_]+\s+as\s+r\b[^}]*\}/);
console.log('Export match:', exportMatch ? exportMatch[0] : 'not found');

// Let's find the variable name exported as r
if (exportMatch) {
  const m = exportMatch[0].match(/([a-zA-Z0-9_]+)\s+as\s+r/);
  if (m) {
    const varName = m[1];
    console.log('Var name:', varName);
    const varDef = shared.match(new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*(\\{[\\s\\S]*?\\});`));
    if (varDef) {
      console.log('Var def length:', varDef[0].length);
      fs.writeFileSync('d:/NotesFlow/.audit/shader_def_full.js', varDef[0], 'utf8');
      console.log('Saved shader_def_full.js');
    }
  }
}
