const fs = require('fs');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');

// Let's search for interesting CSS declarations
const rules = css.split('}');
console.log('Total CSS rules:', rules.length);

// Let's find rules with border, background, box-shadow, backdrop-filter, border-radius
const specialRules = rules.filter(r => 
  r.includes('box-shadow') || 
  r.includes('backdrop-filter') || 
  r.includes('radial-gradient') || 
  r.includes('linear-gradient') ||
  r.includes('border-radius')
);

console.log('Special rules count:', specialRules.length);

// Sample unique box-shadows
const shadows = [...new Set(css.match(/box-shadow:[^;]+/g))];
console.log('\n=== BOX SHADOWS ===');
console.log(shadows);

// Sample gradients
const gradients = [...new Set(css.match(/(?:radial|linear)-gradient\([^;)]+\)/g))];
console.log('\n=== GRADIENTS ===');
console.log(gradients.slice(0, 20));

// Sample border-radius
const radiuses = [...new Set(css.match(/border-radius:[^;]+/g))];
console.log('\n=== BORDER RADIUS ===');
console.log(radiuses.slice(0, 15));
