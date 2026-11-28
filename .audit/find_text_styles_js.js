const fs = require('fs');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

// Search for fontSize in main_component.js
const fontSizes = [...new Set(js.match(/fontSize:\s*["'][^"']+["']|\bfontSize:\s*\d+/g))];
console.log('Font Sizes found:', fontSizes);

// Search for letterSpacing
const letterSpacings = [...new Set(js.match(/letterSpacing:\s*["'][^"']+["']/g))];
console.log('Letter Spacings found:', letterSpacings);

// Search for lineHeight
const lineHeights = [...new Set(js.match(/lineHeight:\s*["'][^"']+["']/g))];
console.log('Line Heights found:', lineHeights);

// Search for colors in text
const textColors = [...new Set(js.match(/color:\s*["'][^"']+["']/g))];
console.log('Text Colors found:', textColors.slice(0, 20));
